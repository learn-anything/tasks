import {
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionMessage,
  clusterApiUrl
} from "@solana/web3.js"
import * as multisig from "@sqds/multisig"
import { createLogger } from "vite"

async function main() {
  // create new multisig wallet with squads
  const creator = await generateFundedKeypair(createLocalhostConnection())

  const createKey = Keypair.generate()
  const [multisigPda] = multisig.getMultisigPda({
    createKey: createKey.publicKey
  })
}

await main()

export function createLocalhostConnection() {
  return new Connection(clusterApiUrl("devnet"), "confirmed")
}

export async function generateFundedKeypair(connection: Connection) {
  const keypair = Keypair.generate()

  const tx = await connection.requestAirdrop(
    keypair.publicKey,
    1 * LAMPORTS_PER_SOL
  )
  await connection.confirmTransaction(tx)

  return keypair
}
