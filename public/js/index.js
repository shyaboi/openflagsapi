$(document).ready(function () {
  $("button").click(function () {
    $.get("http://localhost:4444/rando", function (data, status) {
      // Set background image of a div on click of the button

      var imageUrl = data;
      $("body").parent().prev().prev().css({opacity:.2});
      $("body").css('z-index', '-11');
      $("body").css("background-image", `url(${imageUrl})`);
      $("body").css('background-size','auto');
    });
    // alert("Data: " + data + "\nStatus: " + status);
  });
});
