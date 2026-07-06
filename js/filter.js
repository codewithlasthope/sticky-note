const Filter = {
    filter(notes, type) {
        switch (type) {
            case 'all':
                return notes

            case 'pinned':
                return notes.filter(note => note.pinned)
                
                break

            case 'favourites':
                return notes.filter(note => note.favourites)
                break

            case 'archived':
                return notes.filter(note => note.archived)
                break
        }

        return notes
    }
}