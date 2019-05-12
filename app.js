const map = L.map('map').setView([39.8333333, -98.585522], 4);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map)

let checkboxStates
let selectedYear

var markers = L.markerClusterGroup()

var geoJsonLayer = L.geoJson(null, {
    filter: (feature) => {
        const thisYear = selectedYear.value.includes(feature.properties.Year)

        const thisTeam = checkboxStates.teamNames.includes(feature.properties.TeamName)
        const thisPosition = checkboxStates.positions.includes(feature.properties.Position)
        return thisYear && thisTeam && thisPosition
    },
    onEachFeature: function (feature, layer) {
//        if (feature.properties.Position == "QB") {
//            feature.properties.Position = "Quarterback"
//        }

        layer.bindPopup("<span class='firstName'>" + feature.properties.FirstName + " </span>" + "<span class='lastName'>" + feature.properties.LastName + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='uniformNumber'>" + feature.properties.UniformNumber + "</span>" + "<br />" + "<span class='teamName'>" + feature.properties.TeamName + "</span>" + "<br />" + "<span class='playerPosition'>" + feature.properties.Position + "</span>" + "<br />" + "<span class='playerHeight'>" + feature.properties.Height + "</span>" + " in" + "<br />" + "<span class='playerWeight'>" + feature.properties.Weight + "</span>" + " lbs" + "<br />" + "<span class='lastSchool'>" + feature.properties.LastSchool + "</span>")
    }
});

function updateCheckboxStates() {
    checkboxStates = {
        teamNames: [],
        positions: []

    }

    selectedYear = document.getElementById("Year")

    for (let input of document.querySelectorAll('input:checked')) {
        checkboxStates.teamNames.push(input.value)
        checkboxStates.positions.push(input.value)
    }

    console.log(selectedYear.value)
    console.log(checkboxStates.teamNames)

    geoJsonLayer.addData(geoJsonData)
    markers.addLayer(geoJsonLayer)
    map.addLayer(markers)
}


for (let input of document.querySelectorAll('input')) {
    //Listen to 'change' event of all inputs
    input.onchange = (e) => {
        geoJsonLayer.clearLayers()
        markers.clearLayers()
        updateCheckboxStates()
        geoJsonLayer.addData(geoJsonData)
    }
}


/****** INIT ******/
updateCheckboxStates()
