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
  cursor.setAttribute(
    'style',
    `top: ${e.pageY + 12}px; left:${e.pageX + 12}px;`
  );
});

const workLinks = document.querySelectorAll('.work-link');
const workPreview = document.querySelector('.work-preview');

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
  workLinks.forEach(link => {
    link.addEventListener('mouseover', event => {
      console.log(event)
      const previewCursor = cursor.classList.add('animated');
        // cursor.style.height = '500px';
        // cursor.style.width = '200px';
    //   cursor.classList.add('work-preview');
    //   prev.style.zIndex = 4;
      previewCursor.add.style.backgroundImage = `url(${
        images[event.target.dataset.pic]
      }) cover;`;
    });
  });

  workLinks.forEach(link => {
    link.addEventListener('mouseleave', () => {
    //   cursor.classList.remove('work-preview');
      cursor.style.backgroundImage = '';
      cursor.style.height = '40px';
      cursor.style.width = '40px'
    });
  });
});
