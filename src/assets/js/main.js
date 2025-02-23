import '../css/style.css';
import { NoteService } from './utils/noteService.js';
import './components/noteComponent.js';
import './components/noteForm.js';
import './components/groupNotes.js';
import './components/archiveNote.js';
import './components/editNote.js';
import './components/deleteNote.js';
import './components/modalEditNote.js';

document.addEventListener('DOMContentLoaded', () => {
    const noteService = new NoteService();
    const notesContainer = document.getElementById('notes-container');
    const archiveContainer = document.getElementById('archive-container');

    function renderNotes() {
        notesContainer.innerHTML = '';
        archiveContainer.innerHTML = '';
    
        noteService.getNotes().forEach(note => {
            const noteElement = document.createElement('note-component');
            noteElement.note = note;
    
            const groupActions = document.createElement('group-notes');
            groupActions.setAttribute('note-id', note.id);
    
            noteElement.appendChild(groupActions);
    
            if (note.archived) {
                archiveContainer.appendChild(noteElement);
            } else {
                notesContainer.appendChild(noteElement);
            }
        });
    }    

    renderNotes();

    document.addEventListener('noteAdded', (event) => {
        const { title, body } = event.detail;
        noteService.addNote(title, body);
        renderNotes();
    });

    document.addEventListener('toggleArchive', (event) => {
        noteService.toggleArchive(event.detail);
        renderNotes();
    });

    document.addEventListener('editNote', (event) => {
        noteService.editNote(event.detail.id, event.detail.newTitle, event.detail.newBody);
        renderNotes();
    });

    document.addEventListener('deleteNote', (event) => {
        noteService.deleteNote(event.detail);
        renderNotes();
    });
});
