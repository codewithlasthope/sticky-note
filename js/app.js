const App = {
    state: {
        notes: [],
        searchQuery: '',
        filter: 'all',
        sort: 'updated'
    },

    
    init() {
        this.state.notes = Storage.load()

        Render.renderNotes(this.state.notes);
        
        const DOM = {
            grid: document.querySelector(".notes-grid"),
            addButton: document.getElementById("add-note"),
            searchBar: document.querySelector('.search-input')
        };

        // search event
        DOM.searchBar.addEventListener('input', (e)=> {
            this.state.searchQuery = e.target.value

            this.sync()
        })
 
        // add note
        DOM.grid.addEventListener('click', (e)=> {
            const addCard = e.target.closest('.add-card')
            if (!addCard) return

            this.addNote()
        })
        
        // withdraw cursor in title
        DOM.grid.addEventListener('keydown', (e)=> {
            if (e.key !== 'Enter') return

            if (!e.target.classList.contains('note-title')) return
                
            e.preventDefault()
            e.target.blur()
        })
        

        // delete note
        

        // update note
        DOM.grid.addEventListener('input', (e)=> {
            if (!e.target.classList.contains('note-content') 
                && !e.target.classList.contains('note-title')) {
                return
            }

            const article = e.target.closest('.note')
            
            const updates = {}

            if (e.target.classList.contains('note-title')) {
                updates.title = e.target.value
            }

            if (e.target.classList.contains('note-content')) {
                updates.content = e.target.value
            }

            this.updateNote(article.dataset.id, updates)
        })
    },

    sync() {
        Storage.save(this.state.notes);

        const visibleNotes = Search.filter(
            this.state.notes,
            this.state.searchQuery
        )

        const visibleNotes = Filter.filter(
            visibleNotes,
            this.state.filter
        )

        const visibleNotes = Sort.sort(
            visibleNotes,
            this.state.sort
        )

        Render.renderNotes(visibleNotes);
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

        Render.updateUpdatedAtDOM(id, updated.updatedAt)

        Render.updateCharacterCount(id, updated.content.length)
    }
}

App.init()