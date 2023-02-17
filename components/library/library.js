const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const libraryNS = "http://www.opengis.net/kml/2.2";
var xml;
async function loadLibrary() {
  if (xml == undefined) {
    // url
    let response = await fetch("https://www.torontopubliclibrary.ca/data/library-data.kml",
      {
        method: "get",
        headers: {
          "content-type": "application/xml"
        }
      });
    // convert kml string to kml DOM document
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    // console.log(data);
    // set the kml to dom document which we can query using dom methods
    xml = data.window.document;
  }
  return xml;
}
async function loadName() {
  xml = await loadLibrary();
  var placemarks = xml.querySelectorAll("Placemark");
  return placemarks
}
// async function getLibraryID(id) {
//   xml = await loadLibrary();
//   let result = xml.evaluate(
//     `//Placemark/text()='${id}'`, kml, libraryNS, 2, null);
//   return result.interateNext();
// }


module.exports = {
  loadLibrary,
  loadName,
  // getLibraryID
};
