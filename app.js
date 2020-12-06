//Consts for Inquirer,path, and fs
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

//const for sending data to the output folder and html
const outputPath = path.resolve(__dirname, 'output', 'team.html');

//classes for each team member
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const mainHTML = require('./templates/mainHTML');

// consts to require cards for team members
const managerCard = require('./templates/managerhtml');
const internCard = require('./templates/internhtml');
const engineerCard = require('./templates/engineerhtml');

const fullTeam = [];

// begin console prompt
const mainApp = () => {
  console.log('Welcome to your team builder');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'managerName',
        message: 'please enter your managers name:',
        validate(value) {
          const valid = isNaN(value);
          return valid || 'please enter a name!';
        },
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'please enter your managers id:',
        validate(value) {
          const valid = !isNaN(parseFloat(value));
          return valid || 'please only include numbers';
        },
      },
      {
        type: 'input',
        name: 'managerEmail',
        message: 'please enter your managers email:',
        validate(value) {
          const valid = isNaN(value);
          return valid || 'please enter a valid user email';
        },
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'please enter your managers office number:',
        validate(value) {
          const valid = !isNaN(parseFloat(value));
          return valid || 'only include numbers';
        },
      },
    ])
    //then for adding manger card to the html
    .then(response => {
      const manager = new Manager(
        response.managerName,
        response.managerId,
        response.managerEmail,
        response.officeNumber
      );
      const managerCardHtml = managerCard(manager);
      fullTeam.push(managerCardHtml);
      addTeamMembers();
    });

  //function to add  additional team members
  function addTeamMembers() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'addMembers',
          message: 'please select one of the following options:',
          choices: [
            'Add an additional Engineer',
            'Add an Intern',
            "generate Team!",
          ],
        },
      ])
      .then(answers => {
        switch (answers.addMembers) {
          case 'Add an additional Engineer': {
            promptEngineer();
            break;
          }
          case 'Add an Intern': {
            promptIntern();
            break;
          }
          case "generate Team!": {
            buildTeam();
            break;
          }
        }
      });
  }

  // Create an engineer
  const promptEngineer = () => {
    console.log('please answear the following to add an engineer!');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'engineerName',
          message: 'Please enter engineers name:',
          validate(value) {
            const valid = isNaN(value);
            return valid || 'Please only enter letters';
          },
        },
        {
          type: 'input',
          name: 'engineerId',
          message: 'please enter your engineers id:',
          validate(value) {
            const valid = !isNaN(parseFloat(value));
            return valid || 'Please only include numbers';
          },
        },
        {
          type: 'input',
          name: 'engineerEmail',
          message: 'please enter your engineers email:',
          validate(value) {
            const valid = isNaN(value);
            return valid || 'Please enter a valid email';
          },
        },
        {
          type: 'input',
          name: 'engineerGithub',
          message: 'please enter your engineers github username:',
          validate(value) {
            const valid = isNaN(value);
            return valid || 'Please enter a valid username.';
          },
        },
      ])
      //then for creating engineer card html
      .then(response => {
        const engineer = new Engineer(
          response.engineerName,
          response.engineerId,
          response.engineerEmail,
          response.engineerGithub
        );
        const engineerCardHtml = engineerCard(engineer);
        fullTeam.push(engineerCardHtml);
        addTeamMembers();
      });
  };


  //prompt for creating intern
  const promptIntern = () => {
    console.log('please answear the following to add an intern to your team!');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'internName',
          message: 'please enter your interns name:',
          validate(value) {
            const valid = isNaN(value);
            return valid || 'Please only include letters';
          },
        },
        {
          type: 'input',
          name: 'internId',
          message: 'please enter youe interns user id:',
          validate(value) {
            const valid = !isNaN(parseFloat(value));
            return valid || 'Please only include numbers';
          },
        },
        {
          type: 'input',
          name: 'internEmail',
          message: 'please enter your interns email:',
          validate(value) {
            const valid = isNaN(value);
            return valid || 'Please enter a valid email.';
          },
        },
        {
          type: 'input',
          name: 'internSchool',
          message: 'please list your interns education:',
          validate(value) {
            const valid = isNaN(value);
            return valid || 'your input should only include letters.';
          },
        },
      ])
      //then for creating intern card for html
      .then(response => {
        const intern = new Intern(
          response.internName,
          response.internId,
          response.internEmail,
          response.internSchool
        );
        const internCardHtml = internCard(intern);

        fullTeam.push(internCardHtml);
        addTeamMembers();
      });
  }

  // function to create the html file
  function buildTeam() {
    // writing the data to the team members file
    const finalTeam = fullTeam.join('');
    fs.writeFileSync(outputPath, mainHTML(finalTeam), 'utf-8');
  }
};

mainApp();
