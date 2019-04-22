


function traer() {
   
   var nickname = document.getElementById("nickname").value
   var region = document.getElementById("region").value

   
   fetch('https://'+region+'.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+nickname+'?api_key=RGAPI-0cc5f89a-b29f-46c0-9eab-42d4f5e43386')
   .then(res => res.json())
   .then(data => {

   	 var contenido = document.querySelector('#contenido')
     console.log(data)
     contenido.innerHTML = `
	 <img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${data.profileIconId}.png" width="100px" class="img-fluid rounded-circle">
     <p>Nombre: ${data.name} </p>
     <p>Nivel : ${data.summonerLevel} </p>`

     var accountId = data.accountId

   	 fetch('https://'+region+'.api.riotgames.com/lol/match/v4/matchlists/by-account/'+accountId+'?api_key=RGAPI-0cc5f89a-b29f-46c0-9eab-42d4f5e43386')
     .then(res => res.json())
     .then(data => {

   	   var contenido = document.querySelector('#partidas')
       console.log(data)

       tabla(data.matches)
     
   	})
    
   })


   function tabla(datos){
		console.log(datos)
		var partidas = document.querySelector('#partidas')
		partidas.innerHTML = ``
		for(let valor of datos){
			console.log(valor)

			var gameId = valor.gameId
			

		   	 fetch('https://'+region+'.api.riotgames.com/lol/match/v4/matches/'+gameId+'?api_key=RGAPI-0cc5f89a-b29f-46c0-9eab-42d4f5e43386')
		     .then(res => res.json())
		     .then(data => {

		     	getchamp(data.participants['0'].championId)

		     	partidas.innerHTML += `
				  <tr>
	              	<td>${data.participants['0'].championId}</td>
	              	<td>${data.participants['0'].stats.kills}/${data.participants['0'].stats.deaths}/${data.participants['0'].stats.assists}</td>
	              	<td>
						${data.participants['0'].stats.item0},
			            ${data.participants['0'].stats.item1},
			            ${data.participants['0'].stats.item2},
						${data.participants['0'].stats.item3},
			            ${data.participants['0'].stats.item4},
			            ${data.participants['0'].stats.item5},
			            ${data.participants['0'].stats.item6}
	              	</td>
	              </tr>` 


		     
		   	})


		}

		document.getElementById('tablaPartidas').style.display = 'inline'

   }

   function getchamp(ID){

   		fetch('json/champion.json')
		     .then(res => res.text())
		     .then(data => {
		     	var myJSON = data
		     	var myObj = JSON.parse(myJSON)
		     	console.log(myObj)


		     
		   	})


   }


      
}