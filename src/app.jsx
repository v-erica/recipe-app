import { useEffect, useMemo, useState } from 'react'
import './App.css'
import RecipeDetail from './RecipeDetail'
import AppHeader from './components/AppHeader'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'
import RecipeSearch from './components/RecipeSearch'

const FALLBACK_RECIPES = [
  {
    id: 1,
    title: 'Lemon Garlic Pasta',
    cuisine: 'Italian',
    difficulty: 'Easy',
    prepMinutes: 10,
    cookMinutes: 15,
    ingredients: [
      '8 oz pasta',
      '2 tbsp butter',
      '3 cloves garlic',
      '1 lemon',
      '2 tbsp parsley',
      '1 tsp chili flakes',
    ],
    instructions:
      'Cook pasta until al dente. Sauté garlic in butter, add lemon zest and juice, then toss with pasta and parsley.',
    image:
      'https://bowl-me-over.com/wp-content/uploads/2021/01/Easy-Lemon-Garlic-Pasta-Recipe.jpg',
  },
  {
    id: 2,
    title: 'Chicken Stir-Fry',
    cuisine: 'Asian',
    difficulty: 'Medium',
    prepMinutes: 20,
    cookMinutes: 12,
    ingredients: [
      '2 chicken breasts',
      '1 red bell pepper',
      '1 cup broccoli',
      '2 tbsp soy sauce',
      '1 tbsp ginger',
      '2 tbsp sesame oil',
    ],
    instructions:
      'Slice chicken and vegetables. Stir-fry chicken until golden, then add vegetables and sauce. Serve with rice.',
    image:
      'https://art.whisk.com/image/upload/fl_progressive,h_560,w_560,c_fill,dpr_2.0/v1634591407/recipe/d5c8f82ded7dc45b203095888e70413a.jpg',
  },
  {
    id: 3,
    title: 'Avocado Toast',
    cuisine: 'Breakfast',
    difficulty: 'Easy',
    prepMinutes: 5,
    cookMinutes: 5,
    ingredients: [
      '2 slices sourdough',
      '1 ripe avocado',
      '1 tsp lemon',
      'Red pepper flakes',
      'Salt',
    ],
    instructions:
      'Toast bread, mash avocado with lemon and salt, spread on toast, and top with pepper flakes.',
    image:
      'https://cookieandkate.com/images/2017/04/avocado-pesto-toast-with-tomatoes.jpg',
  },
  {
    id: 4,
    title: 'Berry Yogurt Parfait',
    cuisine: 'Dessert',
    difficulty: 'Easy',
    prepMinutes: 8,
    cookMinutes: 0,
    ingredients: [
      '1 cup Greek yogurt',
      '1/2 cup granola',
      '1/2 cup berries',
      '1 tbsp honey',
    ],
    instructions:
      'Layer yogurt, berries, and granola in a glass. Drizzle honey on top and repeat for another layer.',
    image:
      'https://eatingisart.com/wp-content/uploads/2024/09/berry-parfait-recipe-1726575299.jpg',
  },
  {
    id: 5,
    title: 'Fruit Loops Cereal Bowl',
    cuisine: 'Breakfast',
    difficulty: 'Easy',
    prepMinutes: 2,
    cookMinutes: 0,
    ingredients: ['1 cup Fruit Loops cereal', '3/4 cup cold milk'],
    instructions:
      'Pour Fruit Loops into a bowl. Add cold milk and serve immediately while the cereal is still crisp.',
    image:
      'https://i2.pickpik.com/photos/608/913/149/food-eat-diet-froot-loops-cf7bb5c852ed8ce47f8323cc6c3a4a57.jpg',
  },
]

const getDefaultRecipeId = (list) => {
  const defaultRecipe = list.find((recipe) =>
    String(recipe.title || '').toLowerCase().includes('fruit loops')
  )
  return defaultRecipe?.id || list[0]?.id || 0
}

const normalizeRecipeList = (payload) => {
  if (!payload) return []

  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(payload.recipes)
      ? payload.recipes
      : Array.isArray(payload.data)
        ? payload.data
        : []

  return list
    .filter((item) => item && typeof item === 'object')
    .map((recipe, index) => ({
      id: Number(recipe.id) || index + 1,
      title: recipe.title || 'Untitled Recipe',
      cuisine: recipe.cuisine || 'Various',
      difficulty: recipe.difficulty || 'Medium',
      prepMinutes: Number(recipe.prepMinutes) || 0,
      cookMinutes: Number(recipe.cookMinutes) || 0,
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.filter(Boolean).map(String)
        : [],
      instructions: recipe.instructions || 'No instructions provided.',
      image:
        typeof recipe.image === 'string' && recipe.image.trim()
          ? recipe.image
          : FALLBACK_RECIPES[index % FALLBACK_RECIPES.length]?.image ||
            'https://images.unsplash.com/photo-1490645935967-10de6df4f0c5?auto=format&fit=crop&w=800&q=80',
    }))
}

function App() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState(0)
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    cuisine: '',
    difficulty: 'Easy',
    prepMinutes: '',
    cookMinutes: '',
    ingredients: '',
    instructions: '',
    image: '',
  })

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes')
        if (!response.ok) {
          throw new Error('Could not load recipes')
        }
        const data = await response.json()
        const recipeData = normalizeRecipeList(data)
        setRecipes(recipeData)
        setActiveId(getDefaultRecipeId(recipeData))
        if (recipeData.length === 0) {
          setError('No recipes found from the API. Showing sample recipes.')
          setRecipes(FALLBACK_RECIPES)
          setActiveId(getDefaultRecipeId(FALLBACK_RECIPES))
        } else {
          setError('')
        }
      } catch (err) {
        setError(`${err.message}. Showing sample recipes instead.`)
        setRecipes(FALLBACK_RECIPES)
        setActiveId(getDefaultRecipeId(FALLBACK_RECIPES))
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }))
  }

  const addRecipe = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setStatus('')

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newRecipe,
          instructions:
            String(newRecipe.instructions || '')
              .replace(/<[^>]+>/g, '')
              .trim().length > 0
              ? newRecipe.instructions
              : '',
          prepMinutes: Number(newRecipe.prepMinutes),
          cookMinutes: Number(newRecipe.cookMinutes),
          ingredients: newRecipe.ingredients
            .split(',')
            .map((ingredient) => ingredient.trim())
            .filter(Boolean),
        }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Could not save recipe')
      }

      const savedRecipe = await response.json()
      setRecipes((prevRecipes) => [...prevRecipes, savedRecipe])
      setActiveId(savedRecipe.id)
      setNewRecipe({
        title: '',
        cuisine: '',
        difficulty: 'Easy',
        prepMinutes: '',
        cookMinutes: '',
        ingredients: '',
        instructions: '',
        image: '',
      })
      setError('')
      setStatus('Recipe added.')
      setIsFormOpen(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const removeRecipe = async (recipeId) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Could not delete recipe')
      }

      setRecipes((prevRecipes) => {
        const nextRecipes = prevRecipes.filter((recipe) => recipe.id !== recipeId)
        if (activeId === recipeId) {
          const deletedIndex = prevRecipes.findIndex(
            (recipe) => recipe.id === recipeId
          )
          const nextRecipe = nextRecipes[deletedIndex] || nextRecipes[deletedIndex - 1]
          setActiveId(nextRecipe?.id || 0)
        }
        return nextRecipes
      })
      setError('')
      setStatus('Recipe removed.')
    } catch (err) {
      setError(err.message)
    }
  }

  const normalizedQuery = query.toLowerCase()
  const visibleRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const searchText =
        String(recipe.title || '')
          .toLowerCase() +
        ' ' +
        String(recipe.cuisine || '')
          .toLowerCase() +
        ' ' +
        (Array.isArray(recipe.ingredients)
          ? recipe.ingredients.join(' ').toLowerCase()
          : '')
      return searchText.includes(normalizedQuery)
    })
  }, [normalizedQuery, recipes])

  const activeRecipe =
    visibleRecipes.find((recipe) => recipe.id === activeId) || visibleRecipes[0]

  return (
    <main className="recipe-app">
      <AppHeader />
      <RecipeSearch query={query} onQueryChange={setQuery} />
      <RecipeForm
        newRecipe={newRecipe}
        onFieldChange={handleFieldChange}
        onSubmit={addRecipe}
        submitting={submitting}
        status={status}
        isOpen={isFormOpen}
        onOpen={() => setIsFormOpen(true)}
        onClose={() => setIsFormOpen(false)}
      />

      {!loading && error ? (
        <p className="empty-state" role="status">
          {error}
        </p>
      ) : null}

      <div className="recipe-layout">
        <RecipeList
          loading={loading}
          recipes={visibleRecipes}
          activeRecipe={activeRecipe}
          onSelectRecipe={setActiveId}
          onRemoveRecipe={removeRecipe}
        />

        <section className="recipe-detail" aria-label="Recipe detail">
          <RecipeDetail recipe={activeRecipe} />
        </section>
      </div>
    </main>
  )
}

export default App
