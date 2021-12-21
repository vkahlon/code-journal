/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
window.addEventListener('beforeunload', retrieveData);
var previousEntriesJSON = localStorage.getItem('total-entries');
if (previousEntriesJSON != null) {
  data.entries = JSON.parse(previousEntriesJSON);
}
function retrieveData(event) {
  var entriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('total-entries', entriesJSON);
}
