const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicates = notes.filter(function (note) {
    //     return note.title === title;
    // })
    const duplicateNode = notes.find((note) => note.title === title);
    if (!duplicateNode) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        
        console.log(chalk.green('New Note added'));
    } else {
        console.log(chalk.red('Note title taken!'));
    }   
}

const removeNote = (title) => {
    const notes = loadNotes();
    // const noteIndex = notes.findIndex(function (note) {
    //    return note.title === title;
    // })

    // if(notes.length > 0 && noteIndex !== -1) {
    //     notes.splice(noteIndex,1);
    //     saveNotes(notes)
    // } else {
    //     console.log('No Note to remove');
    // }
    const notesToKeep =  notes.filter( (note) => {
        return note.title !== title;
    })
    if (notesToKeep.length < notes.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green('Note removed!'));
    } else {
        console.log(chalk.red('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length > 0) {
        console.log(chalk.green('Your Notes'));
        notes.forEach(note => {
            console.log(chalk.blue(note.title));
        });
    } else {
        console.log(chalk.red('No notes found!'));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if (note) {
        console.log(chalk.green(note.title,':', note.body))
    } else {
        console.log(chalk.red('Note not found'));
    }   
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes= () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }  
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};