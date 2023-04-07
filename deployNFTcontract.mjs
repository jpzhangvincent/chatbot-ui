import { config as loadEnv } from 'dotenv';
import { SDK, Auth, TEMPLATES } from '@infura/sdk';

loadEnv();

const auth = new Auth({
    projectId: process.env.INFURA_API_KEY,
    secretId: process.env.INFURA_API_KEY_SECRET,
    privateKey: process.env.WALLET_PRIVATE_KEY,
    rpcUrl: process.env.RPC_URL,
    chainId: 80001, // Mumbai
    ipfs: {
      projectId: process.env.INFURA_IPFS_PROJECT_ID,
      apiKeySecret: process.env.INFURA_IPFS_PROJECT_SECRET,
    }
  });

  const sdk = new SDK(auth);

  const newContract = await sdk.deploy({
    template: TEMPLATES.ERC721Mintable,
    params: {
      name: 'Prompt NFT contract',
      symbol: 'PGPT',
      contractURI: 'https://link-to-public-hosted-metadata.json',
    },
  });

 console.log(`Contract address is: ${newContract.contractAddress}`); //0xDA7358Ba86b51A6C7FE7033F9400F0fdFa356c5d