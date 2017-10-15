import { Observable, Observer } from 'rxjs';
import * as R from 'ramda';

// string -> Observable<Array<Movie>>
export function load(url: string) {
  return Observable.create((observer: Observer<any>) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        observer.next(data);
        observer.complete();
      } else {
        observer.error(xhr.statusText);
      }
    });

    xhr.open('GET', url);
    xhr.send();
  })
  .retryWhen(retryStrategy({retries: 3, delay: 1000}));
}

export function loadWithFetch(url: string) {
  // defer is like a proxy to the Observable result of the function that's passed to the executor
  // this abstracts the call fetch() invocation and makes the whole loadWithFetch function lazy
  // it does not execute the xhr untill someone subscribes
  return Observable.defer(() =>
    Observable.fromPromise(fetch(url).then(r => {
      if (r.status === 200) {
        // reminder: this means successful Promise
        return r.json()
      } else {
        return Promise.reject(r.statusText);
      }
    }))
  ).retryWhen(retryStrategy())
}

// RetrySettings -> Observable error -> Observable error
const retryStrategy = ({retries = 4, delay = 250} = {}) => {
  // I have the feeling that everything here
  // is the forever monad function in haskell
  return (errors) => errors
      .scan((acc, err) => {
        if (acc < retries) {
          return acc + 1;
        } else {
          // since inside retryWhen - it will catch and reject the Observable
          throw new Error(err);
        }
      }, 0)
      .delay(1000);
}
