
## v0.1.0

complete rewrite of importly.

breaking cli changes:
- importly now performs offline lookups in your `node_modules` directory by default
  - if this breaks your app because you don't have a `node_modules` directory, you might want to set `--lookup=unpkg` and `--host=unpkg`
- `--lock` has been replaced by `--semver`. see the readme about how it works
- `--verbose` has been removed

new features:
- importly now works offline by default
- importly now recommends using `package-lock.json` instead of `package.json`, but both will work
  - when you use `package-lock.json` in conjunction with `--host=node_modules`, you will get scoped subdependencies
- added flags (see readme for details)
  - `--production`
  - `--root`
  - `--semver`
  - `--mini`
