
import { AccountRepositoryDatabase } from '../src/Users/database/AccountRepository';


import {describe, expect, test} from '@jest/globals';
import { PgPromiseAdapter } from '../src/Users/database/DatabaseConnection';
import { SignupUser } from '../src/Users/useCase/signupUser';


 test("Deve Criar usuario",  async function () {
    
    const connection = new PgPromiseAdapter()
    const userDatabase = new AccountRepositoryDatabase(connection)
    const user = new SignupUser(userDatabase)
    
    
    
    const input = {
        name: "comes",
        email: "besbes@gmail.com",
        password: "ZeroQuatro@4",
        username: "ocolouco"
    }
   const output = await user.execute(input)
    expect(output).toBe("User created")
    
})

test("Deve Tentar criar usuario e retornar usuario ja existe",  async function () {
    
    const connection = new PgPromiseAdapter()
    const userDatabase = new AccountRepositoryDatabase(connection)
    const user = new SignupUser(userDatabase)
    
    
    
    const input = {
        name: "terrrte",
        email: "rerer@gmail.com",
        password: "ZeroQuatro@4",
        username: "ocolouco"
    }
    
    expect(async () =>{await user.execute(input)}).rejects.toThrow(new Error("Account already exists"))
    
})

