# dpr-change [![npm-image](https://img.shields.io/npm/v/dpr-change.svg)](https://www.npmjs.com/package/dpr-change) ![license-image](https://img.shields.io/npm/l/dpr-change.svg)

Subscribe to devicePixelRatio change event

## Install

```sh
npm i dpr-change --save
```

## Usage

```js
import DPR from 'dpr-change';

function _handleDPRChange (ev) {
  console.log(`devicePixelRatio changed: ${ev.devicePixelRatio}`);
}

DPR.addEventListener('change', _handleDPRChange);
```

## License
MIT © [Noel Delgado](http://pixelia.me/)
