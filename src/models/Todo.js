export class Todo {
    constructor(id, text, tag, isCompleted) {
        this.id = id
        this.text = text
        this.tag = tag
        this.isCompleted = isCompleted
    }

    toggle() {
        this.isCompleted = !this.isCompleted
    }

    updateText(text) {
        this.text = text
    }

    updateTag(tag) {
        this.tag = tag
    }

    toPlainObject() {
        return {
            id: this.id,
            text: this.text,
            tag: this.tag,
            isCompleted: this.isCompleted
        }
    }

    static fromPlainObject(plainObject) {
        return new Todo(plainObject.id, plainObject.text, plainObject.tag, plainObject.isCompleted)
    }
}