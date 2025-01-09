"use strict";
// I originally tried to read the data from a file, but I ran into too many issues.
// Probably need to figure out modules + use a server
const bookData = [
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
// I used a class cos I was trying to do some fancy InstanceOf checking.
// I eventually abandoned that effort, so I guess this could be a regular type instead
class Book {
    constructor(title, author, round) {
        this.title = title;
        this.author = author;
        this.round = round;
    }
}
const books = bookData;
//create list of rounds
let rounds = [];
books.forEach((book) => {
    if (book.round !== "play-in" && !rounds.includes(book.round)) {
        rounds.push(book.round);
    }
});
// Adding play-in after I've assembled the array cos I want it to sit at the top
rounds.sort().unshift("play-in");
function createSelect(id) {
    let dropDownElement = document.createElement("select");
    dropDownElement.setAttribute("id", id);
    let disabledOption = document.createElement("option");
    disabledOption.text = "Select a winner";
    disabledOption.disabled = true;
    disabledOption.selected = true;
    dropDownElement.append(disabledOption);
    return dropDownElement;
}
function createFirstRounds() {
    rounds.forEach((round) => {
        let dropDownDiv = document.createElement("div");
        dropDownDiv.setAttribute("id", `match-${round}`);
        let dropDownElement = createSelect(round);
        const tobContainer = document.getElementById("first-round");
        books.forEach((book) => {
            if (book.round === round) {
                const optionElement = document.createElement("option");
                optionElement.text = book.title;
                dropDownElement.append(optionElement);
            }
        });
        dropDownDiv.appendChild(dropDownElement);
        tobContainer.appendChild(dropDownDiv);
    });
}
function getSelectValue(element) {
    let sel = element.selectedIndex;
    let opt = element.options[sel];
    return opt.value;
}
// After the user selects a play-in winner, the winner needs to be added to the options for round
function populateRoundG() {
    let playIn = document.getElementById("play-in");
    let roundG = document.getElementById("G");
    playIn.addEventListener("change", function () {
        let playInWinner = document.getElementById("play-in-winner");
        if (playInWinner) {
            playInWinner.text = getSelectValue(playIn);
        }
        else {
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
