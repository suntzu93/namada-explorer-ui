import React, { useState, useEffect } from "react";
import * as Data from "../data";
import styles from "./styles.module.css";
import * as Const from "../../utils/Cons";
import { ReactComponent as ShareLink } from "../../assets/link.svg";
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

function BlockDetail({ blockDetail}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              style={{ textTransform: "none", color: "black" }}
              label="Overview"
              value="1"
            />
            <Tab
              style={{ textTransform: "none", color: "black" }}
              label="Signature"
              value="2"
            />
          </TabList>
        </Box>
        <TabPanel value="1" className={styles.operator_detail}>
          {Overview(blockDetail)}
        </TabPanel>
        <TabPanel value="2" className={styles.operator_detail}>
          {Signatures(blockDetail)}
        </TabPanel>
      </TabContext>
    </Box>
  );
}

function Overview(blockDetail) {
  console.log(blockDetail.rowData)
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
            <tr>
              <th>block id</th>
              <td>{blockDetail.rowData.block_id}</td>
            </tr>
            <tr>
              <th>block height</th>
              <td>{blockDetail.rowData.header.height}</td>
            </tr>
            <tr>
              <th>block time</th>
              <td>
                {Data.formatTimeToText(
                  Data.convertTimeStringToMilisecond(
                      blockDetail.rowData.header.time
                  )
                )}
              </td>
            </tr>
            <tr>
              <th>transactions count</th>
              <td>{blockDetail.rowData.tx_hashes.length}</td>
            </tr>
            <tr>
              <th>Proposer</th>
              <td>{blockDetail.rowData.header.proposer_address}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ flex: "1 1 0%" }}>
        <h4>
          <strong>Transactions</strong>
        </h4>
        {blockDetail.rowData.tx_hashes.map((trans) => {
              return (
                <div className={styles.log_item}>
                  <div className={styles.log_item_lable}>
                    <span>
                      {" tx hash "}
                      <a
                        target="_blank"
                        href={Utils.getDomain() + "?transaction=" + trans.hash_id}
                      >
                        {Data.formatHashString(trans.hash_id)}
                      </a>
                    </span>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

function Signatures(blockDetail) {
  return (
    <div>
      <h4>
        <strong>Signatures</strong>
      </h4>
      <Paper sx={{ backgroundColor: "transparent", boxShadow: "0" }}>
        <TableContainer>
          <table className={styles.beacon_groups_table}>
            <thead>
              <tr>
                <th>Validator address</th>
                <th>Moniker</th>
              </tr>
            </thead>

            <tbody>
              {blockDetail.rowData.signatures?.map((signature) => {
                return (
                  <tr>
                    <td>
                      <Link
                        target="_blank"
                        underline="hover"
                        href={
                          Utils.getDomain() +
                          "?validator=" +
                            signature.address_hex
                        }
                        className={styles.link}
                      >
                        {signature.address_hex}
                      </Link>
                    </td>
                    <td>
                        {signature.moniker}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      </Paper>
    </div>
  );
}

const BlockDetailPage = () => {
  const [pageData, setPageData] = useState({
    rowData: {},
    isLoading: true,
  });
  const [block, setBlock] = useState();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const block = query.get("block");
    setBlock(block);

    Data.getBlockDetail(block).then((info) => {
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
              <h3>
                <Link
                  target="_blank"
                  underline="hover"
                  href={Utils.getDomain() +"/search?block="+ block}
                  className={styles.link}
                >
                  {block}
                </Link>
              </h3>
              <span>Block height</span>
            </div>
          </div>
          <BlockDetail
            blockDetail={pageData}
          />
        </div>
      )}
    </>
  );
};

export default BlockDetailPage;
