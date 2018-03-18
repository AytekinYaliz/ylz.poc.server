function promiseWrapper(promise) {
   return new Promise((resolve, reject) => {
      promise
         .then(r => resolve({name: 'OKK'}))
         .catch(e => resolve({error: e}));
   });
}

exports.test = async function(req, res, next) {

   const prom1 = new Promise((resolve, reject) => { setTimeout(resolve, 100, 'prom1') });
   const prom2 = new Promise((resolve, reject) => { setTimeout(reject, 5000, 'prom22') });

   Promise.all([
      new promiseWrapper(prom1),
      new promiseWrapper(prom2)
   ]).then(r => {
      console.log( r );
   }).catch(e => {
      console.log( e );
   });

   res.json({ name: 'ayt' });
}