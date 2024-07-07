
export class Email { 
    private value : string;

    constructor (email: string) {
        if (!email.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/gm)) throw new Error("Invalid Email")
        this.value = email
    }

    getValue () {
        return this.value
    }
}