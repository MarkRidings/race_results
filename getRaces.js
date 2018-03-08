const ZwiftAccount = require('zwift-mobile-api');
const account = new ZwiftAccount("ridings.mark@gmail.com", "Acesfull1");

const events = account.getEvent();

const options = {
    eventStartsAfter: new Date(2018, 2, 7, 0, 0, 0).getTime(),
    eventStartsBefore: new Date(2018, 2, 7, 23, 59, 0).getTime()
};

events.search(options).then(races => {
    for (let i = 0; i < races.length; i++) {
        //if (i === 0) { console.log(races[i]); }
        if (races[i].eventType === 'RACE') {
            console.log(`${races[i].name} - ${races[i].eventStart}`);
        }
    }
    // console.log('---------');
    // for (let i = 0; i < races.length; i++) {
    //     //if (i === 0) { console.log(races[i]); }
    //     if (races[i].eventType !== 'RACE') {
    //         console.log(`${races[i].name} - ${races[i].eventStart}`);
    //     }
    // }
}).catch(function (err) {
    console.log("ERR: ", err);
});