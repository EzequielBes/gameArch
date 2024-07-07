import pgp from 'pg-promise'

export interface DatabaseConnection {
    query (statement: string, params: any): Promise<any>;
    close (): Promise<void>;    
}

export class PgPromiseAdapter implements DatabaseConnection {
    connection:any
    prisma:any
    constructor () {
        this.connection = pgp()("postgresql://postgres:root@localhost:5432/game")
    }

    query(statement: string, params: any): Promise<any> {
        return  this.connection.query(statement, params);
    }
    close(): Promise<void> {
        return this.connection.$pool.end();
    }
}
