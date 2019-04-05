const cards = document.querySelectorAll('.memory-card');

let flipped = false;
let locked = false;
let first, second;

function flipCard() {
    if (locked) return;
    if (this === first) return;
    this.classList.toggle('flip');
    
    if (!flipped) {
        flipped = true;
        first = this;
        
        return;
    } 
    
    second = this;
        
    checkForMatch();
}

function checkForMatch() {
    let foundMatch = first.dataset.framework === second.dataset.framework;
    
    foundMatch ? disable() : unflip();
}

function disable() {
    first.removeEventListener('click', flipCard);
    second.removeEventListener('click', flipCard);
    
    reset();
}

function unflip() {
    locked = true;
    
    setTimeout(() => {
    first.classList.remove('flip');
    second.classList.remove('flip');
        
    reset();
    }, 1000);   
}

function reset() {
    [flipped, locked] = [false, false];
    [first, second] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
