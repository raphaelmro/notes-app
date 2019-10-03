const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
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
  notes.forEach(note => console.log(chalk.blue("⮞ ") + `${note.title}`));
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note !== undefined) {
    console.log(chalk.yellow.inverse("-- Your note --"));
    console.log(chalk.blue("⮞ ") + `${note.title}`);
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

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
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
