var cardarray = [];
var clickedcards = [];
var clickedcardbacks = [];
var clickamount = 0;
var correctcards = 0;
var incorrects = 0;

//FISHER-YATES SHUFFLE
function shuffleArray(array, cardamount) {
    for (var i = cardamount - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
//FISHER-YATES SHUFFLE


//------------------------------------------------------------------------NEW GAME FUNCTION------------------------------------------------------------------------//
function start(cardamount) {
    var container = document.getElementById("gameContainer");
    var scoreboard = document.getElementById("scoreboard");

    //NEW GAME PREP
    container.innerHTML = "";
    scoreboard.innerHTML = "";
    clickamount = 0;
    clickedcards.length = 0;
    clickedcardbacks.length = 0;
    cardarray.length = 0;
    correctcards = 0;
    incorrects = 0;
    container.style.filter= "none";
    container.style.border = "4px solid rgb(68,114,199)";
    container.style.boxShadow = "none";
    scoreboard.style.boxShadow = "1px 1px 2px 2px gray";
    scoreboard.style.border = "1px solid lightgray";

    //BOARD BUILDING
    container.style.width = cardamount / 0.04 + "px";
    container.style.gridTemplateRows = "repeat(4, 1fr)";
    container.style.gridTemplateColumns = "repeat(" + cardamount / 4 + ", 1fr)";

    //CARDBACK CREATION
    for (var i = 0; i < cardamount; i++) {
        var createcardback = document.createElement("div");
        createcardback.style.backgroundImage = "url(style/images/backside.png)";
        createcardback.className = "cardback";
        createcardback.id = "cardback" + i;
        container.appendChild(createcardback);
    }

    //CARDFRONT CREATION
    for (var i = 0; i < cardamount; i++) {
        var createcard = document.createElement("div");
        var cardback = document.getElementById("cardback" + i);
        createcard.className = "card";
        createcard.id = "card" + i;
        cardarray.push(createcard.id);
        createcard.style.visibility = "hidden";
        createcard.style.pointerEvents = "none";
        cardback.appendChild(createcard);
        cardback.addEventListener("click", onclickfunction);
    }

    //CARDARRAY SHUFFLE
    shuffleArray(cardarray, cardamount);
    var j = 0;
    
    var pictures = 
    ["url(style/images/picture1.png)",
    "url(style/images/picture2.png)",
    "url(style/images/picture3.png)",
    "url(style/images/picture4.png)",
    "url(style/images/picture5.png)",
    "url(style/images/picture6.png)",
    "url(style/images/picture7.png)",
    "url(style/images/picture8.png)"]

    for (var i = 0; i < cardamount; i++) {
        if (j == cardamount / 4) {
            j = 0;
        }
        var frontcard = document.getElementById(cardarray[i]);
        frontcard.style.backgroundImage = pictures[j];
        j = j + 1;
    }

    var createcorrectcard = document.createElement("div");
    createcorrectcard.innerHTML = "Correct";
    createcorrectcard.id = "correctcard";
    scoreboard.appendChild(createcorrectcard);

    var createcorrect = document.createElement("div");
    createcorrect.id = "correct";
    createcorrect.innerHTML = correctcards + "/" + cardamount;
    createcorrect.style.fontWeight = "bold";
    createcorrectcard.appendChild(createcorrect);

    var createincorrectcard = document.createElement("div");
    createincorrectcard.innerHTML = "Incorrect";
    createincorrectcard.id = "incorrectcard";
    scoreboard.appendChild(createincorrectcard);


    var createincorrect = document.createElement("div");
    createincorrect.id = "incorrect";
    createincorrect.innerHTML = incorrects;
    createincorrect.style.fontWeight = "bold";
    createincorrectcard.appendChild(createincorrect);
}

//------------------------------------------------------------------------ONCLICK FUNCTION------------------------------------------------------------------------//

function onclickfunction() {

    clickamount += 1;
    this.style.visibility = "hidden";
    this.firstElementChild.style.visibility = "visible";

    var container = document.getElementById("gameContainer");
    var cards = document.getElementsByClassName("card");
    var correctcard = document.getElementById("correct");
    var incorrectcard = document.getElementById("incorrect");

    clickedcards.push(this.firstElementChild);
    clickedcardbacks.push(this);

    if (clickamount > 1) {
        if (clickedcards[1].style.backgroundImage != clickedcards[0].style.backgroundImage) {

            document.getElementById("gameContainer").style.pointerEvents = "none";

            setTimeout(function () {
                clickedcards[0].style.visibility = "hidden";
                clickedcardbacks[0].style.visibility = "visible";
                clickedcards[1].style.visibility = "hidden";
                clickedcardbacks[1].style.visibility = "visible";
                clickamount = 0;
                clickedcards.length = 0;
                clickedcardbacks.length = 0;
                document.getElementById("gameContainer").style.pointerEvents = "auto";
                incorrects += 1;
                incorrectcard.innerHTML = incorrects;
            }, 600);

        } else {
            correctcards += 2;
            correctcard.innerHTML = correctcards + "/" + cardarray.length;
            clickamount = 0;
            clickedcards.length = 0;
            clickedcardbacks.length = 0;
        }

        if (correctcards == cardarray.length) {
            container.style.border = "3px solid lightgreen";
            container.style.boxShadow = "1px 1px 20px 2px lightgreen";

            var finalscore = Math.floor((1000 - (incorrects * 20)) + (cardarray.length * 3));

            var createfinalscore = document.createElement("div");
            createfinalscore.innerHTML = "<strong> You win! <br><br> Final Score <br> " + finalscore + "</strong>";
            createfinalscore.id = "finalscore";

            for (var i = 0; i < cardarray.length; i++) {
                cards[i].style.filter = "blur(3px)";
            }
            container.appendChild(createfinalscore);
        }
    }
}