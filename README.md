# 🎥 findango-api
Wrapper for Fandango's "Nearby Movies" RSS feed.

## Usage

`Findango.find` returns a `Promise` that resolves to a set of theatre results:

```javascript
var Findango = require('findango-api')

Findango.find({
  zipCode: '94107'
}).then(theatres => {
  // Theatres have the format:
  // {
  //  name: '…',              // Name of theatre
  //  location: '…',          // Theatre address
  //  films: [{
  //    title: "Movie Title"  // Title of film
  //    url: '…'              // Fandango URL for showtimes
  //  }]
  // }
  renderApp(theatres);
});
```
