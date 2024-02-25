import React, { useState, useEffect } from "react";
import * as Data from "../data";
import styles from "./styles.module.css";
import TransactionTable from "../../components/table/transaction";

const TransactionsPage = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
  });

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    Data.getTransactions().then((info) => {
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
          <h3>Transactions</h3>
          <span>top {pageData.rowData?.length} transactions</span>
        </div>
      </div>
      <div className={styles.table_content}>
        <TransactionTable
          columns={Data.transaction_columns}
          data={pageData.rowData}
          isLoading={pageData.isLoading}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
