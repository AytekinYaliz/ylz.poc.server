
/**
 * Polyfill functions. Needs to be called when app is loaded.
 * const utilities = require("./libs/utilities");
 */
if(!Array.prototype.forEachSync) {
   Array.prototype.forEachSync = async function(callback) {
      for (let item of this) {
         await callback(item);
      }
   }
}
