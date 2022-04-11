// import {Students} from "./Student.js";
import { DEStudent } from "./DEStudent.js";

// let jac:Students = new Students(1,"Jac",3.0);
// let jac:Students = new DEStudent(1,"Jac",3.0);
let jac: DEStudent = new DEStudent(1, "Jac", 3.0);

console.log(jac)
console.log(jac.getNmae(), "is enrolled in ", jack["course"]);
console.log(jac.getNmae(), "can you program?", jack["canProgram"]);
if (jack["canProgram"]) {
    jack["program"]();
} else {
    console.log("Don;t worry you will learn after this course;");
}
