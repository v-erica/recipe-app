function RecipeDetail({ recipe }) {
  if (!recipe) {
    return <p className="empty-state">Choose a recipe to view details.</p>
  }

  const safeIngredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : []
  const fallbackImage =
    'https://images.unsplash.com/photo-1490645935967-10de6df4f0c5?auto=format&fit=crop&w=800&q=80'
  const instructionHtml = String(recipe.instructions || '').trim()
  const safeInstructionHtml = instructionHtml
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '')

  return (
    <>
      <img
        className="recipe-photo"
        src={recipe.image || fallbackImage}
        alt={recipe.title || 'Untitled Recipe'}
      />
      <h2>{recipe.title || 'Untitled Recipe'}</h2>
      <p className="recipe-meta">
        {recipe.cuisine || 'Various'} | {recipe.difficulty || 'Medium'} | Prep {recipe.prepMinutes || 0} min | Cook {recipe.cookMinutes || 0} min
      </p>
      {safeInstructionHtml ? (
        <div
          className="recipe-instructions"
          dangerouslySetInnerHTML={{ __html: safeInstructionHtml }}
        />
      ) : (
        <p className="recipe-instructions">No instructions provided.</p>
      )}
      <h3>Ingredients</h3>
      {safeIngredients.length === 0 ? (
        <p className="empty-state">No ingredients listed.</p>
      ) : (
        <ul>
          {safeIngredients.map((ingredient, index) => (
            <li key={`${ingredient}-${index}`}>{ingredient}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default RecipeDetail
