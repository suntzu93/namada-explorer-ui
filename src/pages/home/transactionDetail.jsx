import React, { useState, useEffect } from "react";
import * as Data from "../data";
import styles from "./styles.module.css";
import Link from "@mui/material/Link";
import * as Utils from "../../utils/utils";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import Loader from "../../components/loader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

function TransactionDetail({ blockDetail }) {
  return <Box sx={{ width: "100%" }}>{Overview(blockDetail)}</Box>;
}

function Overview(blockDetail) {
  return (
    <div className={styles.operator_detail_overview}>
      <table className={styles.operator_detail_overview_table}>
        <tbody>
          <tr>
            <th colSpan="2" style={{ fontWeight: "bold" }}>
              Transaction detail
            </th>
          </tr>
        </tbody>
        <tbody className={styles.operator_detail_overview_table_tbody}>
          <tr>
            <th>height</th>
            <td>
              <Link
                target="_blank"
                underline="hover"
                href={
                  Utils.getDomain() +
                  "?block=" +
                  blockDetail.rowData.header_height
                }
                className={styles.link}
              >
                {blockDetail.rowData.header_height}
              </Link>
            </td>
          </tr>
          <tr>
            <th>block id</th>
            <td>{blockDetail.rowData.hash}</td>
          </tr>
          <tr>
            <th>block time</th>
            <td>
              {Data.formatTimeToText(
                  Data.convertTimeStringToMilisecond(
                      blockDetail.rowData.header_time
                  )
              )}
            </td>
          </tr>
          <tr>
            <th>tx_type</th>
            <td>{blockDetail.rowData.tx_type}</td>
          </tr>
          <tr>
            <th>fee amount</th>
            <td>{blockDetail.rowData.fee_amount_per_gas_unit}</td>
          </tr>
          <tr>
            <th>gas limit</th>
            <td>{blockDetail.rowData.gas_limit_multiplier}</td>
          </tr>
          <tr>
            <th>code</th>
            <td>{blockDetail.rowData.code}</td>
          </tr>
          <tr>
            <th>data</th>
            <td><p className={styles.transaction_data}>{blockDetail.rowData.data}</p></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const BlockDetailPage = () => {
  const [pageData, setPageData] = useState({
    rowData: {},
    isLoading: true,
  });
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const hash = query.get("transaction");
    setTransaction(hash);

    Data.getTransactionsDetail( hash).then((info) => {
      setPageData({
        rowData: info,
        isLoading: false,
      });
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
              <h5>{transaction}</h5>
              <span>tx hash</span>
            </div>
          </div>
          <TransactionDetail blockDetail={pageData} />
        </div>
      )}
    </>
  );
};

export default BlockDetailPage;
