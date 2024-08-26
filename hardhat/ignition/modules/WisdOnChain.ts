import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WisdOnChainModule = buildModule("WisdOnChainModule", (m) => {
  const wisdonchain = m.contract("WisdOnChain");

  return { wisdonchain };
});

export default WisdOnChainModule;
