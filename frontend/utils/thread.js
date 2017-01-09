/**
 * thread.js - запуск js кода в отдельном потоке
 * Основан на:
 * vkThread - javascript plugin to execute javascript function(s) in a thread.
 * https://github.com/vkiryukhin/vkthread
 * http://www.eslinstructor.net/vkthread/
 */

export default class Thread {

  constructor() {
    let err;
    try {
      throw new Error();
    }
    catch (e) {
      err = e.stack;
    }

    if (err === 'undefined') {
      this.path = '';
    }
    else {
      this.path = document.location.origin + '/static/js/worker.js';
    }
  }

  exec(args, cb) {
    console.log(this.path);
    const worker = new Worker(this.path);
    const obj = { args };

    worker.onmessage = oEvent => {
      cb(oEvent.data);
      if (oEvent.data.type === 'end') {
        worker.terminate();
      }
    };

    worker.onerror = error => {
      cb(null, error.message);
      worker.terminate();
    };

    worker.postMessage(JSON.stringify(obj));
  }
}
