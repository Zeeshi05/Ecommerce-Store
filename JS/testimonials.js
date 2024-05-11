(function () {
    "use strict";
  
    var carousels = function () {
      var owlCarousel1 = document.querySelector(".owl-carousel1");
  
      if (owlCarousel1) {
        new Glide(owlCarousel1, {
          type: "carousel",
          startAt: 0,
          perView: 1,
          focusAt: "center",
          gap: 0,
          breakpoints: {
            680: {
              perView: 2,
              focusAt: 0,
              gap: 0,
              bound: true,
            },
            1000: {
              perView: 3,
              focusAt: 0,
              gap: 0,
              bound: true,
            },
          },
        }).mount();
      }
    };
  
    carousels();
  })();
  