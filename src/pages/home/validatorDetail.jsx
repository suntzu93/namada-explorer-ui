import React, { useState, useEffect } from "react";
import * as Data from "../data";
import styles from "./styles.module.css";
import * as Utils from "../../utils/utils";
import Box from "@mui/material/Box";
import Loader from "../../components/loader";
import * as Const from "../../utils/Cons";

function ValidatorDetail({ validatorDetail, validatorInfo }) {
  console.log(validatorInfo);
  console.log(validatorDetail);
  return (
    <Box sx={{ width: "100%" }}>{Overview(validatorDetail, validatorInfo)}</Box>
  );
}

function Overview(blockDetail, validatorInfo) {
  return (
    <div className={styles.operator_detail_overview}>
      <div style={{ flex: "1 1 0%" }}>
        <table className={styles.operator_detail_overview_table}>
          <tbody>
            <tr>
              <th colSpan="2" style={{ fontWeight: "bold" }}>
                Overview
              </th>
            </tr>
          </tbody>
          <tbody className={styles.operator_detail_overview_table_tbody}>
            {validatorInfo !== undefined ? (
              <>
                <tr>
                  <th>address</th>
                  <td>{validatorInfo.address}</td>
                </tr>
                <tr>
                  <th>operator address</th>
                  <td>{validatorInfo.operator_address}</td>
                </tr>
                <tr>
                  <th>moniker</th>
                  <td>{validatorInfo.moniker}</td>
                </tr>
                <tr>
                  <th>voting power</th>
                  <td>
                    {Data.formatWeiDecimalNoSurplus(validatorInfo.voting_power)}
                  </td>
                </tr>
                <tr>
                  <th>voting percentage</th>
                  <td>
                    {" "}
                    {Data.formatNumberToDecimal(
                      validatorInfo.voting_percentage
                    )}
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>
                    Unable to find information about your validator address.
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ flex: "1 1 0%" }}>
        <h5>
          <strong>Last 100 blocks</strong>
        </h5>
        <div className={styles.div_uptime_parent}>
          <div className={styles.div_uptime}>
            {blockDetail.uptime === undefined ||
            blockDetail.uptime?.length === 0
              ? "Cann't fetch the uptime of your validator"
              : blockDetail.uptime.map((uptime) => {
                  return (
                    <div
                      className={
                        uptime.sign_status
                          ? styles.div_uptime_item
                          : styles.div_uptime_item_miss
                      }
                    >
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

const ValidatorDetailPage = () => {
  const [pageData, setPageData] = useState({
    rowData: {},
    isLoading: true,
  });
  const [validatorAddress, setValidatorAddress] = useState();
  const [validatorInfo, setValidatorInfo] = useState();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const validator = query.get("validator");
    setValidatorAddress(validator);

    Data.getValidators().then((info) => {
      let filteredData = info.filter(
        (item) => item.address.toUpperCase() === validator.toUpperCase()
      );
      if (filteredData.length > 0) {
        setValidatorInfo(filteredData[0]);
      }
    });

    loadValidatorDetail(validator);
    const intervalCall = setInterval(() => {
      loadValidatorDetail(validator);
    }, Const.TIME_RELOAD);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  function loadValidatorDetail(validator) {
    Data.getValidatorDetail(validator).then((info) => {
      setPageData({
        rowData: info,
        isLoading: false,
      });
    });
  }

  return (
    <>
      {pageData.isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : (
        <div>
          <div className={styles.operator_detail_header}>
            <div className={styles.operator_detail_header_address}>
              <h5>{validatorAddress}</h5>
              <span>Validator</span>
            </div>
          </div>
          <ValidatorDetail
            validatorDetail={pageData.rowData}
            validatorInfo={validatorInfo}
          />
        </div>
      )}
    </>
  );
};

export default ValidatorDetailPage;
