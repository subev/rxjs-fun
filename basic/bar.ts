import { Observable } from 'rxjs';

//this way we can cherry pick what we need to import and minify the webpack output
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/filter';

let source = Observable.create((obs) => {
  let idx = 0;
  let inum = setInterval(() => {
    const value = Math.random() * 20 % 20;
    if (value > 1) {
      obs.next({value, idx: idx++});
    } else {
      obs.error(value);
    }
  }, 200);
  setTimeout(() => {
    clearInterval(inum);
    obs.complete("awesome");
  }, 3000);
});

source.subscribe(
  ({value, idx}) => console.log("log everytime", value, idx),
  (err) => console.error("low chance but we got", err),
  () => console.log("3 seconds have passed, we are done")
);

// this shows that calling subscribe second time calls the starting function of observable second time
source
  .filter(({value}) => value > 10)
  .subscribe(
    ({value, idx}) => console.log("this should be gt 10", value, idx),
    (err) => console.error("gt 10 got an err", err),
    () => console.log("3 seconds have passed, we are done")
  );

