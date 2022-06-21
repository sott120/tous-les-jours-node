const navtab = {

  init: function(){
      this.motab();
  },
  motab: function() {
      let mobBtn = $(".h_mobbtn");
      let closeBtn = $(".h_closebtn");

      // 모바일 버튼 클릭
      $(mobBtn).click(function(){
          $(".h_mobbox").addClass("on");
      });
      // 닫기 버튼 클릭
      $(closeBtn).click(function(){
          $(".h_mobbox").removeClass("on");
      });
  }
}

$(document).ready(function(){
  navtab.init();
})