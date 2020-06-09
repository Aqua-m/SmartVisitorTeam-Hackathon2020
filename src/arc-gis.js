require([
    "esri/Map",
    "esri/views/MapView",
    "esri/tasks/Locator",
    "esri/Graphic"
  ], function(Map, MapView, Locator, Graphic) {

    var map = new Map({
    // basemap: "topo-vector"
    basemap: "osm"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [172.6362, -43.5321], // longitude, latitude
    zoom: 13
  });

  var places = ["POI"];

  var locator = new Locator({
    url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  });

  var mapItems = new MapItems(view, Graphic)

  // Find places and add them to the map
  function findPlaces(pt) {
    locator.addressToLocations({
      location: pt,
      categories: places,
      maxLocations: 50,
      outFields: ["Place_addr", "PlaceName"]
    })
    .then(function(results) {
      mapItems.addPins(results)
    });
  }

  // Search for places in center of map when the app loads
  findPlaces(view.center);

  // Listen for mouse clicks and find places
  view.on("click", function(event){
    view.hitTest(event.screenPoint)
      .then(function(response){
        if (response.results.length < 2) { // If graphic is not clicked, find places
          findPlaces(event.mapPoint);
        }
    })
  });
});