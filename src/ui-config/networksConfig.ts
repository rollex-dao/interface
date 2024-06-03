// import { ChainId } from '@pollum-io/contract-helpers';

export type ExplorerLinkBuilderProps = {
  tx?: string;
  address?: string;
};

export type ExplorerLinkBuilderConfig = {
  baseUrl: string;
  addressPrefix?: string;
  txPrefix?: string;
};

export type NetworkConfig = {
  name: string;
  displayName?: string;
  privateJsonRPCUrl?: string; // private rpc will be used for rpc queries inside the client. normally has private api key and better rate
  privateJsonRPCWSUrl?: string;
  publicJsonRPCUrl: readonly string[]; // public rpc used if not private found, and used to add specific network to wallets if user don't have them. Normally with slow rates
  publicJsonRPCWSUrl?: string;
  // protocolDataUrl: string;
  // https://github.com/aave/aave-api
  ratesHistoryApiUrl?: string;
  // cachingServerUrl?: string;
  // cachingWSServerUrl?: string;
  baseUniswapAdapter?: string;
  /**
   * When this is set withdrawals will automatically be unwrapped
   */
  wrappedBaseAssetSymbol: string;
  baseAssetSymbol: string;
  // needed for configuring the chain on metemask when it doesn't exist yet
  baseAssetDecimals: number;
  // usdMarket?: boolean;
  // function returning a link to etherscan et al
  explorerLink: string;
  explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string;
  // set this to show faucets and similar
  isTestnet?: boolean;
  // get's automatically populated on fork networks
  isFork?: boolean;
  networkLogoPath: string;
  // contains the forked off chainId
  underlyingChainId?: number;
  bridge?: {
    icon: string;
    name: string;
    url: string;
  };
};

export type BaseNetworkConfig = Omit<NetworkConfig, 'explorerLinkBuilder'>;

// const ratesHistoryApiUrl = `${process.env.NEXT_PUBLIC_API_BASEURL}/data/rates-history`;

export const networkConfigs: Record<string, BaseNetworkConfig> = {
  // [ChainId.sepolia]: {
  //   name: 'Ethereum Sepolia',
  //   privateJsonRPCUrl: 'https://eth-sepolia.g.alchemy.com/v2/VAfNJrTN-TopQjFDwcdLeeDOLDiFQcBP',
  //   publicJsonRPCUrl: [
  //     'https://eth-sepolia.public.blastapi.io',
  //     'https://rpc.sepolia.org',
  //     'https://rpc2.sepolia.org',
  //     'https://rpc.sepolia.online',
  //     'https://www.sepoliarpc.space',
  //   ],
  //   // publicJsonRPCWSUrl: 'wss://eth-goerli.public.blastapi.io',
  //   // protocolDataUrl: '',
  //   baseUniswapAdapter: '0x0',
  //   baseAssetSymbol: 'ETH',
  //   wrappedBaseAssetSymbol: 'WETH',
  //   baseAssetDecimals: 18,
  //   explorerLink: 'https://sepolia.etherscan.io',
  //   // usdMarket: true,
  //   isTestnet: true,
  //   networkLogoPath: '/icons/networks/ethereum.svg',
  // },
  // [ChainId.mainnet]: {
  //   name: 'Ethereum',
  //   privateJsonRPCUrl: 'https://eth-mainnet.rpc.grove.city/v1/62b3314e123e6f00397f19ca',
  //   publicJsonRPCUrl: [
  //     'https://rpc.ankr.com/eth',
  //     'https://rpc.flashbots.net',
  //     'https://eth-mainnet.public.blastapi.io',
  //     'https://cloudflare-eth.com/v1/mainnet',
  //   ],
  //   publicJsonRPCWSUrl: 'wss://eth-mainnet.alchemyapi.io/v2/demo',
  //   // cachingServerUrl: 'https://cache-api-1.aave.com/graphql',
  //   // cachingWSServerUrl: 'wss://cache-api-1.aave.com/graphql',
  //   // protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
  //   baseUniswapAdapter: '0xc3efa200a60883a96ffe3d5b492b121d6e9a1f3f',
  //   baseAssetSymbol: 'ETH',
  //   wrappedBaseAssetSymbol: 'WETH',
  //   baseAssetDecimals: 18,
  //   explorerLink: 'https://etherscan.io',
  //   ratesHistoryApiUrl,
  //   networkLogoPath: '/icons/networks/ethereum.svg',
  // },
  // [570]: {
  //   name: 'Rollux',
  //   privateJsonRPCUrl: 'https://rpc.rollux.com/',
  //   publicJsonRPCUrl: [
  //     'https://rpc.rollux.com',
  //   ],
  //   publicJsonRPCWSUrl: 'wss://rpc.rollux.com/wss',
  //   // cachingServerUrl: 'https://cache-api-1.aave.com/graphql',
  //   // cachingWSServerUrl: 'wss://cache-api-1.aave.com/graphql',
  //   // protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
  //   baseUniswapAdapter: '0x0',
  //   baseAssetSymbol: 'SYS',
  //   wrappedBaseAssetSymbol: 'WSYS',
  //   baseAssetDecimals: 18,
  //   explorerLink: 'https://explorer.rollux.com/',
  //   // ratesHistoryApiUrl,
  //   networkLogoPath: '/icons/networks/ethereum.svg',
  // },
  [570]: {
    name: 'Rollux',
    privateJsonRPCUrl: 'https://rpc.rollux.com/',
    publicJsonRPCUrl: ['https://rpc.rollux.com/'],
    // publicJsonRPCWSUrl: 'wss://eth-goerli.public.blastapi.io',
    // protocolDataUrl: '',
    baseUniswapAdapter: '0x0',
    baseAssetSymbol: 'SYS',
    wrappedBaseAssetSymbol: 'SYS',
    baseAssetDecimals: 18,
    explorerLink: 'https://explorer.rollux.com/',
    // usdMarket: true,
    // isTestnet: true,
    networkLogoPath: '/icons/networks/base.svg',
  },
} as const;
