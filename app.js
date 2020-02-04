let myLibrary = [];
myLibrary.push(new Book("art", "lauren", "433", "yes"));
myLibrary.push(new Book("two", "cassie", "567", "no"));
trialBook = new Book("three", "jace", "456", "no");
myLibrary.push(trialBook);
render();


function findBookfromDiv(myDiv) {
  myBook = myLibrary.find(book => (book.title === div.dataset.title));
}


//Event Listeners
newBtn = document.querySelector('.new-btn')
newBtn.onclick = showForm;

submitBtn = document.querySelector('#submit');
submitBtn.onclick = addBookToLibrary;

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.changeReadStatus = function () {
  this.read = (this.read === 'yes') ? 'no' : 'yes';
}

function updateBook(e) {

  if (e.target.classList.contains('remove-btn')) {
    removeBook();
  }
  if (e.target.classList.contains('read-btn')) {
    // console.log(e.target.parentNode.dataset.title);
    div = (e.target.parentNode);
    changeTitle = e.target.parentNode.dataset.title;
    myBook = myLibrary.find(book => (book.title === changeTitle));
    myBook.changeReadStatus();
    readPara = (div.querySelector('p:last-of-type'));
    readPara.textContent = (`pages: ${myBook.read}`);
  }


  function removeBook() {
    removeTitle = e.target.parentNode.dataset.title;
    removeDiv = e.target.parentNode;
    bookContainer = document.querySelector('.book-container');

    //remove from myLibrary
    myBook = myLibrary.find(book => (book.title === removeDiv.dataset.title));
    let spot = myLibrary.indexOf(myBook);
    myLibrary.splice(spot, 1);

    //remove from book-container
    bookContainer.removeChild(removeDiv);
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
  console.table(myLibrary);
  hideForm();
  render();
}

function showForm() {
  formContainer = document.querySelector('.form-container');
  formContainer.style.display = "block";

}

function hideForm() {
  formContainer = document.querySelector('.form-container');
  formContainer.style.display = "none";

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
    div.addEventListener('click', updateBook)
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

  // add readStatusBtn to bottom
  changeReadStatusBtn = document.createElement('input');
  changeReadStatusBtn.type = 'button';
  changeReadStatusBtn.value = 'Change Read Status';
  changeReadStatusBtn.classList.add('read-btn');
  div.appendChild(changeReadStatusBtn);

  //add removeButton to bottom
  removeButton = document.createElement('input');
  removeButton.type = 'button';
  removeButton.value = 'Remove';
  removeButton.classList.add('remove-btn');
  div.appendChild(removeButton);

  // Append Div to book-container
  bookContainer = document.querySelector('.book-container');
  bookContainer.appendChild(div);
}

