import { Observable, Observer } from 'rxjs';
import * as R from 'ramda';

type Movie = { title: string; }

const output = document.getElementById('output');
const button = document.getElementById('button');

const click = Observable.fromEvent(button, 'click')

// string -> Observable<Array<Movie>>
const load = (url: string) => {
  return Observable.create((observer: Observer<any>) => {
    console.log('load executor');

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      const data = JSON.parse(xhr.responseText);
      observer.next(data);
      observer.complete();
    });

    xhr.open('GET', url);
    xhr.send();
  });
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
  .flatMap(() => load('movies.json'))
  .subscribe(
    renderMovies,
    console.error,
    console.log.bind(null, 'done')
  )
