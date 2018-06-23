import * as WinJS from 'winjs';
import Emitters, { APPLICATION } from './event.manager';

export const ON_ACTIVATED = "on:activation";
export const ON_FIRST_ACTIVATION = "on:firstactivation";
export const ON_BACK_CLICK = "on:backclick";
export const ON_CHECKPOINT = "on:checkpoint";
export const ON_ERROR = "on:error";
export const ON_UNLOAD = "on:unload";
export const ON_READY = "on:ready";
export const ON_LOADED = "on:loaded";
export const ON_START = "on:start";
export const ON_STOP = "on:stop";
export const ON_TOGGLE_LOAD = "on:toggle:load";

class ApplicationManager {

  constructor() {
    this._app = WinJS.Application;
    this._isFirstActivation = true;

    this._app.onactivated = this._onActivated.bind(this);
    this._app.oncheckpoint = this._onCheckpoint.bind(this);
    this._app.onbackclick = this._onBackClick.bind(this);
    this._app.onerror = this._onError.bind(this);
    this._app.onunload = this._onUnload.bind(this);
    this._app.onready = this._onReady.bind(this);
    this._app.onloaded = this._onLoaded.bind(this);
  }

  get app() {
    return this._app;
  }

  /**
   * Runs when the Application is being loaded
   * @param {WinJS.Application.IPromiseEvent} args 
   */
  _onActivated(args) {
    Emitters.get(APPLICATION).emit(ON_ACTIVATED, args);
    if (this._isFirstActivation) {
      Emitters.get(APPLICATION).emit(ON_FIRST_ACTIVATION, args);
      this._isFirstActivation = false;
    }
  }

  /**
   * Runs when the Application is about to suspend
   * @param {WinJS.Application.IPromiseEvent} args 
   */
  _onBackClick(args) {
    Emitters.get(APPLICATION).emit(ON_BACK_CLICK, args);
    alert('Back click!')
  }

  /**
   * Runs when the Application is about to suspend
   * @param {WinJS.Application.IPromiseEvent} args 
   */
  _onCheckpoint(args) {
    Emitters.get(APPLICATION).emit(ON_CHECKPOINT, args);
    alert('checkpoint!')
  }

  /**
   * Runs when there is an uncaught error
   * @param {WinJS.Application.IPromiseEvent} args 
   */
  _onError(args) {
    Emitters.get(APPLICATION).emit(ON_ERROR, args);
    return Emitters.get(APPLICATION).listeners(ON_ERROR).length > 0;
  }

  /**
   * Runs when the application is about to be unloaded
   * @param {WinJS.Application.IPromiseEvent} args 
   */
  _onUnload(args = {}) {
    Emitters.get(APPLICATION).emit(ON_UNLOAD, args);
  }

  /**
   * Runs when the application is ready
   * @param {WinJS.Application.IPromiseEvent} args 
   */
  _onReady(args) {
    Emitters.get(APPLICATION).emit(ON_READY, args);
  }

  /**
   * Runs when the application fires the DOMContentLoaded event
   * @param {WinJS.Application.IPromiseEvent} args 
   */
  _onLoaded(args) {
    Emitters.get(APPLICATION).emit(ON_LOADED, args);
  }

  /**
   * This event starts firing the event listeners (loaded, ready and such)
   */
  start() {
    Emitters.get(APPLICATION).emit(ON_START);
    this._app.start();
  }

  /**
   * This stops the application, resets the **"_app"** object to it's original state
   * and removes every event listener from it
   */
  stop() {
    Emitters.get(APPLICATION).emit(ON_STOP);
    this._app.stop();
  }



}


export default ApplicationManager;