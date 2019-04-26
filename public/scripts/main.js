$(document).ready(function() {
  $(".navbar-toggler").click(function() {
      $("#MobileNav").toggleClass("overlay");
  });
  $("#MobileNav .nav-link").click(function() {
    $("#MobileNav").toggleClass("overlay");
  });
});
