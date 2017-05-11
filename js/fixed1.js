$(document).ready(start);

function start(){
$('#altlogin').click(function(){
  FB.login(function(inResponse){
    if (inResponse.status == 'connected'){
    toggleVisible();
    generateFriends(inResponse.authResponse.userID);
    generateMe();
  }
},{scope: 'user_friends,public_profile,manage_pages,publish_pages,publish_actions,user_posts'});
});
$('#logOut').click(function(){
  FB.logout(function(outResponse){
    toggleVisible();
    $('#aPlaceForEnemies').empty();
    $('#aPlaceForMe').empty();
    $('#aPlaceForEnemies').off('click');
  });
});
$('#meow').modal({dismissible:false})
$('.closeModal').click(closeModal);
$('#doIt').click(sendAttack)
}



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
function generateMe(){
  FB.api('/me', function(myInfo){
    var context = {
      'id': myInfo.id,
      'name': myInfo.name,
      'profPic': 'https://theawesomer.com/photos/2010/06/060410_Facebook_profile_pic_1.jpg'
    };
    handleIt('meCard', 'aPlaceForMe', context);
    updatePicture(myInfo.id, false, 'pic');
  });


}
function generateFriends(id){
  FB.api('/'+id+'/friends', function(friends){
    if (friends.data.length===0){
      $('#aPlaceForEnemies').append('<h3>You do not have any friends using UnFriend. Here\'s something for you to do to invite people.</h3>');
    }
    for (var i = 0; i<friends.data.length;i++){
      var id = friends.data[i].id;
      var name = friends.data[i].name;
      if (name.length>20){
        name = friends.data[i].name.split(' ')[0]+" "+friends.data[i].name.split(' ')[friends.data[i].name.split(' ').length-1];
      }
      var context = {
        'id': id,
        'name': name,
        'profPic' : 'https://theawesomer.com/photos/2010/06/060410_Facebook_profile_pic_1.jpg'
      };
      handleIt('friendCard', 'aPlaceForEnemies', context);
      updatePicture(id, true, 'pic');
    }
    $('#aPlaceForEnemies').click(select);
  });
}
function updatePicture(id, large, type){
  var end;
  if(large){
    end = "/"+id+"/picture?type=large";
  }else{
    end = "/"+id+"/picture";
  }
  FB.api(end, function(picture){
    $('#'+type+id).attr('src', picture.data.url);
  });
}
function select(){
  FB.api('/'+event.path.reverse()[6].id, function(response){
    var context ={
      "name" : response.name,
      "profPic" : 'http://lorempixel.com/200/200/',
      'id': response.id
    };
    handleIt('simpleNameAndPic', 'enemyInfo', context);
    updatePicture(response.id, true, 'mod');
    $('#meow').modal('open');
  });
}
function closeModal(){
  event.preventDefault();
  $('#enemyInfo').empty();
  $('input:checked').prop('checked',false);
  $('.modal').modal('close');
}
function sendAttack(){
  event.preventDefault();
  try{
    var selection = $('input:checked')[0].value;
    var message = makeMessage(selection);
    var name = $($('#enemyInfo').children()[0]).data().name;
    var id = $($('#enemyInfo').children()[0]).data().id;
    // Materialize.toast(message.replace(/---/g, name), 4000);
    post(message, name, id);
    closeModal();
  }
  catch(err){
    Materialize.toast('Please choose a reason!', 2000);
  }
}

function handleIt(templateid, canvasid, context){
  var source = $('#'+templateid).html();
  var template = Handlebars.compile(source);
  var html = template(context);
  $('#'+canvasid).append(html);

}
function makeMessage(type){
  var off = ['You\'re offensive, ---!', 'I can\'t believe that you said that, ---!'];
  var pol = ['I can\'t believe that you support Trump!'];
  var per =['Man, you smell bad!'];
  var ann = ['I hate the way that you chomp on your gum.'];
  // console.log(type);
  // return type;

  switch (type){
    case 'offended':
      var rand = Math.floor(Math.random()*off.length);
      return off[rand];
    default:
      return 'I just don\'t like you...';
  }
}
function post(message, name, id){
  
}

// this will get you your own id
// $('#aPlaceForMe').children()[0].id
