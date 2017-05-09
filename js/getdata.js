console.log('hello world');
$('#altlogin').click(function(){
  FB.getLoginStatus(function(statusresponse){
    console.log(statusresponse);
    if (statusresponse.status != 'connected'){
      FB.login(function(loginresponse){
        console.log(loginresponse);
        $('#altlogin').html('thank you')
      },{scope: 'user_friends,public_profile'})
    }else{
      $('#altlogin').css('display','none');
      var id = statusresponse.authResponse.userID;
      FB.api('/me', function(apiresponse){
        $('body').append('<h2>Thank you, ' +apiresponse.name+', for your contributuion to science.</h2>')
        console.log(apiresponse);
        }
      });
    }
  });



});
