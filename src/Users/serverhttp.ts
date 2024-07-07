import express, { Request, Response } from 'express'

export interface HttpServer {
    register(method:any, url:string, callBack:Function):void
    listen(port:number):void
}

export class ExpressServer implements HttpServer {
    app
    constructor() {
        this.app = express()
        this.app.use(express.json())
    }
    register(method: any, url: string, callBack: Function): void {
        this.app[method], url , async function (req:Request, res:Response) {
            try {
                const output = await callBack(req.params, req.body)
                res.json(output)
            } catch (error:any) {
                res.status(422).json({
                    message: error.message
                })
            }
        }
    }
    listen(port: number): void{
        this.app.listen(port)
    }

    
}

