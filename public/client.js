const moey = document.querySelector('#spotlight-moey')
const brendon = document.querySelector('#spotlight-brendon')
const moya = document.querySelector('#spotlight-moya')
const nicky = document.querySelector('#latitude-value')
const john = document.querySelector('#longitude-value')
const harry = document.querySelector('#address-value')
const mappy = document.querySelector('#grid-map')
const gridLeftSide = document.querySelector('#grid-left-side')
const totalStations = document.querySelector('#total-stations')

let currentRandom;

const mapCenter = { 
  lat: -37.8304177, 
  lng: 144.964172 
};

let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: mapCenter,
    zoom: 13,
    minZoom: 11
  });
  infoWindow = new google.maps.InfoWindow();

  //  Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        infoWindow.setPosition(pos);
        infoWindow.open(map);
        infoWindow.setContent("Location found.");
        map.setCenter(pos);
        handleLatLong()
        nicky.textContent = pos.lat;
        john.textContent = pos.lng;
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  initMarkers()
  nicky.textContent = mapCenter.lat;
  john.textContent = mapCenter.lng; 
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


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
          icon: stationIcon(station)
        });
      })
    })
}
//==================
function stationIcon(station) {
  if(station.owner ==='BP') {
    return "/icon/BP.png"
  } else if (station.owner === 'Shell') {
    return "/icon/Shell.png"
  } else if(station.owner === '7-Eleven Pty Ltd') {
    return "/icon/7-Eleven.png"
  } else if(station.owner === 'Independent Fuel Supplies') {
    return "/icon/Independent.png" 
  } else if(station.owner === 'Horizon') {
    return "/icon/Horizon.png"  
  } else if(station.owner === 'Ampol') {
    return "/icon/Ampol.png"  
  } else if(station.owner === 'Atlas Fuels Pty Ltd') {
    return "/icon/Atlas.png"
  } else if(station.owner === 'Caltex') {
    return "/icon/Caltex.png"  
  }
}
//==================

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

//==================
// Recommend renaming this function to 'setNearest5', or breaking down into smaller functions for separate purposes (e.g. handleLatLong and setNearest5). Could probably put some of the data gathering in an API route instead?  - Moya
function handleLatLong() {
  let lat = map.getCenter().lat()
  let lng = map.getCenter().lng();
  nicky.textContent = lat;
  john.textContent = lng;
  
  let url = "http://localhost:8080/api/stations/all"
  axios.get(url).then(res => {
    let allStations = res.data.rows
    
    allStations.forEach(station => {
      let mlat = station["latitude"];
      let mlng = station["longitude"];
      let dLat  = Math.PI/180*(mlat - lat);
      let dLong = Math.PI/180*(mlng - lng);
      let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(Math.PI/180*lat) * Math.cos(Math.PI/180*lat) * Math.sin(dLong/2) * Math.sin(dLong/2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let distance = 6371 * c;
      station["distance"] = distance
      if(station.owner ==='BP') {
        station["color"] = "yellowgreen"
      } else if (station.owner === 'Shell') {
        station["color"] = "coral"
      } else if(station.owner === '7-Eleven Pty Ltd') {
        station["color"] = "olivedrab"
      } else if(station.owner === 'Independent Fuel Supplies') {
        station["color"] = "lavender" 
      } else if(station.owner === 'Horizon') {
        station["color"] = "gold"  
      } else if(station.owner === 'Ampol') {
        station["color"] = "darkorange"  
      } else if(station.owner === 'Atlas Fuels Pty Ltd') {
        station["color"] = "mistyrose"
      } else if(station.owner === 'Caltex') {
        station["color"] = "steelblue"  
      }
    })
    
    allStations.sort( (a, b) => {
      if ( a.distance < b.distance ){
        return -1;
      } else if ( a.distance > b.distance ){
        return 1;
      } else{
        return 0;
      }
    })

    document.querySelector('.test').textContent = allStations[0].name + " (address:" + allStations[0].street_address + ")"
    document.querySelector('.test').style.backgroundColor = allStations[0].color
    document.querySelector('.test1').textContent = allStations[1].name + " (address:" + allStations[1].street_address + ")"
    document.querySelector('.test1').style.backgroundColor = allStations[1].color
    document.querySelector('.test2').textContent = allStations[2].name + " (address:" + allStations[2].street_address + ")"
    document.querySelector('.test2').style.backgroundColor = allStations[2].color
    document.querySelector('.test3').textContent = allStations[3].name + " (address:" + allStations[3].street_address + ")"
    document.querySelector('.test3').style.backgroundColor = allStations[3].color
    document.querySelector('.test4').textContent = allStations[4].name + " (address:" + allStations[4].street_address + ")"
    document.querySelector('.test4').style.backgroundColor = allStations[4].color
  })
}

//==================
moey.addEventListener('click', handleMoey)
brendon.addEventListener('click', handleBrendon)
mappy.addEventListener('mouseup', handleLatLong)

//==================
// mappy.addEventListener('mousedown', handleLatLong)
//==================