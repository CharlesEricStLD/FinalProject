const centerById = require("./handlers/centerById");
const allCentersByRegion = require("./handlers/allCentersByRegion")
const signin = require("./handlers/signIn")
const logIn = require("./handlers/logIn")
const addFavorite = require("./handlers/addFavorite")
const showFavorites = require("./handlers/showFavorites")
const addComment = require("./handlers/addComments")

module.exports = {
  centerById, 
  allCentersByRegion, 
  signin,
  logIn, 
  addFavorite, 
  showFavorites,
  addComment,
}