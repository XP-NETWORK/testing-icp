import {
    Config,
    setup
} from './index';
import { config } from 'dotenv'; config();

const Mint = async (uri:string) => {

    //@ts-ignore
    const { dfinity, wallet } = await setup();

    const mintingResult = await dfinity.mintNft(
        //@ts-ignore
        wallet,
        {
            canisterId: Config.dfinity.umt,
            uri
        }
    );

    return mintingResult;
}

(async () => {
    const Result = await Mint("https://meta.polkamon.com/meta?id=10001419693");
    console.log(Result);
    process.exit(0);
    
})().catch(e => {
    console.error(e);
    process.exit(1);
})