const ZwiftAccount = require('zwift-mobile-api');
const Result = require('./results');
const account = new ZwiftAccount("__username__", "__password__");
const event = account.getEvent();
const posts = require('./posts');

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
/*
function getSubResults(subResultId) {
    return event.segmentResults(subResultId);
}
*/

const options = {
    eventStartsAfter: new Date(2018, 2, 7, 5, 33, 0).getTime(),
    eventStartsBefore: new Date(2018, 2, 7, 5, 38, 0).getTime()
};

event.search(options).then(races => {
    //console.log(races[0]);
    const raceId = races[0].id;
    const raceName = races[0].name;
    const subGroups = races[0].eventSubgroups;
    const results = new Result();

    results.getResults(subGroups).then(raceResults => {
        //console.log(raceResults);
        // let j = 0;
        // for (let i = 0; i < raceResults.length; i++) {
        //     console.log(`${j}. ${raceResults[i].firstName} ${raceResults[i].lastName} - ${msToTime(raceResults[i].elapsedMs)} | ${(raceResults[i].power / (raceResults[i].weight / 1000)).toFixed(2)}`);
        //     j++;
        // }
        posts.postResults(raceId, raceName, raceResults);
    }).catch(function(err) {
        console.log("ERROR: ", err);
    });
    
});

/*
let segResults = [];
let raceResults = [];

event.search(options).then (results => {
    const subGroups = results[0].eventSubgroups;    
    for (let i = 0; i < subGroups.length; i++) {
        segResults.push(getSubResults(subGroups[i].id));
    }
}).then(() => {
    Promise.all(segResults).then(subGroupResults => {
        for (let i = 0; i < subGroupResults.length; i++) {
            for (let j = 0; j < subGroupResults[i].length; j++) {
                raceResults.push(subGroupResults[i][j]);
            }
        }

        raceResults.sort((a, b) => {
            if (a.elapsedMs > b.elapsedMs) {
                return 1;
            }
            else if (a.elapsedMs === b.elapsedMs) {
                return 0;
            }
            return -1;
        });

        let j = 1;
        for (let i = 0; i < raceResults.length; i++) {
            //if (i === 0) { console.log(raceResults[i]); }
            if (raceResults[i].powermeter) {
                console.log(`${j}. ${raceResults[i].firstName} ${raceResults[i].lastName} - ${msToTime(raceResults[i].elapsedMs)} | ${(raceResults[i].power / (raceResults[i].weight / 1000)).toFixed(2)}`);
                j++;
            }
        }
    }).catch(function (err) {
        console.log("ERROR: ", err) ;
    });
}).catch(function (err) {
    console.log("ERROR: ", err);
});
*/



