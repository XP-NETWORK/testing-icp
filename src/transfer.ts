import { Config, setup } from "./index";
import { NftInfo } from "xp.network";
import { DfinityNft } from "xp.network/dist/helpers/dfinity/dfinity";
import { config } from "dotenv";
config();

const Transfer = async (
  to: string,
  nft: NftInfo<DfinityNft>,
  _mintWith: string,
): Promise<any> => {
  const {
    dfinity,
    wallet,
    bsc,
    factory,
  } = await setup();

  const transfer = await factory.transferNft(
    dfinity,
    bsc,
    nft,
    wallet,
    to,
  );
  return transfer;
};

(async () => {
  // Destination Address
  const to: string = Config.dfinity.to!;

  // Selected NFT
  const nft = {
    uri: Config.dfinity.url,
    native: {
      canisterId: Config.dfinity.umt,
      tokenId: Config.dfinity.tokenId,
    },
    collectionIdent: Config.dfinity.umt,
  } as NftInfo<DfinityNft>;

  // Destination contract address to mint with
  const mintWith: string = Config.dfinity.mintWith!;

  const Result = await Transfer(to, nft, mintWith);
  console.log(Result);
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
