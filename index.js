const btnStart = document.querySelector('.start');
const cards = document.querySelectorAll('.card');
const hits = document.querySelector('.hits');
const time = document.querySelector('.time');
const back = document.querySelectorAll('.back');

let clic = 0;
let aciertos = 0;
let count = 60;
let interval;
let volteo = 0;

document.addEventListener('DOMContentLoaded', e => {
    back.forEach(b => {
        b.disabled = true;
    });
})

btnStart.addEventListener('click', e => {
    start();
});

back.forEach(b => {
    b.addEventListener('click', e => {
        clic++;
        b.classList.toggle('hideFront');
        b.nextElementSibling.classList.toggle('showback');
        b.classList.add('select');
        b.nextElementSibling.classList.add('select');
        
        if(clic == 2) {
            pares(b);
        }

        win();
    });
});

const start = () => {

    hits.textContent = `Aciertos: ${aciertos}`
    btnStart.disabled = true;
    const indexCounts = [0,0,0,0,0,0,0,0];
  
    cards.forEach(c => {
      let rand;
      do {
        rand = Math.floor(Math.random()*indexCounts.length);
      } while (indexCounts[rand] >= 2);
      let img = document.createElement('img');
      img.src = `icons/${rand}.png`;
      c.id = `${rand}`;
      c.appendChild(img);
      indexCounts[rand]++;
    });


    back.forEach(b => {
        b.disabled = false;
    });

    interval = setInterval(t => {
        time.textContent = `Tiempo: ${count}s`;
        count--;
        if(count < 0) {
            timeOver();
            clearInterval(interval);
        }
    },1000);
};

const pares = async (b) => {
    
    let uno = null;
    let buno = null;
    let dos = null;
    let bdos = null;
    let encontrado = false;

    for(let i = 0; i < cards.length; i++) {
        if(cards[i].classList.contains('select')) {
            if(!encontrado) {
                uno = cards[i];
                buno = uno.previousElementSibling;
                encontrado = true;
            }
            else{
                dos = cards[i];
                bdos = dos.previousElementSibling;
            }
        }
    }

    if(uno.id == dos.id) {
        volteo+=2;
        aciertos++;
        hits.textContent = `Aciertos: ${aciertos}`;
    }else {
        await new Promise(res => setInterval(res, 400))
        .then(r => {
            uno.classList.toggle('showback');
            dos.classList.toggle('showback');
            buno.classList.toggle('hideFront');
            bdos.classList.toggle('hideFront');
        })
    }
    
    clic = 0;
    uno.classList.remove('select');
    dos.classList.remove('select');
    buno.classList.remove('select');
    bdos.classList.remove('select');
};

const timeOver = () => {

        alert("Perdiste");

        back.forEach(b => {
            b.disabled = true;
            b.classList.remove('select');
            if(b.classList.contains('hideFront')) b.classList.toggle('hideFront');
        });

        cards.forEach(c => {
            if(c.classList.contains('showback')) c.classList.toggle('showback');
            c.classList.remove('select');
            c.innerHTML = '';
            c.id = '';
        });

        aciertos = 0;
        count = 60;
        hits.textContent = `Aciertos: ${aciertos}`;
        time.textContent = `Tiempo: ${count}s`;
        btnStart.disabled = false;
};

const win = () => {
    
    if(volteo == cards.length) {
        alert('ganaste');
        clearInterval(interval);
        btnStart.disabled = true;

        setTimeout(() => {
            back.forEach(b => {
                b.disabled = true;
                b.classList.remove('select');
                if(b.classList.contains('hideFront')) b.classList.toggle('hideFront');
            });
    
            cards.forEach(c => {
                if(c.classList.contains('showback')) c.classList.toggle('showback');
                c.classList.remove('select');
                c.innerHTML = '';
                c.id = '';
            });
    
            aciertos = 0;
            count = 60;
            hits.textContent = `Aciertos: ${aciertos}`;
            time.textContent = `Tiempo: ${count}s`;
            btnStart.disabled = false;
            volteo = 0;
        },2000);
    }
}