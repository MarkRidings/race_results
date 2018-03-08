var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./results.db');

function getResultPostString(raceId, raceResults) {
    let postString = 'INSERT OR REPLACE INTO race_results VALUES ';
    for (let i = 0; i < raceResults.length; i++) {
        if (i !== 0) {
            postString += ", ";
        }
        postString += `(${raceId}, ${raceResults[i].id}, "${raceResults[i].firstName}", "${raceResults[i].lastName}", ${raceResults[i].elapsedMs}, ${raceResults[i].power}, ${raceResults[i].weight})`;
    }
    postString += ";";

    return postString;
}

function postResults(raceId, raceName, raceResults) {
    //console.log(raceResults);
    db.serialize(function() {
        const postRace = db.prepare(`INSERT OR REPLACE INTO race VALUES (${raceId}, "${raceName}");`); 
        postRace.run();
        postRace.finalize();
    });

    db.serialize(function() {
        const resultPostString = getResultPostString(raceId, raceResults);
        console.log(resultPostString);
        const postResults = db.prepare(resultPostString);
        postResults.run();
        postResults.finalize();
    });

    db.close();
}

module.exports = {
    postResults: postResults
};

