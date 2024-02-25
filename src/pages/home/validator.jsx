import React, { useState, useEffect } from "react";
import * as Data from "../data";
import styles from "./styles.module.css";
import ValidatorTable from "../../components/table/validator";

const ValidatorPage = ({ network}) => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    pageNumber: 1,
    totalPassengers: 0,
  });

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    Data.getValidators().then((info) => {
      const totalPassengers = info.length;
      setPageData({
        isLoading: false,
        rowData: info,
        totalPassengers: totalPassengers,
      });

    });
  }, []);

  return (
    <div>
      <div className={styles.operator_detail_header}>
        <div className={styles.operator_detail_header_address}>
              <h3>Validators</h3>
              <span>active {pageData.totalPassengers} validators</span>
        </div>
      </div>
      <div className={styles.table_content}>
        <ValidatorTable
          columns={Data.validator_columns}
          data={pageData.rowData}
          isLoading={pageData.isLoading}
          network={network}
        />
      </div>
    </div>
  );
};

export default ValidatorPage;
