const Workspace = {
    filter(notes, view) {
        switch(view) {
            case 'notes':
                return notes.filter(note => !note.archived)
                break

            case 'archive':
                return notes.filter(note => note.archived)
                break
        }

        return notes
    }
}