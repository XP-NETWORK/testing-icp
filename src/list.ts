import {
    setup
} from './index';
import { config } from 'dotenv'; config();

const List = async () => {

    const {
        dfinity,
        factory,
        wallet
    } = await setup();

    const result = await factory.nftList(
        dfinity,
        wallet.getPrincipal().toString()
    );

    return result;

}

(async () => {
    const Result = await List();
    console.log("Found NFTs:", Result);
    process.exit(0);
    
})().catch(e => {
    console.error(e);
    process.exit(1);
})