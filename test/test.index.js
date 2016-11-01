/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-21
 */

const context = require.context('../src', true, /\/__tests__\/test-.*\.ts$/);
context.keys().forEach(context);

// require all `src/**/index.js`
const appContext = require.context('../src', true, /[a-z\-]+\/[a-z]+\.ts$/);
appContext.keys().forEach(appContext);
