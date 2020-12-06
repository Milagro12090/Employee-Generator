//export for intern class
const Employee = require('./employee');
// get name id email and school from prompt
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
// get school from prompt
  getSchool() {
    return this.school;
  }
//get role from prompt
  getRole() {
    return 'Intern';
  }
}
// module intern
module.exports = Intern;
