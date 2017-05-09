
$('#altlogin').click(function(){
  FB.login(function(inResponse){
    if (inResponse.status == 'connected'){
    toggleVisible();
    generateFriends(inResponse.authResponse.userID);
  }
},{scope: 'user_friends,public_profile,manage_pages,publish_pages,publish_actions,user_posts'});
});
$('#logOut').click(function(){
  FB.logout(function(outResponse){
    toggleVisible();
    $('#aPlaceForEnemies').empty();
  });
});



function toggleVisible(){
  if ($('#loggedIn').css('display') == 'flex'){
    $('#loggedIn').css('display', 'none');
  }else{
    $('#loggedIn').css('display','flex');
  }
  if ($('#loggedOut').css('display') == 'none'){
    $('#loggedOut').css('display','flex');
  }else{
    $('#loggedOut').css('display','none');
  }
}
function generateFriends(id){
  FB.api('/'+id+'/friends', function(friends){
    var source = $('#friendCard').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i<friends.data.length;i++){
      id = friends.data[i].id;
      var context = {
        'id': friends.data[i].id,
        'name': friends.data[i].name,
        'profPic' : 'https://theawesomer.com/photos/2010/06/060410_Facebook_profile_pic_1.jpg'
      };
      var html = template(context);
      $('#aPlaceForEnemies').append(html);
      updatePicture(id);
    }
  });
}
function updatePicture(id){
  FB.api('/'+id+'/picture?type=large', function(picture){
    $('#pic'+id).attr('src', picture.data.url);
  });
}
