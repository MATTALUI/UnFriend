$(document).ready(function(){
//
});


$('#altlogin').click(function(){
  FB.login(function(loginresponse){
    var userID = loginresponse.authResponse.userID;
    console.log(userID);
    FB.api("/"+userID+"/friends", function(apiresponse){
      for (var i =0; i<apiresponse.data.length;i++){
        $('body').append('<h5 id="'+apiresponse.data[i].id+'" class="aFriendYouHate">'+apiresponse.data[i].name+'</h5>');
      }
      $('.aFriendYouHate').on('click',function(event){

        FB.api("/me/feed", "POST",{
          "message": `I think that ${event.target.innerHTML} should stop being my friend.`,
          "tags": event.target.id });
      });
    });

  },{scope: 'user_friends,public_profile,manage_pages,publish_pages,publish_actions,user_posts'});
});

$('#logout').click(function(){
  FB.logout(function(response){
    window.location.pathname = "";
  });
});
