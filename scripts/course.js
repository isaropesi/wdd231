const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: [
      'HTML',
      'CSS'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: [
      'C#'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: false
  }
]

const courseList = document.querySelector('.course-list');
const filterButtons = document.querySelectorAll('.filter button');
const numberCredit = document.getElementById('number-credits');
const courseModal = document.getElementById('course-modal');

function displayCourses(filter = 'All') {
  courseList.innerHTML = '';

  let filteredCourses = courses;
  if (filter !== 'All') {
    filteredCourses = courses.filter(course => course.subject === filter);
  }

  const totalCredits = filteredCourses.reduce((total, course) => {
    total += course.credits;
    return total;
  }, 0);

  numberCredit.innerText = `The total number of course listed below is: ${totalCredits}`;

  filteredCourses.forEach((course, idx) => {
    const courseElement = document.createElement('div');
    courseElement.className = `course ${course.completed ? '' : 'incomplete'}`;
    courseElement.textContent = `${course.subject} ${course.number}`;
    courseElement.title = `${course.title} - ${course.description}`;
    courseElement.tabIndex = 0;
    courseElement.setAttribute('role', 'button');
    courseElement.setAttribute('aria-label', `${course.subject} ${course.number}: ${course.title}`);

    // Modal trigger
    courseElement.addEventListener('click', () => showCourseModal(course));
    courseElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        showCourseModal(course);
      }
    });

    courseList.appendChild(courseElement);
  });
}

function showCourseModal(course) {
  courseModal.innerHTML = `
    <button class="close-modal" aria-label="Close">&times;</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Description:</strong> ${course.description}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
    <p><strong>Technology:</strong> ${course.technology.join(', ')}</p>
  `;
  courseModal.showModal();

  // Close button
  courseModal.querySelector('.close-modal').onclick = () => courseModal.close();

  // Close on click outside
  courseModal.addEventListener('click', function handler(e) {
    if (e.target === courseModal) {
      courseModal.close();
    }
  }, { once: true });
}

function initializeFilters() {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      displayCourses(button.textContent);
    });
  });

  displayCourses();
  filterButtons[0].classList.add('active');
}

document.addEventListener('DOMContentLoaded', initializeFilters);

