import { CronService } from "./cron/cron-service"
import { CheckService } from "./domain/use-cases/checks/checks-service";


export class Server {

    public static start() {


        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *', // Every hour
            () => {
                // new CheckService().execute('https://google.com')
                new CheckService(
                    () => console.log('Check service executed successfully!'),
                    (error) => console.error(`Check service failed: ${error}`),
                ).execute('http://localhost:3000')
            }
        );
       
    }
}