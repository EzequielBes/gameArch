import { SignupUser } from './../src/Users/useCase/signupUser';
import { AccountRepositoryDatabase } from '../src/Users/database/AccountRepository';
import { PgPromiseAdapter } from '../src/Users/database/DatabaseConnection';
import { AccountController } from './../src/Users/AccountController';
import { ExpressServer, HttpServer } from './../src/Users/serverhttp';

import {describe, expect, test} from '@jest/globals';


test("Deve Criar usuario",  function () {
    const port = 3333
    const server = new ExpressServer()
    server.listen(port)
    const pgAdapter = new PgPromiseAdapter()
    const accountRepository = new AccountRepositoryDatabase(pgAdapter)
    const signup =  new SignupUser(accountRepository)
    const accountController = new AccountController(server, signup)

    const input = {
        name: "Ezequiel",
        email: "ezequieltbeserra@gmail.com",
        password: "ZeroQuatro@",
        username: "MachoMyers"
    }

    const result = signup.execute(input)
  
    expect(result).toBe("User created")


    
})