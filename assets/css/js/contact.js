const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
  cursor.setAttribute(
    'style',
    `top: ${e.pageY}px; left:${e.pageX}px;`
  );
});

const links = document.querySelectorAll('a');

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