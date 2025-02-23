export class NoteComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set note(note) {
        this._note = note;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .note { border: 2px solid #FF4545; border-radius: 5px; padding: 10px; margin: 10px; position: relative; text-align: justify; }
                h2 { margin-block: 0; }
            </style>
            <div class="note">
                <h2>${this._note.title}</h2>
                <p>${this._note.body}</p>
                <small>${new Date(this._note.createdAt).toLocaleString()}</small>
                <slot></slot> <!-- Tempat untuk group-notes -->
            </div>
        `;
    }
}
customElements.define('note-component', NoteComponent);