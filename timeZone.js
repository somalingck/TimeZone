
const apiKey = `f6372ba6e2b94cd6b258df60b222b37c`;
const form = document.getElementById("address-time-zone-form");

    let timeZone = document.getElementById("p1");
    let lati = document.getElementById("p2");
    let longi = document.getElementById("p3");
    let std = document.getElementById("p4");
    let stdSec = document.getElementById("p5");
    let dst = document.getElementById("p6");
    let dstSec = document.getElementById("p7");
    let count = document.getElementById("p8");
    let post = document.getElementById("p9");
    let cityi = document.getElementById("p10");

    let timeZonep = document.getElementById("pp1");
    let latip = document.getElementById("pp2");
    let longip = document.getElementById("pp3");
    let stdp = document.getElementById("pp4");
    let stdSecp = document.getElementById("pp5");
    let dstp = document.getElementById("pp6");
    let dstSecp = document.getElementById("pp7");
    let countp = document.getElementById("pp8");
    let postp = document.getElementById("pp9");
    let cityip = document.getElementById("pp10");


let nameOfTimeZone;
let lat;
let long;
let offsetSTD;
let offsetSTDSeconds;
let offsetDST;
let offsetDSTSeconds;
let country;
let postcode;
let city;

function latLongFinder() {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                resolve({ lat, long })
            })
        } else {
            reject("Geolocation is not supported by this browser.")
        }
    })
}

latLongFinder()
    .then((data) => {
        lati.innerText = data.lat;
        longi.innerText = data.long;
        return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${data.lat}&lon=${data.long}&format=json&apiKey=${apiKey}`)
    }).then((fetechedData) => {
        return fetechedData.json();
    }).then((timeZone) => {
        return timeZone.results
    }).then((obj) => {

        nameOfTimeZone = obj[0].timezone.name;
        offsetSTD = obj[0].timezone.offset_STD;
        offsetDSTSeconds = obj[0].timezone.offset_STD_seconds;
        offsetDST = obj[0].timezone.offset_DST;
        offsetSTDSeconds = obj[0].timezone.offset_DST_seconds
        city = obj[0].city
        country = obj[0].country
        postcode = obj[0].postcode

        
        timeZone.innerText = `${nameOfTimeZone}`;
        std.innerText = `${offsetSTD}`;
        dst.innerText = `${offsetDST}`;
        stdSec.innerText = `${offsetSTDSeconds}`;
        dstSec.innerText = `${offsetDSTSeconds}`;
        count.innerText = `${country}`;
        post.innerText = `${postcode}`;
        cityi.innerText = `${city}`;



    }).catch(err => {
        alert(err)
    })

function timzeZoneByAddress(address) {
    return fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`)
}

function formHandler(e) {
    e.preventDefault();
    const address = form["address"].value;
    if (!address) {
    } else {
        timzeZoneByAddress(address)
            .then(res => res.json())
            .then((data) => {
                console.log(data.features)



                timeZonep.innerText = `${data.features[0].properties.timezone.name}`;
                latip.innerText = `${data.features[0].properties.lat}`;
                longip.innerText = `${data.features[0].properties.lon}`;
                stdp.innerText = `${data.features[0].properties.timezone.offset_STD}`;
                dstp.innerText = `${data.features[0].properties.timezone.offset_DST}`;
                stdSecp.innerText = `${data.features[0].properties.timezone.offset_STD_seconds}`;
                dstSecp.innerText = `${data.features[0].properties.timezone.offset_DST_seconds}`;
                countp.innerText = `${data.features[0].properties.country}`;
                postp.innerText = `${data.features[0].properties.country.postcode}`;
                cityip.innerText = `${data.features[0].properties.city}`;

            }).catch((err)=>{
               alert(`Something went wrong ${err}`)
            })
    }

}

form.addEventListener("submit", formHandler)




 