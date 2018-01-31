//=========wait for the document to load=======================
$(document).ready(function() {

  $('.restart').click(function(event) {
    location.reload();
  });
  //============================================================
  //list of all cards
  let cards = $('ul.deck li').siblings();

  //========function that starts and increments timer===========
  let timerValue = 0;

  function timerStart() {
    let timeVal = parseInt($('.timer').text(), 10);
    value = 0;
    timerInterval = setInterval(function() {
      timeVal++;
      timerValue = timeVal;
      $('span.timer').text(timeVal);
    }, 1000)
  }
  //=============================================================
  //=========Shuffle and redraw==================================
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
  //append cards after refresh
  $('ul.deck').append(cards);
  //================================================================
  //==========Game functionality===================================
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
    //Adding some delay before closing cards
    var delayms = 500;
    setTimeout(function() {
      $(card).removeClass('open show');
    }, delayms);

  }
  //Check if the samecard is clicked twice
  function checkDoubleClick(card1, card2) {
    el2=card1.get('0').getBoundingClientRect();
    el1=card2.get('0').getBoundingClientRect();
    if (parseInt(el1.left) ==parseInt(el2.left )&& parseInt(el1.top) == parseInt(el2.top)){
      return true;
    }
    else {
      return false;
    }
  }

  let secondClick = false;
  var firstCard;
  var secondCard;
  var firstCall = true;
  let moves = 0;
  let correctGuess = 0;
  let rating = 3;

  //First Button Click
  $(cards).click(function(event) {
    //First key press
    if (firstCall) {
      //fire the timer funciton on first call
      timerStart();
      firstCall = false;
    }
    //check first click
    if (secondClick == false) {
      firstCard = $(this);
      openCard(firstCard);
      secondClick = true;
    } else {
      secondCard = $(this);
      openCard(secondCard);
      if (checkDoubleClick(firstCard, secondCard)) {
        //Do nothing if clicking the same card
      } else { // not clicking the same
        moves++;
        if (moves == 12) {
          $('#firststar').remove();
          rating--;
        }
        if (moves == 19) {
          $('#secondstar').remove();
          rating--;
        }
        $('span.moves').text(moves);
        if (firstCard.html() == secondCard.html()) {
          correctGuess++;
          if (correctGuess == 8) {
            sessionStorage.setItem('rating', rating);
            sessionStorage.setItem('time', timerValue);
            window.location.href = 'winner.html';
          }
        } else {
          closeCard(firstCard);
          closeCard(secondCard);
        }
        secondClick = false;

      }
    }

  });

});
  
