import {
    HttpAgent,
    Identity,
} from "@dfinity/agent";
import { Secp256k1KeyIdentity } from '@dfinity/identity';
import {
    ChainFactoryConfigs,
    ChainFactory,
    AppConfigs,
    Chain,
} from "xp.network";
import { config } from 'dotenv'; config();

export const Config = {
    dfinity: {
        host: process.env.DFINITY_HOST!,
        bridge: process.env.DFINITY_BRIDGE!,
        xpnft: process.env.DFINITY_XPNFT!,
        umt: process.env.DFINITY_UMT!,
        wallet: process.env.DFINITY_WALLET!,
    }
}

/**
 * A common for all the tasks setup process
 * @returns factory, dfinity, wallet, agent, status objects
 */
export const setup = async () => {

    // Chain agnostic factory
    const factory = ChainFactory(AppConfigs.TestNet(), await ChainFactoryConfigs.TestNet());

    // Chain handler
    const dfinity = await factory.inner(Chain.DFINITY);

    // Generating a signer object
    const wallet: Identity = Secp256k1KeyIdentity.fromSecretKey(
        Buffer.from(Config.dfinity.wallet, 'hex')
    );

    // Generating an Agent for interaction with the chain
    const agent = new HttpAgent({
        host: Config.dfinity.host!,
        fetch,
    });

    // Check whether the connection has been established
    const status = await agent.status().catch((e) => {
        console.log(`Failed to connect to Dfinity network: ${e}`);
        return undefined;
    });

    return {
        factory,
        dfinity,
        wallet,
        agent,
        status,
    }
    
}

// Testing the functionality of setup
// (async () => {

//     const {
//         wallet,
//         agent,
//         status,
//     } = await setup();

//     console.log("wallet:", wallet);
//     console.log("agent:", agent);
//     console.log("status:", status);
    

//     process.exit(0);
// })().catch(e => {
//     console.error(e);
//     process.exit(1);
// });