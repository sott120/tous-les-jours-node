$(window).on('load', function () {
  load('#js-load', '3');
  $("#js-btn-wrap").on("click", function () {
    load('#js-load', '3', '#js-btn-wrap');
  })
});

function load(id, cnt, btn) {
  var event_list = id + " .js-load:not(.active)";
  var event_length = $(event_list).length;
  var event_total_cnt;
  if (cnt < event_length) {
    event_total_cnt = cnt;
  } else {
    event_total_cnt = event_length;
    $('#js-btn-wrap').hide()
  }
  $(event_list + ":lt(" + event_total_cnt + ")").addClass("active");
}