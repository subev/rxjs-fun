import { Observable } from 'rxjs';
import { load, loadWithFetch } from './api';

type Movie = { title: string; }

const output = document.getElementById('output');
const button = document.getElementById('button');
const clearButton = document.getElementById('clear');

const click = Observable.fromEvent(button, 'click')
const clear = Observable.fromEvent(clearButton, 'click');

// Array<Movie> -> IO ()
const renderMovies = (movies) =>
  movies.forEach(m => {
    const div = document.createElement('div');
    div.innerHTML = m.title;
    output.appendChild(div);
  });


// if you want to play with the error handling just provide wrong url

const initalRequestSubsription = load('movies.json')
  // comment the line below and see the network activity if loadWithFetched is not wrapped in
  // deferred
  .subscribe(renderMovies);

// cancel it immediately, check the network tab
//initalRequestSubsription.unsubscribe();

const subscription = click
  // this is haskell's >>= bind method ;P
  // use load or loadWithFetch
  .flatMap(() => load('movies.json'))
  .subscribe(
    renderMovies,
    (err) => console.log(`error: ${err}`),
    console.log.bind(null, 'done')
  )

clear.subscribe(subscription.unsubscribe);

console.log(subscription)
