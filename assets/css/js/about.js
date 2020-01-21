const circleOne = document.getElementById('circle-one');
const circleTwo = document.getElementById('circle-two');

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

// mouse effects

const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a');

// links.forEach(link => {
//     link.addEventListener('mouseover', () => {
//         console.log('its hovering')
//         cursor.style.backgroundColor= 'black'
//     })
// })

document.addEventListener('mousemove', e => {
  cursor.setAttribute(
    'style',
    `top: ${e.pageY + 12}px; left:${e.pageX + 12}px;`
  );
});

const debounce = (func, wait = 20, immediate = true) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const spin = () => {
  circleOne.style.transform = `rotate(${window.pageYOffset / 5}deg)`;
  circleTwo.style.transform = `rotate(${window.pageYOffset / 5}deg)`;
};

const isInView = elem => {
  console.log('view');
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

const nav = document.querySelectorAll('nav a');

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    const services = document.querySelector('.about-breakdown');
    console.log(services)
    console.log(window.scrollY )
    debounce(spin());
    if (window.scrollY >= services.offsetTop) {
      nav.forEach(link => {
        console.log('color change');
        link.style.color = 'white';
      });
    } else {
    nav.forEach(link => {
      link.style.color = 'black';
    });
  }
  });
})

// footer

const footer = document.querySelector('footer');
footer.style.visibility = 'hidden';
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    footer.style.visibility = 'visible';
    footer.style.position = 'fixed';
    footer.style.bottom = 0;
  } else {
    footer.style.visibility = 'hidden';
  }
});
