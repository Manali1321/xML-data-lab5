const jsdom = require("jsdom");
const { JSDOM } = jsdom;
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
  return xml.querySelectorAll("Placemark");
}
module.exports = {
  loadLibrary,
  loadName
};