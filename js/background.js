window.addEventListener('load', () => {
  let dateNow = new Date();
  const dateBirthday = new Date(2020, 11, 10, 12, 0, 0);
//   if(dateBirthday >= dateNow) {
//     let main = document.querySelector('.main');
//     main.parentNode.removeChild(main);
//     return;
//   }
//   createBackground();
//   happyBirthday();
// }) 
function boom(interval) {
  let background = document.querySelector('.background');
  let grids = document.querySelectorAll('.grid');
  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      let masks = document.querySelectorAll('.mask');
      for(let i = 0; i < masks.length; i++) {
        masks[i].className = 'mask break';
      }
    }, 0);
    setTimeout(() => {
      let masks = document.querySelectorAll('.mask');
      for(let i = 0; i < masks.length; i++) {
        masks[i].className = 'mask break boom';
      }
    }, 2000);
    setTimeout(() => {
      let masks = document.querySelectorAll('.mask-container');
      let birthday = document.querySelector('.birthday');
      for(let i = 0; i < masks.length; i++) {
        masks[i].parentNode.removeChild(masks[i]);
      }
      for(let i = 0; i < grids.length; i++) {
        grids[i].style.backgroundColor = 'white';
      }
      background.style.backgroundColor = 'rgba(255,255,255,0)';
      birthday.parentNode.removeChild(birthday);
    }, 5000);
    setTimeout(() => {
      let birthdayImg = document.querySelector('.birthday-image');
      birthdayImg.parentNode.removeChild(birthdayImg);
      for(let i = 0; i < grids.length; i++) {
        grids[i].className = 'grid break';
      }
    }, 8000);
    setTimeout(() => {
      background.parentNode.removeChild(background);
    }, 13000);
    setInterval(() => {
      imageLoop(0);
    }, 13000);
  }, 5000);
}
function happyBirthday() {
  const background = document.querySelector('.background');
  let birthday = document.createElement('div');
  let birthdayImage = document.createElement('img');
  birthday.setAttribute('class', 'birthday');
  birthdayImage.setAttribute('class', 'birthday-image');
  birthday.innerHTML = '生日快乐！';
  birthdayImage.src = './imgs/HappyBirthday.png';
  background.appendChild(birthday);
  background.appendChild(birthdayImage);
}
async function createBackground() {
  const body = document.querySelector('body');
  await addBackground(body);
  const background = body.querySelector('.background');
  const maskContainer = background.querySelectorAll('.mask-container');
  addMasks(maskContainer);
  
}
function addMasks(maskContainer) {
  let interval = null;
  setTimeout(() => {
    createMasks(maskContainer[0]);
  }, 0);
  setTimeout(() => {
    createMasks(maskContainer[1]);
  }, 5000);
  setTimeout(() => {
    createMasks(maskContainer[2]);
  }, 10000);
  interval = setInterval(() => {
    setTimeout(() => {
      removeMasks(maskContainer[0]);
      createMasks(maskContainer[0]);
    }, 0);
    setTimeout(() => {
      removeMasks(maskContainer[1]);
      createMasks(maskContainer[1]);
    }, 5000);
    setTimeout(() => {
      removeMasks(maskContainer[2]);
      createMasks(maskContainer[2]);
    }, 10000);
  }, 15000)
  boom(interval);
}
function addBackground(body) {
  const background = document.createElement('div');
  background.setAttribute('class', 'background');
  for(let row = 0; row < 10; row++) {
    for(let col = 0; col < 20; col++) {
      let grid = document.createElement("div");
      grid.setAttribute('class', 'grid');
      grid.setAttribute('style', `--row:${row}vh; --col:${col}vw`);
      background.appendChild(grid);
    } 
  }
  for(let i = 0; i < 3; i++) {
    let maskContainer = document.createElement('div');
    maskContainer.setAttribute('class', 'mask-container');
    background.appendChild(maskContainer);
  }
  body.appendChild(background);
}
function removeMasks(maskContainer) {
  let masks = maskContainer.querySelectorAll('.mask');
  for (let mask of masks) {
    mask.parentNode.removeChild(mask);
  }

}
function createMasks(maskContainer) {
  let big = 0;
  let small = 0;
  let norm = 0;
  for(let i = 0; i < 10; i++) {
    let mask = document.createElement('div');
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let size = Math.floor(Math.random() * 4);
    if(size == 3) {
      if(big == 1) {
        i--;
        continue;
      }
      big++;
    }
    if(size == 2) {
      if(norm == 2) {
        i--;
        continue;
      }
      norm++;
    }
    if(size == 0) {
      if(small == 3) {
        i--;
        continue;
      }
      small++;
    }
    let rotate = Math.floor(Math.random() * 360);
    let time = size * 1;
    mask.setAttribute('class', 'mask');
    mask.setAttribute('style', `--row:${row * 10}vh; --col:${col * 10}vw; --size:${size == 0 ? 0.2 : size * 0.5}rem; --rotate:${rotate}deg; --time:${time + 10}s`);
    maskContainer.appendChild(mask);  
  }
}
function imageLoop(indexNow) {
  const mask = document.querySelector('.image-mask');
  const images = document.querySelectorAll('.img');
  setInterval(() => {
    setTimeout(() => {
      mask.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    }, 0);
    setTimeout(() => {
      mask.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      for(let i = 0; i < images.length; i++) {
        images[i].style.zIndex = '0';
      }
      images[indexNow].style.zIndex = '10';
      indexNow = (indexNow + 1) % 4;
    }, 500);
  }, 5000)
}
