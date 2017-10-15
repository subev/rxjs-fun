import { Observable, Observer } from 'rxjs';

let numbers = [1,3,5];
let source = Observable.from(numbers);

class MyObserver implements Observer<number> {
  next(value) {
    console.log("awesome ->", value);
  }
  error() {
    console.error('something bad happened');
  }
  complete() {
    console.log("the observable is exsausted");
  }
}

//case with class instance
let obs = new MyObserver();
source.subscribe(obs);

//pretty much the same without the need of a class
source.subscribe({
  next: (v) => {
    console.log("eventSimplerObserver", v);
  }
});

//using event arguments
source.subscribe(
  value => console.log("via arguments", value),
  err => console.error("something bad happened", err),
  () => console.log("the source is done")
);

//create observable custom observable

let source2 = Observable.create((obs) => {
  let n = 0;
  let inum = setInterval(() => {
    if (Math.random() * 20 % 20 > 1) {
      obs.next(n++)
    } else {
      obs.error("the chance of this to happen is 5% every time the interval hits");
    }
  }, 200);
  setTimeout(() => {
    clearInterval(inum);
    obs.complete("awesome");
  }, 3000);
});

source2.subscribe(
  value => console.log("async feeding yee", value),
  err => console.error("something bad happened", err),
  () => console.log("3 seconds have passed, we are done")
);

export default {};
