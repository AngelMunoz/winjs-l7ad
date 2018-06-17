import * as WinJS from 'winjs';

class StorageManager {

  /**
   * These match the property names of the  @see WinJS.Application storage properties
   */
  static STORAGE_TYPES = {
    LOCAL: 'local',
    SESION_STATE: 'sessionState',
    ROAMING: 'roaming',
    TEMP: 'temp'
  }

  /**
   * 
   * @param {WinJS.Application} app 
   */
  constructor(app) {
    this.__app = app;
    this._isWindows = window.Windows ? true : false;
  }

  /**
   * 
   * @param {string} name 
   * @param {string} content 
   * @param {StorageManager.STORAGE_TYPES} type 
   */
  writeText(name, content, type = StorageManager.STORAGE_TYPES.LOCAL) {
    if (this._isWindows) {
      return this._writeTextWindows(name, content, type);

    }
    return this._writeTextBrowser(name, content);
  }

  /**
   * 
   * @param {string} name 
   * @param {StorageManager.STORAGE_TYPES} type
   */
  readText(name, type = StorageManager.STORAGE_TYPES.LOCAL) {
    if (this._isWindows) {
      return this._readTextWindows(name, type);

    }
    return this._readTextBrowser(name);
  }

  /**
   * 
   * @param {string} name 
   * @param {StorageManager.STORAGE_TYPES} type
   */
  exists(name, type = StorageManager.STORAGE_TYPES.LOCAL) {
    if (this._isWindows) {
      return this._existsWindows(name, type);
    }
    return this._existsBrowser(name);
  }

  /**
   * 
   * @param {string} name 
   * @param {StorageManager.STORAGE_TYPES} type
   */
  remove(name, type = StorageManager.STORAGE_TYPES.LOCAL) {
    if (this._isWindows) {
      return this._removeWindows(name, type);
    }
    return this._removeBrowser(name);
  }

  /**
   * Writes directly to the local storage
   * @param {string} name 
   * @param {string} content 
   */
  _writeTextBrowser(name, content) {
    return new WinJS.Promise((done, err) => {
      window.localStorage.setItem(name, content);
      return window.localStorage.getItem(name).length;
    });
  }

  /**
   * Reads from Local Storage
   * @param {string} name 
   */
  _readTextBrowser(name) {
    return this.exists(name, StorageManager.STORAGE_TYPES.LOCAL)
      .then(exists => {
        if (!exists) { return new WinJS.Promise((done, err) => { err(new Error('File Does not Exist')); }); }
        return window.localStorage.getItem(name)
      }, error => new WinJS.Promise((done, err) => err(error)));
  }

  /**
   * Checks if it Exists in the local Storage
   * @param {string} name 
   */
  _existsBrowser(name) {
    return new WinJS.Promise(done => done(!!window.localStorage.getItem(name) && (window.localStorage.getItem(name).length >= 0)));
  }

  /**
   * Removes from local storage
   * @param {string} name 
   */
  _removeBrowser(name) {
    return this.exists(name, StorageManager.STORAGE_TYPES.LOCAL)
      .then(exists => {
        if (!exists) { return new WinJS.Promise((done, err) => { err(new Error('File Does not Exist')); }); }
        return window.localStorage.getItem(name)
      }, error => new WinJS.Promise((done, err) => err(error)));
  }


  /**
   * writes a file when in a windows environment
   * @param {string} name 
   * @param {string} content 
   * @param {StorageManager.STORAGE_TYPES} type 
   */
  _writeTextWindows(name, content, type) {
    return this.__app[type].writeText(name, content);
  }

  /**
   * reads a file when in a windows environment
   * @param {string} name 
   * @param {StorageManager.STORAGE_TYPES} type 
   */
  _readTextWindows(name, type) {
    return this.exists(name, type)
      .then(exists => {
        if (!exists) { return new WinJS.Promise((done, err) => { err(new Error('File Does not Exist')); }); }
        return this.__app[type].readText(name);
      }, error => new WinJS.Promise((done, err) => err(error)));
  }

  /**
   * checks if a file exists when in a windows environment
   * @param {string} name 
   * @param {StorageManager.STORAGE_TYPES} type 
   */
  _existsWindows(name, type) {
    return this.__app[type].exists(name);
  }

  /**
   *  removes a file when in a windows environment
   * @param {string} name 
   * @param {StorageManager.STORAGE_TYPES} type 
   */
  _removeWindows(name, type) {
    return this.exists(name, type)
      .then(exists => {
        if (!exists) { return new WinJS.Promise((done, err) => { err(new Error('File Does not Exist')); }); }
        return this.__app[type].remove(name);
      }, error => new WinJS.Promise((done, err) => err(error)));
  }

}

export default StorageManager;