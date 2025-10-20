# Todo List Webapp
Note: After a few weeks of casual development, I just realized that I think I structured this entire project incorrectly (subconsciously entered the Java OOP mindset).<br>
Please excuse me while I ~~go bash my head against a wall~~ restructure basically everything so that the module structure actually make sense.

# npm-webpack-template
Repository Template for npm Webpack stuff.

## npm scripts included:
`npm run build`<br>
The equivalent of `npx webpack --config webpack.prod.js`.<br>
Bundles everything in `src` into `dist`.

`npm run dev`<br>
The equivalent of `npx webpack serve --config webpack.dev.js`.<br>
Opens a webpack server for viewing changes in real time without needing to build.<br>
Server link: http://localhost:8080/

## To remove image file loader module:
This template includes the module "html-loader" for loading image files.

If you don't use image files, you can remove this module with:<br>
`npm uninstall html-loader`<br>
or<br>
`npm uninstall --save html-loader`

This command tells npm to remove the package from your `package.json`, `npm-shrinkwrap.json`, and `package-lock.json` files.<br>
The `--save` is optional in most cases (it's the default option).
