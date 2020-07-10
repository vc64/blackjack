var deck = [];
var dealt = "";
var c = 0;
var u = 0;

var user = 0;
var dealer = 0;

var round = "betting";

var bust = 0;


var bet = 0;

var aces = 0;
var acesdealer = 0;


var wins = 0;

setDeck();

dealdeck = [];

var balance = 500;

updatebal();



//document.getElementById("navbarSupportedContent").collapse();

//var x = window.matchMedia("(max-width: 800px)");
//setarrowbtns(x); // Call listener function at run time
//x.addEventListener("change", setarrowbtns);


function updatebal() {
  var blank = {
    message: "request for balance data"
  };

  fetch('/blackjack/update', {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(blank),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function (response) {
    if (response.status !== 200) {
      console.log("error");
    } else {
      response.json().then(function (data) {
        console.log(data);
        //var parseddata = JSON.parse(data);
        balance = data["message"];
      })
    }
  }) 
  
}


var setbal = setTimeout(function() {
  console.log("e")
  document.getElementById("balancenum").innerHTML = "Balance: $" + balance.toString();
  document.getElementById("betnum").innerHTML = "$0";
}, 300);



function setarrowbtns() {

  if (x.matches) { // If media query matches
    var uparrow = document.getElementById("betbox");

    uparrow = uparrow.getElementsByClassName("arrow");

    var bettext = document.getElementById("bet");

    var uparrowpos = bettext.getBoundingClientRect().x;


    uparrow[0].style.setProperty("--centerpos", uparrowpos.toString() + " px");
  } 
}



function pickrand() {

  var randomNum = Math.floor(Math.random() * deck.length);

  var randomElement = deck[randomNum];

  deck.splice(randomNum, 1);
  dealt = randomElement;
  
  dealdeck.push(randomElement);

  console.log(dealt)

  return randomElement;
}


function setDeck() {

  for (var i = 0; i < 52; i++) {
    
    var cardvalue = (i % 13) + 1;
    var pip = ["spades", "clubs", "diamonds", "hearts"]

    var currentcard = "";

    if (cardvalue == 1) {
      currentcard += "ace";
    } else if (cardvalue == 11){
      currentcard += "jack";
    } else if (cardvalue == 12){
      currentcard += "queen";
    } else if (cardvalue == 13){
      currentcard += "king";
    } else {
      currentcard += cardvalue.toString();
    }

    currentcard = currentcard + "_of_" + pip[Math.floor(i/13)];

    //console.log(currentcard);

    deck.push(currentcard);

  }
}


function dealCards() {

  if (round == "betting" && bet > 0) {
    round = "start";

    var dcards = document.getElementsByClassName("dcard");

    dealnum = dcards.length

    for (var i = 0; i < dealnum; i++) {
      dcards[0].remove();
    }

    dealer = 0;
    user = 0;
    
    bust = 0;

    c = 0;
    u = 0;

    aces = 0;
    acesdealer = 0;

    hit();
    setTimeout(function() {
      hit();
    }, 0.2);
  }

  /*
  var card = document.createElement("IMG");

  randomElement = pickrand();

  card.setAttribute("src", "/static//images/" + randomElement + ".png");
  card.setAttribute("width", 117);
  //card.setAttribute("height", 120);
  card.setAttribute("alt", 'na');
  card.setAttribute("id", "card" + randomElement);
  card.setAttribute("class", "dcard");


  card.style.setProperty("--endleftpos", (43 + 3 * u).toString() + "%");


  card.style.animationName = "dealinguser";
  card.style.animationDuration = "0.5s";
  card.style.animationPlayState = "paused";
  card.style.animationFillMode = "forwards";
  card.style.animationTimingFunction = "linear";
  card.style.position = "absolute";
  */

}

function hit() {

  if ((round == "start") && (bust == 0)) {
    c++;

    randomElement = pickrand();

    calcscore("user");

    if (user > 21) {
      var resulttext = document.getElementById("result")
      resulttext.innerHTML = repeatingstring("Bust");
      
      animateresult();

      bust = 1;
    }

    /*
    if (points[0] == 0) {
      user += points[1];
    }
    */

    var cardback = document.getElementById("back");
    var card = document.createElement("IMG");

    cardback.setAttribute("src", "/static/images/cardbackblue2.png");
    cardback.setAttribute("width", 120);
    //cardback.setAttribute("id", "back" + randomElement);
    //cardback.setAttribute("class", "dcard");


    /*
    cardback.style.setProperty("transform", "rotateY( 180deg )");
    
    cardback.style.setProperty("backface-visibility", "hidden");
    */

    //card.src = "/static//images/" + randomElement + ".png";
    //card.src = "/static//images/" + "ace_of_spades" + ".png";
    //card.width = 120;

    //document.getElementsByClassName('dealtcards')[0].appendChild(card);

    card.setAttribute("src", "/static//images/" + randomElement + ".png");
    card.setAttribute("width", 117);
    //card.setAttribute("height", 120);
    card.setAttribute("alt", 'na');
    card.setAttribute("id", "card" + randomElement);
    card.setAttribute("class", "dcard");

    /*
    var topdeck = document.getElementById("card1");
    var enddeck = document.getElementById("dealer2");


    console.log(((topdeck.getBoundingClientRect().x) / (window.outerWidth)) * 100);

    leftmargin = (((topdeck.getBoundingClientRect().x) / (window.outerWidth)) * 100).toString() + "%";
    topmargin = (((topdeck.getBoundingClientRect().y) / (window.outerHeight)) * 100).toString() + "%";

    leftmarginend = (((enddeck.getBoundingClientRect().x) / (window.outerWidth)) * 100).toString() + "%";
    topmarginend = (((enddeck.getBoundingClientRect().y) / (window.outerHeight)) * 100).toString() + "%";

    console.log(leftmargin);
    */

    //card.style.setProperty("x", topdeck.getBoundingClientRect().x);

    //card.style.setProperty("y", topdeck.getBoundingClientRect().y)
    
    //card.style.setProperty("--initleftpos", leftmargin);

    //card.style.setProperty("--inittoppos", topmargin);

    //card.setProperty("--endtoppos", topdeck.style.marginTop)

    card.style.setProperty("--endleftpos", (37 + 3 * c).toString() + "%");
    cardback.style.setProperty("--endleftpos", (37 + 3 * c).toString() + "%");
    
    //card.style.setProperty("--endleftpos", "0%");

    //card.style.setProperty("--endtoppos", "0%");


    card.style.visibility = "visible";

    /*
    card.style.animationName = "dealing"; 
    card.style.animationDuration = "0.5s";
    card.style.animationPlayState = "paused";
    card.style.animationFillMode = "forwards";
    card.style.animationTimingFunction = "linear";
    */

    card.style.animationName = "dealinguser";
    card.style.animationDuration = "0.5s";
    card.style.animationPlayState = "paused";
    card.style.animationFillMode = "forwards";
    card.style.animationTimingFunction = "linear";
    card.style.position = "absolute";

    card.style.marginLeft = "0%";
    card.style.marginTop = "0%"; 

    cardback.style.animationName = "dealingbackuser";
    cardback.style.animationDuration = "0.5s";
    cardback.style.animationPlayState = "paused";
    cardback.style.animationFillMode = "forwards";
    cardback.style.animationTimingFunction = "linear";
    cardback.style.position = "absolute";
    //cardback.style.display = "none";
    


    document.getElementById('main').appendChild(card);
    document.getElementById('main').appendChild(cardback);

    var move = document.getElementById("card" + randomElement);

    var moveback = document.getElementById("back");

    //move.style.marginTop = "1000px";

    /*
    var dcard = document.querySelector('.dcard');

    dcard.classList.toggle('is-flipped')
    */
    
    move.style.webkitAnimationPlayState = "running";

    move.style.webkitAnimationName = 'none';

    moveback.style.webkitAnimationPlayState = "running";

    moveback.style.webkitAnimationName = 'none';
    
    setTimeout(function() {
        move.style.webkitAnimationName = 'dealinguser';
        moveback.style.webkitAnimationName = 'dealingbackuser';
    }, 1);
  }

}

/*
function stand() {
  var movedown = document.getElementById("movecarddown");
  var moveup = document.getElementById("movecardup");

  randomElement = pickrand();
  
  moveup.src = "/static//images/" + randomElement + ".png";

  movedown.style.webkitAnimationPlayState = "running";
  moveup.style.webkitAnimationPlayState = "running";


  movedown.style.webkitAnimationName = 'none';
  moveup.style.webkitAnimationName = 'none';

  setTimeout(function() {
      movedown.style.webkitAnimationName = 'dealdown';
      moveup.style.webkitAnimationName = 'dealup';
  }, 1);
}
*/

function stand() {
  if (round == "start") {

    //var flippedcards = document.getElementsByClassName("cardback")

    //flippedcards[0].style.visibility = "hidden";
    //flippedcards[1].style.visibility = "hidden";

    //var points = calcscore("dealer");

    /*
    dealerdeal();
    calcscore("dealer");
    dealerdeal();
    */
    flipdeal();
    checkdealer();


    //console.log(calcscore("dealer"));

  }
}


function checkdealer() {

  var points = calcscore("dealer");

  if (points[0] == 0) {
    setTimeout(function() {
      dealerdeal();
      checkdealer();
    }, 800);
  } else {
    checkwin();
  }
}



function dealerdeal() {

  u++;

  randomElement = pickrand();


  var cardback = document.getElementById("back");
  var card = document.createElement("IMG");

  cardback.setAttribute("src", "/static/images/cardbackblue2.png");
  cardback.setAttribute("width", 120);
  //cardback.setAttribute("id", "back" + randomElement);
  //cardback.setAttribute("class", "dcard");


  card.setAttribute("src", "/static//images/" + randomElement + ".png");
  card.setAttribute("width", 117);
  //card.setAttribute("height", 120);
  card.setAttribute("alt", 'na');
  card.setAttribute("id", "card" + randomElement);
  card.setAttribute("class", "dcard");

  

  card.style.setProperty("--endleftpos", (43 + 3 * u).toString() + "%");
  cardback.style.setProperty("--endleftpos", (43 + 3 * u).toString() + "%");
  
  
  card.style.animationName = "dealing";
  card.style.animationDuration = "0.5s";
  card.style.animationPlayState = "paused";
  card.style.animationFillMode = "forwards";
  card.style.animationTimingFunction = "linear";
  card.style.position = "absolute";

  card.style.marginLeft = "0%";
  card.style.marginTop = "0%"; 

  cardback.style.animationName = "dealingback";
  cardback.style.animationDuration = "0.5s";
  cardback.style.animationPlayState = "paused";
  cardback.style.animationFillMode = "forwards";
  cardback.style.animationTimingFunction = "linear";
  cardback.style.position = "absolute";
  

  document.getElementById('main').appendChild(card);
  document.getElementById('main').appendChild(cardback);

  var move = document.getElementById("card" + randomElement);

  var moveback = document.getElementById("back");

  
  move.style.webkitAnimationPlayState = "running";

  move.style.webkitAnimationName = 'none';

  moveback.style.webkitAnimationPlayState = "running";

  moveback.style.webkitAnimationName = 'none';
  
  setTimeout(function() {
      move.style.webkitAnimationName = 'dealing';
      moveback.style.webkitAnimationName = 'dealingback';
  }, 1);
  
}

function flipdeal() {
  var card1 = document.createElement("IMG");
  var card2 = document.createElement("IMG");

  var back1 = document.getElementById("dealer1");
  var back2 = document.getElementById("dealer2");

  randomElement = pickrand();

  card1.setAttribute("src", "/static//images/" + randomElement + ".png");
  card1.setAttribute("id", "card" + randomElement);
  card1.setAttribute("width", 117);
  card1.setAttribute("class", "dcard");
  

  calcscore("dealer");

  randomElement = pickrand();

  card2.setAttribute("src", "/static//images/" + randomElement + ".png");
  card2.setAttribute("id", "card" + randomElement); 
  card2.setAttribute("width", 117);
  card2.setAttribute("class", "dcard");


  card1.style.setProperty("--endingpos", "40%");
  card2.style.setProperty("--endingpos", "43%");

  card1.style.marginLeft = "0%";
  card1.style.marginTop = "0%"; 

  card2.style.marginLeft = "0%";
  card2.style.marginTop = "0%"; 


  card1.style.animationName = "dealingdealer";
  card2.style.animationName = "dealingdealer";

  back1.style.animationName = "dealingbackdealer";
  back2.style.animationName = "dealingbackdealer";

  [card1, card2, back1, back2].forEach(function (item) {
    item.style.animationDuration = "0.5s";
    item.style.animationPlayState = "paused";
    item.style.animationFillMode = "forwards";
    item.style.animationTimingFunction = "linear";
    item.style.position = "absolute"; 
  });

  document.getElementById('main').appendChild(card1);
  document.getElementById('main').appendChild(card2);
  
  card1.style.webkitAnimationPlayState = "running";
  card1.style.webkitAnimationName = 'none';

  card2.style.webkitAnimationPlayState = "running";
  card2.style.webkitAnimationName = 'none';

  back1.style.webkitAnimationPlayState = "running";
  back1.style.webkitAnimationName = 'none';

  back2.style.webkitAnimationPlayState = "running";
  back2.style.webkitAnimationName = 'none';
  
  setTimeout(function() {
      card1.style.webkitAnimationName = 'dealingdealer';
      card2.style.webkitAnimationName = 'dealingdealer';

      back1.style.webkitAnimationName = 'dealingbackdealer';
      back2.style.webkitAnimationName = 'dealingbackdealer';
  }, 1);

  /*
  var status = calcscore("dealer");
  if (status == -1) {
    document.getElementById("result").innerHTML = "Win";
  }
  */

}



function calcscore(player) {

  var value = dealt.split("_")[0];


  if (value == "ace") {
    if (player == "user") {
      aces += 1;
    } else {
      acesdealer += 1;
    }
    
    value = 11;
  } else if (value == "jack") {
    value = 10;
  } else if (value == "queen") {
    value = 10;
  } else if (value == "king") {
    value = 10;
  } else {
    value = parseInt(value);
  }

  if (player == "user") {
    user += value;
  } else {
    dealer += value;
  }

  return playerstatus(player, value);

  //console.log(value, user, dealer);

}


function playerstatus(player, value) {
  if (player == "user") {
    if (user > 21) {
      if (aces > 0) {
        user -= (aces * 10);
        aces = 0;
        return playerstatus("user", 0);
      } else {
        return [-1, value];
      }
    } else {
      //user += value;
      return [0, value];
    }
  } else if (player == "dealer") {
    if (dealer > 21) {
      if (acesdealer > 0) {
        dealer -= (acesdealer * 10);
        acesdealer = 0;
        return playerstatus("dealer", 0);
      } else {
        return [-1, value];
      }
    } else if (dealer >= 17) {
      return [1, value];
      //dealer += value;
    } else {
      //dealer += value;
      return [0, value];
    }
  }
}



var betting = "";


function betuponce() {

  if (round == "betting") {
    if ((bet + 50) <= balance) {
      bet += 50;
      document.getElementById("betnum").innerHTML = "$" + bet.toString();
    }
  }

}


function betdownonce() {

  if (round == "betting") {
    if (bet > 0) {
      bet -= 50;
      document.getElementById("betnum").innerHTML = "$" + bet.toString();
    }
  }

}



function betup() {

  if (round == "betting") {
    betting = setInterval(function() {
      if ((bet + 50) > balance) {
        clearInterval(betting);
      } else {
        bet += 50;
        document.getElementById("betnum").innerHTML = "$" + bet.toString();
      }
    }, 150);
  }
}


function betdown() {

  if (round == "betting") {
    betting = setInterval(function() {
      if (bet > 0) {
        bet -= 50;
        document.getElementById("betnum").innerHTML = "$" + bet.toString();
      }
    }, 150);
  }

}

function stopbet() {
  if (round == "betting") {
    clearInterval(betting);
  }
}



function checkwin() {

  var resultelement = document.getElementById("result")

  if (playerstatus("user", 0)[0] == 0) {

    if (playerstatus("dealer", 0)[0] == -1) {
      resultelement.innerHTML = repeatingstring("Win");
      balance += bet;
      wins += 1;
    } else {
      if (user == dealer) {
        resultelement.innerHTML = repeatingstring("Draw");
      } else if (user == 21) {
        resultelement.innerHTML = repeatingstring("Blackjack");
        balance += bet * 1.5;
      } else if (user > dealer) {
        resultelement.innerHTML =repeatingstring("Win");
        balance += bet;
        wins += 1;
      } else if (dealer > user) {
        resultelement.innerHTML = repeatingstring("Loss");
        balance -= bet;
      }
    }

  } else {
    if (playerstatus("dealer", 0)[0] == -1) {
      resultelement.innerHTML = repeatingstring("Draw");
    } else {
      resultelement.innerHTML = repeatingstring("Loss");
      balance -= bet;
    }
  }

  resultelement.style.display = "block";
  document.getElementById("balancenum").innerHTML = "Balance: $" + balance;
  animateresult();
  updatestats();

  round = "betting";

  document.getElementById("betnum").innerHTML = "$0";
  bet = 0;
  

}


function animateresult() {
  var resulttext = document.getElementById("result");
  resulttext.style.display = "block";
  resulttext.style.animationName = "scrollmarquee";
  resulttext.style.animationPlayState = "running";

  setTimeout(function() {
    resulttext.style.animationName = "none";
    resulttext.style.animationPlayState = "paused";
    resulttext.style.display = "none";
  }, 2000);
}


function repeatingstring(word) {
  word = " " + word + " ";
  return (word).repeat(100);
}


function updatestats() {
  var statistics = {
    wins: wins,
    money: balance
  }

  console.log(statistics)
  
  fetch('/blackjack/numbers', {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(statistics),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  });
}
