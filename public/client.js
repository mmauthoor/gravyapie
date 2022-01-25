const mapCenter = { 
  lat: -37.8304177, 
  lng: 144.964172 
};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: mapCenter,
    zoom: 13,
    minZoom: 11
  });
  initMarkers()
}

let map;

function initMarkers() {
  let url = "http://localhost:8080/api/stations/all"
  axios
    .get(url)
    .then(res => {
      let allStations = res.data.rows
      allStations.forEach(station => {
        let obj = {
          lat: station.latitude,
          lng: station.longitude
        }
        let owner = station.owner
        new google.maps.Marker({
          position: obj,
          map,
          title: owner,
        });
      })
    })
}

var gridLeftSide = document.querySelector('#grid-left-side')
var totalStations = document.querySelector('#total-stations')


function renderOwners() {
  let url = "/api/owners"

  axios
  .get(url)
  .then(res => {
    let owners = res.data
    let p = document.createElement("p")
    p.textContent = Object.values(owners).reduce((accum, num) => accum + num, 0)
    totalStations.after(p)
    Object.keys(owners).forEach(key => {
      let p = document.createElement("p")
      p.textContent = `${key} ${owners[key]}`
      gridLeftSide.appendChild(p)
    })
  });
}

renderOwners()

let latitudeValue = document.querySelector("#latitude-value");
let longitudeValue = document.querySelector("#longitude-value");
latitudeValue.textContent = mapCenter.lat;
longitudeValue.textContent = mapCenter.lng; 













