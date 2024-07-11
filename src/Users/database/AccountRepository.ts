import { Account } from "../entity/CreateUser"
import { DatabaseConnection } from "./DatabaseConnection"

export interface AccountRepository {

    getAccountByEmail(email:string):Promise<any>
    getAccountById(accountId):Promise<any>
    saveAccount(account):Promise<any>
}

export class AccountRepositoryDatabase  implements AccountRepository {
    
    constructor (
        readonly connection : DatabaseConnection
    ) {}


    async getAccountByEmail(email: string): Promise<any> {
        
        const [accountData] = await this.connection.query('SELECT * FROM "user" WHERE email = $1', [email]) 
        if (!accountData) return;
        return  Account.restore(accountData.accountId, accountData.name, accountData.email,accountData.password, accountData.username)
    }
    async getAccountById(accountId: any): Promise<any> {
        const [accountData] = await this.connection.query('SELECT * FROM "user" WHERE accountId = $1', [accountId])
    }
    async saveAccount(account): Promise<any> {
       await this.connection.query('INSERT INTO "user" (account_id, name, email, password, username, created_at, updated_at) VALUES ( $1, $2, $3, $4, $5, $6, $7 )', [account.accountId, account.name.value, account.email.value, account.password.value, account.username.username, new Date(), new Date()])
    }

    
}