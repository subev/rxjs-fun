import { Observable, Observer } from 'rxjs';
import * as R from 'ramda';

type Movie = { title: string; }

const output = document.getElementById('output');
const button = document.getElementById('button');

const click = Observable.fromEvent(button, 'click')

// string -> Observable<Array<Movie>>
const load = (url: string) => {
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

const retryStrategy = ({retries, delay}) => {
  // I have the feeling that everything here
  // is the forever monad function in haskell
  return (errors) => errors
      .scan(R.add(1), 0)
      .takeWhile(R.gte(retries))
      .delay(1000);
}

// Array<Movie> -> IO ()
const renderMovies = (movies) =>
  movies.forEach(m => {
    const div = document.createElement('div');
    div.innerHTML = m.title;
    output.appendChild(div);
  });

click
  //this is haskell's >>= bind method ;P
  .flatMap(() => load('moviess.json'))
  .subscribe(
    renderMovies,
    (err) => console.log(`error: ${err}`),
    console.log.bind(null, 'done')
  )
