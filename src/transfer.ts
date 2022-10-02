// import {
//     Config,
//     setup
// } from './index';
import { config } from 'dotenv'; config();

const Transfer = async () => {

}

(async () => {
    const Result = await Transfer();
    console.log(Result);
    process.exit(0);
    
})().catch(e => {
    console.error(e);
    process.exit(1);
})