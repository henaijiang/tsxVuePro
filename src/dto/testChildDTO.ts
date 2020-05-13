import { testDTO } from "./testDTO"
class testChildDTO extends testDTO {
  age: number = 0
  constructor({ age, id, name }:{age: number,id: string, name: string}) {
    super({id,name})
    this.age = age
  }
}
export { testChildDTO }