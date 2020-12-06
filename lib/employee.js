//export for employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
//get name from prompt
  getName() {
    return this.name;
  }
//get id from promtp
  getId() {
    return this.id;
  }
//get email from prompt
  getEmail() {
    return this.email;
  }

  getRole() {
    return 'Employee';
  }
}
//module employee

module.exports = Employee;
