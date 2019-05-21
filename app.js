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

        layer.bindPopup("<span class='firstName'>" + feature.properties.FirstName + " </span>" + "<span class='lastName'>" + feature.properties.LastName + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "<div class='uniformNumber-box'><span class='uniformNumber'>" + feature.properties.UniformNumber + "</span></div>" + "<br />" + "<span class='teamName'>" + feature.properties.TeamName + "</span>" + "<br />" + "<span class='playerPosition'>" + feature.properties.Position + "</span>" + "<br />" + "<span class='playerHeight'>" + feature.properties.Height + "</span>" + " in" + "<br />" + "<span class='playerWeight'>" + feature.properties.Weight + "</span>" + " lbs" + "<br />" + "<span class='lastSchool'>" + feature.properties.LastSchool + "</span>")
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

//var clicked = false;
//
//$("input[type=checkbox]").click(function () {
//    if (clicked == false) {
//        $(this).parent("label").parent("div").css("background-color", "rgba(107, 107, 107)");
//        $(this).parent("label").parent("div").css("border-color", "rgba(107, 107, 107)");
//        $(this).parent("label").parent("div").css("color", "#000000");
//        return clicked = true;
//    } else {
//        $(this).parent("label").parent("div").css("background-color", "#000000");
//        $(this).parent("label").parent("div").css("color", "rgba(107, 107, 107)");
//        return clicked = false;
//    }
//});

//var clicked = false;
//
//$("input[type=checkbox]").click(function () {
//    if (clicked == false) {
//        $(this).sibling("span").css("color", "rgba(107, 107, 107, 1)");
//        clicked = true;
//    } else {
//        $(this).sibling("span").css("color", "rgba(255, 237, 77, 1)");
//        clicked = false;
//    }
//})

$("input[type=checkbox]").change(function () {
    var textChange = this.checked ? 'rgba(0, 0, 0, 1' : 'rgba(107, 107, 107, 1)';
    var backgroundChange = this.checked ? 'rgba(107, 107, 107, 1)' : 'rgba(0, 0, 0, 1)';
    $(this).parent("label").css('color', textChange);
    $(this).parent("label").parent("div").css('background-color', backgroundChange);
});
