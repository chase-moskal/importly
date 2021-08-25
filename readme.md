
# 📦 importly 📡

## import map generator

importly is a command-line tool which generates import maps based on package.json dependencies

1. **install importly**  
    `npm install -g importly`

2. **generate an import map**  
    `importly < package.json > importmap.json`  
    importly uses stdin/stdout/stderr  
    pass in your package.json as input, and importmap.json will be the generated output

3. **importly will read the dependencies, and generate an importmap**

    *input: `package.json`*
    ```json
    {
      "dependencies": {
        "lit-html": "^1.1.1",
        "lit-element": "^2.2.1"
      }
    }
    ```

    *output: `importmap.json`*
    ```json
    {
      "imports": {
        "lit-html/": "https://cdn.jsdelivr.net/npm/lit-html@1.1.1/",
        "lit-html": "https://cdn.jsdelivr.net/npm/lit-html@1.1.1/lit-html.js",
        "lit-element/": "https://cdn.jsdelivr.net/npm/lit-element@2.2.1/",
        "lit-element": "https://cdn.jsdelivr.net/npm/lit-element@2.2.1/lit-element.js"
      }
    }
    ```
    by default, the import map points to `jsdelivr` as the package host

4. **install the import map on your page via [es-module-shims](https://github.com/guybedford/es-module-shims)**  
    this amazing polyfill makes import maps work *today!*  
    usage is basically like this  

    ```html
    <script defer src="https://unpkg.com/es-module-shims@0.2.13/dist/es-module-shims.js"></script>
    <script type="importmap-shim" src="importmap.json"></script>
    <script type="module-shim">
      import {LitElement} from "lit-element"
      //...
    </script>
    ```

5. **now get to work on your project!**

    ```js
    // thanks to the import map,
    // the browser can resolve this bare-specifier import!
    import {LitElement, html} from "lit-element"

    class MyElement extends LitElement {
      render() {
        html`<div>...</div>`
      }
    }
    ```

## importly cli options

- **`<stdin>`** *(filestream)*
  - any json5 file with a "dependencies" object
- **`--lock`** *(boolean)*
  - whether or not to pin exact versions in the import map
  - default: `true`
- **`--verbose`** *(boolean)*
  - whether or not to do some gross console logging
  - default: `false`
- **`--host`** *(string)*
  - host from which to load packages in the browser
  - allows you to choose which 'generator' importly is using to generate the final import map
  - valid options: `unpkg`, `jsdelivr`, `node_modules`
  - default: `jsdelivr`
- **`--lookup`** *(string)*
  - host from which to lookup package information (when importly is running)
  - allows you to choose which 'resolver' importly is using to query information about each package
  - sometimes unpkg or jsdelivr go down, so this option is handy to switch to the other
  - valid options: `unpkg`, `jsdelivr`
  - default: `jsdelivr`
- **`<stdout>`** *(filestream)*
  - import map json file

the most useful option is probably the `--host` option, which allows you to set your local `node_modules` as the location from which to load packages 

> ## ***let's do the open source thing!***
>
> importly is experimental, and i'm open to new ideas!
>
> so please, don't hesitate to contribute by opening new issues to ask questions, discuss ideas, question and even criticize! if you have any ideas, thoughts, or comments: i want to hear it, don't be shy!
>
> *cheers!*  
> &nbsp; *👋 Chase*

----

## so wait, why do we need import maps in the first place?

- we're in the future 🕶️
- we'll write modern es modules
- we'll throw out our build step; no transpiling, no bundling
- we'll use import maps to tell the browser where dependencies are
- we'll use importly to generate those import maps

### beyond bundling

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

- the only hitch, is that import maps are an upcoming browser feature — we need a polyfill!

- so let's use guy bedford's amazing polyfill, [es-module-shims](https://github.com/guybedford/es-module-shims), allows us to step into the future of import maps today!

- i created importly to automatically generate the import maps

*cheers,*  
&nbsp; *👋 Chase*
