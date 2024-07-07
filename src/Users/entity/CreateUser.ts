import { Email } from "../valueObjects/email";
import { Name } from "../valueObjects/name";
import { Password } from "../valueObjects/password";
import { Username } from "../valueObjects/username";

import crypto from "crypto"

export class Account {

    private constructor (
        readonly accountId : string,
        readonly name: Name,
        readonly email: Email,
        readonly password: Password,
        readonly username: Username
        
    ) {}

    static create(name:string, email:string, password:string, username:string) {
        const accountId = crypto.randomUUID();
        console.log(name, email, password, username)
        return new Account(accountId, new Name(name), new Email(email), new Password(password), new Username(username))
    }

    static restore(accountId:string, name: string, email:string, password:string, username:string) {
        return new Account(accountId, new Name(name), new Email(email), new Password(password), new Username(username))
    }

    getName() {
        this.name.getValue();
    }
    getEmail() {
        this.email.getValue();
    }
    getPassword() {
        this.password.getValue()
    }
    getUsername() {
        this.username.getValue()
    }
    
}