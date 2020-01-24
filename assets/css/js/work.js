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
  const close = document.querySelectorAll('.close');
  // const carousel = document.querySelectorAll('.carousel-slide img');

  workLinks.forEach(link => {
    const linkNum = link.dataset.pic;
    link.addEventListener('click', event => {
      event.preventDefault();
      module[linkNum].classList.remove('hidden');
    });
    close[linkNum].addEventListener('click', () => {
      module[linkNum].classList.add('hidden');
    });
  });

  const itemClassName = 'carousel__photo';
  const items = document.getElementsByClassName(itemClassName);
  const totalItems = items.length;
  let slide = 0;
  let moving = true;

  function setInitialClasses() {
    // Targets the previous, current, and next items
    // This assumes there are at least three items.
    items[totalItems - 1].classList.add('prev');
    items[0].classList.add('active');
    items[1].classList.add('next');
  } // Set event listeners

  // Next navigation handler
  function moveNext() {
    // Check if moving
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      } // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  } // Previous navigation handler
  function movePrev() {
    // Check if moving
    if (!moving) {
      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }


  function disableInteraction() {
    // Set 'moving' to true for the same duration as our transition.
    // (0.5s = 500ms)

    moving = true; // setTimeout runs its function once after the given time
    setTimeout(function() {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {
    // Check if carousel is moving, if not, allow interaction
    if (!moving) {
      // temporarily disable interactivity
      disableInteraction(); // Update the "old" adjacent slides with "new" ones
      let newPrevious = slide - 1;
      let newNext = slide + 1;
      let oldPrevious = slide - 2;
      let oldNext = slide + 2; // Test if carousel has more than three items
      if (totalItems - 1 > 3) {
        // Checks and updates if the new slides are out of bounds
        if (newPrevious <= 0) {
          oldPrevious = totalItems - 1;
        } else if (newNext >= totalItems - 1) {
          oldNext = 0;
        } // Checks and updates if slide is at the beginning/end
        if (slide === 0) {
          newPrevious = totalItems - 1;
          oldPrevious = totalItems - 2;
          oldNext = slide + 1;
        } else if (slide === totalItems - 1) {
          newPrevious = slide - 1;
          newNext = 0;
          oldNext = 1;
        } // Now we've worked out where we are and where we're going,
        // by adding/removing classes we'll trigger the transitions.      // Reset old next/prev elements to default classes
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName; // Add new classes
        items[newPrevious].className = itemClassName + ' prev';
        items[slide].className = itemClassName + ' active';
        items[newNext].className = itemClassName + ' next';
      }
    }
  }

  function initCarousel() {
    setInitialClasses();
    moving = false;
  }

  const next = document.querySelector('carousel__button--next');
  const prev = document.querySelector('carousel__button--prev');
  console.log(next)
  next.addEventListener('click', moveNext);
  prev.addEventListener('click', movePrev);

  initCarousel();
});
