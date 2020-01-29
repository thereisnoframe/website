const circleOne = document.getElementById('circle-one');
const circleTwo = document.getElementById('circle-two');

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

// mouse effects

const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a');

document.addEventListener('mousemove', e => {
  cursor.setAttribute(
    'style',
    `top: ${e.pageY}px; left:${e.pageX}px;`
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

const nav = document.querySelectorAll('nav a');

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    const services = document.querySelector('.about-breakdown');
    debounce(spin());
    if (window.scrollY >= services.offsetTop) {
      nav.forEach(link => {
        link.style.color = 'white';
      });
    } else {
      nav.forEach(link => {
        link.style.color = 'black';
      });
    }
  });
});

const aboutBreakdown = document.querySelector('.about-breakdown');

aboutBreakdown.addEventListener('mouseover', () => {
  cursor.classList.add('white');
});

aboutBreakdown.addEventListener('mouseleave', () => {
  cursor.classList.remove('white');
});

// buildsomething

var words = document.getElementsByClassName('something');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw =
    currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }

  currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
    cw[i].className = 'letter out';
  }, i * 80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = 'letter in';
  }, 340 + i * 80);
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }

  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);

const linkHover = document.querySelectorAll('a');

links.forEach(link => {
  link.addEventListener('mouseover', () => {
    cursor.classList.add('animated');
  });
});

links.forEach(link => {
  link.addEventListener('mouseleave', () => {
    cursor.classList.remove('animated');
  });
});

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
