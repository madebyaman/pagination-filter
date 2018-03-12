const studentList = document.querySelectorAll('.student-item');
const page = document.querySelector('.page');
// Customize how many students to display in each page by changing this variable
const studentToDisplay = 10;

// Add empty pagination div
const paginationDiv = document.createElement('div');
paginationDiv.classList.add('pagination');
page.appendChild(paginationDiv);

// Intialize the page
function intializePage(students) {
  appendPageLinks(students);
  showPage(1, students);
}
intializePage(studentList);


// Hide student list function
function hideStudents() {
  studentList.forEach(student => {
    // Hide student list
    student.style.display = 'none';
  })
}

// Show students in each page
function showPage(pageNumber, students) {
  // Calculate beginning and ending number for displaying students
  let studentListBegin = ((pageNumber - 1) * studentToDisplay);
  let studentListEnd = (pageNumber * studentToDisplay);
  // If student list ending is more than students array length, change its value
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
  let paginationLink = document.createElement('ul');
  // Calculate number of pages required for displaying student data
  const pagesRequired = Math.ceil(students.length / studentToDisplay);
  // add li to pagination div for each page
  for (let i = 1; i < pagesRequired + 1; i++) {
    paginationLink.innerHTML += `<li>
              <a href="#">` + i + `</a>
            </li>`;
  }
  // If pagination links existed before, remove them.
  if (document.querySelector('.pagination ul')) {
    paginationDiv.removeChild(document.querySelector('.pagination ul'));
  }

  if (students.length > studentToDisplay) {
    // append new paginationDiv to DOM
    paginationDiv.appendChild(paginationLink);
    paginationLink.querySelector('a').classList.add('active');
  }
}

// Create search div and append it to the document
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
  let paginationLink = document.querySelector('.pagination ul');
  hideStudents();
  if (prevMessage) {
    page.removeChild(prevMessage);
  }
  if (paginationLink) {
    paginationDiv.removeChild(paginationLink);
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
    message.innerHTML = 'Sorry, no student found';
    page.appendChild(message);
  } else {
    // Show matched student and add page links if matched array contains more than 10 items
    intializePage(matched);
  }
  searchInput.value = '';
}

// Click event handler for the search functionality
searchButton.addEventListener('click', searchList);

// Add click event handler to each anchor in pagination div
paginationDiv.addEventListener('click', (e) => {
  // Prevent browser from updating URL
  e.preventDefault();
  const anchor = e.target.closest('a');
  if (anchor) {
    // Remove active class from each pagination link
    const activeAnchors = paginationDiv.querySelectorAll('li .active');
    activeAnchors.forEach(anchor => {
      anchor.classList.remove('active');
    })
    let pageNumber = anchor.textContent;
    showPage(pageNumber, studentList);
    anchor.classList.add('active');
  }
})