import React, { useState, createContext } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList,setFavoritesList] = useState([])

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
      const data = await res.json();

      console.log("Fetched recipes:", data.data.recipes); // Log the fetched recipes

      if (data?.data?.recipes) {
        setRecipeList(data.data.recipes);
        console.log("recipeList state updated:", data.data.recipes); // Log the updated recipeList
      } else {
        console.log("No recipes found in response.");
        setRecipeList([]); // Ensure recipeList is reset if no recipes are found
      }
    } catch (e) {
      console.log("Error fetching recipes:", e); // Log any errors
    } finally {
      setLoading(false); // Stop loading
      setSearchParam(''); // Clear search input
    }
  }

  function handleAddToFavorite(getCurrentItem){
    console.log(getCurrentItem);
    let cpyFavoritesList =[...favoritesList]
    const index  =cpyFavoritesList.findIndex(item=> item.id ===getCurrentItem.id)
    if(index === -1){
      cpyFavoritesList.push(getCurrentItem)
    }else{
      cpyFavoritesList.splice(index)
    }
    setFavoritesList(cpyFavoritesList)
  }

  return (
    <GlobalContext.Provider value={{ loading, recipeList, searchParam, setSearchParam, handleSubmit, recipeDetailsData, setRecipeDetailsData,favoritesList,setFavoritesList,handleAddToFavorite }}>
      {children}
    </GlobalContext.Provider>
  );
}
