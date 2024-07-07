
export class Password {
    private value

    constructor (password: string) {
        if(!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/gm)) throw new Error("Invalid Password")
        this.value = password
    }

    getValue () {
        return this.value
    }
    
}