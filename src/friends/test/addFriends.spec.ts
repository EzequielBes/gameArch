import { PgPromiseAdapter } from "../../Users/database/DatabaseConnection"
import { DatabaseFriendsRepository } from "../repository/friendsRepository"
import { ToFriends } from "../useCase/toFriends"


 test("Tenta adicionar alguem que não existe e da erro" , async () => {
    const database = new PgPromiseAdapter()
    const repoFriend = new DatabaseFriendsRepository(database)
    const tofriend = new ToFriends(repoFriend)

    const input = {
        username: "Ezequiel",
        friendName: "Morgan"
    }
    expect(async () => {await tofriend.execute(input)}).rejects.toThrow(new Error('Esse usuario não existe'))
})


 test("Deve adicionar amigo" , async () => {
    const database = new PgPromiseAdapter()
    const repoFriend = new DatabaseFriendsRepository(database)
    const tofriend = new ToFriends(repoFriend)

    const input = {
        username: "Ezequiel",
        friendName: "Morgana"
    }
   const res = await tofriend.execute(input)

    expect(res).toBe('Pedido de amizade enviado')
})


 test("Deve aceitar pedido de amizade" , async () => {
    const database = new PgPromiseAdapter()
    const repoFriend = new DatabaseFriendsRepository(database)
    const tofriend = new ToFriends(repoFriend)

    const input = {
        username: "Morgana",
        friendName: "Ezequiel"
    }
   const res =await  tofriend.execute(input)

    expect(res).toBe('Pedido de amizade aceito')
})