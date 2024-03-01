export const API_URL = "https://api.nodejom.xyz/";
export const AUTH = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcwODQzNjMsImV4cCI6MTcxNzQ1MjM2M30.4Fk2-GpkRKK7SiTN4AgpmLUWUGTidBDYcIe-U_tacaE";

export const API_URL_GET_BLOCKS = API_URL + "blocks";
export const FETCH_NUMBER = 20;
export const INDEXER_API = "https://namada-indexer.rpc-node.xyz";
export const API_URL_GET_BLOCK_DETAIL = INDEXER_API + "/block/height/";
export const API_URL_GET_TRANSACTION_DETAIL = INDEXER_API + "/tx/";
export const API_URL_GET_TRANSACTIONS = API_URL + "transactions/list/";
export const API_URL_GET_VALIDATORS = API_URL + "validators";
export const API_URL_GET_VALIDATOR_DETAIL = API_URL + "validators/validator/";

export const RPC_URL = "https://rpc-namada.theamsolutions.info";
export const RPC_STATUS = RPC_URL + "/status";
export const RPC_VALIDATOR = RPC_URL + "/validators"
export const DECIMAL_NAAN = 1000000;

export const API_PROPOSAL = "https://it.api.namada.red/api/v1/chain/governance/proposals"

export const TIME_RELOAD = 15000;
export default API_URL;
