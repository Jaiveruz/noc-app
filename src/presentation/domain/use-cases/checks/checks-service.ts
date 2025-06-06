
interface CheckoServiceUseCase {
    execute( url: string ): Promise<boolean>;
}


type SuccessCallBAck = () => void;
type ErrorCallBack = ( error: string ) => void;

export class CheckService implements CheckoServiceUseCase {

    constructor(
        private readonly sucessCallback: SuccessCallBAck,
        private readonly errorCallback: ErrorCallBack
    ) {
        
    }


    public async execute( url: string ): Promise<boolean> {
        
        try {
            const req = await fetch(url);
            if ( !req.ok ) {
                throw new Error(`Error on check service ${url}`);
            }

            this.sucessCallback();
            console.log(`${url} is up and running!`);
            return true;

        } catch (error) {
            this.errorCallback(`${error}`);
            console.error(`${error}`);
            return false;
        }

    }

}
