/* eslint-disable import/default */

require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

if (module.hot) {
  module.hot.accept('./bla/bla', () => {
    // not figured out how to use this feature yet
  });
}
