export class Tags {
    constructor(id, label, selected) {
        this.id = id
        this.label = label
        this.selected = selected
    }
    toggle() {
        this.selected = !this.selected
    }
    updateTag(newTag) {
        this.label = newTag
    }
    
    static fromPlainObject(plainObject) {
        return new Tags(
            plainObject.id,
            plainObject.label,
            plainObject.selected
        )
    }
    toPlainObject() {
        return {
            id: this.id,
            label: this.label,
            selected: this.selected
        }
    }
}

