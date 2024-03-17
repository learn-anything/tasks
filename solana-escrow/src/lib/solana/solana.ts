import { Connection } from "@solana/web3.js"

let _solana: Connection | undefined
export const getSolana = () => {
  if (_solana) return _solana
  _solana = new Connection("https://api.devnet.solana.com")
  return _solana
}
