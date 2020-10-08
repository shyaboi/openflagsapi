lazyload();

$(document).ready(function () {
  $("#randFlag").click(function () {
    $.get("/rando", function (data, status) {
      // Set background image of a div on click of the button

      var imageUrl = data;
      $("html").parent().prev().prev().css({opacity:.2});
      $("html").css('z-index', '-11');
      $("html").css("background-image", `url(${imageUrl})`);
      $("html").css('background-size','auto');
    });
    // alert("Data: " + data + "\nStatus: " + status);
  });
});
var randFlag = $.get( "https://openflags.net/rando", function( data ) {
  // $("#logoRand").src=data;
  console.log(data)
  document.getElementById("logoRand").src=data;
});