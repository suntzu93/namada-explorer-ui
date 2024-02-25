import * as Const from "./Cons";

const getEtherScanLink = () => {
    return Const.DEFAULT_NETWORK === Const.NETWORK_MAINNET ? "https://etherscan.io" : "https://goerli.etherscan.io"
}

export const getEtherAddressLink = () => {
    return getEtherScanLink() + "/address/"
}

export const getEtherTxHashLink = () => {
    return getEtherScanLink() + "/tx/"
}

export const getEtherBlockLink = () => {
    return getEtherScanLink() + "/block/"
}

export const getDomain = () => {
    return "http://localhost:4001"
}

export const getBlockStreamInfo = () => {
    if (Const.DEFAULT_NETWORK == Const.NETWORK_MAINNET) {
        return "https://blockstream.info/tx/"
    } else {
        return "https://blockstream.info/testnet/tx/"
    }
}

export function getGroupState(group,currentBlock) {
    //259_200 is group life time, ~30 days assuming 15s block time
    if (group?.terminated || parseInt(group?.createdAtBlock) + Const.GROUP_LIFE_TIME < currentBlock) {
        return "Inactive"
    } else {
        return "Active"
    }
}

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}