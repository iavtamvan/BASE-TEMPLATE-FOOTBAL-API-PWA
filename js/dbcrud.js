var matchesData;
var teamsData;

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