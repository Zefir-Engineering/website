$(function () {
  $("a[id^='seller_form']").on("click", () => {
    window.location.pathname = "/offre/demande/v2";

    return false;
  });

  $("a[id^='slf_v2']").on("click", (e) => {
    const target = $(e.target);

    try {
      let url = new URL(target.attr("href"));

      url.pathname = "offre/demande/v2";
      window.location.pathname = url.toString();
    } catch (e) {
      window.location.pathname = "/offre/demande/v2";
    }

    return false;
  });
});
