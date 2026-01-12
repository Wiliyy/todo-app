import { Tags } from '../models/Tags'

export class TagService {
    constructor() {
        this.tags = []
    }

    addTag(label, selected) {
        const id = this.generateId()
        const tag = new Tags(id, label, false)
        this.tags.push(tag)
        return tag
    }

    // Toggle: if selected → unselect, if unselected → select (and unselect others)
    toggleTag(id) {
        const tag = this.tags.find(t => t.id === id)
        if (!tag) return null

        if (tag.selected) {
            // Already selected → just unselect it
            tag.selected = false
        } else {
            // Unselect all others, select this one
            this.tags.forEach(t => t.selected = false)
            tag.selected = true
        }
        return tag
    }

    updateTag(id, newTag) {
        const tag = this.tags.find(t => t.id === id)
        if (!tag) return null
        tag.label = newTag
        return tag
    }
    deleteTag(id) {
        
        this.tags = this.tags.filter(t => t.id !== id)
    }

    getSelectedTag() {
        return this.tags.find(t => t.selected)
    }

    generateId() {
        return Date.now() + Math.random();
    }
}