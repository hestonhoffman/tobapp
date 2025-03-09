import bookData from "./books.json";
import { getSelectValue, insertSelectorValue, getTargetId } from "./helpers";

class Book {
  constructor(
    public title: string,
    public author: string,
    public bracket: number
  ) {}
}

const books: Book[] = bookData as Book[];

//create list of brackets
let brackets: number[] = [];

books.forEach((book: Book) => {
  if (book.bracket !== 9 && !brackets.includes(book.bracket)) {
    brackets.push(book.bracket);
  }
});

// Adding play-in (round 9) after I've assembled the array cos I want it to sit at the top
brackets.sort().unshift(9);

// // Template literal for selectors
// function buildSelector(id: number) {
//   let selectorHtml = `<select id="${id}">
//         <option disabled selected>Select a winner</option>
//       </select>`;
//   return selectorHtml;
// }

function populateRound1(): void {
  for (let index = 0; index < 9; index++) {
    books.forEach((book: Book) => {
      if (book.bracket === index + 1) {
        const optionElement = document.createElement("option");
        optionElement.text = book.title;
        let currentBracket = document.getElementById(`1-${index + 1}`);
        currentBracket.append(optionElement);
      }
    });
  }
}

function testThis(event): void {
  // TODO: Figure out how to handle zombies
  // Need another div with all the zombies in it
  // if id pattern is 3*, change zombies
  // if id pattern is 4*, change champion
  // if id pattern is 5*, assign final winner
  let selectorId = event.target.id;
  let targetValue = event.target.value;
  switch (true) {
    case /1-9/.test(selectorId):
      insertSelectorValue(targetValue, "play-in-winner");
      break;
    case /1-\d/.test(selectorId):
      let roundTwoTarget = getTargetId(selectorId, "2-");
      insertSelectorValue(targetValue, roundTwoTarget);
      break;
    case /2-\d/.test(selectorId):
      let roundThreeTarget = getTargetId(selectorId, "3-");
      insertSelectorValue(targetValue, roundThreeTarget);
      break;
    // zombie round works differently
    case /3-\d/.test(selectorId):
      insertSelectorValue(targetValue, getTargetId(selectorId, "4-"));
      break;
    case /4-\d/.test(selectorId):
      insertSelectorValue(targetValue, getTargetId(selectorId, "5-"));
  }
}

function addEventListeners(): void {
  let selectors = document.querySelectorAll("select");
  selectors.forEach((element) => {
    element.addEventListener("change", testThis, false);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  populateRound1();
  addEventListeners();
});
