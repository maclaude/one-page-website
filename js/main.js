"use strict";

const app = {
  init: () => {
    // Global selector
    app.header =  document.querySelector('.header')
    app.navigation = document.querySelector('.navigation');
    app.menuIcon = document.querySelector('.menu-toggle');
    // Actions
    app.smoothScrolling();
    app.navigationToggle();
    app.headerToggleOnScroll();
    app.headerStyleOnScroll();
  },

  smoothScrolling: () => {
    new SmoothScroll('a[href*="#"]');
  },

  navigationToggle: () => {
    const navigationLinks = document.querySelectorAll('.navigation__link');

    // Toogle dropdown navigation on icon click
    app.menuIcon.addEventListener('click', () => {
      app.menuIcon.classList.toggle('open');
      app.navigation.classList.toggle('navigation--open');
    });

    // Close dropdown navigation on link click
    navigationLinks.forEach(link => {
      link.addEventListener('click', () => {
        app.menuIcon.classList.remove('open');
        app.navigation.classList.remove('navigation--open');
      });
    })
  },

  headerToggleOnScroll: () => {
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        app.header.classList.add('header--up');
        app.menuIcon.classList.remove('open');
        app.navigation.classList.remove('navigation--open');
      } else {
        app.header.classList.remove('header--up');
      }

      // Setting last scroll top position
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  },

  headerStyleOnScroll: () => {
    const sectionHero = document.querySelector("#section-hero");

    const sectionHeroOptions = {
      rootMargin: "-150px 0px 0px 0px"
    };

    const sectionHeroObserver = new IntersectionObserver((entries, sectionHeroObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          app.header.classList.add('header--scrolled');
        } else {
          app.header.classList.remove('header--scrolled');
        }
      })
    }, sectionHeroOptions);

    sectionHeroObserver.observe(sectionHero);
  }
};

document.addEventListener('DOMContentLoaded', app.init);
