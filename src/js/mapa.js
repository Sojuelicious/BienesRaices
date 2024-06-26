;(function () {
  const lat = document.querySelector('#latitud').value || 14.6397057
  const lng = document.querySelector('#longitud').value || -91.2295308
  const mapa = L.map('mapa').setView([lat, lng], 16)
  let marker

  //Utilizar Geocoder y Provider
  const geocodeService = L.esri.Geocoding.geocodeService()

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
    //console.log(posicion)

    mapa.panTo(new L.latLng(posicion.lat, posicion.lng))

    //Obtener informacion de las calles
    geocodeService
      .reverse()
      .latlng(posicion, 16)
      .run(function (error, resultado) {
        console.log(resultado)
        marker.bindPopup(resultado.address.LongLabel)

        //LLenar los campos
        document.querySelector('.calle').textContent =
          resultado?.address.LongLabel ?? ''

        document.querySelector('#calle').value =
          resultado?.address.LongLabel ?? ''

        document.querySelector('#latitud').value = resultado?.latlng.lat ?? ''

        document.querySelector('#longitud').value = resultado?.latlng.lng ?? ''
      })
  })
})()
