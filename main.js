// JavaScript Document

$(function(){
	"use strict";
	//coin counter
	var coinBlock=false;
	var cupBlock=false;
	var block=false;
	
	function isOperating(){
		if(coinBlock===false&&cupBlock===false){
			block=false;
			counter.displayRefresh();
		}
	}
	var counter = {
		value: 0.00,
		clear: function(){
			this.value=0.00;
			this.displayRefresh();
		},
		add: function(addval){
			if(this.value+addval<=10.00 && block===false){
				this.value+=parseFloat(addval);
				this.displayRefresh();
			}
		},
		displayRefresh: function(){
			var $display=$('#display');
			$display.text(this.value.toFixed(2));
		}
	};
	//coins
	var coin = {
		'5zl': {
			value: 5
		},
		'2zl': {
			value: 2
		},
		'1zl': {
			value: 1
		},
		'50gr': {
			value: 0.5
		},
		'20gr': {
			value: 0.2
		},
		'10gr': {
			value: 0.1
		}
	};
	// coins draggable
	$('.coin').draggable({
		cursor: 'pointer',
		helper: 'clone',
		start: function(event, ui){ui.helper.addClass("normal");}
	});
	// coin insert
	$('#coin-insert').droppable({
		accept: '.coin',
		tolerance: 'touch',
		drop: function(event, ui){
			var dragId=ui.draggable.attr("id");
			var dragVal=coin[dragId].value;
			counter.add(dragVal);
		}
	});
	//buttons
	var buttons = {
		button_1: 
		{
			price: 4.20
		},
		button_2: 
		{
			price: 5.50
		},
		button_3: 
		{
			price: 3.70
		}
	};
	
	$('.button').click(function(){
		var credit=counter.value;
		var btid=this.id;
		var price=buttons[btid].price;
		if(credit>=price&&block===false){
			counter.clear();
			drop.changeval=(credit-price).toPrecision(2);
			drop.start();
			block=true;
		}
	});
	//coin drop
	var drop = {
		changeval: 0,
		changeCoinsVal: [],
		//change algorithm
		change: function(){
			var val=this.changeval;
			var cointab=[5, 2, 1, 0.5, 0.2, 0.1];
			for(var q=0; q<cointab.length; q++){
				while(cointab[q]<=val){
					val=(val-cointab[q]).toPrecision(2);
					this.changeCoinsVal.push(cointab[q]);
				}
			}
			var rt=this.changeCoinsVal;
			this.changeCoinsVal=[];
			return rt;
			
		},
		//change giver
		start: function(){
			function findByVal(coinVal){
				var obj=Object.keys(coin);
				for(var q=0; q<obj.length; q++){
					if(coin[obj[q]].value===coinVal){
						return obj[q];
					}
				}
			}
			var changeCoins=[];
			for(var q=0; q<this.change().length;q++){
				changeCoins.push(findByVal(this.change()[q]));
			}
			function giveCoin(changeCoin){
				$(changeCoin).clone().prependTo('#coin-drop').animate({'top': '+=50px'}, 'slow').delay( 800 ).removeClass('ui-draggable ui-draggable-handle normal').addClass('dropped').css('margin-left', Math.floor((5*Math.random() * 5))+'px');
			}
			coinBlock=true;
			$('#display').text('-/-');
			dispenser.cup.down();
			
			for(q=0;q<changeCoins.length;q++){
				
				giveCoin('#'+changeCoins[q]);
			}
			
			$('#coin-drop-box').click(function(){$('.dropped').fadeOut('slow', function(){
				this.remove();
				isOperating();
			});
				coinBlock=false;
			});
		}
	};
	//dispenser
	var dispenser = {
		cup: {
			down: function() {
				$('#dispenser-box').append('<div id="cup-sprite"></div>');
				$('#cup-sprite').animate({'top': '+=155px'}, 'slow', function(){
					dispenser.fill();});
			}
			
		},
		fill: function(){
			cupBlock=true;
			$('#stream').show( "blind", {direction: "vertical"}, 1000);
			$('#cup-sprite').delay(400).addClass('sAnimate', function(){$('#stream').delay(4200).hide( "blind", {direction: "down"}, 1000, function(){
				$('#cup-active').show();
			});});
			$('#cup-active').click(function(){
				$('#cup-sprite').fadeOut('slow', function(){$(this).remove();});
				$('#cup-active').hide();
				cupBlock=false;
				isOperating();
			});
		}
	};
	
});