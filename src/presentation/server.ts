import { LogsRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { FileSystemDataSource } from "../infrastructure/datasources/file-sistem.datasources";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogsRepositoryImpl(
    new FileSystemDataSource(),
);

const emailService = new EmailService();

export class Server {

    public static start() {


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

        // CronService.createJob(
        //     '*/5 * * * * *', // Every hour
        //     () => {
        //         // new CheckService().execute('https://google.com')
        //         const url = 'https://google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log('Servicio activo!'),
        //             (error) => console.error(`Servicio inactivo: ${error}`),
        //         ).execute( url )
        //     }
        // );
       
    }
}