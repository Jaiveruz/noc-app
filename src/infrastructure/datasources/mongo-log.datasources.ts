import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDataSource implements LogDataSource {
    
    async saveLog( log: LogEntity ): Promise<void> {
        const newLog = await LogModel.create(log);
        // await newLog.save();
        console.log('Mongo log created', newLog.id);
    };

    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {

        const logs = await LogModel.find({
            level: severityLevel
        })

        return logs.map( LogEntity.fromObject );
    };

}