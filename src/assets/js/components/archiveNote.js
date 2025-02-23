export class ArchiveNote extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.noteId = this.getAttribute('note-id');
        this.render();
    }

    render() {
        const notesData = JSON.parse(localStorage.getItem('notesData')) || [];
        const note = notesData.find(n => n.id === this.noteId);
        const isArchived = note ? note.archived : false;

        this.shadowRoot.innerHTML = `
            <style>
                button { cursor: pointer; padding: 5px; background: ${isArchived ? 'gray' : 'blue'}; color: white; }
            </style>
            <button>${isArchived ? 'Unarchive' : 'Archive'}</button>
        `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('toggleArchive', { detail: this.noteId }));
            this.updateButton();
        });
    }

    updateButton() {
        setTimeout(() => {
            const notesData = JSON.parse(localStorage.getItem('notesData')) || [];
            const note = notesData.find(n => n.id === this.noteId);
            const isArchived = note ? note.archived : false;
            this.shadowRoot.querySelector('button').textContent = isArchived ? 'Unarchive' : 'Archive';
            this.shadowRoot.querySelector('button').style.background = isArchived ? 'gray' : 'blue';
        }, 50); // Delay sedikit agar localStorage sudah diperbarui
    }
}
customElements.define('archive-note', ArchiveNote);