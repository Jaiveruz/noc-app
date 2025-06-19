import { CronService } from "./cron/cron-service"
import { CheckService } from "../domain/use-cases/checks/checks-service";
import { LogsRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { FileSystemDataSource } from "../infrastructure/datasources/file-sistem.datasources";

const fileSystemLogRepository = new LogsRepositoryImpl(
    new FileSystemDataSource(),
);

export class Server {

    public static start() {


        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *', // Every hour
            () => {
                // new CheckService().execute('https://google.com')
                const url = 'https://menssajero.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log('Servicio activo!'),
                    (error) => console.error(`Servicio inactivo: ${error}`),
                ).execute( url )
            }
        );
       
    }
}