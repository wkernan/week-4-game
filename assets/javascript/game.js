
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
			ctrAtkPower: 20,
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

	function makePlayers() {
		for(var i=0; i<players.length; i++) {
			var img = $('<img>').addClass('players img-circle').attr({id: players[i].name, src: players[i].pic, "data-hlth": players[i].health, "data-atk": players[i].atkPower, "data-ctratk": players[i].ctrAtkPower});
			var hlth = $('<div>').addClass('progress-bar progress-bar-success').attr({"role":'progressbar', "aria-valuenow": '40', "aria-valuemin": '0', "aria-valuemax": players[i].health, "style": 'width: 100%'}).text(players[i].health);
			var divHlth = $('<div>').addClass('progress').append(hlth);
			var p = $('<p>').text(players[i].name);
			var rowDiv = $('<div>');
			rowDiv.addClass('inline pick text-center col-md-3 col-xs-6').append(img).append(divHlth).append(p);
			$('#choosePlayer').append(rowDiv);
		};
	};
	makePlayers();

	$('body').on('click', '.pick', function() {
		$(this).children('.players').css('border', '5px solid #449D44');
		$(this).removeClass('pick col-md-3 col-xs-6').addClass('player');
		$(this).siblings().children('.players').css('border', '5px solid #F0AD4E');
		$(this).siblings().removeClass('pick col-md-3 col-xs-6').addClass('enemy').detach().appendTo('#enemies');
		$(this).detach().appendTo('#character');
		$('.character').removeClass('hide');
		$('.enemies').removeClass('hide');
		$('.defender').removeClass('hide');
		$('#select').addClass('hide');
		playHlth = parseInt($('.player').children('.players').attr('data-hlth'));
		playAtk = parseInt($('.player').children('.players').attr('data-atk'));
		heroAtk = playAtk;
	});

	$('body').on('click', '.enemy', function() {
		$('.attack').removeClass('hide');
		if($.trim($("#defender").html())=='') {
			$('#struck').text('Ready... Fight!');
			$(this).children('.players').css('border', '5px solid #C9302C')
			$(this).removeClass('enemy').addClass('defender');
			$(this).detach().appendTo('#defender');
			defHlth = parseInt($('.defender').children('.players').attr('data-hlth'));
			defCtrAtk = parseInt($('.defender').children('.players').attr('data-ctratk'));
			defName = $('.defender').children('.players').attr('id');
		}
	});

	$('body').on('click', '.strike', function() {
		if(playHlth > 0 && $.trim($("#defender").html()) !='') {
			defMaxHlth = parseInt($('#defender').find('.progress-bar').attr('aria-valuemax'));
			defHlth = parseInt(defHlth) - parseInt(heroAtk);
			playMaxHlth = parseInt($('.player').find('.progress-bar').attr('aria-valuemax'));
			playHlth = parseInt(playHlth) - parseInt(defCtrAtk);
			$('.player').find('.progress-bar').text(playHlth);
			$('.player').find('.progress-bar').css('width', playHlth/playMaxHlth*100 + '%');
			$('.defender').find('.progress-bar').css('width', defHlth/defMaxHlth*100 + '%');
			$('.defender').find('.progress-bar').text(defHlth);
			$('#struck').text('You were counterattacked by ' + defName + ' for ' + defCtrAtk);
			$('#hit').text('You attack ' + defName + ' for ' + heroAtk);
			heroAtk += parseInt(playAtk);
			if(playHlth/playMaxHlth*100 < 50) {
				$('.player').find('.progress-bar').removeClass('progress-bar-success').addClass('progress-bar-warning');
			}
			if(playHlth/playMaxHlth*100 < 20) {
				$('.player').find('.progress-bar').removeClass('progress-bar-warning').addClass('progress-bar-danger');
			}
			if(defHlth/defMaxHlth*100 < 50) {
				$('.defender').find('.progress-bar').removeClass('progress-bar-success').addClass('progress-bar-warning');
			}
			if(defHlth/defMaxHlth*100 < 20) {
				$('.defender').find('.progress-bar').removeClass('progress-bar-warning').addClass('progress-bar-danger');
			}
			if(defHlth <= 0) {
				$('#struck').text('You defeated ' + defName);
				$('#hit').text('');
				$('#defender').empty();
			}
			if(playHlth <= 0) {
				playHlth = 0;
				$('.player').find('.progress-bar').text(playHlth);
				alert('You Lose');
				$('.reset').removeClass('hide');
			}
		}
		console.log(heroAtk);
		console.log(playHlth);
		console.log(defHlth);
		if($.trim($("#enemies").html())=='' && $.trim($("#defender").html()) =='') {
			alert('You Win');
			$('.reset').removeClass('hide');
		}
	});

	$('body').on('click', '.redo', function() {
		$('#struck').text('');
		$('#hit').text('');
		$('#character').empty();	
		$('#defender').empty();
		$('#select').removeClass('hide');
		$('.attack').addClass('hide');
		$('.character').addClass('hide');
		$('.enemies').addClass('hide');
		$('.defender').addClass('hide');
		$('.reset').addClass('hide');
		makePlayers();
	});

});

	