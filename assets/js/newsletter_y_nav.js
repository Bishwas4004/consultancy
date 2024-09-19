'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);




// CALLBACK FORM
$("#callback-form").on('submit', function(e) {
    e.preventDefault();
  
    const form = document.getElementById('callback-form');
    const notification = document.getElementById('notification');
    notification.innerHTML = "";
    notification.style.display = "block";
  
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    notification.innerHTML = "Please wait...";
  
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.ok) {
        notification.innerHTML = `<p>Form submitted, we will contact shortly!</p>`;
      } else {
        notification.innerHTML = `<p>${json.message || 'An error occurred. Please try again later.'}</p>`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      notification.innerHTML = "<p>Something went wrong! Please try again later.</p>";
    })
    .finally(() => {
      form.reset();
      setTimeout(() => {
        notification.style.display = "none";
      }, 3000);
    });
  });