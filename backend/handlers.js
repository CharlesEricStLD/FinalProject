const centerById = require("./handlers/centerById");
const allCentersByRegion = require("./handlers/allCentersByRegion")
const signin = require("./handlers/signIn")
const logIn = require("./handlers/logIn")
const addFavorite = require("./handlers/addFavorite")
const showFavorites = require("./handlers/showFavorites")
const addComment = require("./handlers/addComments")
const allCommentsAdmin = require("./handlers/allCommentsAdmin")
const approvedComment = require("./handlers/approvedComment")
const removeFavorite = require("./handlers/removeFavorite")
const allCentersInformation = require("./handlers/allCenterInformations")
const centerConditionsByName = require("./handlers/centerConditionsByName")
const allRegions = require("./handlers/alRegions")
module.exports = {
  centerById, 
  allCentersByRegion, 
  signin,
  logIn, 
  addFavorite, 
  showFavorites,
  addComment,
  allCommentsAdmin, 
  approvedComment,
  removeFavorite, 
  allCentersInformation,
  centerConditionsByName,
  allRegions
}
