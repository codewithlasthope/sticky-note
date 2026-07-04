const Search = {
    filter(notes, query) {
        if (query.trim() === '') return notes

        const lowerQuery = query.toLowerCase()

        return notes.filter(note => {
            return (
                note.title.toLowerCase().includes(lowerQuery) 
                || note.content.toLowerCase().includes(lowerQuery)
            )
        })
    }
}