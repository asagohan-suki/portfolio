'use strict';

{

  // ---------- get element ----------
  const body = document.querySelector('body');
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');
  const background = document.querySelector(".background");
  
  // ---------- smooth scroll ----------
  window.addEventListener('DOMContentLoaded', () => {
    const destinations = document.querySelectorAll('a[href^="#"]');
    destinations.forEach(destination => {
      destination.addEventListener('click', e => {
        e.preventDefault(); // デフォルトの動作をキャンセル
        let targetHref = destination.getAttribute('href'); // href属性の値を取得
        let targetElement = document.getElementById(targetHref.replace('#', ''));
        const rect = targetElement.getBoundingClientRect().top; // ブラウザからの高さを取得
        const offset = window.scrollY; // 現在のスクロール量を取得
        const target = rect + offset; // 最終的な位置を割り出す
        window.scrollTo({
          top: target,
          behavior: 'smooth',
        });
      });
    });
  });

  // ---------- loading ----------
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('header').style.display = 'block';
    }, 1000);
    setTimeout(() => {
      document.querySelector('main').style.display = 'block';
    }, 3500);
  });

  // ---------- Intersection Observer ----------
  // const options = {
  //   threshold: 0,
  // }

  // const callback = (entries, observer) => {
  //   entries.forEach(entry => {
  //     if(!entry.isIntersecting) {
  //       return;
  //     }
  //     entry.target.classList.add('up');
  //     observer.unobserve(entry.target);
  //   });
  // }

  // const observer = new IntersectionObserver(callback, options);

  // const targets = document.querySelectorAll('.target');

  // targets.forEach(target => {
  //   observer.observe(target);
  // });

  // ---------- nav ----------
  const optionsFollow = {
    // threshold: 0, 対象の要素が見え始める時と見えなくなる時
    // threshold: .5, 見える範囲が 50% を超えたときのみ検出
    threshold: [0, 0.1], //見え始めるときと見えなくなる時と、20%を超えた時
    rootMargin: '100px',
  }

  const follow = (entry) => {
    const headerHeight = entry[0].boundingClientRect.height;
    const headerTop = -entry[0].boundingClientRect.top;
    console.log(entry[0]);
    console.log(entry[0].intersectionRatio);
    console.log('headerTop:' + headerTop);
    if (headerTop > headerHeight + 100) {
      console.log('big');
      nav.classList.add('fixed');
    } else if (headerTop > headerHeight + 50) {
      console.log('middle');
      nav.classList.add('transparent');
    } else {
      console.log('small');
      nav.classList.remove('fixed');
      nav.classList.remove('transparent');
    }
  }
  const observerFollow = new IntersectionObserver(follow, optionsFollow);
  observerFollow.observe(header);

  // ---------- モーダル用説明文 ---------- 
  const instructions = {
    password: 'パスワードアプリです。パスワードアプリです。パスワードアプリです。パスワードアプリです。パスワードアプリです。パスワードアプリです。パスワードアプリです。パスワードアプリです。パスワードアプリです。パスワードアプリです。パスワードアプリです。パスワードアプリです。パスワードアプリです。',
    countdown: 'カウントダウンアプリです。カウントダウンアプリです。',
    slideshow: 'スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。スライドショーです。',
  }

  // ---------- modal ----------
  const contents = document.querySelectorAll('.content');
  contents.forEach(content => {
    content.addEventListener('click', () => {
      // モーダルの生成と追加
      const modalCover = document.createElement('div');
      const modal = document.createElement('div');
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');
      const close = document.createElement('i');

      modalCover.classList.add('modal-cover');
      modal.classList.add('modal');
      img.src = content.firstElementChild.src;
      img.alt = content.firstElementChild.alt;
      const keyword = content.firstElementChild.dataset.instruction;
      figcaption.textContent = instructions[keyword];
      close.classList.add('bi', 'bi-x-circle');

      figure.appendChild(img);
      figure.appendChild(figcaption);

      modal.appendChild(figure);
      modal.appendChild(close);

      body.insertBefore(modalCover, background);
      body.insertBefore(modal, background);
      // ふわっと表示
      setTimeout(() => {
        modalCover.style.opacity = '.8';
        modal.style.opacity = '1';
      }, 0);
      // モーダルを閉じる
      close.addEventListener('click', () => {
        body.removeChild(modal);
        body.removeChild(modalCover);
      });
      modalCover.addEventListener('click', () => {
        close.click();
      })
    });
  });

  // ---------- parallax ----------

  // 背景画像の移動量 この値を変えると背景画像の移動する速さが変わる
  const parallaxRatio = .1;

  // ウィンドウをスクロールしたときに実行する関数
  function handleScroll() {
    // その時のスクロール量を取得
    const scrollTop = window.scrollY;
    // スクロールされる度に、背景画像の位置を更新
    if (background) {
      const positionY = scrollTop * parallaxRatio;
      // 現在のスクロール量 * 移動量(parallaxRatio) ということは、parallaxRatio < 0 の場合、現在のスクロール量より小さい値になる
      background.style.backgroundPositionY = `${positionY}px`;
      // 現在のスクロール量より位置が上の方になるから、ゆっくり動くということ...？
    }
  }

  // ウィンドウをスクロールしたときに handleScroll() 関数を実行
  window.addEventListener("scroll", handleScroll);

  // スクロール量など確認用 ------------------------------------------------------
  const test1 = document.getElementById('test1');
  const test2 = document.getElementById('test2');
  const test3 = document.getElementById('test3');
  
  window.addEventListener('scroll', () => {
    test1.textContent = 'スクロール量:' + window.scrollY;
    test2.textContent = 'headerのtop位置:' + header.getBoundingClientRect().top;
    test3.textContent = 'bodyの高さ:' + body.getBoundingClientRect().height;
  });

}