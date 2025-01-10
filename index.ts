// I originally tried to read the data from a file, but I ran into too many issues.
// Probably need to figure out modules + use a server

const bookData: Object = [
  {
    title: "Blackouts",
    author: "Justin Torres",
    round: "A",
  },
  {
    title: "Boys Weekend",
    author: "Mattie Lubchansky",
    round: "A",
  },
  {
    title: "Dayswork",
    author: "Jennifer Habel and Chris Bachelder",
    round: "B",
  },
  {
    title: "The Shamshine Blind",
    author: "Paz Pardo",
    round: "E",
  },
  {
    title: "Brainwyrms",
    author: "Alison Rumfitt",
    round: "F",
  },
  {
    title: "Chain-Gang All-Stars",
    author: "Nana Kwame Adjei-Brenyah",
    round: "F",
  },
  {
    title: "Cold People",
    author: "Tom Rob Smith",
    round: "B",
  },
  {
    title: "The Librarianist",
    author: "Patrick deWitt",
    round: "play-in",
  },
  {
    title: "The Heaven & Earth Grocery Store",
    author: "James McBride",
    round: "C",
  },
  {
    title: "Open Throat",
    author: "Henry Hoke",
    round: "C",
  },
  {
    title: "What You Are Looking for Is in the Library",
    author: "Michiko Aoyama",
    round: "G",
  },
  {
    title: "The Lost Journals of Sacajewea ",
    author: "Debra Magpie Earling",
    round: "D",
  },
  {
    title: "The Bee Sting",
    author: "Paul Murray",
    round: "play-in",
  },
  {
    title: "Monstrilio",
    author: "Gerardo Sámano Córdova",
    round: "H",
  },
  {
    title: "The Auburn Conference",
    author: "Tom Piazza",
    round: "play-in",
  },
  {
    title: "Big Swiss",
    author: "Jen Beagin",
    round: "D",
  },
  {
    title: "American Mermaid",
    author: "Julia Langbein",
    round: "H",
  },
  {
    title: "The Guest",
    author: "Emma Cline",
    round: "E",
  },
];

class Book {
  constructor(
    public title: string,
    public author: string,
    public round: string
  ) {}
}

const books: Book[] = bookData as Book[];

//create list of rounds
let rounds: string[] = [];

books.forEach((book: Book) => {
  if (book.round !== "play-in" && !rounds.includes(book.round)) {
    rounds.push(book.round);
  }
});

// Adding play-in after I've assembled the array cos I want it to sit at the top
rounds.sort().unshift("play-in");

// Template literal for selectors
function buildSelector(id: string) {
  let selectorHtml = `<select id="${id}">
        <option disabled selected>Select a winner</option>
      </select>`;
  return selectorHtml;
}

// helper function to get the value of the selected option
function getSelectValue(element: HTMLSelectElement): string {
  let sel = element.selectedIndex;
  let opt = element.options[sel];
  return opt.value;
}

function createFirstRounds(): void {
  rounds.forEach((round: string) => {
    let dropDownDiv: HTMLDivElement = document.createElement("div");
    dropDownDiv.setAttribute("id", `match-${round}`);
    dropDownDiv.innerHTML = buildSelector(round);
    const tobContainer = document.getElementById(
      "first-round"
    ) as HTMLDivElement;
    books.forEach((book: Book) => {
      if (book.round === round) {
        const optionElement = document.createElement("option");
        optionElement.text = book.title;
        const selector = dropDownDiv.firstElementChild;
        if (selector) {
          selector.appendChild(optionElement);
        }
      }
    });
    tobContainer.appendChild(dropDownDiv);
  });
}

// After the user selects a play-in winner, the winner needs to be added to the options for round
function populateRoundG(): void {
  let playIn = document.getElementById("play-in") as HTMLSelectElement;
  let roundG = document.getElementById("G") as HTMLSelectElement;
  playIn.addEventListener("change", function () {
    let playInWinner = document.getElementById(
      "play-in-winner"
    ) as HTMLOptionElement;
    if (playInWinner) {
      playInWinner.text = getSelectValue(playIn);
    } else {
      const optionElement = document.createElement("option");
      optionElement.text = getSelectValue(playIn);
      optionElement.setAttribute("id", "play-in-winner");
      roundG.append(optionElement);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createFirstRounds();
  populateRoundG();
});
