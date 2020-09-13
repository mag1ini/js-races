const score = document.querySelector('.score')
const start = document.querySelector('.start')
const gameArea = document.querySelector('.gameArea')
const car = document.createElement('div')
car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
}

const setting = {
    start:false,
    score:0,
    speed:5,
    x:125,
    y:0,
    traffic: 3
}

function getQuantityElements(heightEl,) {
    return document.documentElement.clientHeight / heightEl  +1
}
start.addEventListener('click',startGame)
function startGame ()  {
    gameArea.innerHTML = ''
    start.classList.add('hide')


    setting.start = true
    // lines
    for (let i=0; i<getQuantityElements(50);i++) {
        const line = document.createElement('div')
        line.classList.add('line')
        line.style.top =( i * 100) + 'px'
        line.y = i * 100;
        gameArea.appendChild(line)
    }
    // enemies
    for (let i=0; i<getQuantityElements(100 * setting.traffic);i++) {
        const enemy = document.createElement('div')
        enemy.classList.add('enemy')

        enemy.y =  - 100 * setting.traffic * (i + 1)
        enemy.style.top = enemy.y + 'px'
        enemy.style.background =  'transparent  url("image/enemy2.png")  center / cover no-repeat'


        enemy.style.left = Math.floor(( Math.random() * (gameArea.offsetWidth - 50) )) + 'px'
        gameArea.appendChild(enemy)
    }


    setting.score = 0;
    gameArea.appendChild(car)

    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2
    car.style.top = 'auto'
    car.style.bottom = '10px'

    setting.x = car.offsetLeft
    setting.y = car.offsetTop
    requestAnimationFrame(playGame)
}

function playGame() {

    if (setting.start) {
        setting.score+=Math.floor(setting.speed);
        score.innerHTML = 'SCORE: <br> ' + setting.score
        moveRoad()
        moveEnemy()
        if (keys.ArrowUp && setting.y>0) {

            setting.y-=setting.speed;
        }

        if (keys.ArrowDown && setting.y <(gameArea.offsetHeight - car.offsetHeight )) {

            setting.y+=setting.speed;
        }

        if (keys.ArrowLeft && setting.x>0) {
            setting.x-=setting.speed;
        }

        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth )) {
            setting.x+=setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame)
    }
}
function  moveEnemy() {
    let enemy = document.querySelectorAll('.enemy')


    enemy.forEach(function (enemy) {
        let carRect = car.getBoundingClientRect()
        let enemyRect = enemy.getBoundingClientRect()

        if (    carRect.top <= enemyRect.bottom
            && carRect.right >= enemyRect.left
            && carRect.left <= enemyRect.right
            && carRect.bottom >= enemyRect.top) {
            start.classList.remove('hide')
            start.style.top = score.offsetHeight
            setting.start = false
            console.warn("DTP");
        }
        enemy.y += setting.speed / 2
        enemy.style.top = enemy.y + 'px'

        if (enemy.y > document.documentElement.clientHeight) {
            enemy.y = -100 * setting.traffic;
            enemy.style.left = Math.floor(( Math.random() * (gameArea.offsetWidth - 50) )) + 'px'
        }

    })
}
function  moveRoad() {

    let lines = document.querySelectorAll('.line')
    lines.forEach(function (line) {

        line.y += setting.speed
        line.style.top = line.y + 'px'

        if (line.y > document.documentElement.clientHeight) {
            line.y = -100;
        }
    })
}


document.addEventListener('keydown',startRun)
document.addEventListener('keyup',stopRun)
function startRun(e) {
    e.preventDefault()
    keys[e.key] = true;
}
function stopRun(e) {
    e.preventDefault()
    keys[e.key] = false;
}

