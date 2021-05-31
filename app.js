// const fs = require('fs');
// fs.appendFileSync('notex.txt','\nappend text 2');
// const validator = require('validator').default;
const chalk = require('chalk');
const notes = require('./notes');
const process = require('process');
const yargs = require('yargs');

// console.log(validator.isEmail('ab@ab'))
// console.log(chalk.red.bold('Success!'));

// const command = process.argv[2];

// if (command === 'add') {
//     console.log('Adding note!');
// } else if (command === 'remove') {
//     console.log('Removing note!')
// }
yargs.version('1.1.0');

// Create add command 
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body);
    }
})

// Create remove command 
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title)   
    }
})

// Create list command 
yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler: () => {
        notes.listNotes();
    }
})

// Create read command 
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
       notes.readNote(argv.title);
    }
})

yargs.parse()
// console.log(yargs.argv);