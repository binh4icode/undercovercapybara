const regular = ["Images/Banana.png", "Images/Derpy (1).png", "Images/Angry.png"];
const special = "Images/Special.png";
const audio = new Audio("Images/Bg.mp3");

const container = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("timer");
const startbtn = document.getElementById("start-btn");

let score = 0;
let gameOn = false;
let timeLeft = 30;
audio.loop = true;
audio.volume = 0.3;

startbtn.addEventListener('click', startGame);

function startGame() {
    gameOn = true;
    score = 0;
    timeLeft = 30;
    startbtn.disabled = true;
    container.innerHTML = "";

    audio.currentTime = 0;
    audio.play()

    //functrion spawnRandom


    //loop checking timeleft and decreasing time
    const countdown = setInterval(() => {
        //subtract
        timeLeft --;
        //display
        timeDisplay.innerText = timeLeft;
        //checking
        if (timeLeft <= 0) {
            clearInterval(countdown);
            gameOn = false;
            startbtn.disabled = false;
            alert("Game Over! Score: "+score)
            timeLeft = 30;
            timeDisplay.innerText = timeLeft;
            audio.pause()
        }
        //wait
    }, 1000)

    setInterval(createRandom, 400);

}

function createRandom() {
    if (!gameOn) return;

    const random = document.createElement("img");
    random.classList.add("random");

    if (Math.random() < 0.1) {
        random.src = special;
        random.dataset.points = 5;
        random.classList.add("special");
    } else {

        const radint = Math.floor(Math.random()*regular.length);
        console.log(radint)
        console.log(regular)
        random.src = regular[radint];
        random.dataset.points = 1;
    }

    random.style.top = Math.random() * 400 +"px";
    random.style.left = Math.random() *600 + "px";

    container.appendChild(random);

    random.addEventListener("mousedown", function() {
        score += parseInt(this.dataset.points);
        scoreDisplay.innerText = score;
        this.remove();
    });

    setTimeout(() => {
        if (random.parentElement) random.remove();
    }, 1200);
}