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

        const el = document.createElement('article');
        el.classList.add('note');
        el.dataset.id = note.id;

        // STATE CLASSES
        if (note.pinned) el.classList.add("is-pinned");
        if (note.favourites) el.classList.add("is-favourite");
        if (note.archived) el.classList.add("is-archived");

        // HEADER
        const header = document.createElement('header');
        header.classList.add('note-header');

        const title = document.createElement('input');
        title.type = 'text';
        title.placeholder = 'Untitled';
        title.classList.add('note-title');
        title.value = note.title || '';

        const actions = document.createElement('div');
        actions.classList.add('note-actions');

        const pinned = document.createElement('button');
        pinned.classList.add('note-pin');
        pinned.textContent = note.pinned ? "📌" : "📍";

        const favourite = document.createElement('button');
        favourite.classList.add('note-fav');
        favourite.textContent = note.favourites ? "⭐" : "☆";

        const archived = document.createElement('button');
        archived.classList.add('note-archive');
        archived.textContent = note.archived ? "📦" : "📂";

        const del = document.createElement('button');
        del.classList.add('note-delete');
        del.textContent = '🗑️';

        actions.append(pinned, favourite, archived, del);

        header.append(title, actions);

        // BODY
        const body = document.createElement('section');
        body.classList.add('note-body');

        const textarea = document.createElement('textarea');
        textarea.classList.add('note-content');
        textarea.value = note.content || '';

        body.appendChild(textarea);

        // FOOTER
        const footer = document.createElement('footer');
        footer.classList.add('note-footer');

        const meta = document.createElement('div');
        meta.classList.add('note-meta');

        const createdAt = document.createElement('small');
        createdAt.textContent = `Created: ${formatDate(note.createdAt)}`;

        const updatedAt = document.createElement('small');
        updatedAt.classList.add('note-updated');
        updatedAt.textContent = `Updated: ${formatTime(note.updatedAt)}`;

        meta.append(createdAt, updatedAt);

        const stats = document.createElement('div');
        stats.classList.add('note-stats');

        const characters = document.createElement('small');
        characters.classList.add('note-characters');
        characters.textContent = `${(note.content || '').length} Characters`;

        stats.appendChild(characters);

        footer.append(meta, stats);

        // ASSEMBLY
        el.append(header, body, footer);

        return el;
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

    updateCharacterCount(id, count) {
        const article = document.querySelector(`[data-id='${id}']`)
        if (!article) return

        const updateChar = article.querySelector('.note-characters')
        if (!updateChar) return

        updateChar.textContent = `${count} Characters`
    },

    updateWorkspaceCounts(notes) {

        const activeCount = notes.filter(note => !note.archived).length;
        const archiveCount = notes.filter(note => note.archived).length;

        const notesCountEl = document.querySelector(".notes-count");
        const archiveCountEl = document.querySelector(".archive-count");

        notesCountEl.textContent = `(${activeCount})`;
        archiveCountEl.textContent = `(${archiveCount})`;
    }
}
