/*********************************소개페이지********************************/
// intro history swiper
let swiper = new Swiper('.his_swiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    // centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
    },
    navigation: {
        nextEl: '.his_nav_next',
        prevEl: '.his_nav_prev',
    },
    breakpoints: {
        1280: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        989: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
    },
});

//인트로 페이지 스크롤시 fade in 애니메이션 실행
const transList = document.querySelectorAll('.int_transition');

const animation = function () {
    for (element of transList) {
        if (window.innerWidth > 767) {
            if (!element.classList.contains('show')) {
                if (window.innerHeight > element.getBoundingClientRect().top + 100) {
                    element.classList.add('show');
                }
            }
        } else {
            element.classList.remove('int_transition_up');
            element.classList.remove('int_transition_right');
            element.classList.remove('int_transition');
        }
    }
};

window.addEventListener('scroll', animation);
window.addEventListener('load', animation);

// 페이지 스크롤링
const scrollList = document.querySelectorAll('.scrollnav_circle');
const scrollTxt = document.querySelectorAll('.scrollnav_txt');
const boxArr = document.querySelectorAll('.intro_box');

function appear(i) {
    scrollList[i].style.backgroundColor = '#c5c5c5';
    scrollTxt[i].style.opacity = '1';
}

function disappear(i) {
    scrollList[i].style.backgroundColor = 'transparent';
    scrollTxt[i].style.opacity = '0';
}

//nav 클릭시 스크롤
for (let i = 0; i < scrollList.length; i++) {
    scrollList[i].addEventListener('click', function (e) {
        e.preventDefault();
        boxArr[i].scrollIntoView({ behavior: 'smooth' });
    });
} //css에 scroll-marign 속성을 이용해서 높이를 수정해줬다.

//스크롤시 버튼 변화
var boxTop1 = boxArr[0].getBoundingClientRect().top;
var boxTop2 = boxArr[1].getBoundingClientRect().top;
var boxTop3 = boxArr[2].getBoundingClientRect().top;
var absoluteTop1 = window.pageYOffset + boxTop1;
var absoluteTop2 = window.pageYOffset + boxTop2;
var absoluteTop3 = window.pageYOffset + boxTop3;
//intro_box들의 고정 위치 구하는 변수

function navChange() {
    
    if (window.pageYOffset + 120 >= absoluteTop1 && window.pageYOffset + 500 < absoluteTop2 ) {
        disappear(1);
        disappear(2);
        appear(0);
    }
    if (window.pageYOffset + 500 >= absoluteTop2  && window.pageYOffset + 1100 < absoluteTop3 ) {
        disappear(0);
        disappear(2);
        appear(1);
    }
    if (window.pageYOffset + 1100 >= absoluteTop3 ) {
        disappear(0);
        disappear(1);
        appear(2);
    }
    if (window.pageYOffset + 120 < absoluteTop1 ) {
        disappear(0);
        disappear(1);
        disappear(2);
        scrollTxt[0].style.opacity = '1';
        scrollTxt[1].style.opacity = '1';
        scrollTxt[2].style.opacity = '1';
    }
}

window.addEventListener('scroll', navChange);
window.addEventListener('load', navChange);
