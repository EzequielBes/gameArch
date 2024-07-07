import { AccountRepository } from "../database/AccountRepository";
import { Account } from "../entity/CreateUser";

export class SignupUser {

    constructor (readonly database: AccountRepository) {}

    async execute(input:any) {
        const exitsAccount = await this.database.getAccountByEmail(input.email)
        if(exitsAccount) throw new Error("Account already exists")
        const account = Account.create(input.name, input.email,  input.password, input.username)
        await this.database.saveAccount(account)
        return "User created"
    }
}