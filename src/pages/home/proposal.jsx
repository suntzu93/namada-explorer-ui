import React, { useState, useEffect } from "react";
import * as Data from "../data";
import styles from "./styles.module.css";
import {ProposalTable} from "../../components/table/proposal";
import {proposal_columns} from "../data";

const ProposalsPage = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
  });

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    Data.getProposals().then((info) => {
      setPageData({
        rowData: info,
        isLoading: false,
      });
    });
  }, []);

  return (
    <div>
      <div className={styles.operator_detail_header}>
        <div className={styles.operator_detail_header_address}>
          <h3>Governances</h3>
          <span>{pageData.rowData?.length} governances</span>
        </div>
      </div>
      <div className={styles.table_content}>
        <ProposalTable
          columns={Data.proposal_columns}
          data={pageData.rowData}
          isLoading={pageData.isLoading}
        />
      </div>
    </div>
  );
};

export default ProposalsPage;
