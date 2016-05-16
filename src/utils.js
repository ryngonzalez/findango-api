var cheerio = require('cheerio');

var BASE_URL = 'http://www.fandango.com/rss/moviesnearme_';

/**
 * @param {string} zipCode Location you want to search around.
 * @return {string} The URL needed to make a request for movie theatres around you.
 */
function urlFromZipCode(zipCode) {
  return BASE_URL + zipCode + '.rss';
}

/**
 * @param {cheerio.load instance} descriptionHTML Cheerio instance you want to search within.
 * @return {array} Array of film titles and URLs to their showtimes for a given theatre.
 */
function getFilmsFromDescriptionHTML(descriptionHTML) {
  var films = []
  descriptionHTML('a').each(function(i) {
    films.push({
      title: descriptionHTML(this).text(),
      url: descriptionHTML(this).attr('href')
    });
  });
  return films;
}

/**
 * @param {string} description Fandango result description which contains theatre info.
 * @return {object} Object containing info about a theatre.
 */
function getInfoFromDescription(description) {
  var descriptionHTML = cheerio.load(description);
  return {
    location: descriptionHTML('p').first().text(),
    films: getFilmsFromDescriptionHTML(descriptionHTML)
  };
}

/**
 * @param {object} theatre Fandango result that describes a theatre.
 * @return {object} Info about a theatre and the films it's showing.
 */
function formatTheatre(theatre) {
  var theatreInfo = getInfoFromDescription(theatre.description)

  var formattedTheatre = {
    name: theatre.title,
    location: theatreInfo.location,
    films: theatreInfo.films
  };

  return formattedTheatre;
}

/**
 * @param {array} theatres Fandango results that describe available theatres.
 * @return {array} Info about theatres and the films they're showing.
 */
function formatResponse(theatres) {
  return theatres.map(formatTheatre);
}

/**
 * @param {string} error Error in parsing Fandango feed
 * @throws {error} Throws error to be caught by consumer.
 */
function handleError(error) {
  console.log('Findango.find Error: ', error);
  throw new Error(error);
}

module.exports = {
  urlFromZipCode: urlFromZipCode,
  getFilmsFromDescriptionHTML: getFilmsFromDescriptionHTML,
  getInfoFromDescription: getInfoFromDescription,
  formatTheatre: handleError,
  formatResponse: formatResponse,
  handleError: handleError,
}
