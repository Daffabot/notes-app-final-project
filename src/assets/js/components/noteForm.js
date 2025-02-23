export class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                form { display: flex; flex-direction: column; gap: 10px; padding: 10px; margin: 10px; border: 2px solid #FF4545; border-radius: 5px; position: sticky; top: 10vh; }
                input, textarea { max-width: calc(100% - 20px); padding: 8px; }
                .error { color: red; font-size: 0.9em; display: none; }
                button { background: blue; color: white; padding: 10px; cursor: not-allowed; opacity: 0.6; }
                button.enabled { cursor: pointer; opacity: 1; }
                label { margin-bottom: -8px; }
            </style>
            <form>
                <label for="title">Title</label>
                <input type="text" id="title" placeholder="Title (3-100 chars)" autocomplete="off" required />
                <span class="error" id="title-error">Title must be between 3 and 100 characters</span>

                <label for="body">Texts</label>
                <textarea id="body" placeholder="Write your note here..." required></textarea>
                <span class="error" id="body-error">Body must be at least 5 characters</span>

                <button type="submit" id="submit-btn" disabled>Add Note</button>
            </form>
        `;
    }
    
    connectedCallback() {
        const titleInput = this.shadowRoot.querySelector('#title');
        const bodyInput = this.shadowRoot.querySelector('#body');
        const titleError = this.shadowRoot.querySelector('#title-error');
        const bodyError = this.shadowRoot.querySelector('#body-error');
        const submitButton = this.shadowRoot.querySelector('#submit-btn');

        const validateForm = () => {
            const titleLength = titleInput.value.trim().length;
            const bodyLength = bodyInput.value.trim().length;
            let isValid = true;

            if (titleLength < 3 || titleLength > 100) {
                titleError.style.display = 'block';
                isValid = false;
            } else {
                titleError.style.display = 'none';
            }

            if (bodyLength < 5) {
                bodyError.style.display = 'block';
                isValid = false;
            } else {
                bodyError.style.display = 'none';
            }

            submitButton.disabled = !isValid;
            submitButton.classList.toggle('enabled', isValid);
        };

        titleInput.addEventListener('input', validateForm);
        bodyInput.addEventListener('input', validateForm);

        this.shadowRoot.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault();
            if (submitButton.disabled) return;

            const title = titleInput.value.trim();
            const body = bodyInput.value.trim();

            document.dispatchEvent(new CustomEvent('noteAdded', {
                detail: { id: `note-${Date.now()}`, title, body, createdAt: new Date().toISOString() }
            }));

            titleInput.value = '';
            bodyInput.value = '';
            validateForm();
        });
    }
}

customElements.define('note-form', NoteForm);
