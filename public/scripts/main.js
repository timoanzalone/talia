new WOW().init()
// var rellax = new Rellax('.rellax');
// window.addEventListener("load", function(){
//   window.cookieconsent.initialise({
//     "palette": {
//       "popup": {
//         "background": "#ffffff",
//         "text": "#000000",
//       },
//       "button": {
//         "background": "#ffffff",
//         "text": "#000000"
//       }
//     },
//     "content": {
//       "message": "Questo sito utilizza cookie tecnici per facilitare la navigazione, cookie di analytics per raccogliere dati in forma aggregata, e cookie di terze parti per poter offrire ulteriori servizi e funzionalità agli utenti. Cliccando sull’apposito pulsante, chiudendo questo banner, scorrendo questa pagina, cliccando su un link o proseguendo la navigazione in altra maniera, acconsenti all’uso dei cookie. Se vuoi saperne di più o negare il consenso a tutti o ad alcuni cookie,",
//       "dismiss": "<span style='text-decoration: underline;'>Acconsento</span>",
//       "link": "consulta la cookie policy",
//       "href": "/privacy.html"
//     }
//   });
// });

$(document).ready(function() {
  $(".navbar-toggler").click(function() {
      $("#MobileNav").toggleClass("overlay");
  });
  $("#MobileNav .nav-link").click(function() {
    $("#MobileNav").toggleClass("overlay");
  });
});






