let container = document.querySelector('.cases');
const images = document.querySelectorAll('.cases img');


let mouse = {
  _x: 0,
  _y: 0,
  x: 0,
  y: 0,
  updatePosition: event => {
    const e = event || window.event;
    this.x = e.clientX - this._x;
    this.y = (e.clientY - this._y) * -1;
  },
  setOrigin: e => {
    this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
    this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
  },
};

const update = event => {
  mouse.updatePosition(event);
  images.forEach(img => {
    updateTransformStyle(
      (event.y / img.offsetHeight / 2).toFixed(2),
      (event.x / img.offsetWidth / 2).toFixed(2)
    );
  })
};

const updateTransformStyle = (x, y) => {
  images.forEach(img => {
    const style = `rotateX(${x}deg) rotateY(${y}deg)`;
    console.log('is this thing on?');
    img.style.transform = style;
    img.style.webkitTransform = style;
    img.style.mozTransform = style;
    img.style.msTransform = style;
    img.style.oTransform = style;
  })
};

let counter = 0;
let updateRate = 5;

const isTimeToUpdate = () => {
  return counter++ % updateRate === 0;
};

const onMouseEnterHandler = event => {
  update(event);
};

const onMouseLeaveHandler = () => {
  images.forEach( img => {
    img.style = '';
  })
};

const onMouseMoveHandler = event => {
  if (isTimeToUpdate()) {
    update(event);
  }
};

mouse.setOrigin(container);
container.onmouseenter = onMouseEnterHandler;
container.onmouseleave = onMouseLeaveHandler;
container.onmousemove = onMouseMoveHandler;
