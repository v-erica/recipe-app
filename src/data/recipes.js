export const DEFAULT_RECIPE_IMAGE =
  "https://images.unsplash.com/photo-1490645935967-10de6df4f0c5?auto=format&fit=crop&w=800&q=80";

export const sanitizeRecipe = (recipe) => {
  if (!recipe || typeof recipe !== "object") {
    return null;
  }

  return {
    id: Number(recipe.id) || 0,
    title: recipe.title || "Untitled Recipe",
    cuisine: recipe.cuisine || "Various",
    difficulty: recipe.difficulty || "Medium",
    prepMinutes: Number(recipe.prepMinutes) || 0,
    cookMinutes: Number(recipe.cookMinutes) || 0,
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    instructions: recipe.instructions || "No instructions provided.",
    image: recipe.image || DEFAULT_RECIPE_IMAGE,
  };
};

export const RECIPES = [
  {
    id: 1,
    title: "Lemon Garlic Pasta",
    cuisine: "Italian",
    difficulty: "Easy",
    prepMinutes: 10,
    cookMinutes: 15,
    ingredients: [
      "8 oz pasta",
      "2 tbsp butter",
      "3 cloves garlic",
      "1 lemon",
      "2 tbsp parsley",
      "1 tsp chili flakes",
    ],
    instructions:
      "Cook pasta until al dente. Sauté garlic in butter, add lemon zest and juice, then toss with pasta and parsley.",
    image:
      "https://bowl-me-over.com/wp-content/uploads/2021/01/Easy-Lemon-Garlic-Pasta-Recipe.jpg",
  },
  {
    id: 2,
    title: "Chicken Stir-Fry",
    cuisine: "Asian",
    difficulty: "Medium",
    prepMinutes: 20,
    cookMinutes: 12,
    ingredients: [
      "2 chicken breasts",
      "1 red bell pepper",
      "1 cup broccoli",
      "2 tbsp soy sauce",
      "1 tbsp ginger",
      "2 tbsp sesame oil",
    ],
    instructions:
      "Slice chicken and vegetables. Stir-fry chicken until golden, then add vegetables and sauce. Serve with rice.",
    image:
      "https://art.whisk.com/image/upload/fl_progressive,h_560,w_560,c_fill,dpr_2.0/v1634591407/recipe/d5c8f82ded7dc45b203095888e70413a.jpg",
  },
  {
    id: 3,
    title: "Avocado Toast",
    cuisine: "Breakfast",
    difficulty: "Easy",
    prepMinutes: 5,
    cookMinutes: 5,
    ingredients: [
      "2 slices sourdough",
      "1 ripe avocado",
      "1 tsp lemon",
      "Red pepper flakes",
      "Salt",
    ],
    instructions:
      "Toast bread, mash avocado with lemon and salt, spread on toast, and top with pepper flakes.",
    image:
      "https://cookieandkate.com/images/2017/04/avocado-pesto-toast-with-tomatoes.jpg",
  },
  {
    id: 4,
    title: "Berry Yogurt Parfait",
    cuisine: "Dessert",
    difficulty: "Easy",
    prepMinutes: 8,
    cookMinutes: 0,
    ingredients: ["1 cup Greek yogurt", "1/2 cup granola", "1/2 cup berries", "1 tbsp honey"],
    instructions:
      "Layer yogurt, berries, and granola in a glass. Drizzle honey on top and repeat for another layer.",
    image:
      "https://eatingisart.com/wp-content/uploads/2024/09/berry-parfait-recipe-1726575299.jpg",
  },
  {
    id: 5,
    title: "Fruit Loops Cereal Bowl",
    cuisine: "Breakfast",
    difficulty: "Easy",
    prepMinutes: 2,
    cookMinutes: 0,
    ingredients: ["1 cup Fruit Loops cereal", "3/4 cup cold milk"],
    instructions:
      "Pour Fruit Loops into a bowl. Add cold milk and serve immediately while the cereal is still crisp.",
    image:
      "https://i2.pickpik.com/photos/608/913/149/food-eat-diet-froot-loops-cf7bb5c852ed8ce47f8323cc6c3a4a57.jpg",
  },
];
