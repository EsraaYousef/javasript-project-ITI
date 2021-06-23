$(document).ready(function () {
  "use strict";

  $(".EnableLoader").click(function (event) {
    $(".global-loader").fadeIn("slow");
    $("body").css({ overflow: "hidden" });
    setTimeout(function () {
      $(".global-loader").fadeOut("slow");
      $("body").css({ overflow: "visible" });
    }, 2000);
  });
});

$(window).on("load", function () {
  $(".global-loader").delay(500).fadeOut("slow");
});
