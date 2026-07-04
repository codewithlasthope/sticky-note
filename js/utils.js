function generateId() {
    return crypto.randomUUID()
}

function formatDate(date) {
    return new Date(date).toLocaleDateString()
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })
}
