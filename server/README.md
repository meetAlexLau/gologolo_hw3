query {
  logo(id:"") {
    _id
    text
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
  }
}

query {
  logos {
    _id
    text
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
  } 
}

mutation{
  addLogo(
    text: ""
    color: "#"
    fontSize: 0
    backgroundColor: "#"
    borderColor: "#"
    borderRadius: 0
    borderWidth: 0
    padding: 0
    margin: 0
  ) {
    lastUpdate
  }
}

mutation{
  updateLogo(
    id: ""
    text: ""
    color: "#"
    fontSize: 0
    backgroundColor: "#"
    borderColor: "#"
    borderRadius: 0
    borderWidth: 0
    padding: 0
    margin: 0
  ) {
    lastUpdate
  }
}
mutation {
  removeLogo(id: "") {
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
  }
}