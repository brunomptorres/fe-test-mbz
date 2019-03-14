THIS IS A CONFIDENTIAL EXERCISE, WHICH IS PART OF A RECRUITING PROCESS AND AS SUCH, IT SHOULD NOT BE SHARED, DISTRIBUTED OR EXPOSED ANYWHERE. DOING SO, WILL AUTOMATICALLY DISQUALIFY YOU FROM THE PROCESS.


**This is an important document for your future career. Please read *carefully* through *all* of the following instructions before you begin with the implementation.**

This test is targeted at two different levels: Junior Frontend Developers and Frontend Heroes. Reading through this document + setup should take ~20min. *Please choose your own level.*

Also, please keep in mind that your handed in code will form the basis of the next steps in the formal recruiting process. It is therefore only in your own best interest to be able to explain every code decision you took.

## Table of Contents

## Whom we're looking for

At Daimler we develop high quality websites that covers a broad range of necessities. Which is why we expect our developers to feel at home in all areas of modern Frontend development. Expressive markup, crossbrowser/crossdevice working CSS styles and lean JavaScript code should therefore be on your high priority list.

## Setup your system

### node.js v6.x

You will need [node.js](https://nodejs.org) v6.x. In case you want to manage several node versions on your machine, we recommend [nvm](https://github.com/creationix/nvm) for Mac/*nix and [nodist](https://github.com/marcelklehr/nodist) for Windows.

### Install NPM packages and run build

Once you have node.js installed, open up your OS's Terminal/Bash application, change into the root folder of the test (where the file `package.json` is located) and run `npm install`.

After all NPM packages installed successfully, the build process will automatically trigger (you can do that manually by running `npm run build`). It will execute [linters](http://stackoverflow.com/questions/8503559/what-is-linting#8503586) for JavaScript, CSS and HTML and also pre-process SASS files and convert them to CSS. Please note that you will need a *working Internet connection* to run the HTML linter.

At this point you should get no errors which means that all linters successfully passed your code.

### IDE configuration

Please configure your IDE to use the [`.editorconfig`](http://editorconfig.org/#download), [`.stylelintrc`](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/complementary-tools.md#editor-plugins) and [`.eslintrc`](http://eslint.org/docs/user-guide/integrations#editors) files you find in the project's root folder. This way you will see you linting errors directly in your IDE.

### Helper tools

We've got NPM scripts prepared that can help you while you are developing.

Open up for each of the following commands a tab (or session) in your OS's Terminal/Bash application and run them from within the root folder of this test (where the `package.json` file is located).

* `npm run watch:lint` - starts the linters in watch mode; meaning on every file change the linters will run and give you instant feedback if there's something to improve
* `npm run watch:css`
    - every fill change on any `*.scss` file will trigger the SASS pre-processor and generate a CSS file
    - afterwards all CSS files be passed to [autoprefixer](https://github.com/postcss/autoprefixer) which removes the necessity for you to care about browser vendor prefixes

### Troubleshooting

If you experience problems during the setup please *STOP* and send a message to the human resource employee you are in contact with, describing your steps and pasting the error log of your Terminal/Bash application.

## What we expect from your code

### Browsers it should work in and display correctly

* Latest Chrome
* Latest Firefox

### Where should I place my files?

We've got an initial folder and file structure in `src` prepared for you:

* `index.html` - HTML file with prepared markup and included assets.
* `main.js` - this should be your main JS file which coordinates other JS modules
* `styles.scss` - this file will be taken as the entry point once you run any css related tasks like `npm run css` or `npm run watch:css`
* `themes/default`
    * `default.scss` - here you can find predefined mixins, variables and classes that will help you to implement the required design as fast as possible. *Please read carefully through this file so you don't have to reinvent the wheel.*
* `components/breadcrumbs`
* `components/footer`
* `components/header`
* `components/page`
* `components/shop`
* `components/shoppingcart`
    * `shoppingcart.js`
    * `shoppingcart.model.js` - *only important for Frontend Heroes*
    * `shoppingcart.model.test.js` - *only important for Frontend Heroes*
    * `shoppingcart.scss`
* `libs-polyfills` - place external JavaScript (e.g. jQuery) or CSS/SCSS libraries in here

Feel free to adapt everything except for `shoppingcart.model.test.js`.

### Coding guidelines

1. HTML markup
    Make sure the document contains semantically correct HTML5 markup [[help]](http://html5doctor.com/lets-talk-about-semantics/).

2. Accessibility
    - fully functional with keyboard
    - tab navigation follows a logical flow
    - use buttons where buttons are needed [[help]](https://medium.com/shopify-ux/semantic-html-the-unbearable-rightness-of-being-9b3c493e1791)
    - correct usage of ARIA landmark roles [[help](https://www.paciellogroup.com/blog/2013/02/using-wai-aria-landmarks-2013/)]

3. CSS
    - We kindly ask you to use SASS.
    - Your CSS should be markup independent. E.g. no class names as `.h1` or `.table`.
    - Your SASS code should be split into modules. Use the prepared folder structure `src/components/*` and add into each component a new `.scss` file with the component's name. E.g. within `src/components/breadcrumbs` you want to add `breadcrumbs.scss`.
    - make sure your selectors have a low specificity [[help]](https://medium.com/@dte/understanding-css-selector-specificity-a02238a02a59)
    - Twitter Bootstrap or similar component frameworks are not allowed, however utility libraries such as [breakpoint-sass](https://www.npmjs.com/package/breakpoint-sass) or [PostCSS + plugins](https://github.com/postcss/postcss) can be used
    - avoid **deeply** nested selectors for more modular CSS [[help](http://thesassway.com/intermediate/avoid-nested-selectors-for-more-modular-css) and [[help](http://thesassway.com/advanced/modular-css-an-example#striking-a-balance)]

4. JavaScript
    - jQuery is allowed (or other libraries that might help you with DOM manipulation), but *no frameworks*
    - avoid generating completely new HTML structures from within JavaScript

### Can I use additional NPM packages?

Yes, as long as the points from the above section [Coding guidelines](#coding-guidelines) are not violated.

## Requirements

### Junior Developers *and* Frontend Heroes

1. HTML markup

    Lucky you! Most of it is already prepared. However, probably you will have to add new markup to achieve the required design.

2. Dynamic behavior
    - initially only the shop with its items is shown; the shopping cart form is hidden
    - the shopping cart form will become visible once the first shop item was added; however it will also become invisible, when there's no item in the shopping cart; at the same time the "empty shopping cart" disappears
    - when the user clicked on the `Add to cart` button, the according shop item is added to the cart or the quantity of an already listed item is increased
    - clicking on the `Remove` button should remove the according item from the shopping cart
    - clicking on the `+` and `-` quantity buttons should change all relevant numbers
    - clicking on the "Proceed to Checkout" button will make it inactive and replace its label with "Sending your order..."

3. The title image (`src/themes/default/title.*.jpg`) changes according to the pixel density and viewport width. For `2dppx` use the one that carries `2x` in its name.

4. The website should look the same in the required browsers.

### *Only* Junior Developers

5. Please make it look like [small_viewport.png](design/small_viewport.png) using the provided measurements ([small viewport](design/small_viewport_measurements.png) and referenced [large viewport](design/large_viewport_measurements.png)).

Reminder: We expect semantically correct HTML5 and markup independent CSS.

6. Bonus - *We will only take that into consideration when all of the above points work as expected.*
    - Create a parallax effect on the title image [[help](http://keithclark.co.uk/articles/pure-css-parallax-websites/#update-25-feb-2015)].

### *Only* Frontend Heroes

5. Leave an empty file named "I AM A FRONTEND HERO" in the root folder.

6. Configuration
    - Remove `/* eslint-disable */` from the top of the file `components/shoppingcart/shoppingcart.model.js`
    - add within the `.eslintrc` file to the `rules` property `"complexity": ["error", 4]`
    - add to the script task `build` the task `test` so ends up looking like `"build": "npm-run-all lint css test"`

7. JavaScript
    - Write your code in `components/shoppingcart/shoppingcart.model.js` so that at least 10 tests of the test suite in `components/shoppingcart/shoppingcart.model.test.js` pass ([test-ideal-outcome.png](design/test-ideal-outcome.png)).
    - The rest of the code you need to interact with the DOM should be placed in `components/shoppingcart/shoppingcart.js`.
    - Run the test suite with `npm run test` or `npm run watch:test`.

8. Please make it look like [large_viewport.png](design/large_viewport.png) using the provided [measurements](design/large_viewport_measurements.png). Large viewports start at 800px; the design for smaller viewports remains unstyled.

9. Bonus - *We will only take that into consideration when all of the above points work as expected.*
    - Add new tasks to minify the HTML, CSS and JavaScript files and put the result in a `dist` folder at the root level. It should also clean the `dist` folder before each run. Make sure the above happens as part of the `build` task.

## What are you expected to hand in?

Please remember, when running `npm run build` there should be *no errors*. Take your time to make it work.

Finally, prepare a zip archive with your solution which you send back as an email to the human resource employee you are in contact with and tell her/him if you ultimately applied as a Junior Frontend Developer or as a Frontend Hero. *PLEASE DO NOT INCLUDE THE `node_modules` folder*.

Good luck :-)
