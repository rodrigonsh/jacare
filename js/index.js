/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var score = 0;
var level = 0;

var precisao_direcao = "direita";
var precisao_tempo = 4500;

var mudaPrecisao = false;

var intervaloPrecisao = 0;
var intervaloNivel = 0;

function mudaNivel(){	

	//console.log("mudaNivel: invocou...");

	if(precisao_tempo > 500){
		
		// atualiza e seta o texto do level
		level++;
		$("#lvl span").html(level);
		
		// enfileirar a mudança de velocidade da precisao
		if (precisao_tempo < 4500) mudaPrecisao = true;		
		
		precisao_tempo -= 500; 
		
		//console.log("mudaNivel:", level, precisao_tempo);

		// resetar o timer
		$("#timer").animate({height: 300}, 0);
		$("#timer").animate({height: 0}, 20000, 'linear');
		
		}
		
		//else //console.log("mudaPrecisao: não vai mudar precisao");
		
	}
	


function movePrecisao(){

	if (mudaPrecisao == true){
	
		mudaPrecisao = false;
		
		//console.log(intervaloPrecisao, "movePrecisao: matando timeout e resetando...");
	
		// matar timeout
		window.clearInterval(intervaloPrecisao);
		
		// setar novo intervalo pa precisao
		intervaloPrecisao = window.setInterval(movePrecisao, precisao_tempo);		
		
		}
		
	if (precisao_direcao == "direita"){
		precisao_direcao = "esquerda";
		$("#precisao").animate({left: 600}, precisao_tempo);
		//console.log(intervaloPrecisao, "movePrecisao: mover para direita", precisao_tempo);
		}
		
	else{
		precisao_direcao = "direita";
		$("#precisao").animate({left: 0}, precisao_tempo);
		//console.log(intervaloPrecisao, "movePrecisao: mover para esquerda", precisao_tempo);
		}	
	}

function clica(){

	// verificar posicao da precisao
	var pos = $("#precisao").position();
	
	// se a precisao for aceitável ... mudar para cena 2
	if (pos.left > 250 && pos.left < 350){
	
		score++;
		//seta o texto do score
		$("#score span").html(score);
		
		PGLowLatencyAudio.loop('bicada');
		
		$("#palco").addClass("bicando");
		
		window.setTimeout(function(){
			$("#palco").removeClass("bicando");
			}, 500);
	
		}
	
	// caso contrario cena 3
	else{
		
		PGLowLatencyAudio.loop('gameover');
		
		$("#palco").addClass("morto");
				
		window.setTimeout(function(){
			alert("Game Over!");
			location.reload();
			}, 1000)
		
		
		}

	};
 
var app = {
    // Application Constructor
    initialize: function() {
    	
    		PGLowLatencyAudio.preloadAudio('bicada', 'bicada.mp3', 1);
    		PGLowLatencyAudio.preloadAudio('gameover', 'gameover.mp3', 1);
    		PGLowLatencyAudio.preloadAudio('pantanal', 'pantanal2.mp3', 1);
	
		PGLowLatencyAudio.loop('pantanal');
	
        	mudaNivel();
		movePrecisao();
		
		$("#acao").click(clica);
		$("#fecha").click(function(ev){ navigator.app.exitApp() });

		intervaloPrecisao = window.setInterval(movePrecisao, precisao_tempo);
		intervaloNivel = window.setInterval(mudaNivel, 20000);
		
		
	
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        //console.log("Device ready")
        
    },
    
};
