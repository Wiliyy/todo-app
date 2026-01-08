import React, { useEffect, useRef, useState } from 'react'
import '../styles/FilterButtons.css'

function TagsButtons({ todos , selectedTag, tags, setTags, error, setError, isFormVisible, input, setInput, handleTaskCount , currentTag, onTagChange , onUpdateTag , onDeleteTag }) {

    const [editingTagId, setEditingTagId] = useState(null)
    const [editTagText, setEditTagText] = useState('')
    const pressTimerRef = useRef(null)

    const startPress = (tagId, tagLabel) => {
        pressTimerRef.current = setTimeout(() => {
            setEditingTagId(tagId)
            setEditTagText(tagLabel)
        }, 600)
        if (selectedTag?.id === tagId) {
            onTagChange(null)
        }
        
        // Also update tags array to unselect it
        setTags(tags.map(tag => 
            tag.id === tagId ? { ...tag, selected: false } : tag
        ))
    }

    const cancelPress = () => {
        if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current)
            pressTimerRef.current = null
        }
    }

    const handleSaveTag = (tagId) => {
        if (editTagText.trim() && editTagText.trim() !== tags.find(t => t.id === tagId)?.label) {
            if (onUpdateTag) {
                onUpdateTag(tagId, editTagText.trim())
            }
            // Update local tags state
            setTags(tags.map(tag => 
                tag.id === tagId ? { ...tag, label: editTagText.trim() } : tag
            ))
        }
        setEditingTagId(null)
        setEditTagText('')
    }

    const handleCancelEdit = () => {
        setEditingTagId(null)
        setEditTagText('')
    }


    const handleFilterClass = (item) => {
        return `filter-buttons-button ${item.selected ? 'filter-buttons-button-active' : ''}`
    }

    const handleDeleteTag = (tagId) => {
        if (selectedTag?.id === tagId) {
            onTagChange(null)
        }
        
        // Also update tags array to unselect it
        setTags(tags.map(tag => 
            tag.id === tagId ? { ...tag, selected: false } : tag
        ))
        // Count tasks that will be deleted
        const tasksWithTag = todos.filter(t => t.tag === tagId)
        const confirmMessage = `Delete tag "${tagId}" and ${tasksWithTag.length} task(s)?`
        if (!window.confirm(confirmMessage)) {
            return // User cancelled
        }
        
        
        
        // Delete all tasks with this tag
        if (onDeleteTag) {
            onDeleteTag(tagId)
        }
        
        // Remove from tags list
        setTags(tags.filter(tag => tag.id !== tagId))
        
        // If deleted tag was selected, clear selection
        if (selectedTag?.id === tagId) {
            onTagChange(null)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.trim() === '') {
            return
        }
        if (tags.some(tag => tag.id === input)) {
            setError("Input is empty or already exists")
            return
        }
        setTags([
            ...tags.map(tag => ({ ...tag, selected: false })),
            { id: input, label: input, selected: true }
        ])
        setInput('')
    }

    return (
        <form
            style={{ zIndex: isFormVisible ? -1 : 1 }}
            onSubmit={handleSubmit} 
            className='filter-buttons-container'
        >
            <h1 className='filter-buttons-title'> CATEGORIES {selectedTag ? `(${selectedTag.label})` : ''}</h1>
            <div className='filter-buttons'>
                {tags.map((tag, index) => {
                    const isEditing = editingTagId === tag.id
                    
                    if (isEditing) {
                        return (
                            <div key={tag.id} className={handleFilterClass(tag)} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: 'var(--button-color)',
                                color: 'var(--text-color)',
                                borderRadius: '9999px',
                                padding: '0 0.5cap',
                                fontSize: '11px',
                                width: '300px',
                                height: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0 0.5cap',
                                margin: '0 0.5cap',
                                border: '1px solid var(--button-color)',
                                borderRadius: '9999px',
                            }}>
                                <input
                                    className="filter-buttons-button-label"
                                    value={editTagText}
                                    onChange={(e) => setEditTagText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSaveTag(tag.id)
                                        if (e.key === 'Escape') handleCancelEdit()
                                    }}
                                    autoFocus
                                    style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1 }}
                                />
                                <button 
                                    type="button"
                                    onClick={() => handleSaveTag(tag.id)}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                    ✓
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleCancelEdit}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                    ✕
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => handleDeleteTag(tag.id)}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                <span className='filter-buttons-button-count'>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                                </span>
                                        </button>
                            </div>
                        )
                    }

                    return (
                        <button
                            key={tag.id}
                            type="button"
                            className={handleFilterClass(tag)}
                            onClick={() => { onTagChange(tag.id) ; handleCancelEdit()}}
                            onMouseDown={() => startPress(tag.id, tag.label)}
                            onMouseUp={cancelPress}
                            onMouseLeave={cancelPress}
                            onTouchStart={() => startPress(tag.id, tag.label)}
                            onTouchEnd={cancelPress}
                            onTouchCancel={cancelPress}
                        >
                            <span className='filter-buttons-button-label'>
                                {tag.label}
                            </span>
                          { (tag.selected && handleTaskCount("active") > 0) &&  
                            <span className='filter-buttons-button-count'>
                                {  handleTaskCount("active") }
                            </span>
                                }
                        </button>
                    )
                })}
                {(tags.length === 0 || tags[tags.length - 1]?.id !== '') && !isFormVisible && (
                    <input
                        className={handleFilterClass({ id: '', selected: false })}
                        placeholder='+'
                        type='text'
                        value={input}
                        onChange={(e) => { setInput(e.target.value); setError('') }}
                        onClick={(e) => { e.stopPropagation() }}
                        onBlur={() => { setError('') }}
                    />
                )}
            </div>
            {error && <p className='filter-buttons-error'>{error}</p>}
        </form>
    )
}

export default TagsButtons