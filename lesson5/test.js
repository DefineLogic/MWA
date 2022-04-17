//  "use strict"

asdf = 4;

[1, 2, 3].map(i => setTimeout(() => console.log(i), 400), 1000)


let myPromise = new Promise(function(myResolve, myReject) {
    let x = 0;

    // some code (try to change x to 5)

    if (x == 0) {
        myResolve("OK");
    } else {
        myReject("Error");
    }
});