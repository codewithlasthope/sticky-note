const Notes = {
    create() {
        const note = {
            id: generateId(),
            title: "",
            content: "",
            color: "default",
            pinned: false,
            favourites: false,
            archived: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        return note;
    },

    update(note, updates) {
        return {
            ...note,
            ...updates,
            updatedAt: new Date().toISOString()
        }
    },
    
    remove(notes, id) {
        return notes.filter(note => note.id !== id)
    },

    getById(notes, id) {
        return notes.find(note => note.id === id)
    }
}


function toggleFavourite() {

}

function togglePin() {

}

function archiveNote() {

}

function changeColor() {

}

function updateTitle() {

}

function updateContent() {

}
