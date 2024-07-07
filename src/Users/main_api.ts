import { AccountController } from "./AccountController";
import { AccountRepositoryDatabase } from "./database/AccountRepository";
import { PgPromiseAdapter } from "./database/DatabaseConnection";
import { ExpressServer } from "./serverhttp";
import { GetAccount } from "./useCase/getAccount";
import { SignupUser } from "./useCase/signupUser";




const databaseConnection = new PgPromiseAdapter()
const accountRepository = new AccountRepositoryDatabase(databaseConnection)
const httpServer = new ExpressServer()
const signupUser = new SignupUser(accountRepository)
const getAccount = new GetAccount(accountRepository)
const accountController = new AccountController(httpServer, signupUser)