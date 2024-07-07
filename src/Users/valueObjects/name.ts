
export class Name {
    private value
    constructor(name:string) {
        if(!name.match(/^[a-zA-Z]{3,20}$/gm)) throw new Error("Invalid Name")
        this.value = name
    }

    getValue() {
        return this.value
    }
}