const moey = document.querySelector('#spotlight-moey')
const brendon = document.querySelector('#spotlight-brendon')
const moya = document.querySelector('#spotlight-moya')
const nicky = document.querySelector('#latitude-value')
const john = document.querySelector('#longitude-value')
const harry = document.querySelector('#address-value')
const mappy = document.querySelector('#grid-map')

let currentRandom;

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
  nicky.textContent = mapCenter.lat;
  john.textContent = mapCenter.lng; 
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
          // icon: stationIcon(station)
        });
      })
    })
}

function stationIcon(station) {
  if(station.owner ==='BP') {

  } else if (station.owner === 'Shell') {

  } else if(station.owner === '7-Eleven Pty Ltd') {

  } else if(station.owner === 'Independent Fuel Supplies') {
    
  } else if(station.owner === 'Horizon') {
    
  } else if(station.owner === 'Ampol') {
    
  } else if(station.owner === 'Atlas Fuels Pty Ltd') {
    
  } else if(station.owner === 'Caltex') {
    
  }
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

function handleMoey() {
  let url = "http://localhost:8080/api/stations/random"
  axios.get(url).then(res => {
    brendon.textContent = res.data.name
    moya.textContent = res.data.owner
    currentRandom = res.data
  })
  
}
//reusable function - to handle current location section
function handleCurrentLocation(latitude,longitude,address) {
  nicky.textContent = latitude
  john.textContent = longitude
  harry.textContent = address
}

function handleBrendon() {
  handleCurrentLocation(currentRandom["latitude"], currentRandom["longitude"], currentRandom["street_address"])
}

function handleLatLong() {
  john.textContent = map.getCenter().lng();
  nicky.textContent = map.getCenter().lat();
}

moey.addEventListener('click', handleMoey)
brendon.addEventListener('click', handleBrendon)
mappy.addEventListener('mouseup', handleLatLong)
mappy.addEventListener('mousedown', handleLatLong)