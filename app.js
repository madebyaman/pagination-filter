const studentList = document.querySelectorAll('.student-item');
const page = document.querySelector('.page');
// Customize how many students to display in each page by changing this variable
const studentToDisplay = 10;

// Intialize the page
function intializePage() {
  appendPageLinks(studentList);
  hideStudents();
  showPage(1, studentList);
}
intializePage();
const paginationDiv = document.querySelector('.pagination');
paginationDiv.querySelector('a').classList.add('active');

// Hide student list function
function hideStudents() {
  studentList.forEach(student => {
    // Hide student list
    student.style.display = 'none';
  })
}

// Show students in each page
function showPage(pageNumber, students) {
  // Calculate beginning number for displaying studentS
  let studentListBegin = ((pageNumber - 1) * studentToDisplay);
  // Calculate ending number for student list
  let studentListEnd = (pageNumber * studentToDisplay);
  // In the last page, for loop may result in error without this if statement
  if (studentListEnd > students.length) {
    studentListEnd = students.length;
  }
  // Hide previous students and display new students
  hideStudents();
  for (let i = studentListBegin; i < studentListEnd; i++) {
    students[i].style.display = '';
  }
}

// Add pagination links below the content.
function appendPageLinks(students) {
  // Create pagination div
  let newPaginationDiv = document.createElement('div');
  newPaginationDiv.classList.add('pagination');
  newPaginationDiv.innerHTML = `<ul>`;
  // Calculate number of pages required for displaying student data
  const pagesRequired = Math.ceil(students.length / studentToDisplay);
  // add li to pagination div for each page
  for (let i = 1; i < pagesRequired + 1; i++) {
    newPaginationDiv.innerHTML += `<li>
              <a href="#">` + i + `</a>
            </li>`;
  }
  newPaginationDiv.innerHTML += `</ul>`;
  // If pagination div existed before, remove it.
  if (document.querySelector('.pagination')) {
    page.removeChild(document.querySelector('.pagination'));
  }
  // append new paginationDiv to DOM
  page.appendChild(newPaginationDiv);
}

// Create search div and append it the document
const searchDiv = document.createElement('div');
searchDiv.classList.add('student-search');
const searchInput = document.createElement('input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('id', 'search');
searchInput.setAttribute('placeholder', 'Search for students...');
searchDiv.appendChild(searchInput);
const searchButton = document.createElement('button');
searchButton.setAttribute('name', 'submit');
searchButton.textContent = 'Search';
searchDiv.appendChild(searchButton);
document.querySelector('.page-header').appendChild(searchDiv);

function searchList() {
  // Get search input value and convert it to lowercase
  let searchText = searchInput.value.toLowerCase();

  // Hide previous message, pagination link, and student data if available
  let prevMessage = document.querySelector('.page > p');
  let paginationLink = document.querySelector('.pagination');
  hideStudents();
  if (prevMessage) {
    page.removeChild(prevMessage);
  }
  if (paginationLink) {
    page.removeChild(paginationLink);
  }

  // Add matched students to the array
  let matched = [];
  studentList.forEach(student => {
    let studentName = student.querySelector('.student-details h3').textContent;
    let studentEmail = student.querySelector('.student-details .email').textContent;
    if (studentName.toLowerCase().includes(searchText) || studentEmail.toLowerCase().includes(searchText)) {
      matched.push(student);
    }
  })

  // Show message if no student matched the search input
  if (matched.length === 0) {
    let message = document.createElement('p');
    message.textContent = 'Sorry, no student found';
    page.appendChild(message);
  }

  // Show matched student and add page links if matched array contains more than 10 items
  if (matched.length > 10) {
    appendPageLinks(matched);
  }
  showPage(1, matched);
  searchInput.value = '';
}

// Add click event handler to each anchor in pagination div
paginationDiv.addEventListener('click', (e) => {
  // Prevent browser from updating URL
  e.preventDefault();
  const anchor = e.target.closest('a');
  // Remove active class from each pagination link
  const activeAnchors = paginationDiv.querySelectorAll('li .active');
  activeAnchors.forEach(anchor => {
    anchor.classList.remove('active');
  })
  if (anchor) {
    let pageNumber = anchor.textContent;
    showPage(pageNumber, studentList);
    anchor.classList.add('active');
  }
})

// Click event handler for the search functionality
searchButton.addEventListener('click', searchList);