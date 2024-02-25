export const API_URL = "https://namada-explorer-api.stakepool.dev.br/node/";
export const API_URL_GET_BLOCKS = API_URL + "blocks/list/";
export const FETCH_NUMBER = 20;
export const API_URL_GET_BLOCK_DETAIL = API_URL + "blocks/block/";
export const API_URL_GET_BLOCKS_TRANSACTION =
  API_URL + "blocks/block/%s1/transactions";
export const API_URL_GET_BLOCKS_SIGNATURES =
    API_URL + "blocks/block/%s1/signatures";
export const API_URL_GET_TRANSACTIONS = API_URL + "transactions/list/";
export const API_URL_GET_TRANSACTION_DETAIL =
  API_URL + "transactions/transaction/";
export const API_URL_GET_VALIDATORS = API_URL + "validators/list";
export const API_URL_GET_VALIDATOR_DETAIL = API_URL + "validators/validator/";

export const RPC_URL = "https://namada-rpc.rpc-node.xyz";
export const RPC_STATUS = RPC_URL + "/status";
export const RPC_VALIDATOR = RPC_URL + "/validators"
export const DECIMAL_NAAN = 1000000;
export const SATOSHI_BITCOIN = 100000000;
export const NETWORK_MAINNET = "mainnet";
export const DEFAULT_NETWORK = NETWORK_MAINNET;

export const TIME_RELOAD = 15000;


export const TIME_LOCK_DEAUTHORIZATION = 45 * 24 * 60 * 60; //45 days

export const GROUP_LIFE_TIME = 259200; //~30days
export default API_URL;
