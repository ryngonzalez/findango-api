var FeedParser = require('feedparser-promised');
var utils = require('./utils.js')

var Findango = {
  find: function(options) {
    var zipCode = options.zipCode
    if (zipCode) {
      return FeedParser.parse(utils.urlFromZipCode(zipCode))
                       .then(utils.formatResponse)
                       .catch(utils.handleError);
    } else {
      console.error('`zipCode` not provided.');
    }
  }
}

module.exports = Findango;
