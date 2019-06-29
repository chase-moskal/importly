
# 📦 importly 📡

*import map generator / web package manager*

first, i'll give a quick rundown, then i'll explain things in more detail

if you're not sure why you'd want an importmap, jump to the [*"primer, backstory, rational"*](#primer-backstory-rationale) heading

## importly.config

tell importly what to generate an import map for

```
📡 unpkg, jsdelivr
📦 mobx
📦 lit-html
📦 @babylonjs/core
📦 lit-element@^2.2.0
```

let me explain what comprises an `importly.config`

- **`📡` one host statement**  
  specify which CDN services to load packages from.  
  you list multiple hosts as fallbacks.  
  if you're dead inside, you can use `$` instead of `📡`

- **`📦` package statements**  
  specify an npm package name, and a semver range.  
  you can also use the `&` symbol instead of `📦`

*savvy?* in short, you just `npm i -g importly` and then run the importly cli on the config file, like `importly < importly.config > dist/importmap.json` — oh yeah and these days, you have to use the [es-module-shims](https://github.com/guybedford/es-module-shims) as a browser polyfill

the rest of the readme will explain the above in deeper detail

## primer, backstory, rationale

- we're in the future 🕶️
- we'll write modern es modules
- we'll throw out our build step; no transpiling, no bundling
- we'll load dependencies directly from high-performance worldwide cdn's
- we'll stop using npm to locally download node_modules
- we'll use import maps to tell the browser where the dependencies are
- we'll use importly to track dependencies and generate import maps

### so wait, why do we need import maps?

- in the traditional bundling ecosystem, we import stuff like this:

  ```js
  import {render, html} from "lit-html"
    //                         ^
    //          this is called a "bare specifier" import
  ```

- ["import maps"](https://github.com/WICG/import-maps) is a browser feature allowing bare specifier imports directly in a `<script type="module">` tag

- so, the above bare specifier import would fail without the following import map

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

- now guy bedford's amazing polyfill, [es-module-shims](https://github.com/guybedford/es-module-shims), allows us to step into the future of import maps today!

- we just need to author/generate the import maps...

## introducing importly, a tool for generating import maps

1. **install the importly cli**  
  `npm install -g importly`

2. **tell importly about your dependencies**  
  create your `importly.config` in your project root  
  such as: `📡 unpkg, jsdelivr 📦 lit-element`  
  *(yes one-liners work, whitespace is optional)*

3. **run importly**  
  `importly < importly.config > dist/importmap.json`  
  importly will generate a frozen importmap of your dependencies  
  importly uses stdin/stdout/stderr

    ```json
    {
      "imports": {
        "lit-element/": "https://unpkg.com/lit-element@2.2.0/",
        "lit-element": "https://unpkg.com/lit-element@2.2.0/lit-element.js"
      }
    }
    ```

4. **use [es-module-shims](https://github.com/guybedford/es-module-shims)**  
  - this amazing polyfill makes import maps work today

5. **get to work on your project**

    ```js
    import {LitElement, html} from "lit-element"
    class MyElement extends LitElement {
      render() {
        html`<div>...</div>`
      }
    }
    ```

## notes

- remember, you don't have to use the emojis
  - host statements start with `📡` or `$`
  - package statements start with `📦` or `&`
- 📡 currently supported hosts are just `unpkg` and `jsdelivr`
  - i should probably add `node_modules` to serve locally
- 📦 package statements have this format: `📦 name@version`
  - name: the name of an npm package, like `preact` or `lit-element`
  - version: the version number
- remember, whitespace is ignored, so your importly config can be a one-liner
  - `echo '📡 unpkg, jsdelivr 📦 lit-element' | importly > dist/importmap.json`
- also, importly will read from `package.json` under the key "importly"
  - can be a single string, or an array of strings (see this [package.json](package.json) for example)
  - then you just run `importly < package.json > dist/importmap.json`
