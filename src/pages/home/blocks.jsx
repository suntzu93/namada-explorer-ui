import React, { useState, useEffect } from "react";
import * as Data from "../data";
import BlockTable from "../../components/table/blocks";
import styles from "./styles.module.css";
import * as Const from "../../utils/Cons";

const Blocks = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    pageNumber: 1,
    totalPassengers: 0,
  });

  const [network, setNetwork] = useState({
    network: "",
    latestBlockHeight: 0,
  });

  const [activeValidator, setActiveValidator] = useState(0);

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    loadBlock();
    const intervalCall = setInterval(() => {
      loadBlock();
    }, Const.TIME_RELOAD);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    Data.getNetworkStatus().then((info) => {
      setNetwork(info);
    });

    const intervalCall = setInterval(() => {
      Data.getNetworkStatus().then((info) => {
        setNetwork(info);
      });
    }, Const.TIME_RELOAD);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  useEffect(() => {
    Data.getActiveValidator().then((info) => {
      setActiveValidator(info);
    });
    const intervalCall = setInterval(() => {
      Data.getActiveValidator().then((info) => {
        setActiveValidator(info);
      });
    }, Const.TIME_RELOAD);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  function loadBlock() {
    Data.getBlocks().then((info) => {
      const totalPassengers = info.length;
      setPageData({
        isLoading: false,
        rowData: info,
        totalPassengers: totalPassengers,
      });
    });
  }

  return (
    <div>
      <div className={styles.operator_detail_header}>
        <div className={styles.operator_detail_header_address}>
          <h3>Blocks</h3>
          <span>Top {pageData.totalPassengers} blocks</span>
        </div>
        <div className={styles.operator_detail_header_value}>
          <div className={styles.operator_detail_header_value_item}>
            <div className={styles.operator_detail_header_value_item_lable}>
              Network name
            </div>
            <div>
              <div>{network.network}</div>
            </div>
          </div>
          <div className={styles.operator_detail_header_value_item}>
            <div className={styles.operator_detail_header_value_item_lable}>
              Latest block height
            </div>
            <div>
              <div>{network.latestBlockHeight}</div>
            </div>
          </div>
          <div className={styles.operator_detail_header_value_item}>
            <div className={styles.operator_detail_header_value_item_lable}>
              Active validator
            </div>
            <div>
              <div>{activeValidator}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.table_content}>
        <BlockTable
          columns={Data.blocks_columns}
          data={pageData.rowData}
          isLoading={pageData.isLoading}
        />
      </div>
    </div>
  );
};

export default Blocks;
