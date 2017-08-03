import EventDispatcher from 'eventdispatcher.js';
import assign from 'lodash.assign';

var version = "0.1.3";

const DPR = assign({
  VERSION: version,
  DELAY: 500
}, EventDispatcher.prototype);

let _dpr = window.devicePixelRatio;
let _timeout;

function _debounce (fn) {
  window.clearTimeout(_timeout);
  _timeout = window.setTimeout(fn, DPR.DELAY);
}

function _handleResize () {
  const devicePixelRatio = window.devicePixelRatio;

  if (_dpr !== devicePixelRatio) {
    _dpr = devicePixelRatio;

    DPR.dispatchEvent({
      devicePixelRatio ,
      type: 'change'
    });
  }
}

window.addEventListener('resize', _debounce.bind(null, _handleResize));

export default DPR;
