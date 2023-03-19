'use strict';

{

  // 交差オブザーバーで要素をふわっと表示

  const options = {
    threshold: 0,
  }

  // 下からスクロールしたときは要素を動かさない書きかた
  // function callback(entries, observer){

  //   if (!entries[0].isIntersecting) {
  //     return;
  //   }

  //   entries[0].target.classList.add('up');
  //   observer.unobserve(entries[0].target);
  // };

  const callback = (entries, observer) => {
    if (entries[0].isIntersecting) {
      entries[0].target.classList.add('up');
    } else {
      entries[0].target.classList.remove('up');
    }
  }

  const observer = new IntersectionObserver(callback, options);

  const target = document.querySelector('.band');

  observer.observe(target);

  // 文字に動きをつける
  // const displayTitle = () => {
  //   p.classList.add('appear');
  // }

  // const p = document.querySelector('.text');
  // const title = 'あさごはん';
  // const titles = title.split('');
  // console.log(titles);

  
  // const test = () => {
  //   p.classList.toggle('appear');
  //   p.textContent = titles[0];
  //   setTimeout(test, 1000);
  // }
  
  // setTimeout(test, 1000);

  // p.textContent = title;

  // titles.forEach(title => {
  //   setTimeout(displayTitle, 1000);
  //   // p.textContent = title;
  //   // p.classList.add('appear');
  // });

  // console.log(p.textContent[0]);

  // 丸の色を変える

  // const circle = document.querySelector('.circle');
  // circle.classList.add('color-change');
}