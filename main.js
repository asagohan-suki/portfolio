'use strict';

{

  // ---------- get element ----------
  const body = document.querySelector('body');
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');
  const background = document.querySelector(".background");
  const hamburger = document.querySelector('.hamburger');
  const hamburgerClose = document.querySelector('.hamburger-close');
  
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
      document.querySelector('footer').style.display = 'block';
    }, 3500);
  });

  // ---------- Intersection Observer ----------
  const options = {
    threshold: 0,
  }
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('up');
      observer.unobserve(entry.target);
    });
  }

  const observer = new IntersectionObserver(callback, options);
  const targets = document.querySelectorAll('.target');

  targets.forEach(target => {
    observer.observe(target);
  });

  // ---------- nav ----------
  const optionsFollow = {
    threshold: [0, 0.1], //見え始めるときと見えなくなる時と、10%を超えた時
    rootMargin: '100px',
  }

  const follow = (entry) => {
    const headerHeight = entry[0].boundingClientRect.height;
    const headerTop = -entry[0].boundingClientRect.top;
    // モバイル用 appearHamburger呼び出し
    if (window.innerWidth < 600) {
        appearHamburger(headerHeight, headerTop);
        return;
    }
    if (headerTop > headerHeight + 100) {
      nav.classList.add('fixed');
    } else if (headerTop > headerHeight + 50) {
      nav.classList.add('transparent');
    } else {
      nav.classList.remove('fixed');
      nav.classList.remove('transparent');
    }
  }
  const observerFollow = new IntersectionObserver(follow, optionsFollow);
  observerFollow.observe(header);

  // ---------- appearHamburger ----------
  const appearHamburger = (headerHeight, headerTop) => {
    if (headerTop > headerHeight + 50) {
      hamburger.classList.add('appear', 'mark');
    } else {
      hamburger.classList.remove('appear', 'mark');
    }
  }

  // ---------- openHamburger ----------
  hamburger.addEventListener('click', () => {
    nav.classList.add('mobile');
    hamburger.classList.remove('appear');
    hamburgerClose.classList.add('appear');
    // ---------- closeHamburger ----------
    hamburgerClose.addEventListener('click', () => {
      if (hamburger.classList.contains('mark')) {
        hamburger.classList.add('appear');
      }
      nav.classList.remove('mobile');
      hamburgerClose.classList.remove('appear');
    });
    const mobileLinks = document.querySelectorAll('a');
    mobileLinks.forEach(mobileLink => {
      mobileLink.addEventListener('click', () => {
      hamburgerClose.click();
      });
    });
  });

  // ---------- explanation ---------- 
  const explanation = {
    password: 'パスワード生成アプリです。プログラミング学習サービス「ドットインストール」のレッスンをもとに作りました。<br>レッスンのままのコードだと数字と記号にチェックをいれても確率上入らないことがあるので、その点を改良しました。<span class="information">使用言語:&nbsp;HTML/CSS/JavaScript</span>',
    countdown: 'カウントダウンアプリです。プログラミング学習サービス「ドットインストール」のレッスンをもとに作りました。<br>秒数を選べて、Start/Stop/Cancelができるようにアレンジしました。StartとStopを共通のボタンにするのが難しかったです。<span class="information">使用言語:&nbsp;HTML/CSS/JavaScript</span>',
    slideshow: 'プログラミング学習サービス「ドットインストール」のレッスンをもとに作ったスライドショーです。<br>フォルダ内に写真を追加すると、自動的にスライドショーに追加されるようにアレンジしました。<span class="information">使用言語:&nbsp;HTML/CSS/JavaScript</span>',
    portfolio: 'このサイトです。名前があさごはんなので、卵をイメージして、黄色と丸い形をテーマにかわいらしいサイトにしました。<span class="information">使用言語:&nbsp;HTML/CSS/JavaScript<br>制作期間:&nbsp;構想から完成まで9日間</span>',
    memo: 'プログラミング学習サービス「ドットインストール」のレッスンをもとに作ったメモアプリです。ローカルストレージを利用しています。メモを複数追加できて、個別削除できるようにアレンジしました。<span class="information">使用言語:&nbsp;HTML/CSS/JavaScript</span>',
  }

  // ---------- mouseover animation & modal ----------
  const contents = document.querySelectorAll('.content');
  contents.forEach(content => {
    // ---------- modal ----------
    content.addEventListener('click', () => {
      // モーダル表示
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
      figcaption.classList.add('description');
      figcaption.innerHTML = explanation[keyword];
      close.classList.add('bi', 'bi-x-circle');

      figure.appendChild(img);
      figure.appendChild(figcaption);

      modal.appendChild(figure);
      modal.appendChild(close);

      body.insertBefore(modalCover, background);
      body.insertBefore(modal, background);
      // モーダルをふわっと表示
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
      });
    });
    // ---------- mouseover ----------
    content.addEventListener('mouseover', () => {
      const contentCover = content.children[1];
      contentCover.classList.add('appear');
      const contentTitle = content.children[2];
      contentTitle.textContent = content.children[0].alt;
      contentTitle.classList.add('appear');
    });
    // ---------- mouseleave ----------
    content.addEventListener('mouseleave', () => {
      content.children[1].classList.remove('appear');
      content.children[2].classList.remove('appear');
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
      // 現在のスクロール量より位置が上の方になるから、ゆっくり動くということ？
    }
  }
  // ウィンドウをスクロールしたときに handleScroll() 関数を実行
  window.addEventListener("scroll", handleScroll);

}