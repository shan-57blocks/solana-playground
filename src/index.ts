import 'dotenv/config';

import solanaWeb3, { PublicKey, clusterApiUrl } from '@solana/web3.js';
import { struct, u32, u8 } from '@solana/buffer-layout';
import { bool, publicKey, u64 } from '@solana/buffer-layout-utils';

// Defining RawMint from https://github.com/solana-labs/solana-program-library/blob/48fbb5b7c49ea35848442bba470b89331dea2b2b/token/js/src/state/mint.ts#L31 //
export interface RawMint {
  mintAuthorityOption: 1 | 0;
  mintAuthority: PublicKey;
  supply: bigint;
  decimals: number;
  isInitialized: boolean;
  freezeAuthorityOption: 1 | 0;
  freezeAuthority: PublicKey;
}

// Defining Buffer Layout from https://github.com/solana-labs/solana-program-library/blob/48fbb5b7c49ea35848442bba470b89331dea2b2b/token/js/src/state/mint.ts#L31 //

/** Buffer layout for de/serializing a mint */
export const MintLayout = struct<RawMint>([
  u32('mintAuthorityOption'),
  publicKey('mintAuthority'),
  u64('supply'),
  u8('decimals'),
  bool('isInitialized'),
  u32('freezeAuthorityOption'),
  publicKey('freezeAuthority')
]);

(async () => {
  const publicKey = new solanaWeb3.PublicKey(
    '6MWfAt3S9Xu4ybxxgPm6e4LSwuXfyAwGXd5yfUqpox9K'
  );
  const connection = new solanaWeb3.Connection(
    clusterApiUrl('mainnet-beta'),
    'confirmed'
  );

  const accountInfo = await connection.getAccountInfo(publicKey, 'confirmed');
  const data = accountInfo.data;
  const deserialize = MintLayout.decode(data);

  // Breaking down the response //
  console.log(deserialize.mintAuthorityOption);
  console.log(deserialize.mintAuthority.toString());
  console.log(deserialize.decimals);
  console.log(deserialize.isInitialized);
  console.log(deserialize.freezeAuthorityOption);
  console.log(deserialize.freezeAuthority.toString);
})();

// (async () => {
//   const publicKey = new solanaWeb3.PublicKey(
//     '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'
//   );
//   const solanaConnection = new solanaWeb3.Connection(
//     'https://api.mainnet-beta.solana.com/ae3d9724282bb030ca780b19f9b3746eed108b89/',
//     {
//       wsEndpoint:
//         'wss://api.mainnet-beta.solana.com/ae3d9724282bb030ca780b19f9b3746eed108b89/'
//     }
//   );

//   // 打印连接状态
//   console.log('Connected to cluster:', solanaConnection.rpcEndpoint);
//   console.log('Public key to monitor:', publicKey.toBase58());

//   solanaConnection.onAccountChange(
//     publicKey,
//     (updatedAccountInfo, context) => {
//       console.log('Updated account info: ', updatedAccountInfo.data.toString());
//     },
//     'finalized'
//   );
// })();
