export class User {
    public firstName: string;
    public age: number;
    public uniqueId: string;

    constructor(name: string, age: number, uniqueId: string) {
        this.firstName = name;
        this.age = age;
        this.uniqueId = uniqueId;
    }

}
