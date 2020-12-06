//export for manager class
const Employee = require('./employee');
// get name id email etc from prompt
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
// get office number from prompt
  getOfficeNumber() {
    return this.officeNumber;
  }
//get role from prompt
  getRole() {
    return 'Manager';
  }
}
//module manager
module.exports = Manager;
