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

function BlockDetail({ blockDetail, transaction, signatures }) {
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
          {Overview(blockDetail, transaction)}
        </TabPanel>
        <TabPanel value="2" className={styles.operator_detail}>
          {Signatures(signatures)}
        </TabPanel>
      </TabContext>
    </Box>
  );
}

function Overview(blockDetail, transaction) {
  console.log(transaction);
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
              <td>{blockDetail.rowData.header_height}</td>
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
              <th>transactions count</th>
              <td>{blockDetail.rowData.transactions_count}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th colSpan="2" style={{ fontWeight: "bold" }}>
                Header
              </th>
            </tr>
          </tbody>
          <tbody className={styles.operator_detail_overview_table_tbody}>
            <tr>
              <th>header last block id</th>
              <td>{blockDetail.rowData.header_last_block_id_hash}</td>
            </tr>
            <tr>
              <th>header total</th>
              <td>
                {blockDetail.rowData.header_last_block_id_parts_header_total}
              </td>
            </tr>
            <tr>
              <th>header last block id</th>
              <td>
                {blockDetail.rowData.header_last_block_id_parts_header_hash}
              </td>
            </tr>
            <tr>
              <th>header last commit</th>
              <td>{blockDetail.rowData.header_last_commit_hash}</td>
            </tr>
            <tr>
              <th>header data</th>
              <td>{blockDetail.rowData.header_data_hash}</td>
            </tr>
            <tr>
              <th>header validators</th>
              <td>{blockDetail.rowData.header_validators_hash}</td>
            </tr>
            <tr>
              <th>header next validators</th>
              <td>{blockDetail.rowData.header_next_validators_hash}</td>
            </tr>
            <tr>
              <th>header consensus</th>
              <td>{blockDetail.rowData.header_consensus_hash}</td>
            </tr>
            <tr>
              <th>header app</th>
              <td>{blockDetail.rowData.header_app_hash}</td>
            </tr>
            <tr>
              <th>header last results</th>
              <td>{blockDetail.rowData.header_last_results_hash}</td>
            </tr>
            <tr>
              <th>header evidence</th>
              <td>{blockDetail.rowData.header_evidence_hash}</td>
            </tr>
            <tr>
              <th>header proposer address</th>
              <td>{blockDetail.rowData.header_proposer_address}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th colSpan="2" style={{ fontWeight: "bold" }}>
                Commit
              </th>
            </tr>
          </tbody>
          <tbody className={styles.operator_detail_overview_table_tbody}>
            <tr>
              <th>commit height</th>
              <td>{blockDetail.rowData.commit_height}</td>
            </tr>
            <tr>
              <th>commit round</th>
              <td>{blockDetail.rowData.commit_round}</td>
            </tr>
            <tr>
              <th>commit block id</th>
              <td>{blockDetail.rowData.commit_block_id_hash}</td>
            </tr>
            <tr>
              <th>commit block id parts header total</th>
              <td>{blockDetail.rowData.commit_block_id_parts_header_total}</td>
            </tr>
            <tr>
              <th>commit block id parts header</th>
              <td>{blockDetail.rowData.commit_block_id_parts_header_hash}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ flex: "1 1 0%" }}>
        <h4>
          <strong>Transactions</strong>
        </h4>
        {transaction[0]?.hash === undefined
          ? "Data is not yet indexed, please refresh after a few seconds..."
          : transaction?.map((trans) => {
              return (
                <div className={styles.log_item}>
                  <div className={styles.log_item_lable}>
                    <span>
                      {" tx hash "}
                      <a
                        target="_blank"
                        href={Utils.getDomain() + "?transaction=" + trans.hash}
                      >
                        {Data.formatHashString(trans.hash)}
                      </a>
                      {"  "} {trans.tx_type}
                    </span>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

function Signatures(signatures) {
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
              </tr>
            </thead>

            <tbody>
              {signatures?.map((address) => {
                return (
                  <tr>
                    <td>
                      <Link
                        target="_blank"
                        underline="hover"
                        href={
                          Utils.getDomain() +
                          "?validator=" +
                          address.validator_address
                        }
                        className={styles.link}
                      >
                        {address.validator_address}
                      </Link>
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
  const [transaction, setTransaction] = useState({});
  const [signatures, setSignatures] = useState([]);
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
    Data.getBlockTransactions(block).then((info) => {
      setTransaction(info);
    });
    Data.getBlockSignatures(block).then((info) => {
      setSignatures(info);
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
            transaction={transaction}
            signatures={signatures}
          />
        </div>
      )}
    </>
  );
};

export default BlockDetailPage;
