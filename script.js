class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    createLi() {
        let li = document.createElement('li');
        let numberLi = ulList.querySelectorAll('li');
        li.innerText = `Time ${numberLi.length}: ${this.format(this.times)}`;
        return li
    }

    resetBtn(ulList) {
        this.running = false;
        clearInterval(this.watch);

        ulList.appendChild(this.createLi());
       
        this.reset();
        this.print(this.times);
    }

    resetResults() {
        let listResults = document.querySelectorAll('li');
        for (let i = 1; i < listResults.length; i++) {
            listResults[i].remove();
        };
        /* [ ...listResults].forEach(li => li.remove());   nie dałem urruchomić forEach od 1 indeksu tablicy dlatego dałem pętlę for*/
    }
    
}

function pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result
    }

const stopwatch = new Stopwatch(
    document.querySelector('.stopwatch')
);

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
let ulList = document.querySelector('.results');
resetButton.addEventListener('click', () => stopwatch.resetBtn(ulList));

let resetResultsButton = document.getElementById('resetResults');
resetResultsButton.addEventListener('click', () => stopwatch.resetResults());

