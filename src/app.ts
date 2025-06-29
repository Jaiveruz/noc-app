import { Server } from "./presentation/server"
import { LogModel, MongoDatabase } from './data/mongo';
import { envs } from "./config/plugins/envs.plugins";

(  async() => {
    main();
})()


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    Server.start();
}