/* eslint-disable import/default,no-console */

import './favicon.ico'; // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import './angular-app';
import './hello/hello.controller';

/*
if (module.hot) {
  module.hot.accept('./bla/bla', () => {
    // not figured out how to use this feature yet
  });
}
*/
