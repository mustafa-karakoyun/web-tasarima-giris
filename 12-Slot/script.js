let balance = 0;
        let winnings = 0;
        let isSpinning = false;

        const symbols = ['🍎', '🍊', '🍇', '🍓'];
        const symbolValues = { '🍎': 5, '🍊': 4, '🍇': 3, '🍓': 2 };

        const balanceEl = document.getElementById('balance');
        const winningsEl = document.getElementById('winnings');
        const depositInput = document.getElementById('deposit');
        const depositBtn = document.getElementById('depositBtn');
        const linesInput = document.getElementById('lines');
        const betInput = document.getElementById('bet');
        const spinBtn = document.getElementById('spinBtn');
        const resultEl = document.getElementById('result');
        const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];

        function updateDisplay() {
            balanceEl.textContent = balance;
            winningsEl.textContent = winnings;
        }

        function depositMoney() {
            const amount = parseInt(depositInput.value);
            if (amount && amount > 0) {
                balance += amount;
                updateDisplay();
                depositInput.value = '';
                spinBtn.disabled = false;
                resultEl.textContent = 'Bahis yapın ve çevirin!';
                resultEl.className = 'result';
            }
        }

        function getRandomSymbol() {
            return symbols[Math.floor(Math.random() * symbols.length)];
        }

        function checkWin(reelResults) {
            const lines = parseInt(linesInput.value) || 1;
            const bet = parseInt(betInput.value) || 1;
            let totalWin = 0;

            // Check each line
            for (let line = 0; line < lines; line++) {
                const lineSymbols = reelResults.map(reel => reel[line]);
                if (lineSymbols[0] === lineSymbols[1] && lineSymbols[1] === lineSymbols[2]) {
                    totalWin += symbolValues[lineSymbols[0]] * bet;
                    
                    // Highlight winning symbols
                    reels.forEach((reel, index) => {
                        reel.children[line].classList.add('winning');
                    });
                }
            }

            return totalWin;
        }

        function spin() {
            if (isSpinning) return;

            const lines = parseInt(linesInput.value) || 1;
            const bet = parseInt(betInput.value) || 1;
            const totalBet = lines * bet;

            if (balance < totalBet) {
                resultEl.textContent = 'Yetersiz bakiye!';
                resultEl.className = 'result lose';
                return;
            }

            if (bet <= 0) {
                resultEl.textContent = 'Geçerli bir bahis girin!';
                resultEl.className = 'result lose';
                return;
            }

            balance -= totalBet;
            isSpinning = true;
            spinBtn.disabled = true;

            // Clear previous winning highlights
            document.querySelectorAll('.symbol').forEach(symbol => {
                symbol.classList.remove('winning');
            });

            // Add spinning animation
            reels.forEach(reel => reel.classList.add('spinning'));

            // Generate random results
            const reelResults = [];
            
            setTimeout(() => {
                reels.forEach((reel, reelIndex) => {
                    reel.classList.remove('spinning');
                    const reelResult = [];
                    
                    for (let i = 0; i < 3; i++) {
                        const symbol = getRandomSymbol();
                        reel.children[i].textContent = symbol;
                        reelResult.push(symbol);
                    }
                    reelResults.push(reelResult);
                });

                const winAmount = checkWin(reelResults);
                balance += winAmount;
                winnings += winAmount;

                if (winAmount > 0) {
                    resultEl.textContent = `Kazandınız! +$${winAmount}`;
                    resultEl.className = 'result win';
                } else {
                    resultEl.textContent = `Kaybettiniz! -$${totalBet}`;
                    resultEl.className = 'result lose';
                }

                updateDisplay();
                isSpinning = false;
                spinBtn.disabled = balance <= 0;
            }, 2000);
        }

        depositBtn.addEventListener('click', depositMoney);
        spinBtn.addEventListener('click', spin);

        // Enter key for deposit
        depositInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') depositMoney();
        });

        updateDisplay();