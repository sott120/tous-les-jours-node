var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  slidesPerGroup: 2,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 4000,
  },
  breakpoints: { //반응형 조건 속성
    989: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
    480: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
}
);