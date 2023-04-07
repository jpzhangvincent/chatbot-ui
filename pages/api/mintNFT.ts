import { config as loadEnv } from 'dotenv';
import { SDK, Auth, Metadata, TEMPLATES } from '@infura/sdk';

loadEnv();

export const config = {
    runtime: 'edge',
  };

  const handler = async (req: Request): Promise<Response> => {
    const { name, description, prompt, contractAddress } = await req.json()

    try {
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

        // const contractAddress = '0xDA7358Ba86b51A6C7FE7033F9400F0fdFa356c5d'

        const contract = await sdk.loadContract({
         template: TEMPLATES.ERC721Mintable,
         contractAddress
        })

        // CREATE Token Metadata
        const tokenMetadata = Metadata.openSeaTokenLevelStandard({
            name: `${name}`,
            description: `${description}`,
            external_url: '',
            image: '',
            attributes: [{
                "trait_type": "Prompt", 
                "value": `${prompt}`
              }],
        });
  

        // mint a NFT
        const mint = await contract.mint({
            publicAddress: process.env.WALLET_PUBLIC_ADDRESS ?? '0x3bE0Ec232d2D9B3912dE6f1ff941CB499db4eCe7',
            tokenURI: tokenMetadata,
        });
  
        const minted = await mint.wait();
        console.log(minted)
      return new Response(minted, { status: 200 })
    } catch (error) {
      console.error(error);
      return new Response('Error', { status: 500 });
    }
  };
  
  export default handler;
  