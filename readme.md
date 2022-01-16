
# 📦📡 ***importly*** — import map generator

importly is a command-line utility that generates [import maps](https://github.com/WICG/import-maps).

so your apps can load es module packages without a bundler.

works nicely with [es-module-shims](https://github.com/guybedford/es-module-shims).

<br/>

## 🛸 importly basic usage

```sh
npx importly < package-lock.json > importmap.json
```

<br/>

**`--host=node_modules`**  
specify where the import map points to.  
where the dependencies will be loaded from.  
- `--host=node_modules` *(default)* — point to your node_modules directory
- `--host=unpkg` — point to the [unpkg](https://unpkg.com/) cdn
- `--host=jsdelivr` — point to the [jsdelivr](https://www.jsdelivr.com/) cdn

<br/>

**`--dev`**  
include your package's devDependencies.  

<br/>

**`--lookup=node_modules`**  
tell importly where to seek information about packages.  
it needs to inspect each package json.  
- `--lookup=node_modules` *(default)* — look in your local node_modules directory
- `--lookup=unpkg` — query the [unpkg](https://unpkg.com/) cdn
- `--lookup=jsdelivr` — query the [jsdelivr](https://www.jsdelivr.com/) cdn

<br/>

**`--root=/`**  
the url prefix that leads to your node_modules directory.  
this affects where the importmap is pointing to.  
only applies when `--host=node_modules`.  
- `--root=/` *(default)* — find node_modules at your server root
- `--root=""` — find node_modules in the current directory
- `--root=/my/special/path/` — find node_modules at `/my/special/path/node_modules`

<br/>

**`--semver=exact`**  
the semver prefix to use on the import map versions.  
only applies when pointing to a cloud cdn.  
- `--semver=exact` or `--semver=""` *(default)* no prefix, use pinned versions
- `--semver=major` or `--semver=^` pin major version, with caret prefix
- `--semver=minor` or `--semver=~` pin minor version, with tilde prefix

<br/>

**`--mini`**  
minify importmap output.  
eliminates whitespace.  

<br/>

## 🌠 the more you know, about importly

you don't have to use a `package-lock.json`
- a `package.json` will work.
- actually, any json that has `dependencies` will work.
- however, the `package-lock.json` is better because it includes subdependencies (and they're scoped, which means your dependencies can use different versions of a single subdependency)

scoped subdependencies only work when
- you're using a `package-lock.json`
- and you're using `--host=node_modules`

works offline when
- you're using `--host=node_modules`
- and you're using `--lookup=node_modules`

<br/>

## 🍻 importly is open source

- ask any questions in the issues or discussions tab
- fix that bug, send me those pull requests
- show me some love with your sweet github stars
