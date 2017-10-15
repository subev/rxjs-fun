import { Observable } from 'rxjs';
import { load, loadWithFetch } from './api';

type Movie = { title: string; }

const output = document.getElementById('output');
const button = document.getElementById('button');

const click = Observable.fromEvent(button, 'click')

// Array<Movie> -> IO ()
const renderMovies = (movies) =>
  movies.forEach(m => {
    const div = document.createElement('div');
    div.innerHTML = m.title;
    output.appendChild(div);
  });


loadWithFetch('movies.json')
  // comment the line below and see the network activity if loadWithFetched is not wrapped in
  // deferred
  .subscribe(renderMovies);

click
  // this is haskell's >>= bind method ;P
  // use load or loadWithFetch
  .flatMap(() => loadWithFetch('moviess.json'))
  .subscribe(
    renderMovies,
    (err) => console.log(`error: ${err}`),
    console.log.bind(null, 'done')
  )
