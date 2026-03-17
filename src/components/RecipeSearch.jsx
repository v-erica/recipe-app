function RecipeSearch({ query, onQueryChange }) {
  return (
    <input
      className="search-input"
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      placeholder="Search by title, cuisine, or ingredient"
      aria-label="Search recipes"
    />
  )
}

export default RecipeSearch
