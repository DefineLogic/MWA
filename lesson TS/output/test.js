class Student {
    _name;
    _gpa;
    getName() { return this._name; }
    setName(name) { this._name = name; }
    constructor(name, gpa) {
        this._name = name;
        this._gpa = gpa;
    }
}
let jack = new Student("Jack", 3.0);
console.log(jack);
