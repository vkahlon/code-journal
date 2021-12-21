/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
window.addEventListener('beforeunload', retrieveData);
var previousEntriesJSON = localStorage.getItem('total-entries');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}
function retrieveData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('total-entries', dataJSON);
}
