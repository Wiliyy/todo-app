export class Todo {
    constructor(id, text, isCompleted) {
        this.id = id
        this.text = text
        this.isCompleted = isCompleted
    }

    toggle() {
        this.isCompleted = !this.isCompleted
    }

    updateText(text) {
        this.text = text
    }

    toPlainObject() {
        return {
            id: this.id,
            text: this.text,
            isCompleted: this.isCompleted
        }
    }

    static fromPlainObject(plainObject) {
        return new Todo(plainObject.id, plainObject.text, plainObject.isCompleted)
    }
}