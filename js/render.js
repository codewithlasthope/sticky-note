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

        
        const header = document.createElement('header');
        header.classList.add('note-header')

        const title = document.createElement('input');
        title.type = 'text'
        title.placeholder = 'Untitled'
        title.classList.add('note-title')
        title.value = note.title

        const actions = document.createElement('div')
        actions.classList.add('note-actions')

        const noteBody = document.createElement('section')
        noteBody.classList.add('note-body')

        const textarea = document.createElement('textarea')
        textarea.classList.add('note-content')
        textarea.value = note.content

        noteBody.appendChild(textarea)

        const footer = document.createElement('div')
        footer.classList.add('note-footer')
        
        const noteMeta = document.createElement('div')
        noteMeta.classList.add('note-meta')
        
        const createdAt = document.createElement('small')
        createdAt.textContent = `Created: ${formatDate(note.createdAt)}`
        
        const updatedAt = document.createElement('small')
        updatedAt.classList.add('note-updated')
        updatedAt.textContent = `Updated: ${formatTime(note.updatedAt)}`

        const noteStats = document.createElement('div')
        noteStats.classList.add('note-stats')

        const characters = document.createElement('small')
        characters.classList.add('note-characters')
        characters.textContent = `${note.content.length} Characters`

        noteMeta.append(createdAt, updatedAt)
        noteStats.appendChild(characters)
        header.append(title, actions)
        footer.append(noteMeta, noteStats)

        el.append(header, noteBody, footer)

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
    },

    updateUpdatedAtDOM(id, updatedAt) {
        const article = document.querySelector(`[data-id="${id}"]`);
        if (!article) return

        const updatedEl = article.querySelector(".note-updated");
        if (!updatedEl) return

        updatedEl.textContent = `Updated: ${formatTime(updatedAt)}`
    },

    updateCharacterCount(id, length) {
        const article = document.querySelector(`[data-id='${id}']`)
        if (!article) return

        const updateChar = article.querySelector('.note-characters')
        if (!updateChar) return

        updateChar.textContent = `${note.content.length} Characters`
    }
}
