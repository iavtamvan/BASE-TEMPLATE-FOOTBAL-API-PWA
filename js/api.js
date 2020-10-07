var base_url = "https://api.football-data.org/v2/";
const API_KEY = 'b1b29540ead5420d84ed9e801f4596cb';
const LEAGUE_ID = 2015
var standings_url = `${base_url}competitions/${LEAGUE_ID}/standings?standingType=TOTAL`
var matches_url = `${base_url}competitions/${LEAGUE_ID}/matches`
var teams_url = `${base_url}competitions/${LEAGUE_ID}/teams`
var matchesData;
var teamsData;

function fetchApi(url) {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  });
}

function status(response) {
	if (response.status !== 200) {
		console.log("Error : " + response.status);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

function json(response) {
	return response.json();
}

function error(error) {
	console.log("Error : " + error);
}

function loading() {
  var html = ` 
    <div>
      <img src="/img/loading.gif"/>
    </div>`
  document.getElementById("loading").innerHTML = html;
  document.getElementById("title-content").innerHTML = '';
  document.getElementById("main-content").innerHTML = '';
}

function hideload() {
  document.getElementById("loading").innerHTML = '';
}

function getStandings() {
  loading();
	if ('caches' in window) {
		caches.match(standings_url).then(function(response) {
			if (response) {
				response.json().then(function(data) {
    			var html = ''
    			data.standings.forEach(function(standing) {
      			var detail = ''
      			standing.table.forEach(function(result) {
        			detail += `
                <tr>
            			<td>${result.position}</td>
            			<td>${result.team.name}</td>
            			<td>${result.playedGames}</td>
            			<td>${result.won}</td>
            			<td>${result.draw}</td>
            			<td>${result.lost}</td>
            			<td>${result.points}</td>
            			<td>${result.goalsFor}</td>
            			<td>${result.goalsAgainst}</td>
            			<td>${result.goalDifference}</td>
          			</tr>
              `
            });
      			html += `
      				<div style="text-align: center">
       					<h5 class="header">${standing.group}</h5>
       				</div>
        			<div class="col s12 m12">
        				<div class="card">
    	    				<div class="card-content">
	    	   					<table class="responsive-table striped">
       								<head>
	      								<tr>
           								<th>Position</th>
            							<th>Team</th>
            							<th>Played</th>
            							<th>Won</th>
           								<th>Draw</th>
           								<th>Lost</th>
           								<th>Points</th>
           								<th>GF</th>
           								<th>GA</th>
            							<th>GD</th>
          							</tr>
        							</head>
        							<body>` + detail + `</body>
        						</table>
        					</div>
       					</div>
       				</div>
       			`
    			});
          document.getElementById("title-content").innerHTML = 'Liga Perancis';
          document.getElementById("main-content").innerHTML = html;
          hideload();
  			});
			}
		});
	}
	fetchApi(standings_url)
	.then(status)
	.then(json)
	.then(function(data) {
    var html = ''
   	data.standings.forEach(function(standing) {
      var detail = ''
    	standing.table.forEach(function(result) {
     		detail += `
          <tr>
            <td>${result.position}</td>
            <td>${result.team.name}</td>
            <td>${result.playedGames}</td>
            <td>${result.won}</td>
            <td>${result.draw}</td>
            <td>${result.lost}</td>
            <td>${result.points}</td>
            <td>${result.goalsFor}</td>
            <td>${result.goalsAgainst}</td>
            <td>${result.goalDifference}</td>
          </tr>
        `
      });
      html += `
      	<div style="text-align: center">
       		<h5 class="header">${standing.stage} and ${standing.type}</h5>
       	</div>
        <div class="col s12 m12">
	        <div class="card">
        		<div class="card-content">
       				<table class="responsive-table striped">
       					<head>
	      					<tr>
           					<th>Position</th>
            				<th>Team</th>
            				<th>Played</th>
            				<th>Won</th>
           					<th>Draw</th>
           					<th>Lost</th>
           					<th>Points</th>
           					<th>GF</th>
           					<th>GA</th>
            				<th>GD</th>
          				</tr>
        				</head>
        				<body>` + detail + `</body>
        			</table>
        		</div>
       		</div>
       	</div>
      `
    });
    document.getElementById("title-content").innerHTML = 'Liga Perancis';
    document.getElementById("main-content").innerHTML = html;
    hideload();
  })
	.catch(error);
}

function getMatches() {

}

function getTeams() {

}

// Membuka akses database
var dbPromise = idb.open("football", 1, function(upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('matches', {'keyPath': 'id'})
      upgradeDb.createObjectStore('teams', {'keyPath': 'id'})
  }
})

// Favorit Matches
function favoriteMatches() {

}

// Favorit Teams
function favoriteTeams() {

}

// Insert Matches
function insertMatches(match) {

}

function insertMatch(matchId) {

}

// Delete Matches
function deleteMatches(matchId) {

}

function deleteMatch(matchId) {

}

// Insert Teams
function insertTeams(team) {

}

function insertTeam(teamId) {

}

// Delete Teams
function deleteTeams(teamId) {

}

function deleteTeam (teamId) {

}
function showNotifikasiSederhana() {
    const title = 'Notifikasi Sederhana';
    const options = {
        'body': 'Ini adalah konten notifikasi. \nBisa menggunakan baris baru.',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}