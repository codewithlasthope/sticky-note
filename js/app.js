const App = {
    state: {
        notes: []
    },

    
    init() {
        this.state.notes = Storage.load()
        Render.renderNotes(this.state.notes);
        
        const DOM = {
            grid: document.querySelector(".notes-grid"),
            addButton: document.getElementById("add-note")
        };


        // event listeners
        // add note
        DOM.grid.addEventListener('click', (e)=> {
            const addCard = e.target.closest('.add-card')
            if (!addCard) return

            this.addNote()
        })
        
        // delete note
        DOM.grid.addEventListener('dblclick', (e)=> {
            if (!e.target.classList.contains('note-footer')) return
        
            const article = e.target.closest('.note')

            this.deleteNote(article.dataset.id)
        })

        // update note
        DOM.grid.addEventListener('input', (e)=> {
            if (!e.target.classList.contains('note-content')) return

            const article = e.target.closest('.note')

            this.updateNote(article.dataset.id, {
                content: e.target.value
            })
        })
    },

    sync() {
        Storage.save(this.state.notes);
        Render.renderNotes(this.state.notes);
    },  
    addNote() {
        const note = Notes.create()

        this.state.notes.push(note)

        this.sync()
    },

    deleteNote(id) {
        this.state.notes = Notes.remove(this.state.notes, id)
        
        this.sync()
    },

    updateNote(id, updates) {
        const note = Notes.getById(this.state.notes, id)

        const updated = Notes.update(note, updates)

        this.state.notes = this.state.notes.map(note => note.id === id ? updated : note)

        Storage.save(this.state.notes);
    }
}

App.init()