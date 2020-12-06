//export for engineer class
const Employee = require('./employee');
//get name id email from prompt
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
//get github
  getGithub() {
    return this.github;
  }
//get role
  getRole() {
    return 'Engineer';
  }
}
//module engineer
module.exports = Engineer;
