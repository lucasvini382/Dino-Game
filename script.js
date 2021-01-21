const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0; // usando o let pois a mesma será alterada posteriormente

function handleKeyUp(event){ // função que irá verificar se o espaço foi pressionado
	if(event.keyCode === 32){
		if(!isJumping){
		jump();
	}
}
}

function jump(){ // função que irá fazer o dino pular
	isJumping = true;
	let upInterval = setInterval(() => { // definir a execução de um código de acordo com um intevalo pre determinado
		if(position >= 150){
			clearInterval(upInterval); // limpar intervalo de subida
			// Descendo
			let downInterval = setInterval (() => {
				if(position <= 0){
					clearInterval(downInterval);
					isJumping = false;
				}else{
				position -= 20;
				dino.style.bottom = position + 'px';
			}
			}, 20)
		} else
		// Subindo
		position += 20;
		dino.style.bottom = position + 'px';
	}, 20);
}

function createCactus(){
	const cactus = document.createElement('div'); // usar Js p/ criar HTML
	let cactusPosition = 1000;
	let randomTime = Math.random() * 6000;

	cactus.classList.add('cactus');
	cactus.style.left = 1000 + 'px';
	background.appendChild(cactus);
	let leftInterval = setInterval(() =>{
		if(cactusPosition <= -60){
			clearInterval(leftInterval);
			background.removeChild(cactus); // remover o cacto "filho" quando ele sair da tela
		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
			// Game Over
			clearInterval(leftInterval);
			document.body.innerHTML = "<h1 class='game-over'>Fim de Jogo</h1>";
		} else {
			cactusPosition -= 10;
			cactus.style.left = cactusPosition + 'px';
		}
	}, 20)

	setTimeout(createCactus, randomTime); // executar comando depois de um determinado momento
}

createCactus();
document.addEventListener('keyup', handleKeyUp);