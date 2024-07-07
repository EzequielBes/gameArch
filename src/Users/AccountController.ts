import { HttpServer } from "./serverhttp";

export class AccountController {

    constructor (readonly connection:HttpServer, readonly signup: any ) {

        connection.register("post", "/signup", async function (params:any, body:any) {
            const output = await signup.execute(body)
            return output
        })

       /* connection.register("get", "/signin", async function (params:any, body:any) {
            const output =  getAccount.execute(body)
            return output
        })
            */
    }
}