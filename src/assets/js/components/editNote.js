export class EditNote extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                button { cursor: pointer; padding: 5px; background: yellowgreen; color: white; }
            </style>
            <button>Edit</button>
        `;
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            const notesData = JSON.parse(localStorage.getItem('notesData')) || [];
            const note = notesData.find(n => n.id === this.getAttribute('note-id'));
            if (!note) return;

            const modal = document.createElement('modal-edit-note');
            modal.setAttribute('note-id', note.id);
            modal.setAttribute('title', note.title);
            modal.setAttribute('body', note.body);
            document.body.appendChild(modal);
        });
    }
}
customElements.define('edit-note', EditNote);