var canvas=$('#canvas').get(0);
var ctx=canvas.getContext('2d');
var imgup=new Image();
  	imgup.src='img/obstacle_top.png';
	var imgdown=new Image();
	imgdown.src='img/obstacle_bottom.png'
var demo=$('#demo').get(0);
var startGame=$('#startGame').get(0);
var mengban=$('#mengban').get(0);
var bird1=$('#bird').get(0);
var flakes = [];
var newtop1=300;
var notes=0;
var step=100;
var timer=2000;
var z;
var zz=null;
 var scorea=$('#scorea').get(0);
startGame.onclick=function(){
	demo.removeChild(mengban);
	a();
	zuhe();
	clearr();	
}
function clearr(){
		ctx.clearRect(0, 0, 900, 600);
		canvas.style.backgroundImage="url(img/background.png)";
		
		zz=setTimeout(function(){
			clearr();
		},step);
		hua();
	}
canvas.onclick=function(){ 	
	newtop1-=60;
	bird1.style.top=newtop1+'px';
}
var aa;
	function a(){
		newtop1+=20;
		bird1.style.top=newtop1+'px';
		aa=setTimeout(function(){
		a();
		},100);
	}
function hua(){
	for (var i=0;i<flakes.length;i++) {
		flakes[i].x-=15;
		ctx.drawImage(imgup,flakes[i].x,flakes[i].y1,flakes[i].width,flakes[i].height);
		ctx.drawImage(imgdown,flakes[i].x,flakes[i].y2,flakes[i].width,flakes[i].height);	
		var birdStyle = window.getComputedStyle(bird1, null); 
		var birdStyleTop=birdStyle.top;
		var zanyong=birdStyleTop.length;
		var newBirdStyleTop=birdStyleTop.substring(0,zanyong-2);
		var birdStyleBottom=600-newBirdStyleTop-24;
		if(birdStyleBottom<=0){
			end();
			break;
		}
		if(flakes[notes].x<434&&flakes[notes].x>348){
			if(newBirdStyleTop<520+flakes[notes].y1||birdStyleBottom<600-flakes[notes].y2){
//				console.log('game over');
				end();
				break;	
			}
		}
		function end(){
				ctx.clearRect(0, 0, 900, 600);
				clearTimeout(zz);
				clearTimeout(aa);
				clearTimeout(z);
				
				var creatediv=document.createElement('div');
				creatediv.setAttribute('class','mengban');
				var bishi;
				if(notes<10){
					bishi='真的菜！！！';
				}
				if(notes>=10&&notes<20){
					bishi='一般般！！！';
				}
				if(notes<30&&notes>=20){
					bishi='好厉害！！！';
				}
				if(notes<40&&notes>=30){
					bishi='大神啊！！！';
				}
				if(notes>50){
					bishi='牛逼！！！';
				}
//				var daima="<label class='scorelabel'>你的得分:"+notes+"</label><input type='button' class='startGame' onclick='b()' value='重新开始'/>";
//				daima+='<label class=''>你的得分为:'+notes+'</label>';
				var daima="<label class='pingyu'>"+bishi+"</label><label class='scorelabel'>你的得分:"+notes+"</label><input type='button' class='startGame' onclick='b()' value='重新开始'/>";
				creatediv.innerHTML=daima;
				demo.appendChild(creatediv);
		}
		scorea.innerHTML=notes;
		if(flakes[notes].x<348){
			notes+=1;
			if(notes%10==0){
				step-=20;
				timer=timer-400;				
			}
			console.log(notes);
		}		
	}	
}
function Flake(x,y1,y2,width,height) {
		this.x = x;
		this.y1 = y1;
		this.y2 = y2;
		this.width = width;
		this.height = height;
	}

function zuhe(){
	var	x=900;
	var y=Math.round(Math.random()*300);
	var	imgupY=y+80-520;
	var imgdownY=140+y+80;
	var imgWidth=52;
	var imgHeight=520;
	var flake = new Flake(x,imgupY,imgdownY,imgWidth,imgHeight);
	flakes.push(flake);	
	z=setTimeout(function(){
	zuhe();
},timer);
}
function b(){
	var aa=$('.mengban');
	for(var j=0;j<aa.length;j++){
		demo.removeChild(aa[j]);
	}
	window.location.reload();
}
