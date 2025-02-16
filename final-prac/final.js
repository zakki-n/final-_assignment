let currentCard, nextCard;
let consecutiveWins = 0;

function getRandomCard(exclude) {
    let card;
    do {
        card = Math.floor(Math.random() * 13) + 1;
    } while (card === exclude);
    return card;
}

function startGame() {
    consecutiveWins = 0;
    document.getElementById('score').textContent = `連続正解数: ${consecutiveWins}`;
    document.getElementById('result').textContent = '';
    document.getElementById('restart').style.display = 'none';
    enableButtons(); // ここでボタンを押せるようにする
    currentCard = getRandomCard(null);
    document.getElementById('card-value').textContent = currentCard;
}

function guess(choice) {
    disableButtons(); // ボタンを押せなくする

    nextCard = getRandomCard(currentCard);
    let correct = (choice === 'high' && nextCard > currentCard) || (choice === 'low' && nextCard < currentCard);
    
    if (correct) {
        consecutiveWins++;
        document.getElementById('result').textContent = `正解！次のカードは ${nextCard} でした`;
        document.getElementById('score').textContent = `連続正解数: ${consecutiveWins}`;
        currentCard = nextCard;
        document.getElementById('card-value').textContent = currentCard;

        setTimeout(enableButtons, 500); // 0.5秒後にボタンを再度押せるようにする
    } else {
        document.getElementById('result').textContent = `不正解！次のカードは ${nextCard} でした`;
        document.getElementById('restart').style.display = 'block';
    }
}

function disableButtons() {
    document.getElementById('high').disabled = true;
    document.getElementById('low').disabled = true;
}

function enableButtons() {
    document.getElementById('high').disabled = false;
    document.getElementById('low').disabled = false;
}

document.getElementById('high').addEventListener('click', () => guess('high'));
document.getElementById('low').addEventListener('click', () => guess('low'));
document.getElementById('restart').addEventListener('click', startGame);

startGame();