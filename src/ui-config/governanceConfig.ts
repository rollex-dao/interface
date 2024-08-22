import { ChainId } from '@pollum-io/contract-helpers';

export interface GovernanceConfig {
  chainId: ChainId;
  walletBalanceProvider: string;
  votingAssetName: string;
  averageNetworkBlockTime: number;
  queryGovernanceDataUrl: string;
  wsGovernanceDataUrl: string;
  aaveTokenAddress: string;
  aAaveTokenAddress: string;
  stkAaveTokenAddress: string;
  governanceForumLink: string;
  governanceSnapshotLink: string;
  governanceFAQLink: string;
  addresses: {
    PEGASYS_GOVERNANCE_V2: string;
    PEGASYS_GOVERNANCE_V2_EXECUTOR_SHORT: string;
    PEGASYS_GOVERNANCE_V2_EXECUTOR_LONG: string;
    PEGASYS_GOVERNANCE_V2_HELPER: string;
  };
  ipfsGateway: string;
  fallbackIpfsGateway: string;
}

export const governanceConfig: GovernanceConfig = {
  chainId: 570 as ChainId,
  votingAssetName: 'AAVE + stkAAVE',
  averageNetworkBlockTime: 13.5,
  queryGovernanceDataUrl: 'https://rollux.graph.pegasys.fi/subgraphs/name/pollum-io/rex-governance',
  wsGovernanceDataUrl: 'wss://api.thegraph.com/subgraphs/name/aave/governance-v2',
  aaveTokenAddress: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
  aAaveTokenAddress: '0xDa5E8e1C3596D3Cc11a4dd5aD66b8f03B5410F8C',
  stkAaveTokenAddress: '0x4da27a545c0c5b758a6ba100e3a049001de870f5',
  governanceForumLink: 'https://governance.aave.com',
  governanceFAQLink: 'https://docs.aave.com/faq/governance',
  walletBalanceProvider: '0x8E8dAd5409E0263a51C0aB5055dA66Be28cFF922',
  governanceSnapshotLink: 'https://snapshot.org/#/aave.eth',
  addresses: {
    PEGASYS_GOVERNANCE_V2: '0x46177D5023f5b374bB42af4742Af4B86175E43E5',
    PEGASYS_GOVERNANCE_V2_EXECUTOR_SHORT: '0xF06674e8F1C81aAdA237BA96714B2305adE996A9',
    PEGASYS_GOVERNANCE_V2_EXECUTOR_LONG: '0xF06674e8F1C81aAdA237BA96714B2305adE996A9',
    PEGASYS_GOVERNANCE_V2_HELPER: '0x7E97595c9b112c038Cbee972a5B944F99035FaE3',
  },
  ipfsGateway: 'https://cloudflare-ipfs.com/ipfs',
  fallbackIpfsGateway: 'https://ipfs.io/ipfs',
};
