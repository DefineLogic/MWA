export class Students {
    id;
    name;
    #gpa;
    set gpa(gpa) { this.#gpa = gpa; }
    get gpa() { return this.#gpa; }
    getNmae() { return this.name; }
    setName(name) { this.name = name; }
    constructor(id, name, gpa) {
        this.id = id;
        this.name = name;
        this.#gpa = gpa;
    }
}
let jac = new Students(1, "Jac", 3.0);
console.log(jac);
