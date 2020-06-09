var GraphicClass;

class MapPin {
  constructor (input) {
    this.attributes = input.attributes
    this.location = input.location
  }

  get Graphic () {
    return new GraphicClass({
      attributes: this.attributes,
      geometry: this.location,
      symbol: {
        type: "simple-marker",
        color: "#000000",
        size: this.size,
        outline: {
          color: "#ffffff",
          width: "2px"
        }

      },
      popupTemplate: {
        title: "{PlaceName}",
        content: "{Place_addr}"
      }
    })
  }

  get size () {
    return "12px"
  }
}

class MapItems {
  constructor (view, Graphic) {
    this.allMyPins = new Set()
    this.view = view
    GraphicClass = Graphic
  }

  addPins (newPins) {
    newPins.forEach(aPin => {
      this.allMyPins.add(new MapPin(aPin))
    })
    this.updateView()
  }

  updateView () {
    // Clear the map
    this.view.popup.close();
    this.view.graphics.removeAll();
    // Add graphics
    this.allMyPins.forEach(aPin => {
      this.view.graphics.add(aPin.Graphic)
    })
  }
}
