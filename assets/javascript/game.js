
$(document).ready(function() {

	var playHlth;
	var defHlth;
	var playAtk;
	var defCtrAtk;
	var heroAtk;
	var defName = "";

	var players = [
		{
			id: "first",
			name: "Bill Kernan",
			health: 100,
			atkPower: 10,
			ctrAtkPower: 15,
			pic: 'https://secure.gravatar.com/avatar/ee340231d2d8c8c380070273506065c3.jpg?s=512d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0008-72.png'
		},

		{
			id: "second",
			name: "Jamie MacWilliams",
			health: 130,
			atkPower: 10,
			ctrAtkPower: 8,
			pic: '../assets/images/jamie.jpg'	
		},

		{
			id: "third",
			name: "Josh Madewell",
			health: 160,
			atkPower: 6,
			ctrAtkPower: 8,
			pic: 'https://secure.gravatar.com/avatar/4090f8251ba508c6db1a1bd5c8ec20c3.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0021-512.png'	
		},

		{
			id: "fourth",
			name: "Roger Le",
			health: 190,
			atkPower: 4,
			ctrAtkPower: 12,
			pic: 'https://secure.gravatar.com/avatar/5edbb37e96d66ce7510435a8291701a1.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0025-512.png'	
		},

	];

	for(var i=0; i<players.length; i++) {
		var img = $('<img>').addClass('players img-circle').attr({id: players[i].name, src: players[i].pic, "data-hlth": players[i].health, "data-atk": players[i].atkPower, "data-ctratk": players[i].ctrAtkPower});
		var hlth = $('<div>').addClass('progress-bar progress-bar-success').attr({"role":'progressbar', "aria-valuenow": '40', "aria-valuemin": '0', "aria-valuemax": '100', "style": 'width: 100%'}).text(players[i].health);
		var divHlth = $('<div>').addClass('progress').append(hlth);
		var p = $('<p>').text(players[i].name);
		var li = $('<li>');
		li.addClass('inline pick text-center').append(img).append(divHlth).append(p);
		$('#choosePlayer').append(li);
	};

	$('body').on('click', '.pick', function() {
		$(this).children('.players').css('border', '5px solid green');
		$(this).removeClass('pick').addClass('player');
		$(this).siblings().children('.players').css('border', '5px solid red');
		$(this).siblings().removeClass('pick').addClass('enemy').detach().appendTo('#enemies');
		$(this).detach().appendTo('#character');
		$('.character').removeClass('hide');
		$('.enemies').removeClass('hide');
		$('.defender').removeClass('hide');
		$('#select').empty();
		playHlth = parseInt($('.player').children('.players').attr('data-hlth'));
		playAtk = parseInt($('.player').children('.players').attr('data-atk'));
		heroAtk = playAtk;
	});

	$('body').on('click', '.enemy', function() {
		$('.attack').removeClass('hide');
		if($.trim($("#defender").html())=='') {
			$(this).removeClass('enemy').addClass('defender');
			$(this).detach().appendTo('#defender');
			defHlth = parseInt($('.defender').children('.players').attr('data-hlth'));
			defCtrAtk = parseInt($('.defender').children('.players').attr('data-ctratk'));
			defName = $('.defender').children('.players').attr('id');
		}
	});

	$('body').on('click', '.btn', function() {
		if(playHlth > 0 && $.trim($("#defender").html()) !='') {
			console.log('works');
			defHlth = parseInt(defHlth) - parseInt(heroAtk);
			playHlth = parseInt(playHlth) - parseInt(defCtrAtk);
			$('.player').find('.progress-bar').text(playHlth);
			$('.defender').find('.progress-bar').text(defHlth);
			$('#struck').text('You were counterattacked by ' + defName + ' for ' + defCtrAtk);
			$('#hit').text('You attack ' + defName + ' for ' + heroAtk);
			heroAtk += parseInt(playAtk);
			if(defHlth <= 0) {
				$('#defender').empty();
			}
			if(playHlth <= 0) {
				playHlth = 0;
				$('.player').find('.progress-bar').text(playHlth);
				alert('You Lose');
			}
		}
		console.log(heroAtk);
		console.log(playHlth);
		console.log(defHlth);
		if($.trim($("#enemies").html())=='' && $.trim($("#defender").html()) =='') {
			alert('You Win');
		}
	});

	/*$('#Camper1').on('click', function() {
		console.log('1');
		var a = $('<button>').addClass('btn btn-default pic character').attr({"data-hlth": players[0].health, "data-atk": players[0].atkPower}).text(players[0].name);
		var b = $('<button>').addClass('btn btn-default pic enemy').text(players[1].name);
		var c = $('<button>').addClass('btn btn-default pic enemy').text(players[2].name);
		var d = $('<button>').addClass('btn btn-default pic enemy').text(players[3].name);
		var e = $('<li>').addClass('inline').attr('id', players[1].id).append(b);
		var f = $('<li>').addClass('inline').attr('id', players[2].id).append(c);
		var g = $('<li>').addClass('inline').attr('id', players[3].id).append(d);
		$('#character').append(a);
		$('#enemies').append(e).append(f).append(g);
		$('#select').empty();
	})

	$('#Camper2').on('click', function() {
		console.log('2');
		var a = $('<button>').addClass('btn btn-default pic character').attr({"data-hlth": players[1].health, "data-atk": players[1].atkPower}).text(players[1].name);
		var b = $('<button>').addClass('btn btn-default pic enemy').attr('id', players[0].id).text(players[0].name);
		var c = $('<button>').addClass('btn btn-default pic enemy').attr('id', players[2].id).text(players[2].name);
		var d = $('<button>').addClass('btn btn-default pic enemy').attr('id', players[3].id).text(players[3].name);
		var e = $('<li>').addClass('inline').attr('id', players[0].id).append(b);
		var f = $('<li>').addClass('inline').attr('id', players[2].id).append(c);
		var g = $('<li>').addClass('inline').attr('id', players[3].id).append(d);
		$('#character').append(a);
		$('#enemies').append(e).append(f).append(g);
		$('#select').empty();
	})

	$('#Camper3').on('click', function() {
		console.log('3');
		var a = $('<button>').addClass('btn btn-default pic character').attr({"data-hlth": players[2].health, "data-atk": players[2].atkPower}).text(players[2].name);
		var b = $('<button>').addClass('btn btn-default pic enemy').attr('id', players[0].id).text(players[0].name);
		var c = $('<button>').addClass('btn btn-default pic enemy').attr('id', players[1].id).text(players[1].name);
		var d = $('<button>').addClass('btn btn-default pic enemy').attr('id', players[3].id).text(players[3].name);
		var e = $('<li>').addClass('inline').attr('id', players[0].id).append(b);
		var f = $('<li>').addClass('inline').attr('id', players[1].id).append(c);
		var g = $('<li>').addClass('inline').attr('id', players[3].id).append(d);
		$('#character').append(a);
		$('#enemies').append(e).append(f).append(g);
		$('#select').empty();
	})

	$('#Camper4').on('click', function() {
		console.log('1');
		var a = $('<button>').addClass('btn btn-default pic character').attr({"data-hlth": players[3].health, "data-atk": players[3].atkPower}).text(players[3].name);
		var b = $('<button>').addClass('btn btn-default pic enemy').attr('id', players[0].id).text(players[0].name);
		var c = $('<button>').addClass('btn btn-default pic enemy').attr('id', players[1].id).text(players[1].name);
		var d = $('<button>').addClass('btn btn-default pic enemy').attr('id', players[2].id).text(players[2].name);
		var e = $('<li>').addClass('inline').attr('id', players[0].id).append(b);
		var f = $('<li>').addClass('inline').attr('id', players[1].id).append(c);
		var g = $('<li>').addClass('inline').attr('id', players[2].id).append(d);
		$('#character').append(a);
		$('#enemies').append(e).append(f).append(g);
		$('#select').empty();
	})*/

	/*$('#enemies').on('click', 'li#first', function() {
		console.log('works');
		if($.trim($("#defender").html())=='') {
			var a = $('<button>').addClass('btn btn-default pic defender').text(players[0].name);
			$('#defender').append(a);
			$('#first').empty();
		}
	})

	$('#enemies').on('click', 'li#second', function() {
		console.log('works');
		if($.trim($("#defender").html())=='') {
			var a = $('<button>').addClass('btn btn-default pic defender').text(players[1].name);
			$('#defender').append(a);
			$('#second').empty();
		}
	})

	$('#enemies').on('click', 'li#third', function() {
		console.log('works');
		if($.trim($("#defender").html())=='') {
			var a = $('<button>').addClass('btn btn-default pic defender').text(players[2].name);
			$('#defender').append(a);
			$('#third').empty();
		}
	})

	$('#enemies').on('click', 'li#fourth', function() {
		console.log('works');
		if($.trim($("#defender").html())=='') {
			var a = $('<button>').addClass('btn btn-default pic defender').text(players[3].name);
			$('#defender').append(a);
			$('#fourth').empty();
		}
	})*/


});

	