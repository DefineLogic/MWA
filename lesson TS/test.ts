
class Student {
    private _name!:string;
    private _gpa!:number;
    getName():string {return this._name;}
    setName(name:string){this._name=name;}
    constructor(name:string,gpa:number){
        this._name = name;
        this._gpa = gpa;
    }
}

let jack:Student = new Student("Jack",3.0);
console.log(jack)