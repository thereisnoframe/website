// loader

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
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

const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a');

document.addEventListener('mousemove', e => {
  cursor.setAttribute('style', `top: ${e.pageY}px; left:${e.pageX}px;`);
});

// nav

const logo = document.querySelector('.logo');
const homeLink = document.querySelector('.home-link');
const backToTop = document.querySelector('.back-to-top');
const article = document.querySelector('article');
const navLine = document.querySelector('.nav-line');

window.addEventListener('scroll', () => {
  if (window.scrollY >= article.offsetTop) {
    logo.style.visibility = 'hidden';
    backToTop.classList.remove('hidden');
    homeLink.classList.add('hidden');
  } else if (window.scrollY === 0) {
    backToTop.classList.add('hidden');
    homeLink.classList.remove('hidden');
    homeLink.style.right = '50%'; 
    navLine.style.visibility = 'visible';
  } else {
    homeLink.classList.remove('hidden');
    backToTop.classList.add('hidden');
    homeLink.style.left = null;
    homeLink.style.right = '2%';
    logo.style.visibility = 'visible';
    navLine.style.visibility = 'hidden';
  }
});

homeLink.addEventListener('mouseover', () => {
  cursor.classList.add('animated');
  homeLink.style.cursor = 'none';
});

homeLink.addEventListener('mouseleave', () => {
  cursor.classList.remove('animated');
});

// wayfinder

window.addEventListener('DOMContentLoaded', () => {
  const blogLinks = document.querySelectorAll('.way-link');
  const boxes = document.querySelectorAll('.box');
  blogLinks.forEach(link => {
    link.addEventListener('mouseover', e => {
      const box = boxes[e.target.dataset.box];
      link.style.cursor = 'none';
      box.style.opacity = 0;
      cursor.classList.add('animated');
    });
  });

  blogLinks.forEach(link => {
    link.addEventListener('mouseleave', e => {
      const box = boxes[e.target.dataset.box];
      box.style.opacity = 1;
      box.style.background = 'rgba(255, 255, 255, 0.5)';
      cursor.classList.remove('animated');
    });
  });

  const easeInOutCubic = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };
  const smoothScroll = event => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 2000;
    let start = null;

    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(
        0,
        easeInOutCubic(progress, startPosition, distance, duration)
      );
      if (progress < duration) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

  blogLinks.forEach(link => {
    link.addEventListener('click', e => {
      smoothScroll(e);
    });
  });
});

backToTop.addEventListener('click', e => {
  smoothScroll(e);
});