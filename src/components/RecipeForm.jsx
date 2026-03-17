import { useEffect, useMemo, useRef } from 'react'

function RecipeForm({
  newRecipe,
  onFieldChange,
  onSubmit,
  submitting,
  status,
  isOpen,
  onOpen,
  onClose,
}) {
  const editorRef = useRef(null)

  const plainInstructionText = useMemo(() => {
    return String(newRecipe.instructions || '')
      .replace(/<[^>]+>/g, '')
      .trim()
  }, [newRecipe.instructions])

  useEffect(() => {
    if (!isOpen) return

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || !editorRef.current) return
    if (editorRef.current.innerHTML !== (newRecipe.instructions || '')) {
      editorRef.current.innerHTML = newRecipe.instructions || ''
    }
  }, [isOpen, newRecipe.instructions])

  const updateInstructions = (value) => {
    onFieldChange({
      target: { name: 'instructions', value },
    })
  }

  const applyFormat = (command) => {
    if (!editorRef.current) return
    editorRef.current.focus()
    document.execCommand(command)
    updateInstructions(editorRef.current.innerHTML)
  }

  return (
    <>
      <div className="form-trigger-row">
        <button type="button" className="open-form-btn" onClick={onOpen}>
          Add Recipe
        </button>
        {status ? <p className="status-message">{status}</p> : null}
      </div>

      {isOpen ? (
        <div className="recipe-modal-backdrop" onClick={onClose}>
          <section
            className="recipe-form recipe-modal"
            aria-label="Add recipe"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="recipe-form-header">
              <h2>Add a recipe</h2>
              <button
                type="button"
                className="close-modal-btn"
                onClick={onClose}
                aria-label="Close add recipe form"
              >
                Close
              </button>
            </div>

            <form onSubmit={onSubmit}>
              <input
                name="title"
                placeholder="Title"
                value={newRecipe.title}
                onChange={onFieldChange}
                required
              />
              <input
                name="cuisine"
                placeholder="Cuisine"
                value={newRecipe.cuisine}
                onChange={onFieldChange}
                required
              />
              <input
                name="difficulty"
                placeholder="Difficulty"
                value={newRecipe.difficulty}
                onChange={onFieldChange}
              />
              <input
                name="prepMinutes"
                type="number"
                placeholder="Prep minutes"
                min="0"
                value={newRecipe.prepMinutes}
                onChange={onFieldChange}
              />
              <input
                name="cookMinutes"
                type="number"
                placeholder="Cook minutes"
                min="0"
                value={newRecipe.cookMinutes}
                onChange={onFieldChange}
              />
              <input
                name="ingredients"
                placeholder="Ingredients (comma-separated)"
                value={newRecipe.ingredients}
                onChange={onFieldChange}
              />
              <input
                name="image"
                placeholder="Image URL"
                value={newRecipe.image}
                onChange={onFieldChange}
              />

              <div className="rich-editor-wrap">
                <label className="rich-editor-label" htmlFor="recipe-instructions-editor">
                  Instructions
                </label>
                <div className="rich-editor-toolbar" role="toolbar" aria-label="Text formatting">
                  <button type="button" onClick={() => applyFormat('bold')}>
                    Bold
                  </button>
                  <button type="button" onClick={() => applyFormat('italic')}>
                    Italic
                  </button>
                  <button type="button" onClick={() => applyFormat('insertUnorderedList')}>
                    Bullet List
                  </button>
                </div>
                <div
                  id="recipe-instructions-editor"
                  ref={editorRef}
                  className="rich-editor"
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="Write detailed cooking steps here..."
                  onInput={(event) => updateInstructions(event.currentTarget.innerHTML)}
                />
                <p className="rich-editor-hint">
                  {plainInstructionText.length} characters
                </p>
              </div>

              <button type="submit" disabled={submitting}>
                {submitting ? 'Adding...' : 'Add Recipe'}
              </button>
            </form>
          </section>
        </div>
      ) : null}
    </>
  )
}

export default RecipeForm
