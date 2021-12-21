/* global data */
/* exported data */
function imageGenerator(event) {
  $setImageURL.setAttribute('src', event.target.value);
}
var $setImageURL = document.querySelector('#url-value');
var $entryInputDetection = document.querySelector('#url');
$entryInputDetection.addEventListener('blur', imageGenerator);
