// =====================================
// MANILHA POKER TRAINER
// SCRIPT.JS COMPLETO ATUALIZADO
// PARTE 1/3
// =====================================


const positions = [
"EP",
"MP",
"CO",
"BTN",
"SB"
];


const ranks = [
"A","K","Q","J","T",
"9","8","7","6",
"5","4","3","2"
];


const suits = [
"♠",
"♥",
"♦",
"♣"
];




// =============================
// STORAGE
// =============================


let ranges =
JSON.parse(
localStorage.getItem("ranges")
)
||
{
EP:[],
MP:[],
CO:[],
BTN:[],
SB:[]
};



let trainingRange =
JSON.parse(
localStorage.getItem("trainingRange")
)
||
[];




let mistakes =
JSON.parse(
localStorage.getItem("mistakes")
)
||
{};



let positionMistakes =
JSON.parse(
localStorage.getItem("positionMistakes")
)
||
{};





let currentPosition="";

let currentHand="";

let selectedRangePosition="EP";



let score={

hands:0,
correct:0,
wrong:0

};





localStorage.setItem(
"ranges",
JSON.stringify(ranges)
);









// =============================
// INICIALIZAÇÃO
// =============================


window.onload=function(){


setTimeout(()=>{


document
.getElementById("start-screen")
.classList.add("open");



setTimeout(()=>{


document
.getElementById("start-screen")
.style.display="none";



document
.getElementById("training-screen")
.style.display="block";



prepareHand();



},1500);



},500);



};









// =============================
// MENU
// =============================


const menuButton =
document.getElementById(
"menu-button"
);


const sideMenu =
document.getElementById(
"side-menu"
);


const overlay =
document.getElementById(
"overlay"
);




menuButton.onclick=function(){


sideMenu.classList.add(
"open"
);


overlay.classList.add(
"active"
);


};



overlay.onclick=function(){


sideMenu.classList.remove(
"open"
);


overlay.classList.remove(
"active"
);


};









// =============================
// TELAS
// =============================


function hideScreens(){


[
"training-screen",
"my-ranges-screen",
"training-range-screen",
"positions-screen",
"statistics-screen"

]
.forEach(id=>{


let el=document.getElementById(id);


if(el){

el.style.display="none";

}


});


}





function showScreen(id){


hideScreens();


document
.getElementById(id)
.style.display="block";



sideMenu.classList.remove(
"open"
);


overlay.classList.remove(
"active"
);


}








document
.getElementById("open-my-ranges")
.onclick=function(){


showScreen(
"my-ranges-screen"
);


createMatrix();


};





document
.getElementById("open-training-range")
.onclick=function(){


showScreen(
"training-range-screen"
);


createTrainingMatrix();


};





document
.getElementById("open-positions")
.onclick=function(){


showScreen(
"positions-screen"
);


};




document
.getElementById("back-my-ranges")
.onclick=function(){

showScreen(
"training-screen"
);

};




document
.getElementById("back-training-range")
.onclick=function(){

showScreen(
"training-screen"
);

};




document
.getElementById("back-positions")
.onclick=function(){

showScreen(
"training-screen"
);

};
// =====================================
// MANILHA POKER TRAINER
// SCRIPT.JS COMPLETO ATUALIZADO
// PARTE 2/3
// =====================================


// =============================
// CONTROLE DOS BOTÕES
// =============================


function prepareHand(){


document
.getElementById("cards")
.classList.add("waiting");



document
.getElementById("start-hand")
.classList.remove("hide");



document
.getElementById("raise")
.classList.add("hide");



document
.getElementById("fold")
.classList.add("hide");



document
.getElementById("result")
.innerHTML="";


}



function startTraining(){


document
.getElementById("start-hand")
.classList.add("hide");



document
.getElementById("raise")
.classList.remove("hide");



document
.getElementById("fold")
.classList.remove("hide");



newHand();


}







document
.getElementById("start-hand")
.onclick=function(){


let selected =
getSelectedPositions();



if(selected.length===0){


document
.getElementById("result")
.innerHTML=
"ESCOLHA UMA POSIÇÃO";


return;

}




if(trainingRange.length===0){


document
.getElementById("result")
.innerHTML=
"ESCOLHA UM RANGE";


return;

}




startTraining();


};









// =============================
// POSIÇÕES
// =============================


function getSelectedPositions(){


let result=[];



document
.querySelectorAll(".panel input")
.forEach(input=>{


if(input.checked){

result.push(
input.value
);

}


});



return result;


}








function choosePosition(){


let selected =
getSelectedPositions();



currentPosition =
selected[
Math.floor(
Math.random()*selected.length
)
];



document
.querySelectorAll(".seat")
.forEach(seat=>{


seat.classList.remove(
"active"
);


});



let seat =
document.getElementById(
currentPosition
);



if(seat){

seat.classList.add(
"active"
);

}


}









// =============================
// NOVA MÃO
// =============================


function newHand(){


document.body.classList.remove(
"correct",
"wrong"
);



document
.getElementById("result")
.innerHTML="";



choosePosition();



generateCards();



}









// =============================
// BARALHO
// =============================


function createDeck(){


let deck=[];



ranks.forEach(rank=>{


suits.forEach(suit=>{


deck.push({

rank:rank,

suit:suit

});


});


});



return deck;


}








// =============================
// GERAR CARTAS DO RANGE
// =============================


function generateCards(){



let hand =

trainingRange[
Math.floor(
Math.random()*trainingRange.length
)
];



currentHand=hand;



let card1;

let card2;



if(hand.length===2){


card1={

rank:hand[0],

suit:"♠"

};



card2={

rank:hand[1],

suit:"♥"

};


}

else{


let suited =
hand[2]==="s";



card1={

rank:hand[0],

suit:"♠"

};



card2={

rank:hand[1],

suit:
suited
?
"♠"
:
"♥"

};


}



let cards =
document.querySelectorAll(
".card"
);



showCard(
cards[0],
card1
);



showCard(
cards[1],
card2
);



cards.forEach(card=>{


card.classList.remove(
"flip"
);


void card.offsetWidth;


card.classList.add(
"flip"
);


});



}









// =============================
// MOSTRAR CARTAS
// =============================


function showCard(element,card){


let front =
element.querySelector(
".card-front"
);



front.className=
"card-front";



front
.querySelector(".rank")
.innerHTML=
card.rank;



let suits =
element.querySelectorAll(
".suit"
);



suits[0].innerHTML=
card.suit;



suits[1].innerHTML=
card.suit;



if(card.suit==="♠")
front.classList.add("spades");


if(card.suit==="♥")
front.classList.add("hearts");


if(card.suit==="♦")
front.classList.add("diamonds");


if(card.suit==="♣")
front.classList.add("clubs");



}









// =============================
// RESPOSTAS
// =============================


document
.getElementById("raise")
.onclick=function(){

answer("RAISE");

};



document
.getElementById("fold")
.onclick=function(){

answer("FOLD");

};





function answer(action){



let correct =

ranges[currentPosition]
.includes(currentHand)

?

"RAISE"

:

"FOLD";



score.hands++;



if(action===correct){


score.correct++;


document.body.classList.add(
"correct"
);



document
.getElementById("result")
.innerHTML=
"CORRETO ✅";


}

else{


score.wrong++;



mistakes[currentHand]=
(mistakes[currentHand]||0)+1;



positionMistakes[currentPosition]=
(positionMistakes[currentPosition]||0)+1;



localStorage.setItem(
"mistakes",
JSON.stringify(mistakes)
);



localStorage.setItem(
"positionMistakes",
JSON.stringify(positionMistakes)
);



document.body.classList.add(
"wrong"
);



document
.getElementById("result")
.innerHTML=
"ERRADO ❌<br>Resposta: "
+
correct;


}



updateScore();



setTimeout(()=>{


newHand();


},1200);



}
// =====================================
// MANILHA POKER TRAINER
// SCRIPT.JS COMPLETO ATUALIZADO
// PARTE 3/3
// =====================================



// =============================
// PONTUAÇÃO
// =============================


function updateScore(){


document
.getElementById("hands")
.innerHTML =
score.hands;



document
.getElementById("correct")
.innerHTML =
score.correct;



document
.getElementById("wrong")
.innerHTML =
score.wrong;



let accuracy=0;



if(score.hands>0){

accuracy =
Math.round(
(score.correct / score.hands)*100
);

}



document
.getElementById("accuracy")
.innerHTML =
accuracy+"%";


}









// =============================
// CRIAR MATRIZ
// =============================


function getMatrixHand(i,j){


if(i===j){

return ranks[i]+ranks[j];

}


if(i<j){

return ranks[i]+ranks[j]+"s";

}


return ranks[j]+ranks[i]+"o";


}









function createMatrix(){


let matrix =
document.getElementById(
"matrix"
);



matrix.innerHTML="";



for(let i=0;i<13;i++){


for(let j=0;j<13;j++){



let hand =
getMatrixHand(i,j);



let cell =
document.createElement(
"div"
);



cell.className="cell";

cell.innerHTML=hand;



if(
ranges[selectedRangePosition]
.includes(hand)
){

cell.classList.add(
"active"
);

}




cell.onclick=function(){



if(
ranges[selectedRangePosition]
.includes(hand)
){


ranges[selectedRangePosition]
=
ranges[selectedRangePosition]
.filter(
x=>x!==hand
);



cell.classList.remove(
"active"
);



}

else{


ranges[selectedRangePosition]
.push(hand);



cell.classList.add(
"active"
);


}



localStorage.setItem(
"ranges",
JSON.stringify(ranges)
);



};



matrix.appendChild(cell);



}


}



}









document
.querySelectorAll(".range-btn")
.forEach(button=>{


button.onclick=function(){


selectedRangePosition =
this.dataset.position;



document
.querySelectorAll(".range-btn")
.forEach(btn=>{


btn.classList.remove(
"active"
);


});



this.classList.add(
"active"
);



createMatrix();


};



});









// =============================
// RANGE DE TREINO
// =============================


function createTrainingMatrix(){


let matrix =
document.getElementById(
"training-matrix"
);



matrix.innerHTML="";



for(let i=0;i<13;i++){


for(let j=0;j<13;j++){


let hand =
getMatrixHand(i,j);



let cell =
document.createElement(
"div"
);



cell.className="cell";

cell.innerHTML=hand;



if(
trainingRange.includes(hand)
){

cell.classList.add(
"active"
);

}




cell.onclick=function(){



if(
trainingRange.includes(hand)
){


trainingRange =
trainingRange.filter(
x=>x!==hand
);



cell.classList.remove(
"active"
);



}

else{


trainingRange.push(hand);



cell.classList.add(
"active"
);


}



localStorage.setItem(
"trainingRange",
JSON.stringify(trainingRange)
);



};



matrix.appendChild(cell);



}


}



}









// =============================
// TODOS
// =============================


document
.getElementById("select-all-training")
.onclick=function(){



trainingRange=[];



for(let i=0;i<13;i++){


for(let j=0;j<13;j++){


trainingRange.push(
getMatrixHand(i,j)
);


}


}



localStorage.setItem(
"trainingRange",
JSON.stringify(trainingRange)
);



createTrainingMatrix();



};









// =============================
// NENHUM
// =============================


document
.getElementById("clear-training")
.onclick=function(){



trainingRange=[];



localStorage.setItem(
"trainingRange",
JSON.stringify(trainingRange)
);



createTrainingMatrix();



};









// =============================
// RESET AO MUDAR POSIÇÃO
// =============================


document
.querySelectorAll(".panel input")
.forEach(input=>{


input.onchange=function(){


prepareHand();


};



});









// =============================
// ESTATÍSTICAS
// =============================


function loadStatistics(){



let box =
document.getElementById(
"stats-content"
);



if(!box)return;



box.innerHTML="";



box.innerHTML +=
"<h2>Mãos mais erradas</h2>";



Object
.entries(mistakes)
.sort(
(a,b)=>b[1]-a[1]
)
.slice(0,10)
.forEach(item=>{


box.innerHTML +=

`

<div class="stat-box">

${item[0]}

<br>

${item[1]} erros

</div>

`;



});




box.innerHTML +=
"<h2>Posições mais erradas</h2>";



Object
.entries(positionMistakes)
.sort(
(a,b)=>b[1]-a[1]
)
.forEach(item=>{


box.innerHTML +=

`

<div class="stat-box">

${item[0]}

<br>

${item[1]} erros

</div>

`;



});



}









// =============================
// INICIAR
// =============================


updateScore();

prepareHand();