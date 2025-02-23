export class DeleteNote extends HTMLElement {
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
                button { cursor: pointer; padding: 5px; background: red; color: white; }
            </style>
            <button>Delete</button>
        `;
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('deleteNote', { detail: this.getAttribute('note-id') }));
        });
    }
}
customElements.define('delete-note', DeleteNote);