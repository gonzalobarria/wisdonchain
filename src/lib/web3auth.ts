import { tssLib } from "@toruslabs/tss-dkls-lib"
import { CHAIN_NAMESPACES } from "@web3auth/base"
import { EthereumSigningProvider } from "@web3auth/ethereum-mpc-provider"
import { WEB3AUTH_NETWORK } from "@web3auth/mpc-core-kit"


export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xafa",
  rpcTarget: "https://rpc-holesky.morphl2.io",
  displayName: "Morph Holesky",
  blockExplorerUrl: "https://explorer-holesky.morphl2.io/",
  ticker: "ETH",
  tickerName: "ETH",
  logo: "https://morphl2brand.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffcab2c10-8da9-4414-aa63-4998ddf62e78%2F64fbcffc-0e7c-45e1-8900-1bb36dc90924%2FFrame_1597882262.png?table=block&id=0e6a22c3-ed4e-4c25-9575-11b95b1eade9&spaceId=fcab2c10-8da9-4414-aa63-4998ddf62e78&width=2000&userId=&cache=v2",
}

export const web3AuthConfig = {
  web3AuthClientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
  web3AuthNetwork: WEB3AUTH_NETWORK.DEVNET,
  manualSync: true,
  tssLib,
}

export let evmProvider = new EthereumSigningProvider({
  config: { chainConfig },
})
