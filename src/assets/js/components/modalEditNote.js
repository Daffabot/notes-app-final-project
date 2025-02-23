export class ModalEditNote extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.noteId = this.getAttribute('note-id');
        this.title = this.getAttribute('title') || '';
        this.body = this.getAttribute('body') || '';
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .modal {
                    display: flex;
                    position: fixed;
                    top: 0; left: 0; width: 100vw; height: 100%; z-index: 3;
                    background: rgba(0,0,0,0.5);
                    align-items: center; justify-content: center;
                }
                .modal-content {
                    background: white; padding: 20px; border-radius: 5px;
                    display: flex; flex-direction: column; gap: 10px;
                    width: 70%;
                }
                input, textarea { max-width: calc(100% - 10px);}
                button { padding: 5px; cursor: pointer; }
                .modal-content h3 { margin-block: 0; }
            </style>
            <div class="modal">
                <div class="modal-content">
                    <h3>Edit Note</h3>
                    <input type="text" id="title" value="${this.title}" />
                    <textarea id="body" rows="5">${this.body}</textarea>
                    <button id="save">Save</button>
                    <button id="cancel">Cancel</button>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('save').addEventListener('click', () => {
            const newTitle = this.shadowRoot.getElementById('title').value;
            const newBody = this.shadowRoot.getElementById('body').value;
            document.dispatchEvent(new CustomEvent('editNote', {
                detail: { id: this.noteId, newTitle, newBody }
            }));
            this.remove();
        });

        this.shadowRoot.getElementById('cancel').addEventListener('click', () => {
            this.remove();
        });
    }
}
customElements.define('modal-edit-note', ModalEditNote);