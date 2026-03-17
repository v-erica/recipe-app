function RecipeList({
  loading,
  recipes,
  activeRecipe,
  onSelectRecipe,
  onRemoveRecipe,
}) {
  return (
    <section className="recipe-list" aria-label="Recipe list">
      <h2>Recipes</h2>
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="empty-state">No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <article
            key={recipe.id}
            className={`recipe-card ${
              activeRecipe && activeRecipe.id === recipe.id ? 'active' : ''
            }`}
            onClick={() => onSelectRecipe(recipe.id)}
            role="button"
            tabIndex={0}
          >
            <img className="recipe-thumb" src={recipe.image} alt={recipe.title} />
            <div className="recipe-title">{recipe.title}</div>
            <div className="recipe-meta">
              {recipe.cuisine} • {recipe.difficulty}
            </div>
            <button
              type="button"
              className="recipe-delete"
              onClick={(event) => {
                event.stopPropagation()
                onRemoveRecipe(recipe.id)
              }}
            >
              Remove
            </button>
          </article>
        ))
      )}
    </section>
  )
}

export default RecipeList
