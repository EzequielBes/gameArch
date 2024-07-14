import { DatabaseConnection } from "../../Users/database/DatabaseConnection";
import { FriendsRepository } from "../repository/friendsRepository";


export class ToFriends {
    constructor (
        readonly connectionDatabase: FriendsRepository
    ) {}

    async execute (input) {
        const friendInfo = await this.connectionDatabase.getInfoUser(input.friendName)
        if(!friendInfo) throw new Error("Esse usuario não existe");
        const myInfoUser =await this.connectionDatabase.getInfoUser(input.username)

        const areFriends = await this.connectionDatabase.friend(await myInfoUser, await friendInfo)
        if(areFriends) throw new Error("Vocês ja são amigos");
        const sended = await this.connectionDatabase.whoRequest(await myInfoUser, await friendInfo);
        if(sended) throw new Error("Pedido de amizade ja foi enviado");
        const requested = await this.connectionDatabase.toRequest(await friendInfo, await myInfoUser)
        if(requested) {
            const createFriend = await this.connectionDatabase.addFriend(await myInfoUser, await friendInfo, 'accepted')
            const updateFriend = await this.connectionDatabase.updateFriend(await friendInfo, await myInfoUser, 'accepted')
            return 'Pedido de amizade aceito'
        }
        await this.connectionDatabase.addFriend(await myInfoUser, await friendInfo, 'pending')
        return 'Pedido de amizade enviado'

    }
}