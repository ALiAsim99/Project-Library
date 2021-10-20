const title = document.getElementById(`title`);
const author = document.getElementById(`author`);
const pages = document.getElementById(`pages`);
const yes = document.getElementById(`yes`);
const no = document.getElementById(`no`);
const form = document.querySelector(`.form`);
const newBookBtn = document.querySelector(`.newBookBtn`);
const wrapper = document.querySelector(`.wrapper`);
console.log(form);
form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  if (yes.checked == true) {
    addToLibrary(title.value, author.value, pages.value, yes.value);
  } else {
    addToLibrary(title.value, author.value, pages.value, no.value);
  }
  wrapper.classList.remove(`show`);
});

const Books = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ,${this.author},has ${this.pagees} ,${this.read} yet`;
  };
};

let myLibrary = [];
const addToLibrary = function (title, author, pages, read) {
  const book = new Books(title, author, pages, read);

  myLibrary.push(book);
  saveLocal();
  console.log(myLibrary);

  displayBooks();
};
function displayBooks() {
  document.querySelector(`.info`).innerHTML = ``;
  myLibrary.forEach((m, i) => {
    const div = document.createElement(`div`);
    div.innerHTML = `
    <div><h1>Title:</h1><p>${m.title}</p></div>
<div><h1>Author:</h1><p>${m.author}</p></div>
<div><h1>Pages:</h1><p>${m.pages}</p></div>
<div><h1>Read:</h1><p class="read">${m.read}</p></div><button data-id="${i}" class="change" >Change</button>
<button class="delete" data-id="${i}"}>Delete</button>
    `;
    div.classList.add(`info-card`);

    document.querySelector(`.info`).appendChild(div);
  });
}
newBookBtn.addEventListener(`click`, () => {
  wrapper.classList.add(`show`);
});
const deleteBtn = document.querySelector(`button[data-id]`);
const info = document.querySelector(`.info`);
info.addEventListener(`click`, (e) => {
  if (e.target.closest(`.delete`)) {
    const indx = myLibrary.findIndex((m, i) => i === e.target.dataset.id);
    myLibrary.splice(indx, 1);
    saveLocal();
    displayBooks();
  } else if (e.target.closest(`.change`)) {
    console.log(`chag`);
    const bok = myLibrary.find((m, i) => i == e.target.dataset.id);
    bok.read = bok.read == `read` ? `not read` : `read`;
    saveLocal();
    displayBooks();
  } else {
    return;
  }
});
function saveLocal() {
  console.log(myLibrary);
  localStorage.setItem(`books`, JSON.stringify(myLibrary));
}
function getLocal() {
  const bookz = JSON.parse(localStorage.getItem(`books`));
  console.log(bookz);
  if (bookz !== null && bookz.length > 0) {
    myLibrary = bookz;
    console.log(myLibrary);
    displayBooks();
  }
}
getLocal();
