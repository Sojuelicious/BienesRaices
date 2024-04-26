;(function () {
  const lat = 14.6397057
  const lng = -91.2295308
  const mapa = L.map('mapa').setView([lat, lng], 16)
  let marker

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa)

  //PIN
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true
  }).addTo(mapa)

  //Detectar el movimiento del pin
  marker.on('moveend', function (e) {
    marker = e.target

    const posicion = marker.getLatLng()
    console.log(posicion)

    mapa.panTo(new L.latLng(posicion.lat, posicion.lng))
  })
})()
