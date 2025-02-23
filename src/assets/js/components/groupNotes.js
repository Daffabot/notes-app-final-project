export class GroupNotes extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const noteId = this.getAttribute('note-id');
        this.innerHTML = `
            <style>
                .actions { display: flex; gap: 10px; }
                button { cursor: pointer; }
            </style>
            <div class="actions">
                <archive-note note-id="${noteId}"></archive-note>
                <edit-note note-id="${noteId}"></edit-note>
                <delete-note note-id="${noteId}"></delete-note>
            </div>
        `;
    }
}
customElements.define('group-notes', GroupNotes);