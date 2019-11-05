"use strict";

const SmoothScroll = require('smooth-scroll');

const app = {
  init: () => {
    // Global selector
    app.header =  document.querySelector('.header')
    app.navigation = document.querySelector('.navigation');
    app.menuIcon = document.querySelector('.menu-toggle');
    app.contactForm = document.querySelector(".contact-form");
    app.contactFormName = document.querySelector('#contact-form__name');
    app.contactFormEmail = document.querySelector('#contact-form__email');
    app.contactFormMessage = document.querySelector('#contact-form__message');
    // Actions
    app.smoothScrolling();
    app.navigationToggle();
    app.headerFixedPosition();
    app.headerToggleOnScroll();
    app.headerStyleOnScroll();
    app.sendContactFormData();
  },

  smoothScrolling: () => {
    new SmoothScroll('a[href*="#"]', {
      speed: 600,
      speedAsDuration: true
    });
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

  headerFixedPosition: () => {
    let heroHeight = window.innerHeight;

    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > heroHeight) {
        app.header.classList.add('header--fixed');
      } else {
        app.header.classList.remove('header--fixed')
      }
    });
  },

  headerToggleOnScroll: () => {
    let lastScrollTop = (window.innerHeight / 2);

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
      lastScrollTop = scrollTop <= (window.innerHeight / 2) ? (window.innerHeight / 2) : scrollTop;
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
  },

  sendContactFormData: () => {
    app.contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      Email.send({
        Host : "smtp.elasticemail.com",
        Username : "",
        Password : "",
        To : 'claude.marcantoine@gmail.com',
        From : 'claude.marcantoine2@gmail.com',
        Subject : `Vous avez été contacté par ${data.name} (${data.email})`,
        Body : data.message
      }).then(
        message => {
          if (message === 'OK') app.clearContactFormValues();
        }
      );
    });
  },

  clearContactFormValues: () => {    
    app.contactFormName.value = '';
    app.contactFormName.blur();

    app.contactFormEmail.value = '';
    app.contactFormEmail.blur();

    app.contactFormMessage.value = '';
    app.contactFormMessage.blur();
  }
};

document.addEventListener('DOMContentLoaded', app.init);
