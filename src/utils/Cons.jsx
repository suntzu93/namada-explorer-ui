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

export const RPC_URL = "https://rpc-namada.theamsolutions.info";
export const RPC_STATUS = RPC_URL + "/status";
export const RPC_VALIDATOR = RPC_URL + "/validators"
export const DECIMAL_NAAN = 1000000;

export const API_PROPOSAL = "https://it.api.namada.red/api/v1/chain/governance/proposals"

export const TIME_RELOAD = 15000;
export default API_URL;
