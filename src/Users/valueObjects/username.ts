

export class Username {
    private username

    constructor (username: string) {
        if(!username.match(/^[a-zA-Z0-9._-]{4,15}$/gm)) throw new Error("Username not valid")
        this.username = username
    }

    getValue() {
        return this.username
    }
}