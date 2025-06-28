import { LogsRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { FileSystemDataSource } from "../infrastructure/datasources/file-sistem.datasources";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/checks-service";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasources";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckServiceMultiple } from "../domain/use-cases/checks/checks-service-multiple";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasources";


const fsLogRepository = new LogsRepositoryImpl(
  new FileSystemDataSource(),
);

const mongoLogRepository = new LogsRepositoryImpl(
  new MongoLogDataSource(),
);

const postgresLogRepository = new LogsRepositoryImpl(
  new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {

    public static async start() {


        console.log('Server started...')

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['jaiver.uz2@gmail.com']
        // )
        // emailService.sendEmailTithFileSystemLogs(
        //     ['jaiver.uz2@gmail.com']
        // );

        // const logs = await LogRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);

        CronService.createJob(
            '*/5 * * * * *', // Every hour
            () => {
                // new CheckService().execute('https://google.com')
                const url = 'https://menssajero.com';
                new CheckServiceMultiple(
                    [ fsLogRepository, mongoLogRepository, postgresLogRepository ],
                    () => console.log('Servicio activo!'),
                    (error) => console.error(`Servicio inactivo: ${error}`),
                ).execute( url )
            }
        );
       
    }
}