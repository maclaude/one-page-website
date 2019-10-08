"use strict";

const app = {
  init: () => {
    console.log('App initialisation');
    app.smoothScrolling();
  },

  smoothScrolling: () => {
    new SmoothScroll('a[href*="#"]');
  }
};

document.addEventListener('DOMContentLoaded', app.init);
