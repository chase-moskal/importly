
# 📦 importly

*concept web package manager*

primer and rationale
- es modules can load directly from web url's, and it's really cool
- various cdn's are now mirroring everything on npm, and with high performance ([unpkg](https://unpkg.com/) and [jsdelivr](https://www.jsdelivr.com/))
- this is the dawn of a new era, where we can finally shed a lot of old clumsy stopgap infrastructure and tooling
- we can ditch our `node_modules`
- we can drop our bundlers like `webpack` or `browserify`
- we can skip transpilers like `babel` or `typescript`
- welcome to the future... i hope it sounds scary to you... and i love it..
- **a forthcoming browser feature called [import-maps](https://github.com/WICG/import-maps) allows us to rewrite import url's,** which fixes the "bare specifier" problem (where all module specifiers must be url's, and so `preact` and `@babylonjs/core` were previously an issue)
- import-maps is paving the way for new modernized workflows by solving the web's native peer dependency problem
- *and we don't even have to wait!* [es-module-shims](https://github.com/guybedford/es-module-shims) allows us to use import-maps today!

**importly is a command-line tool to generate an import-map for your web page**
- and then, the browser knows where the packages are (on the web)
- now with import maps, we can import anything
  - `import {LitElement} from "lit-element"`
  - in this case, the import-map translates `"lit-element"` to `"https://unpkg.com/lit-element@2.1.0/lit-element.js"` for the import

## how to do

1. `npm install -g importly`

2. list some npm dependencies in your project's `importly.config`

    ```
    lit-html
    lit-element
    mobx
    ```

3. run `importly generate > dist/importmap.json`, and importly will generate a frozen importmap of your dependencies

    ```json
    {
      "imports": {
        "lit-html/": "https://unpkg.com/lit-html@1.0.0/",
        "lit-html": "https://unpkg.com/lit-html@1.0.0/lit-html.js",
        "lit-element/": "https://unpkg.com/lit-element@2.1.0/",
        "lit-element": "https://unpkg.com/lit-element@2.1.0/lit-element.js",
        "mobx/": "https://unpkg.com/mobx@5.9.0/",
        "mobx": "https://unpkg.com/mobx@5.9.0/lib/mobx.module.js"
      }
    }
    ```

4. follow [the es-module-shims readme](https://github.com/guybedford/es-module-shims) on how to install the import map onto your webpage

5. start coding like a boss

    ```js
    import {LitElement, html} from "lit-element"
    class MyElement extends LitElement {
      render() {
        html`<div>...</div>`
      }
    }
    ```

## notes

- each line of `importly.config` has the format: `name@version:host`

  - **name:** the name of an npm package, like `preact` or `lit-element`
  - **version:** the version number
  - **host:** the cdn service to load modules from (`unpkg` or `jsdelivr`)

- so you could tweak it like this (whitespace is ignored btw)

  ```
  lit-html
  lit-element@2.1.0:unpkg
  mobx:jsdelivr
  ```

- and then you'd get this

  ```json
  {
    "imports": {
      "lit-html/": "https://unpkg.com/lit-html@1.0.0/",
      "lit-html": "https://unpkg.com/lit-html@1.0.0/lit-html.js",
      "lit-element/": "https://unpkg.com/lit-element@2.1.0/",
      "lit-element": "https://unpkg.com/lit-element@2.1.0/lit-element.js",
      "mobx/": "https://cdn.jsdelivr.net/npm/mobx@5.9.0/",
      "mobx": "https://cdn.jsdelivr.net/npm/mobx@5.9.0/lib/mobx.module.js"
    }
  }
  ```
