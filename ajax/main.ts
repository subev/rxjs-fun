import { Observable } from 'rxjs';
import * as R from 'ramda';

type Movie = { title: string; }

const output = document.getElementById('output');
const button = document.getElementById('button');

const source = Observable.fromEvent(button, 'click')

const load = (url: string) => {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    const movies: Array<Movie> = JSON.parse(xhr.responseText);
    movies.forEach(m => {
      const div = document.createElement('div');
      div.innerHTML = m.title;
      output.appendChild(div);
    })
  });
  xhr.open('GET', url);
  xhr.send();
}

source.subscribe(
  (e) => load('movies.json'),
  console.error,
  console.log.bind(null, "done")
)
