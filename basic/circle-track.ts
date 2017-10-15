import { Observable } from 'rxjs';
import * as R from 'ramda';

const source = Observable
  .fromEvent(document, 'mousemove')
  .map((e: MouseEvent) => ({ top: e.clientY, left: e.clientX }))
  .map(R.map(R.add(-10)))
  .filter(R.compose(R.gte(500), R.prop('top')))
  .delay(300)

const circlElement = document.getElementById('circle');
const onNext = (x => {
  circlElement.style.top = x.top;
  circlElement.style.left = x.left;
});
source.subscribe(
  onNext,
  err => console.log(err),
  () => console.log("done")
);

source.subscribe(
  console.log,
  console.log,
  console.log
);
