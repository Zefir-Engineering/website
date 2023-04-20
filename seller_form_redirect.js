$(function () {
  $("a[id^='seller_form']").on('click', (e) => {
    window.location.pathname = "/offre/demande/v2";
    
    return false;
  });
});
