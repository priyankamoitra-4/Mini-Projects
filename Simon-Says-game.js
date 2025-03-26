let gameSeq = [];
let userSeq = [];

let btns =["yellow","red","green","purple"] 

let started = false;

let level = 0;
let h2 = document.querySelector("h2")

//1. When any "key" is pressed on the "document" the game starts.
document.addEventListener('keypress',function(){
    if(started==false){
        console.log("game begun")
        started=true;

        levelUp();
    }
})

// changes the btn backgroundColor to white and  return back the original color.
function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)

}

// users pressed button "flashes green"
function userFlash(btn){
    btn.classList.add("userFlash")
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250)

}
function levelUp(){
    // 2. Level updated and stored in "h2"
    userSeq = []; // The user has to re enter the full sequence that's why = []
    level++;
    h2.innerText = `Level ${level}`;


    // random btn choose
    let randIndx = Math.floor(Math.random()*3);
    let randcolor = btns[randIndx];

    let randBtn = document.querySelector(`.${randcolor}`);
    // console.log(randIndx);
    // console.log(randcolor);
    // console.log(randBtn);
    // Random color generated is "pushed" inside our arry "gameSeq"
    gameSeq.push(randcolor)
    console.log(gameSeq)
    gameFlash(randBtn);

}

// Checks whether the user has pressed the "correct" button generated by the game.
function checkAns(idx){
    console.log(`current level ${level}`)

    // let idx = level-1;

    if(userSeq[idx] === gameSeq[idx]){
        // console.log("same value")
        // Case 2
        if(userSeq.length == gameSeq.length){
            // levelUp()
            setTimeout(levelUp, 1000)
            // After every correct button pressed displays the "Highest score"
            h2.innerText = `Your highest score is ${level}`
        }
    }else{
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press Any key to start`;
        // red alert ! when pressed wrong button
        document.querySelector("body").style.backgroundColor = "red"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white"


        },500);

        reset();
    }
}
//3. Tracking user's and game's sequence

function btnPress(){
    let btn = this

    userFlash(btn);
    let userColor = btn.getAttribute("id")
    console.log(userColor)
    userSeq.push(userColor)

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn")

for(let btn of allBtns){
    btn.addEventListener('click',btnPress);
}

// Reseting after game over

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    
}
