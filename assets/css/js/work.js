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
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a');

document.addEventListener('mousemove', e => {
  cursor.setAttribute('style', `top: ${e.pageY}px; left:${e.pageX}px;`);
});

const images = [
  'https://www.placecage.com/200/500',
  'https://baconmockup.com/200/500',
  'https://www.fillmurray.com/200/500',
  'https://loremflickr.com/200/500',
  'https://baconmockup.com/200/500',
  'https://www.placecage.com/200/500',
  'https://baconmockup.com/200/500',
  'https://www.fillmurray.com/200/500',
  'https://loremflickr.com/200/500',
  'https://baconmockup.com/200/500',
];
window.addEventListener('DOMContentLoaded', () => {
  const workLinks = document.querySelectorAll('.work-link');
  workLinks.forEach(link => {
    link.addEventListener('mouseover', event => {
      cursor.classList.add('animated');
    });
  });

  workLinks.forEach(link => {
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('animated');
    });
  });

  const module = document.querySelectorAll('.module');

  workLinks.forEach(link => {
    const linkNum = link.dataset.pic;
    link.addEventListener('click', event => {
      event.preventDefault();
      const close = document.querySelectorAll('.close');
      const carousel = document.querySelectorAll('.carousel');
      module[linkNum].classList.remove('hidden');
      close[linkNum].addEventListener('click', () => {
        module[linkNum].classList.add('hidden');
      });
      const imageClass = 'carousel__photo';
      const carouselImages = carousel[linkNum].children;
      const totalImages = carouselImages.length;
      let slide = 0;
      let moving = true;
      const setInitialClass = () => {
        carouselImages[totalImages - 1].classList.add('prev');
        carouselImages[0].classList.add('active');
        carouselImages[1].classList.add('next');
      };

      const disableInteraction = () => {
        moving = true;
        setTimeout(() => {
          moving = false;
        }, 500);
      };

      const moveCarouselTo = slideChoice => {
        console.log('alright I will move it');
        console.log(slideChoice);
        console.log(moving);
        if (!moving) {
          disableInteraction();

          let newPrevious = slideChoice - 1;
          let newNext = slideChoice + 1;
          let oldPrevious = slideChoice - 2;
          let oldNext = slideChoice + 2;

          if (newPrevious <= 0) {
            oldPrevious = totalImages - 1;
          } else if (newNext >= totalImages - 1) {
            oldNext = 0;
          }
          if (slideChoice === 0) {
            newPrevious = totalImages - 1;
            oldPrevious = totalImages - 2;
            oldNext = slideChoice + 1;
          } else if (slideChoice === totalImages - 1) {
            newPrevious = slideChoice - 1;
            newNext = 0;
            oldNext = 1;
          }
          carouselImages[oldPrevious].className = imageClass;
          carouselImages[oldNext].className = imageClass;

          carouselImages[newPrevious].className = `${imageClass} prev`;
          carouselImages[slide].className = `${imageClass} active`;
          carouselImages[newNext].className = imageClass;
          console.log(carouselImages);
        }
      };

      const moveNext = () => {
        if (!moving) {
          if (slide === totalImages - 1) {
            slide = 0;
          } else {
            slide++;
          }
          moveCarouselTo(slide);
        }
      };

      const movePrev = () => {
        console.log(' going to move');
        if (!moving) {
          if (slide === 0) {
            slide = totalImages - 1;
          } else {
            slide--;
          }
          moveCarouselTo(slide);
        }
      };

      const setEventListeners = () => {
        const prev = document.querySelectorAll('.prev-button');
        const next = document.querySelectorAll('.next-button');
        const prevButton = prev[linkNum];
        const nextButton = next[linkNum];
        prevButton.addEventListener('click', movePrev);
        nextButton.addEventListener('click', moveNext);
      };

      const initCarousel = () => {
        setInitialClass();
        setEventListeners();
        moving = false;
      };

      initCarousel();
    });
  });
});
