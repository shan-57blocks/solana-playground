import 'dotenv/config';

import solanaWeb3, { clusterApiUrl } from '@solana/web3.js';

(async () => {
  const publicKey = new solanaWeb3.PublicKey(
    '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'
  );
  const connection = new solanaWeb3.Connection(
    clusterApiUrl('mainnet-beta'),
    'confirmed'
  );

  const accountInfo = await connection.getAccountInfo(publicKey, 'confirmed');
  const data = accountInfo.data;
  const decodedData = data.toString('utf-8');

  // Print the decoded data
  console.log('Decoded Account Data:', decodedData);
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
