let timer;
        let isRunning = false;
        let currentMode = 'pomodoro';
        let sessions = 0;
        let totalTime = 0;

        const modes = {
            pomodoro: 25 * 60,
            short: 5 * 60,
            long: 15 * 60
        };

        let timeLeft = modes[currentMode];

        const minuteEl = document.getElementById('minute');
        const secondEl = document.getElementById('second');
        const startBtn = document.getElementById('start');
        const resetBtn = document.getElementById('reset');
        const pomosCountEl = document.getElementById('pomos-count');
        const pomosTimeEl = document.getElementById('pomos-time');
        const modeBtns = document.querySelectorAll('.mode-btn');
        const notificationEl = document.getElementById('notification');

        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            minuteEl.textContent = minutes.toString().padStart(2, '0');
            secondEl.textContent = seconds.toString().padStart(2, '0');
        }

        function showNotification(message) {
            document.getElementById('notification-text').textContent = message;
            notificationEl.classList.add('show');
            setTimeout(() => {
                notificationEl.classList.remove('show');
            }, 3000);
        }

        function startTimer() {
            if (isRunning) {
                clearInterval(timer);
                isRunning = false;
                startBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
                return;
            }

            isRunning = true;
            startBtn.innerHTML = '<span class="material-icons">pause</span>';
            
            timer = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft === 0) {
                    clearInterval(timer);
                    isRunning = false;
                    startBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
                    
                    if (currentMode === 'pomodoro') {
                        sessions++;
                        totalTime += 25;
                        pomosCountEl.textContent = sessions;
                        pomosTimeEl.textContent = totalTime;
                        showNotification('Pomodoro complete! Time for a break! 🎉');
                    } else {
                        showNotification('Break time is over! Ready for another session? 💪');
                    }
                    
                    
                    if (currentMode === 'pomodoro') {
                        switchMode(sessions % 4 === 0 ? 'long' : 'short');
                    } else {
                        switchMode('pomodoro');
                    }
                }
            }, 1000);
        }

        function resetTimer() {
            clearInterval(timer);
            isRunning = false;
            timeLeft = modes[currentMode];
            updateDisplay();
            startBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
        }

        function switchMode(mode) {
            currentMode = mode;
            timeLeft = modes[mode];
            updateDisplay();
            
            if (isRunning) {
                clearInterval(timer);
                isRunning = false;
                startBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
            }
            
            modeBtns.forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        }

        startBtn.addEventListener('click', startTimer);
        resetBtn.addEventListener('click', resetTimer);

        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                switchMode(mode);
            });
        });

        
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                startTimer();
            } else if (e.key === 'r' || e.key === 'R') {
                resetTimer();
            }
        });

        updateDisplay();