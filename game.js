const game = () => {
    let pScore = 0;
    let cScore = 0;

    const startGame = () => {
        const playBtn = document.querySelector(".opening button");
        const restartBtn = document.querySelector(".restart button");
        const openingScreen = document.querySelector(".opening");
        const scoreScreen = document.querySelector(".score");
        const matchScreen = document.querySelector(".match");

        playBtn.addEventListener("click", () => {
            openingScreen.classList.add("fadeOut");
            scoreScreen.classList.add("fadeFromTop");
            matchScreen.classList.add("fadeIn");
        });

        restartBtn.addEventListener("click", function () {
            scoreScreen.classList.add("reset");
            matchScreen.classList.add("reset");
            setTimeout(function () {
                document.location.href = "";
            }, 1500);
        })
    }

    const gamePlay = () => {
        const btnOptions = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img");

        // ngosongin class buat animasi biar nantinya bisa di isi ulang lagi, dan animasinya gerak lagi
        hands.forEach(hand => {
            hand.addEventListener("animationend", function () {
                this.style.animation = "";
            });
        })

        // Computer Options
        const computerOption = ['Batu', 'Gunting', 'Kertas'];

        btnOptions.forEach(option => {
            option.addEventListener("click", function () {
                // Computer random number for chose an option
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoise = computerOption[computerNumber];

                playerHand.src = `./assets/Batu.png`;
                computerHand.src = `./assets/Batu.png`;

                playerHand.style.animation = "shakePlayer 1.5s ease";
                computerHand.style.animation = "shakeComputer 1.5s ease";

                setTimeout(() => {
                    // Compare Hands
                    const playerChoise = this.textContent;
                    compareHands(playerChoise, computerChoise);

                    // Update Images
                    playerHand.src = `./assets/${this.textContent}.png`;
                    computerHand.src = `./assets/${computerChoise}.png`;
                }, 1300);
            });
        });


    }

    const addScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");

        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    }

    const compareHands = (playerChoise, computerChoise) => {
        // Ambil isi tulisan di class winner
        const winner = document.querySelector(".winner");

        // Kalo SERI
        if (playerChoise === computerChoise) {
            winner.textContent = "Seri";
            return;
        }

        // Kalo playernya BATU
        if (playerChoise === "Batu") {
            if (computerChoise === "Gunting") {
                winner.textContent = "Kamu Menang!";
                pScore++;
                addScore();
                return;
            } else {
                winner.textContent = "Kamu Kalah :(";
                cScore++;
                addScore();
                return;
            }
        }
        // Kalo playernya GUNTING
        if (playerChoise === "Gunting") {
            if (computerChoise === "Batu") {
                winner.textContent = "Kamu Kalah :(";
                cScore++;
                addScore();
                return;
            } else {
                winner.textContent = "Kamu Menang!";
                pScore++;
                addScore();
                return;
            }
        }
        // Kalo playernya KERTAS
        if (playerChoise === "Kertas") {
            if (computerChoise === "Gunting") {
                winner.textContent = "Kamu Kalah :(";
                cScore++;
                addScore();
                return;
            } else {
                winner.textContent = "Kamu Menang!";
                pScore++;
                addScore();
                return;
            }
        }
    }

    startGame();
    gamePlay();
}

game();
