const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  console.log(notes);

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note addded!"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const removeNote = title => {
  const notes = loadNotes();
  const lengthNotesBefore = notes.length;
  console.log(lengthNotesBefore);

  const notesToKeep = notes.filter(note => note.title !== title);

  if (lengthNotesBefore !== notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse(`Note title '${title}' has been removed!`));
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow.inverse("-- Your notes --"));
  notes.forEach((note) => console.log(chalk.blue("⮞ ") + `${note.title}`));
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
};
