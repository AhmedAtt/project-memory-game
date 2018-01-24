//wait for the document to load
$(document).ready(function() {

  //list of all cards
  let cards = $('ul.deck li').siblings();
  console.log(cards);

  //function that starts and increments timer
  function timerStart() {
    let timeVal = parseInt($('.timer').text(), 10);
    value = 0;
    timerInterval = setInterval(function() {
      timeVal++;
      $('span.timer').text(timeVal);
    }, 1000)
  }



  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  //call card shuffle and redraw
  shuffle(cards);
  console.log(cards);
  //append cards after refresh
  $('ul.deck').append(cards);

  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */

  //function to show Card
  function openCard(card) {
    $(card).addClass('open show');
  }
  //function to re-hide Card
  function closeCard(card) {
    //Adding some delay before cloasing cards
    var delayms=500;
    setTimeout(function() {
    $(card).removeClass('open show');
}, delayms);

  }

  let openCards = [];
  let secondClick = false;
  var firstCard;
  var secondCard;
  var firstCall=true;
  let moves=0;
  let correctGuess=0;
  //First Button Click

  $('.card').click(function(event) {

    if(firstCall){

      //fire the timer funciton on first call
      timerStart();
      firstCall=false;
    }
    if(secondClick ==false){

      firstCard=$(this);
      openCard(firstCard);

      secondClick=true;
    }
    else{

      moves++;
      if(moves > 8){
        $('#firststar').remove();
      }
      if(moves > 16){
        $('#secondstar').remove();
      }

      $('span.moves').text(moves);
      secondCard=this;
      openCard(secondCard);
      if($(firstCard).html() == $(secondCard).html()){
        correctGuess++;
        if(correctGuess == 8){

          window.location.href='winner.html';
        }
      }
      else{

        closeCard(firstCard);
        closeCard(secondCard);
      }

      secondClick =false;

    }
    });

});
