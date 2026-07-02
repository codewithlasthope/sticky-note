const Render = {
    init () {
        this.renderNotes(App.state.notes)
    },

    renderNotes(notes) {
        const grid = document.querySelector('.notes-grid')

        this.clear()

        grid.appendChild(this.renderAddCard())

        if (notes.length === 0) {
            grid.appendChild(this.renderEmptyState())
            return
        }

        notes.forEach(note => {
            const el = this.renderNote(note)
            grid.appendChild(el)
        })
    },

    renderNote(note) {
        const el = document.createElement('article')
        el.classList.add('note')
        el.dataset.id = note.id

        el.addEventListener('keydown', (e)=> {
            if (e.key === 'Enter') {
                e.preventDefault()
                textarea.blur()
            }
        })

        
        const textarea = document.createElement('textarea')
        textarea.classList.add('note-content')
        textarea.value = note.content

        const footer = document.createElement('div')
        footer.classList.add('note-footer')
        footer.textContent = 'Double click to delete'
        
        el.append(textarea, footer)

        return el
    },

    clear() {
        const grid = document.querySelector('.notes-grid')
        grid.innerHTML = ''
    },

    renderAddCard() {
        const card = document.createElement('article')
        card.classList.add('add-card')

        card.innerHTML = `
            <div class='add-icon'>+</div>
            <p>Add Note</p>
        `
        return card
    },

    renderEmptyState() {
        const empty = document.createElement('div')
        empty.classList.add('empty-state')

        empty.innerHTML = `
            <h2>No notes yet</h2>
            <p>Click the <strong>Add Note</strong> card to create your first note</p>
        `
        return empty
    }
}
