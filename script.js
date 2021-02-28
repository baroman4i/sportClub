const contentTitle = document.querySelectorAll('.content-block'),
    backBtn = document.querySelectorAll('.back-btn'),
    trainers = document.querySelectorAll('.trainer'),
    selects = document.querySelectorAll('select'),
    submits = document.querySelectorAll('.submit'),
    loginBtn = document.querySelector('.login-btn'),
    loginForm = document.querySelector('form.login'),
    arrayBlock = document.querySelector('.array'),
    title = document.querySelector('.title-btn'),
    accounts = [
    {
        login: 'trainer1',
        password: 'trainer1',
        fil: 'Лёгкая атлетика'
    },
    {
        login: 'trainer2',
        password: 'trainer2',
        fil: 'Велоспорт'
    },
    {
        login: 'trainer3',
        password: 'trainer3',
        fil: 'Тяжёлая атлетика'
    }
]
let loggedTrainer = '', currentArray = '', array = []
currentArray = JSON.parse(localStorage.getItem('array'))
loginBtn.addEventListener('click', () => loginBtn.closest('.login-block').classList.toggle('active'))
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const log = document.querySelector('#log')
    const pass = document.querySelector('#pass')
    accounts.forEach((account, index) => {
        if (account.login === log.value && account.password === pass.value) {
            loggedTrainer = account.fil
            array = currentArray.filter(item => item.name === loggedTrainer)
            title.innerHTML = loggedTrainer
            renderElArray(array)
            alert('Вход выполнен успешно')
            loginBtn.closest('.login-block').classList.toggle('active')
        }
        if(index === accounts.length-1 && loggedTrainer.length === 0) alert('wrong login')
    })
    loggedTrainer.length !== 0 ? arrayBlock.closest('.arrayBlock').classList.add('active') : arrayBlock.closest('.arrayBlock').classList.remove('active')
})

console.log(currentArray)
contentTitle.forEach(block => block.addEventListener('click', () => {
    contentTitle.forEach(item => item.closest('.sport-block').classList.add('hidden'))
    let bl = block.closest('.sport-block')
    bl.classList.add('active')
}))
backBtn.forEach(block => block.addEventListener('click', () => {
    contentTitle.forEach(item => item.closest('.sport-block').classList.toggle('hidden'))
    let bl = block.closest('.sport-block')
    bl.classList.remove('active')
}))
trainers.forEach(trainer => trainer.addEventListener('click', () => {
    trainers.forEach(item => item.classList.remove('active'))
    trainer.classList.toggle('active')
}))
submits.forEach(sub => sub.addEventListener('click', () => {
    let currentTr = '',
        currentTime = '',
        currentBlock = sub.closest('.content-block').querySelector('.content-title').innerText
    try {
        currentTr = document.querySelector('.trainer.active').innerText
    }
    catch (e) {
        console.log(e + 'выберите тренера')
    }
    finally {
        if (currentTr.length !== 0) {
            currentTime = selects.item(+sub.id).value
            let stringArray = JSON.parse(localStorage.getItem('array'))
            localStorage.clear();
            if (stringArray !== null){
                array = stringArray
            }
            array.push({
                name: currentBlock,
                trainer: currentTr,
                time: currentTime
            })
            stringArray = JSON.stringify(array)
            localStorage.setItem('array', stringArray)
            alert(`Вы записаны в ${currentTr} на секкции ${currentBlock} к ${currentTime}`)
            trainers.forEach(item => item.classList.remove('active'))
            currentArray = array.filter(item => item.name === loggedTrainer)
            renderElArray(currentArray)
            // delElArray()
        }
        else alert('выберите тренера')
    }
}))
function renderElArray(arr) {
    arrayBlock.innerHTML = ''
    arr.forEach(el => {
        arrayBlock.insertAdjacentHTML('beforeend', `
            <div class="el-block">
                <div class="el-time">${el.time}</div>
                <div class="el-trainer">${el.trainer}</div>
                <div class="del-btn">&#215;</div>
            </div>`)
    })
    // delElArray()
}
function delElArray() {
    const delBtn = document.querySelectorAll('.del-btn')
    try {
        delBtn.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentArray.splice(index, 1)
                console.log(currentArray)
            })
        })
    }
    finally {
        renderElArray(currentArray)
    }
}
