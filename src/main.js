const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
    const noteElement = createNoteElements(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

// Get Notes
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// Save Notes
function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// Create Notes
function createNoteElements(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("notes");
    element.value= content;
    element.placeholder = "Empty Sticky Note";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Do you want to delete this sticky note?")

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element; 
}

// Add Notes
function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElements (noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

// Update Notes
function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNotes = notes.filter(note => note.id == id)[0];

    targetNotes.content = newContent;
    saveNotes(notes);
}

// Delete Notes
function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}