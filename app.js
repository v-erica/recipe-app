import express from "express";
import morgan from "morgan";
import { RECIPES, sanitizeRecipe } from "./src/data/recipes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/recipes", (req, res) => {
  const recipes = RECIPES.map(sanitizeRecipe).filter(Boolean);
  res.status(200).json(recipes);
});

app.post("/api/recipes", (req, res) => {
  const {
    title,
    cuisine,
    difficulty,
    prepMinutes,
    cookMinutes,
    ingredients,
    instructions,
    image,
  } = req.body || {};

  if (!title || !cuisine) {
    return res.status(400).send("title and cuisine are required");
  }

  const parsedPrepMinutes = Number(prepMinutes);
  const parsedCookMinutes = Number(cookMinutes);
  const nextId =
    RECIPES.reduce((maxId, recipe) => Math.max(maxId, Number(recipe.id) || 0), 0) + 1;
  const nextRecipe = {
    id: nextId,
    title,
    cuisine,
    difficulty: difficulty || "Medium",
    prepMinutes: Number.isNaN(parsedPrepMinutes) ? 0 : parsedPrepMinutes,
    cookMinutes: Number.isNaN(parsedCookMinutes) ? 0 : parsedCookMinutes,
    ingredients: Array.isArray(ingredients)
      ? ingredients
      : typeof ingredients === "string"
        ? ingredients
            .split(",")
            .map((ingredient) => ingredient.trim())
            .filter(Boolean)
        : [],
    instructions: instructions || "No instructions provided.",
    image: image || sanitizeRecipe({}).image,
  };

  RECIPES.push(nextRecipe);
  res.status(201).json(sanitizeRecipe(nextRecipe));
});

app.delete("/api/recipes/:id", (req, res) => {
  const recipeId = Number(req.params.id);
  const index = RECIPES.findIndex((recipe) => Number(recipe.id) === recipeId);

  if (index === -1) {
    return res.status(404).send("Recipe not found");
  }

  const [deleted] = RECIPES.splice(index, 1);
  res.status(200).json(sanitizeRecipe(deleted));
});

app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      return res.status(400).send(err.message);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

export default app;
