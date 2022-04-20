// navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.log(err));
const fetch = require('node-fetch')

const whereAmI = async function(country) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
        // const res = await fetch(`https://restcountries.com/v3.1/name/nepal`)
        // console.log(res)
    const data = await res.json();
    console.log(data)
}
whereAmI('nepal');
console.log('FIRST');

// fetch("https://api.github.com/users").then(res => res.json()).then(res => console.log(res))

// import fetch from 'node-fetch';

// const response = await fetch('https://api.github.com/users/github');
// const data = await response.json();

// console.log(data);