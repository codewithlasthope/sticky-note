let addButton = document.getElementById('add-note');
function createNotes(text = ''){
    let note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <textarea class="note-content">${text}</textarea>
        <div class="note-footer">Double click to delete!</div>
    `;
    document.querySelector('.notes').appendChild(note);
    let noteContent = note.querySelector('.note-content');
    noteContent.addEventListener('input', saveNotes)
    noteContent.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            noteContent.blur();
        }
    });
    note.addEventListener('dblclick', function(){
        note.remove();
        saveNotes();
    });
}

addButton.addEventListener('click', function() {
    createNotes()
})

function saveNotes(){
    let notes = document.querySelectorAll('.note-content')
    let data = []
    notes.forEach(note => {
        data.push(note.value)
    })
    localStorage.setItem('notes', JSON.stringify(data) )
}
function loadNotes(){
    let saveNote = JSON.parse(localStorage.getItem('notes')) || [];
    saveNote.forEach(note => {
        createNotes(note);
    })
}
loadNotes()