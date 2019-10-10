"use strict";

const app = {
  init: () => {
    console.log('App initialisation');
    app.smoothScrolling();
    app.navigationToggle();
  },

  smoothScrolling: () => {
    new SmoothScroll('a[href*="#"]');
  },

  navigationToggle: () => {
    const menuIcon = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    const navigationLinks = document.querySelectorAll('.navigation__link');

    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('open');
      navigation.classList.toggle('navigation--open');
    });

    navigationLinks.forEach(link => {
      link.addEventListener('click', () => {
        navigation.classList.remove('navigation--open');
      });
    })
  }
};

document.addEventListener('DOMContentLoaded', app.init);
