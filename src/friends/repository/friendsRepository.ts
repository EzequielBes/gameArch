import { DatabaseConnection } from "../../Users/database/DatabaseConnection"


export interface FriendsRepository {
    getInfoUser(username):Promise<any>
    addFriend(friendName, yourname, type):Promise<void>
    whoRequest(who, to):Promise<any>
    getAllFriends(username):Promise<any>
    toRequest(to, who):Promise<any>
    friend(who, to):Promise<any>
    updateFriend(toRequest, whoRequest, newStatus ):Promise<void>
}


export class DatabaseFriendsRepository implements FriendsRepository{

    constructor (
        readonly connection: DatabaseConnection
    ) {}

    async getInfoUser(username: any): Promise<any> {
        const [accountData] = await this.connection.query('SELECT * FROM "user" WHERE username = $1 ', [username])
        if(!accountData) return
        
        return accountData['account_id']
    }

    async getUserFromId(userId:string){
        const accountData = await this.connection.query('SELECT * FROM "friends" WHERE account_id = $1 ', [userId])
        return accountData
    }

    async addFriend(whoRequest, toRequest, statement): Promise<void> {
        const idFriends = crypto.randomUUID()
        const friendRequest = await this.connection.query('INSERT INTO "friends" (friend_id, who_request_id, to_request_id, status, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6)',[idFriends, whoRequest, toRequest, statement, new Date(), new Date()])
    }

    async updateFriend(toRequest, whoRequest, newStatus ):Promise<void> {
        const result = await this.connection.query(
            'UPDATE "friends" SET status = $1 WHERE who_request_id = $2 AND to_request_id = $3 AND status = $4',
            ['accepted', toRequest , whoRequest, 'pending']
        );
    }

    async friend(who, to):Promise<any> {
        const [accountData] = await this.connection.query('SELECT * FROM "friends" WHERE who_request_id = $1 AND to_request_id = $2 AND status = $3', [who, to,'accepted'])
        return accountData
    }

    async whoRequest(who, to): Promise<any> {
        console.log(who, to)
        const [accountData] = await this.connection.query(
            'SELECT * FROM "friends" WHERE who_request_id = $1 AND to_request_id = $2 AND status = $3',[who, to, 'pending']);
        if(!accountData) return
        return accountData
    }

    async toRequest(to, who):Promise<any> {
        console.log(to, who)
        const [infoRequest] = await this.connection.query('SELECT * FROM "friends" WHERE to_request_id = $1 AND who_request_id = $2 AND status = $3', [who,to , 'pending'])
        return infoRequest
    }

    async getAllFriends(username: any): Promise<any> {
        throw new Error("Method not implemented.")
    }



}