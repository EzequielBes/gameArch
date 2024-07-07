import { Account } from "../entity/CreateUser"
import { DatabaseConnection } from "./DatabaseConnection"

export interface AccountRepository {

    getAccountByEmail(email:string):Promise<any>
    getAccountById(accountId):Promise<any>
    saveAccount(account:Account):Promise<void>
}

export class AccountRepositoryDatabase  implements AccountRepository {
    
    constructor (
        readonly connection : DatabaseConnection
    ) {}


    async getAccountByEmail(email: string): Promise<any> {
        const [accountData] = await this.connection.query("select * from user where email = $1", [email]) 
        if (!accountData) return;
        return  accountData.restore(accountData.accountId, accountData.name, accountData.email, accountData.username)
    }
    async getAccountById(accountId: any): Promise<any> {
        const [accountData] = await this.connection.query("select * from user where accountId = $1", [accountId])
    }
    async saveAccount(account: Account): Promise<void> {
        await this.connection.query("insert into public.user (accountId, name, email, password, username) values ($1, $2, $3, $4, $5)", [account.accountId, account.name, account.email, account.password, account.username])
    }

    
}