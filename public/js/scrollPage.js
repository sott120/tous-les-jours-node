//쓰로틀링 코드
// var timer;
// document.querySelector('.body').addEventListener('scroll', function (e) {
//   if (!timer) {
//     timer = setTimeout(function() {
//       timer = null;
//       // 실행할 코드 내용
//     }, 200);
//   }
// });

if (matchMedia("screen and (max-width: 767px)").matches) {
} else {
  window.onresize = function () {
    document.location.reload();
  };

  window.onload = function () {
    var elm = ".main_scroll";
    $(elm).each(function (index) {
      // 개별적으로 Wheel 이벤트 적용
      $(this).on("mousewheel DOMMouseScroll", function (e) {
        e.preventDefault();
        var delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {
          delta = event.wheelDelta / 120;
          if (window.opera) delta = -delta;
        }
        else if (event.detail)
          delta = -event.detail / 3;
        var moveTop = $(window).scrollTop();
        var elmSelecter = $(elm).eq(index);

        // 박스 상단위치
        var boxArr = [];
        $(".main_scroll").each(function () {
          boxArr.push($(this).offset().top);
        });

        // 마우스휠을 위에서 아래로
        if (delta < 0) {
          for (var i = 0; i < boxArr.length; i++) {
            if (boxArr[i] > moveTop + 1) {
              moveTop = boxArr[i];
              i = boxArr.length;
            }
          }
          // 마우스휠을 아래에서 위로
        } else if (delta > 0) {
          for (var i = boxArr.length - 1; i >= 0; i--) {
            if (boxArr[i] < moveTop - 1) {
              moveTop = boxArr[i];
              i = -1;
            }
          }
        }

        // 화면 이동 0.8초(800)
        $("html,body").stop().animate({
          scrollTop: moveTop + 'px'
        }, {
          duration: 800, complete: function () {
          }
        });
      });
    });
  }
}



// 페이지 이동 버튼
const navList = document.querySelectorAll('.main_navcont');
const secArr = document.querySelectorAll('.main_sec');

for (let j = 0; j < navList.length; j++) {
  navList[j].addEventListener('click', function (g) {
    g.preventDefault();
    secArr[j].scrollIntoView({ behavior: 'smooth' });
  });
} //css에 scroll-marign 속성을 이용해서 높이를 수정해줬다.


const $topBtn = document.querySelector(".moveTopBtn");

//페이지에서 특정 위치로 스크롤 이동시키기 위해서는 window.scrollTo 메서드를 사용
//behavior: "smooth" 속성을 이용해 부드러운 이동을 구현
$topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });  
}

function scrollE() {
  var cont = document.querySelector('#container');
  var cli = 500 + window.scrollY;
  if (cli < window.innerHeight) {
      cont.style.opacity = 0;
  } else {
      cont.style.opacity = 1;
  }
}
window.addEventListener('load',scrollE);
window.addEventListener('scroll',scrollE);

// 처음에 페이지 하단으로 스크롤 위치 지정
