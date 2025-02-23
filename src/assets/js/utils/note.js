export class Note {
    constructor(id, title, body, createdAt, archived = false) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
        this.archived = archived;
        console.log(id);
    }
}