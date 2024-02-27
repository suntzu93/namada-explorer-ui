import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { browserHistory } from "react-router";
import styles from "./styles.module.css";
import Blocks from "./blocks";
import { ReactComponent as Logo } from "../../logo.svg";

import * as Const from "../../utils/Cons";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ValidatorPage from "./validator";
import BlockDetailPage from "./blockDetail";
import ValidatorDetailPage from "./validatorDetail";
import TransactionDetailPage from "./transactionDetail";
import TransactionsPage from "./transaction";
import { isNumeric } from "../../utils/utils";
import * as Utils from "../../utils/utils";
import ProposalsPage from "./proposal";

const HomePage = () => {
  const [tab, setTab] = React.useState("1");
  const [anchorElSetting, setAnchorElSetting] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState("");
  const [isSearch, setIsSearch] = React.useState(false);

  const openSetting = Boolean(anchorElSetting);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.has("block")) {
      setTab("blockDetail");
    } else if (query.has("transaction")) {
      setTab("transactionDetail");
    } else if (query.has("validator")) {
      setTab("validatorDetail");
    } else {
      const pathName = window.location.pathname;
      if (pathName.startsWith("/blocks/")) {
        setTab("blocks");
      } else if (pathName.startsWith("/transactions")) {
        setTab("transactions");
      } else if (pathName.startsWith("/validators")) {
        setTab("validators");
      } else if (pathName.startsWith("/governances")) {
        setTab("governances");
      } else {
        setTab("blocks");
      }
    }
  }, []);

  function blocks() {
    return (
      <div>
        <Blocks isSearch={isSearch} searchInput={searchInput} />
      </div>
    );
  }

  function transactions() {
    return (
      <div>
        <TransactionsPage />
      </div>
    );
  }

  function validators() {
    return (
      <div>
        <ValidatorPage />
      </div>
    );
  }

  function governances() {
    return (
      <div>
        <ProposalsPage />
      </div>
    );
  }

  function blockDetail() {
    return <BlockDetailPage />;
  }

  function transactionDetail() {
    return <TransactionDetailPage />;
  }

  function validatorDetail() {
    return <ValidatorDetailPage />;
  }

  function tabs() {
    const handleChange = (event, newValue) => {
      setTab(newValue);
      switch (newValue) {
        case "blocks":
          return browserHistory.push("/blocks");
        case "transactions":
          return browserHistory.push("/transactions");
        case "validators":
          return browserHistory.push("/validators");
        case "governances":
          return browserHistory.push("/governances");
        default:
          return browserHistory.push("/");
      }
    };

    const handleChangeSearchInput = (event) => {
      setSearchInput(event.target.value);
      if (event.target.value.trim().length == 0) {
        setIsSearch(false);
      }
    };

    const submitSearch = () => {
      if (searchInput.length > 0) {
        setIsSearch(true);
        let url = Utils.getDomain() + "/search";
        // search block
        if (Utils.isNumeric(searchInput)) {
          // window.open(Utils.getDomain() + "?block=" + searchInput);
          url += "?block=" + searchInput;
        } else if (searchInput.length > 60) {
          url += "?transaction=" + searchInput;
          // window.open(Utils.getDomain() + "?transaction=" + searchInput);
        } else if (searchInput.length >= 40 && searchInput.length < 60) {
          url += "?validator=" + searchInput;
          // window.open(Utils.getDomain() + "?validator=" + searchInput);
        }

        window.location.href = url;
      }
    };

    return (
      <Box sx={{ width: "100%", typography: "body" }}>
        <TabContext value={tab}>
          <Box
            sx={{
              mb: 0,
              borderBottom: 1,
              borderColor: "divider",
              textAlign: "left",
              marginLeft: "20px",
              paddingTop: "20px",
              display: "flex",
              flexDirection: "row",
              overflowX: "scroll",
              overflowY: "hidden",
              height: "90px",
            }}
          >
            <div className={styles.logo_header}>
              <a href="/">
                <div>
                  <i>
                    <Logo height={60} />
                  </i>
                </div>
              </a>
            </div>
            <TabList
              onChange={handleChange}
              aria-label=""
              sx={{ display: "flex", paddingLeft: "20px", minWidth: "500px" }}
            >
              <Tab
                sx={{ padding: 0, width: "120px" }}
                label="Block"
                value="blocks"
              />
              <Tab
                sx={{ padding: 0, width: "120px" }}
                label="Transaction"
                value="transactions"
              />
              <Tab
                sx={{ padding: 0, width: "120px" }}
                label="Validator"
                value="validators"
              />
              <Tab
                sx={{ padding: 0, width: "120px" }}
                label="Governance"
                value="governances"
              />
            </TabList>
            <div style={{ flex: "1 1 0%" }}></div>
            <div className={styles.search}>
              <TextField
                label="height / transaction / validator"
                variant="outlined"
                fullWidth
                value={searchInput}
                onChange={handleChangeSearchInput}
                onKeyUp={(event) => {
                  if (event.key == "Enter") submitSearch();
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon onClick={() => submitSearch()} />
                    </IconButton>
                  ),
                }}
              />
            </div>
          </Box>
          <TabPanel value="blocks">{blocks()}</TabPanel>
          <TabPanel value="transactions">{transactions()}</TabPanel>
          <TabPanel value="validators">{validators()}</TabPanel>
          <TabPanel value="governances">{governances()}</TabPanel>
          <TabPanel value="blockDetail">{blockDetail()}</TabPanel>
          <TabPanel value="transactionDetail">{transactionDetail()}</TabPanel>
          <TabPanel value="validatorDetail">{validatorDetail()}</TabPanel>
        </TabContext>
      </Box>
    );
  }

  return <div>{tabs()}</div>;
};

export default HomePage;
