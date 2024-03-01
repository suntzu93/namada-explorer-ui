import * as Const from "../utils/Cons";
import moment from "moment";
import {API_URL_GET_BLOCK_DETAIL} from "../utils/Cons";

export const blocks_columns = [
  {
    header: "Height",
    accessor: "height",
    numeric: false,
  },
  {
    header: "Hash",
    accessor: "hash",
    numeric: false,
  },
  {
    header: "TXS",
    accessor: "transactions_count",
    numeric: false,
  },
  {
    header: "Time",
    accessor: "time",
    numeric: false,
  },
  {
    header: "Moniker",
    accessor: "moniker",
    numeric: false,
  },
  {
    header: "Proposer",
    accessor: "proposer",
    numeric: false,
  },
];

export const transaction_columns = [
  {
    header: "Hash",
    accessor: "hash",
    numeric: false,
  },
  {
    header: "Fee",
    accessor: "fee_amount_per_gas_unit",
    numeric: false,
  },
  {
    header: "Tx type",
    accessor: "tx_type",
    numeric: false,
  },
  {
    header: "Time",
    accessor: "header_time",
    numeric: false,
  },
];

export const validator_columns = [
  {
    header: "Address",
    accessor: "address",
    numeric: false,
  },
  {
    header: "Moniker",
    accessor: "moniker",
    numeric: true,
  },
  {
    header: "Operator address",
    accessor: "operator_address",
    numeric: true,
  },
  {
    header: "Voting power",
    accessor: "voting_power",
    numeric: true,
  },
  {
    header: "Status",
    accessor: "status",
    numeric: true,
  },
];

export const proposal_columns = [
  {
    header: "Id",
    accessor: "id",
    numeric: true,
  },
  {
    header: "Kind",
    accessor: "kind",
    numeric: false,
  },
  {
    header: "Author",
    accessor: "author",
    numeric: false,
  },
  {
    header: "Epoch",
    accessor: "start_epoch",
    numeric: false,
  },
  {
    header: "Yes",
    accessor: "yay_votes",
    numeric: false,
  },
  {
    header: "No",
    accessor: "nay_votes",
    numeric: false,
  },
  {
    header: "Abstain",
    accessor: "abstain_votes",
    numeric: false,
  },
  {
    header: "Status",
    accessor: "result",
    numeric: false,
  },
];


export const formatHashString = (data) => {
  if (data == null) {
    return "...";
  }
  if (data.length < 30) {
    return data;
  }

  const fistSymbol = data.slice(0, 20);
  const endSymbol = data.slice(data.length - 20);
  return fistSymbol + " ... " + endSymbol;
};

export const formatString = (data) => {
  if (data == null) {
    return "...";
  }
  if (data.length < 20) {
    return data;
  }

  const fistSymbol = data.slice(0, 10);
  const endSymbol = data.slice(data.length - 10);
  return fistSymbol + " ... " + endSymbol;
};


export function convertTimeStringToMilisecond(dateStr) {
  let dateObject = new Date(dateStr);
  let timestamp = dateObject.getTime();
  return timestamp;
}

export function formatTimeToText(timestamp) {
  if (timestamp == 0) return "Didn't staked";
  const date = moment.duration(
    moment(new Date().getTime()).diff(moment(timestamp))
  );
  const day = date.days();
  const month = date.months();
  const year = date.years();
  const hour = date.hours();
  const minute = date.minutes();
  const second = date.seconds();

  if (year > 0) {
    if (year == 1) {
      return year + " year ago";
    } else {
      return year + " years ago";
    }
  } else if (month > 0) {
    if (month == 1) {
      return month + " month ago";
    } else {
      return month + " months ago";
    }
  } else if (day > 0) {
    if (day == 1) {
      return day + " day ago";
    } else {
      return day + " days ago";
    }
  } else if (hour > 0) {
    if (hour == 1) {
      return hour + " hour ago";
    } else {
      return hour + " hours ago";
    }
  } else if (minute > 0) {
    if (minute == 1) {
      return minute + " minute ago";
    } else {
      return minute + " minutes ago";
    }
  } else {
    if (second == 1) {
      return second + " second ago";
    } else {
      return second + " seconds ago";
    }
  }
}

async function fetchWithTimeout(resource, options, auth) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  let response;
  if (auth.length > 1) {
    response = await fetch(resource, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: auth,
      },
    });
  } else {
    response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
  }

  clearTimeout(id);
  return response;
}

export const getBlockDetail = async (block) => {
  const emptyData = {};
  try {
    let data = await fetchWithTimeout(
      Const.API_URL_GET_BLOCK_DETAIL + block,
      {
        method: "GET",
        timeout: 10000,
      },
      ""
    );
    data = await data.json();
    return data;
  } catch (e) {
    console.log("error to fetch block detail data " + e);
  }
  return emptyData;
};

export const getBlocks = async () => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data;
    data = await fetchWithTimeout(
      Const.API_URL_GET_BLOCKS,
      {
        method: "GET",
        timeout: 10000,
      },
      Const.AUTH
    );
    data = await data.json();
    return data.data;
  } catch (e) {
    console.log("error to fetch block data " + e);
  }
  return emptyData;
};

export const getNetworkStatus = async () => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data = await fetchWithTimeout(
      Const.RPC_STATUS,
      {
        method: "GET",
        timeout: 10000,
      },
      ""
    );
    data = await data.json();
    const networkStatus = {
      network: data.result.node_info.network,
      latestBlockHeight: data.result.sync_info.latest_block_height,
    };
    return networkStatus;
  } catch (e) {
    console.log("error to fetch network status data " + e);
  }
  return emptyData;
};

export const getActiveValidator = async () => {
  const emptyData = "0";
  try {
    let data = await fetchWithTimeout(
      Const.RPC_VALIDATOR,
      {
        method: "GET",
        timeout: 10000,
      },
      ""
    );
    data = await data.json();
    return data.result.total;
  } catch (e) {
    console.log("error to fetch validator data " + e);
  }
  return emptyData;
};

export const getTransactions = async () => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data;
    data = await fetchWithTimeout(
      Const.API_URL_GET_TRANSACTIONS + Const.FETCH_NUMBER,
      {
        method: "GET",
        timeout: 10000,
      },
      ""
    );
    data = await data.json();
    return data;
  } catch (e) {
    console.log("error to fetch transaction data " + e);
  }
  return emptyData;
};

export const getTransactionsDetail = async (searchInput) => {
  const emptyData = JSON.parse(`{}`);
  try {
    let data = await fetchWithTimeout(
      Const.API_URL_GET_TRANSACTION_DETAIL + searchInput,
      {
        method: "GET",
        timeout: 10000,
      },
      ""
    );
    data = await data.json();
    return data;
  } catch (e) {
    console.log("error to fetch transaction data " + e);
  }
  return emptyData;
};

export const getValidators = async () => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data;
    data = await fetchWithTimeout(
      Const.API_URL_GET_VALIDATORS,
      {
        method: "GET",
        timeout: 10000,
      },
      Const.AUTH
    );
    data = await data.json();
    return data.data.validators;
  } catch (e) {
    console.log("error to fetch transaction data " + e);
  }
  return emptyData;
};

export const getValidatorDetail = async (address) => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data;
    data = await fetchWithTimeout(
      Const.API_URL_GET_VALIDATOR_DETAIL + address,
      {
        method: "GET",
        timeout: 10000,
      },
      ""
    );
    data = await data.json();
    return data;
  } catch (e) {
    console.log("error to fetch transaction data " + e);
  }
  return emptyData;
};

export const getProposals = async () => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data;
    data = await fetchWithTimeout(
      Const.API_PROPOSAL,
      {
        method: "GET",
        timeout: 10000,
      },
      ""
    );
    data = await data.json();
    return data?.proposals;
  } catch (e) {
    console.log("error to fetch proposals " + e);
  }
  return emptyData;
};
