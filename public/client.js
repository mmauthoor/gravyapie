function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -37.8304177, lng: 144.964172 },
    zoom: 13,
  });
}


let map;

const url = "http://localhost:8080/api/stations/all"
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



  // let p = document.createElement("p")
  // p.textContent = res.data.toString()
  // document.body.appendChild(p)






