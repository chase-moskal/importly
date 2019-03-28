
# ⚙ importly 📦

***import map generator / web package manager***  
&nbsp;&nbsp;&nbsp; *early prototype, breaking changes coming soon*  
&nbsp;&nbsp;&nbsp; *see github issues*

## primer, backstory, and rationale

- **es modules have landed in browsers,** and we can import any npm package from cdn services like ([unpkg](https://unpkg.com/) and [jsdelivr](https://www.jsdelivr.com/))  
  ```html
  <!-- NO IMPORT MAP -->
  <script type="module">
    import {html} from "https://unpkg.com/lit-element@2.1.0/lit-element.js"
     // fails because lit-element.js imports "lit-html" (bare-specifier)
  </script>
  ```
- we can ditch our local `node_modules` and our build step altogether
- the problem is, browsers only support url imports like `"./module.js"` – bare-specifiers like `"mobx"` (common on npm) fail in browsers  
- **the solution is called ["import maps"](https://github.com/WICG/import-maps)**, a forthcoming browser feature which allows us to rewrite import url's.  
  with import maps, we can instruct the browser where to resolve bare-specifiers  
  like `"lit-html": "https://unpkg.com/lit-html@1.0.0/lit-html.js"`  
  ```html
  <script type="importmap" src="importmap.json"></script>
  <script type="module">
    import {html} from "lit-element"
     // succeeds because the import map resolves "lit-element"
     // and the sub-dependency "lit-html" to fully qualified urls
  </script>
  ```
- [**es-module-shims**](https://github.com/guybedford/es-module-shims) allows us to use import-maps today!
- sure, you can write your import maps by hand.. but what if you wanted something more maintainable?

## introducing importly

### a tool for generating import maps

1. `npm install -g importly`

2. list some packages in your project's `importly.config`

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
