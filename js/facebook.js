window.fbAsyncInit = function() {
  FB.init({
    appId: '294571097270190',
    xfbml: true,
    version: 'v2.9'
  });
  FB.AppEvents.logPageView();
  FB.getLoginStatus(function(response) {
    if (response.status == 'connected') {
      window.location.pathname = "/selector.html"
    }
  });
};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "http://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
