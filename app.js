let myLibrary = [];
myLibrary.push(new Book("art", "lauren", "433", "false"));
myLibrary.push(new Book("two", "cassie", "567", "true"));
myLibrary.push(new Book("three", "jace", "456", "true"));
console.table(myLibrary);
render();

//Event Listeners
newBtn = document.querySelector('.new-btn')
newBtn.onclick = showForm;

submitBtn = document.querySelector('#submit');
submitBtn.onclick = addBookToLibrary;



function removeBook(e) {
  console.log(myLibrary);
  if (e.target.type === 'button') {
    removeTitle = e.target.parentNode.dataset.title;
    removeDiv = e.target.parentNode;
    bookContainer = document.querySelector('.book-container');

    let position;
    //remove from myLibrary
    myLibrary.forEach(function(book, index) {
      if(book.title === removeTitle){
        position = index;
      }
    })
    myLibrary.splice(position, 1);

    //remove from book-container
    bookContainer.removeChild(removeDiv);
    console.log(removeDiv);
  }

}

function addBookToLibrary() {
  titleBox = document.querySelector('input#title');
  authorBox = document.querySelector('input#author');
  pagesBox = document.querySelector('input#pages');
  readBox = document.querySelector('input#read');


  newBook = new Book(titleBox.value, authorBox.value,
    pagesBox.value, readBox.value)
  myLibrary.push(newBook);
  hideForm();
  render();

}

function showForm() {
  // console.log(e);
  formContainer = document.querySelector('.form-container');
  formContainer.style.display = "block";

}

function hideForm() {
  // console.log(e);
  formContainer = document.querySelector('.form-container');
  formContainer.style.display = "none";

}

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function getDisplayedBooks() {
  let displayedBooks = [...document.querySelectorAll('.book')];
  displayedBooks = displayedBooks.map(book => {
    return book.dataset.title;
  });
  return displayedBooks;
}

function render() {
  myLibrary.forEach(book => {
    displayBook(book);
  })

  bookDivs = document.querySelectorAll('.book');
  bookDivs.forEach(div => {
    div.addEventListener('click', removeBook)
  })
}

function displayBook(book) {
  let displayedBookTitles = getDisplayedBooks();
  // Check if Book is already displayed 
  if (displayedBookTitles.includes(book.title)) return;

  // Create div for book
  div = document.createElement('div');
  div.classList.add('book');
  div.dataset.title = book.title;

  // Create <h3> for book
  h1 = document.createElement('h3');
  h1.textContent = book.title;
  div.appendChild(h1);

  //create paragraph for each book property
  for (property in book) {
    para = document.createElement('p');
    para.classList.add('content');

    para.textContent = `${property}: ${book[property]}`

    div.appendChild(para);
  }

  //add button to bottom
  removeButton = document.createElement('input');
  removeButton.type = 'button';
  removeButton.value = 'Remove';
  removeButton.classList.add('remove-btn');
  div.appendChild(removeButton);

  // Append Div to book-container
  bookContainer = document.querySelector('.book-container');
  bookContainer.appendChild(div);
}

