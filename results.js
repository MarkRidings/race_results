const ZwiftAccount = require('zwift-mobile-api');
const account = new ZwiftAccount("_username__", "__password__");
const event = account.getEvent();

function getSubResults(subResultId) {
    return event.segmentResults(subResultId);
}

class Result {
    
    getResults(subGroups) {
        let segResults = [];
        let raceResults = [];

        for (let i = 0; i < subGroups.length; i++) {
            segResults.push(getSubResults(subGroups[i].id));
        }

        return Promise.all(segResults).then(subGroupResults => {
            for (let i = 0; i < subGroupResults.length; i++) {
                for (let j = 0; j < subGroupResults[i].length; j++) {
                    if (subGroupResults[i][j].powermeter) {
                        raceResults.push(subGroupResults[i][j]);
                    }
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

            return raceResults;
        });
    }
}

module.exports = Result;