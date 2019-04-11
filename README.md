
# 📦 importly ⚙

***import map generator / web package manager***  
&nbsp;&nbsp;&nbsp; *early prototype*  
&nbsp;&nbsp;&nbsp; *see github issues*

## primer, backstory, rationale

- let's pretend we're in the future
- we'll write modern es modules
- we'll throw out our build step; no transpiling, no bundling
- we'll load dependencies directly from high-performance worldwide cdn's
- we'll stop using npm to locally download node_modules
- we'll use import maps to tell the browser where the dependencies are
- we'll use importly to track dependencies and generate import maps

### wait, why do we need import maps?

- in the traditional bundling ecosystem, we import stuff like this:

  ```js
  import {render, html} from "lit-html"
  ```

- ["import maps"](https://github.com/WICG/import-maps) is a browser feature allowing this pattern directly in a `<script type="module">` tag

- for the above example, we give the browser this import map:

  ```html
  <script type="importmap">
    {
      "imports": {
        "lit-html/": "https://unpkg.com/lit-html@1.0.0/",
        "lit-html": "https://unpkg.com/lit-html@1.0.0/lit-html.js",
      }
    }
  </script>
  ```

  and now the browser knows where to load `lit-html` when we import it ✔️

- awesome! now i've got good and bad news:
  - **bad news:** import maps hasn't landed in browsers yet
  - **good news:** guy bedford made a polyfill, [es-module-shims](https://github.com/guybedford/es-module-shims), that we can use today (what a hero!)

## introducing importly, a tool for generating import maps

1. `npm install -g importly`

2. list some packages in your project's `importly.config`

    ```
    ⚙ host 'unpkg'
    📦 lit-html
    📦 lit-element@2.1.0
    📦 mobx:jsdelivr
    📦 @babylonjs/core
    ```

3. run `importly < importly.config > dist/importmap.json`, and importly will generate a frozen importmap of your dependencies

    ```json
    {
      "imports": {
        "lit-html/": "https://unpkg.com/lit-html@1.0.0/",
        "lit-html": "https://unpkg.com/lit-html@1.0.0/lit-html.js",
        "lit-element/": "https://unpkg.com/lit-element@2.1.0/",
        "lit-element": "https://unpkg.com/lit-element@2.1.0/lit-element.js",
        "mobx/": "https://cdn.jsdelivr.net/npm/mobx@5.9.4/",
        "mobx": "https://cdn.jsdelivr.net/npm/mobx@5.9.4/lib/mobx.module.js",
        "@babylonjs/core/": "https://unpkg.com/@babylonjs/core@4.0.0-alpha.18/",
        "@babylonjs/core": "https://unpkg.com/@babylonjs/core@4.0.0-alpha.18/index.js"
      }
    }
    ```

4. follow [the es-module-shims readme](https://github.com/guybedford/es-module-shims) on how to use the import map onto your webpage

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

- if you're so dead inside, the emoji's are optional
  - config lines start with `⚙` or `$`
  - package statements start with `📦` or `&`
- the host setting tells importly from where to load the dependencies, currently supported:
  - `unpkg`
  - `jsdelivr`
- package statements have this format: `📦 name@version:host`
  - **name:** the name of an npm package, like `preact` or `lit-element`
  - **version:** the version number
  - **host:** the cdn service to load modules from (`unpkg` or `jsdelivr`)
- you can embed your importly config into a `package.json` under the key "importly"
  - can be a single string, or an array of strings (see this [package.json](package.json) for example)
  - then you just run `importly < package.json > dist/importmap.json`
- whitespace is ignored
