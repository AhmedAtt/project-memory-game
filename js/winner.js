var userRating =sessionStorage.getItem('rating');
var userTime=sessionStorage.getItem('time');
for(var m=0; m<userRating; m++){
    $("#star-rating").append("<li><i class='fa fa-star'></i></li>");
      console.log("YOU GOT STAR");
}
$('#user-time').text(userTime);
$('#play-again').click(function (){
  window.location.href='index.html';
});
