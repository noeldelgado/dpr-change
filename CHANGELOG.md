v0.1.4 (2017-08-02)
- generated new `lib/index.es.js` file using `format: es`
- updated `pkg.module` to use the new `index.es.js` file instead

v0.1.3 (2017-07-29)
- use `pkg.module` instead of `pkg.jsnext:main` for ES2015-aware tools

v0.1.2 (2017-07-29)
- version unpublished by accident

v0.1.1 (2017-07-25)
- Changed `version` property to `VERSION`

v0.1.0 (2017-07-25)
- `dpr-change` initial release
  - subscribe to `change` event, e.g.:
    - `dpr.addEventListener('change', fn)`
