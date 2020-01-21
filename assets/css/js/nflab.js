// loader

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  console.log('loading');
  loader.className += ' hidden';
});

// progress bar

const progressBar = () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('status-bar').style.height = `${scrolled}%`;
};

window.onscroll = () => {
  progressBar();
};

// mouse

const cursorCircle = document.querySelector('.cursor-circle');
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a');

document.addEventListener('mousemove', e => {
  cursorCircle.setAttribute(
    'style',
    `top: ${e.pageY + 12}px; left:${e.pageX + 12}px;`
  );
});

window.addEventListener('wheel', function(event) {
  if (event.deltaY < 0) {
    cursor.innerHTML = '☝';
  } else if (event.deltaY > 0) {
    cursor.innerHTML = '☟';
  }
});

// nav

const logo = document.querySelector('.logo');
const homeLink = document.querySelector('.home-link');
const article = document.querySelector('article');
const navLine = document.querySelector('.nav-line')

window.addEventListener('scroll', () => {
  if (window.scrollY >= article.offsetTop) {
    logo.style.visibility = 'hidden';
    homeLink.innerHTML = '^';
    homeLink.style.fontSize = '50px';
}
else if (window.scrollY === 0) {
    homeLink.style.right = '50%';
    navLine.style.visibility = 'visible';
    cursor.innerHTML = '☟';
  } else {
    homeLink.style.left = null;
    homeLink.style.right = '2%';
    homeLink.innerHTML = 'Back to home';
    homeLink.style.fontSize = '16px';
    logo.style.visibility = 'visible';
    navLine.style.visibility = 'hidden';
  }
});

homeLink.addEventListener('mouseover', () => {
  cursor.innerHTML = '🏠';
  homeLink.style.cursor = 'none';
});

homeLink.addEventListener('mouseleave', () => {
  cursor.innerHTML = '☟';
});

// wayfinder

window.addEventListener('DOMContentLoaded', () => {
  const blogLinks = document.querySelectorAll('.way-link');
  const boxes = document.querySelectorAll('.box');
  console.log(blogLinks);
  blogLinks.forEach(link => {
    link.addEventListener('mouseover', e => {
      const box = boxes[e.target.dataset.month - 1];
      link.style.cursor = 'none';
      box.style.opacity = 0;
      cursor.innerHTML = '✹';
    });
  });

  blogLinks.forEach(link => {
    link.addEventListener('mouseleave', e => {
      const box = boxes[e.target.dataset.month - 1];
      box.style.opacity = 1;
      box.style.background = 'rgba(255, 255, 255, 0.5)';
      cursor.innerHTML = '☟';
    });
  });
});
