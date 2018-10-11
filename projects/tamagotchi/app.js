let sleepiness =1;
let boredom =1;
let hunger =1;
let age =0;
let sleepinessLevel =0;
let boredomLevel = 0;
let hungerLevel = 0;
let intervalID = null;
class Tomagotchi{
	constructor(name){
		this.name = name;
		this.sleepLevel = sleepiness;
		this.boredLevel = boredom;
		this.hungerLevel = hunger;
	}
}

const interval = (flag) => {
	if(flag){
	intervalID = setInterval(() => {

		sleepiness = sleepiness*1.1;
		boredom = boredom*1.15;
		hunger = hunger*1.2;
		age += 500/2000;
		grow(age);
		sleep(sleepiness);
		bored(boredom);
		hungry(hunger);

	}, 500)}
	else { clearInterval(intervalID); }
}

const evolveNotify = () => {
	
	if (age > 10 && age < 11){
		$('#notification').text('Your gotch is evolving to level 2');
	}
	else if (age > 20 && age < 21){
		$('#notification').text('Your gotch is evolving to level 3');
	}
	else if (age > 30 && age < 31){
		$('#notification').text('Your gotch is evolving to level 4');
	}
	else if (age > 40 && age <41){
		$('#notification').text('Your gotch is reaching its last level!');
	}
}

const evolve = (clicked) => {
	if (age > 10 && age < 20){
		$('#gotch').attr('fill', 'pink');
	}
	else if (age > 20 && age < 30){
		$('#gotch').attr('fill', 'purple');
	}
	else if (age > 30 && age < 40){
		$('#gotch').attr('fill', 'black');
	}
	else if (age > 40 && age <50){
		$('#gotch').attr('fill', 'yellow');
	}
	else if (age > 50){
		alert('Your gotch has evolved completely! Press okay to restart!"');
		restartGame(false);
	}

}

const grow = (size) =>{
//	console.log(size);
	$('#age').css('height', (size +5)+ '%');
	$('#age').text(Math.floor((size)));
	$('#tomogatchi').attr('height', 50 + size).attr('width', 50 + size).attr('left', '50%').attr('top', '50%').css('transform', 'translate(-50%, -50%)');
	$('#gotch').attr('cx', 25 + (size/2)).attr('cy',25+(size/2)).attr('r',25+(size/2));
	evolveNotify();
	evolve();
}

const sleep = (slp) =>{
//	console.log(slp);
	//8.5 cuz there's 85% of the page left
	sleepinessLevel = slp/8.5;
	$('#sleepiness').css('height', (slp) +5+ '%');	
	$('#sleepiness').text(Math.floor(sleepinessLevel)+1);
	if (slp > 85){
		restartGame(true);
	}
}

const bored = (brd) =>{
//	console.log(brd);
	boredomLevel = brd/8.5;
	$('#boredom').css('height', (brd) + 5 + '%');
	$('#boredom').text(Math.floor(boredomLevel)+1);
	if (brd > 85){
		restartGame(true);
	}
}

const hungry = (hng) =>{
	console.log(hng);
	hungerLevel = hng/8.5;
	console.log('level'+hungerLevel);
	$('#hunger').css('height', (hng) + 5 + '%');
	$('#hunger').text(Math.floor(hungerLevel)+1);
	if (hng>85){
		restartGame(true);
	}
}

const restartGame = (death) => {
	interval(false);
	if (death){
		alert('You let your gotch die! Press okay to try again!');
	}
	else {
		alert('congrats on winning the game!');
	}
	sleepiness =1;
	boredom =1;
	hunger =1;
	age =0;
	sleepinessLevel =0;
	boredomLevel = 0;
	hungerLevel = 0;
	interval(true);
	$('#tomogatchi').attr('height', '50').attr('width', '50');
	$('#gotch').attr('cx', '25').attr('cy', '25').attr('r', '25');
}

const gotchNotification = (text, gotchName) => {
	$('#notification').text(`You have already ${text} ${gotchName} enough`);
}

const interact = (gotchName) => {
	
	$('#hunger-button').on('click', () => {
		if(hunger > 8.5){
			hunger-=8.5;
			$('#hunger').css('height', hunger + 5 + '%');
		}
		
		else{
			gotchNotification('fed', gotchName);
		}
	});
	$('#sleep-button').on('click', () => {
		if (sleepiness > 8.5){
			sleepiness-=8.5;
			$('#sleepiness').css('height', sleepiness + 5 + '%');
		}
		
		else{
			gotchNotification(`let ${gotchName} sleep enough`, '');
		}
	});
	$('#bored-button').on('click', () => {
		if (boredom > 8.5){
			boredom-=8.5;
			$('#boredom').css('height', boredom +5 + '%');
		}
		
		else{
			gotchNotification('played with', gotchName);	

		}
	});
}

const SVG = (tag) => {
	return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

const startGame = () =>{
	const $gotch = $('#tomogatchi');
	let name = prompt('Give your gotch a name', 'Name');
	$(SVG('text')).attr('id', 'gotchText').attr('x','50%').attr('y','50%').attr('text-anchor','middle').attr('alignment-baseline', 'middle').html(name).appendTo($gotch);
	const tom = new Tomagotchi(name);
	$('#intro').html('<p>make sure to feed, play, or put ' + tom.name + ' to sleep by clicking the buttons bellow!<br/></p><p id ="notification">He will grow if you keep him alive!</p>');
	interval(true);
	interact(tom.name);

}




startGame();
