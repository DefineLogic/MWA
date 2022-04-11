export class Students{
    id:number;
    private name: string;
    #gpa: number;
    set gpa(gpa) {this.#gpa = gpa;}
    get gpa(){return this.#gpa;}
    getNmae(): string {return this.name;}
    setName(name:string) {this.name = name;}

    constructor(id:number,name:string,gpa:number){
        this.id = id;
        this.name = name;
        this.#gpa = gpa;
    }
}

let jac:Students = new Students(1,"Jac",3.0);
console.log(jac)