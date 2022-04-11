import {Students} from "./student.js"
import {Token}  from "./MyDecorator.js"

@Token({course:"CS572",canProgram:true})
export class DEStudent extends Students {

}