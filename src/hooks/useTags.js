import { useState, useCallback, useEffect } from 'react'
import { TagService } from '../services/TagService'
import { Tags } from '../models/Tags'

const STORAGE_KEY_TAGS = 'tags-storage'
export function useTags(initialTags = []) {


    const [tags, setTags] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY_TAGS)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                // Set selected = false on all tags after loading
                return parsed.map(t => {
                    const tag = Tags.fromPlainObject(t)
                    tag.selected = false
                    return tag
                })
            } catch (e) {
                console.error('Failed to parse tags from localStorage', e)
            }
        }
        // Also set selected = false on all initial tags
        return initialTags.map(t => {
            const tag = Tags.fromPlainObject(t)
            tag.selected = false
            return tag
        })
    })

    const [service] = useState(() => {
        const tagService = new TagService()
        const saved = localStorage.getItem(STORAGE_KEY_TAGS)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                // Set selected = false on all tags before assigning to service
                tagService.tags = parsed.map(t => {
                    const tag = Tags.fromPlainObject(t)
                    tag.selected = false
                    return tag
                })
            } catch (e) {
                console.error('Failed to load tags to service', e)
            }
        } else {
            // Also set selected = false on all initial tags
            tagService.tags = initialTags.map(t => {
                const tag = Tags.fromPlainObject(t)
                tag.selected = false
                return tag
            })
        }
        return tagService
    })

    useEffect(() => {
        const plainTags = tags.map(t => t.toPlainObject())
        localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(plainTags))
    }, [tags])  

    // useEffect(() => {
        
    // }, [])

    const selectedTag = useCallback(() => {
        return service.getSelectedTag()
        // return {
        //     id:'Quick',
        //     label:'Quick',
        //     selected:true
        // }
    }, [service])


    const addTag = useCallback((label, selected) => {
        
        const newTag = service.addTag(label, selected)
        setTags(prev => [...prev, newTag])
    }, [service])

    const updateTag = useCallback((id, newTag) => {
        service.updateTag(id, newTag)
        setTags(prev => prev.map(t => t.id === id ? Tags.fromPlainObject(t.toPlainObject()) : t))
    }, [service])

    const deleteTag = useCallback((id) => {
        service.deleteTag(id)
        setTags(prev => prev.filter(t => t.id !== id))
    }, [service])
    

    const toggleTag = useCallback((id) => {
        // console.log(tags)
        // console.log('toggleTag', id)
        const updatedTag = service.toggleTag(id)
        // console.log('updatedTag', updatedTag)
        if (updatedTag) {
            setTags(prev => prev.map(t => t.id === id ? updatedTag : t))
        }
    }, [service])


return {
    tags: tags.map(t => t.toPlainObject()),
    selectedTag:selectedTag(),
    addTag,
    updateTag,
    deleteTag,
    toggleTag
}
}