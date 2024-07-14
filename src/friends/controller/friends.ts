import { HttpServer } from "../../Users/serverhttp";

export class FriendsController {
    constructor (
        readonly connectionServer: HttpServer,
        readonly RequestFriend,
        readonly RequestedListFriends,
        readonly ListFriends
    ) {
        connectionServer.register("post","toFriends", async (params, body) => {
            const output = await RequestFriend.execute(body)
            return output
        })

        connectionServer.register("get", "requestedList", async (params, body) => {
            const output = await RequestedListFriends.execute(params)
            return output
        })

        connectionServer.register("get", "listFriends", async (params, body) => {
            const output = await ListFriends.execute(params)
            return output
        })
    }


}