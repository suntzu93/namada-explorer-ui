import React, { useState, useEffect } from "react";
import * as Data from "../data";
import styles from "./styles.module.css";
import * as Utils from "../../utils/utils";
import Box from "@mui/material/Box";
import Loader from "../../components/loader";
import * as Const from "../../utils/Cons";

function ValidatorDetail({ pageData }) {
  console.log(pageData);
  return <Box sx={{ width: "100%" }}>{Overview(pageData)}</Box>;
}

function Overview(pageData) {
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
            {pageData !== undefined ? (
              <>
                <tr>
                  <th>address</th>
                  <td>{pageData.rowData.address_hex}</td>
                </tr>
                <tr>
                  <th>operator address</th>
                  <td>{pageData.rowData.address}</td>
                </tr>
                <tr>
                  <th>moniker</th>
                  <td>{pageData.rowData.moniker}</td>
                </tr>
                <tr>
                  <th>voting power</th>
                  <td>{pageData.rowData.tokens}</td>
                </tr>
                <tr>
                  <th>status</th>
                  <td>{pageData.rowData.status}</td>
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
    </div>
  );
}

const ValidatorDetailPage = () => {
  const [pageData, setPageData] = useState({
    rowData: {},
    isLoading: true,
  });
  const [validatorAddress, setValidatorAddress] = useState();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const validator = query.get("validator");
    setValidatorAddress(validator);

    Data.getValidators().then((info) => {
      for (let i = 0; i < info.length; i++) {
        if (info[i].address_hex.toUpperCase() === validator.toUpperCase()) {
          setPageData({
            rowData: info[i],
            isLoading: false,
          });
          break;
        }
      }
    });
  }, []);

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
          <ValidatorDetail pageData={pageData} />
        </div>
      )}
    </>
  );
};

export default ValidatorDetailPage;
