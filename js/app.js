const App = {
    state: {
        notes: [],
        currentView: 'notes',
        searchQuery: '',
        filter: 'all',
        sort: 'updated'
    },

    
    init() {
        Theme.init()

        Toast.init()
        
        this.state.notes = Storage.load()

        this.sync()
        
        const DOM = {
            grid: document.querySelector(".notes-grid"),
            addButton: document.getElementById("add-note"),
            searchBar: document.querySelector('.search-input'),
            sortSelect: document.querySelector('.sort-select'),
            filterSelect: document.querySelector('.filter-select'),
            workSpaceBtn: document.querySelectorAll('.workspace-btn'),
            archiveView: document.querySelector('[data-view="archive"]'),
            themeBtn: document.getElementById('theme-toggle')
        };

        // theme toggle
        DOM.themeBtn.addEventListener('click', ()=> {
            Theme.toggle()

            Toast.show('Theme changed')
        })

        // workspace toggle
        DOM.workSpaceBtn.forEach(button => {
            button.addEventListener('click', ()=> {
                this.state.currentView = button.dataset.view

                DOM.workSpaceBtn.forEach(btn => 
                    btn.classList.remove('active')
                )
            
                button.classList.add('active')

                this.sync()
            })
        })

        // search event
        DOM.searchBar.addEventListener('input', (e)=> {
            this.state.searchQuery = e.target.value

            this.sync()
        })
        // sort event
        DOM.sortSelect.addEventListener('change', (e)=> {
            this.state.sort = e.target.value

            this.sync()
        })
        // filter event
        DOM.filterSelect.addEventListener('change', (e)=> {
            this.state.filter = e.target.value
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
        
        // note actions 
        DOM.grid.addEventListener('click', (e)=> {
            console.log('clicked', e.target)
            const article = e.target.closest('.note')
            if (!article) return

            const id = article.dataset.id

            const note = this.state.notes.find(n => n.id === id)

            if (e.target.classList.contains('note-pin')) {
                this.updateNote(id, {
                    pinned: !note.pinned
                })
                
                this.sync()
                Toast.show(
                    note.pinned
                    ? "📍 Removed from pinned"
                    : "📌 Note pinned",
                    'success'
                );
            }

            if (e.target.classList.contains('note-fav')) {
                this.updateNote(id, {
                    favourites: !note.favourites
                })

                this.sync()
                Toast.show(
                    note.favourites
                    ? "☆ Removed from favorites"
                    : "⭐ Added to favorites", 
                    'success'
                );
            }

            if (e.target.classList.contains('note-archive')) {
                this.updateNote(id, {
                    archived: !note.archived
                })

                this.sync()

                Toast.show(
                    note.archived 
                    ? "📂 Note restored"
                    : "📦 Note archived",
                    'success'
                );
            }

            // delete note
            if (e.target.classList.contains('note-delete')) {
                Render.animateDelete(id, ()=> {
                    this.deleteNote(id);

                    Toast.show('Note deleted successfully', 'success')
                })
            }
        })


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
        
        let visibleNotes = Workspace.filter(
            this.state.notes,
            this.state.currentView
        )
        
        visibleNotes = Search.filter(
            visibleNotes,
            this.state.searchQuery
        )
        
        visibleNotes = Sort.sort(
            visibleNotes,
            this.state.sort
        )

        visibleNotes = Filter.filter(
            visibleNotes,
            this.state.filter
        )

        Render.updateWorkspaceCounts(this.state.notes);

        Render.renderNotes(visibleNotes);
    },  
    
    addNote() {
        const note = Notes.create()

        this.state.notes.push(note)

        this.sync()

        Toast.show("📝 New note created", 'success');
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