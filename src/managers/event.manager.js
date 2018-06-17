import EventEmitter from 'eventemitter3';

export const APPLICATION = "application";


const Emitters = new Map([
  [APPLICATION, new EventEmitter()]
]);


export default Emitters;