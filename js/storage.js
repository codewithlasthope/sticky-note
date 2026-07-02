const Storage = {
    KEY: 'sticky-notes',
    save(notes) {
        localStorage.setItem(this.KEY, JSON.stringify(notes))
    },

    load() {
        try {
            return JSON.parse(localStorage.getItem(this.KEY)) || []

        } catch (error) {
            console.error(error)
            return []
        }
    },

    clear() {
        localStorage.removeItem(this.KEY)
    }
}
