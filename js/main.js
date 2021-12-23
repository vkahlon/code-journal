/* global data */
/* exported data */

function imageGenerator(event) {
  $setImageURL.setAttribute('src', event.target.value);
}

function retrieveEntryInfo(event) {
  var entryInfo = {};
  event.preventDefault();
  var titleValue = $getInfoFromSubmission.elements.title.value;
  var urlValue = $getInfoFromSubmission.elements.url.value;
  var messageValue = $getInfoFromSubmission.elements.message.value;
  entryInfo.title = titleValue;
  entryInfo.url = urlValue;
  entryInfo.message = messageValue;
  entryInfo.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entryInfo);
  displayInSessionEntry(entryInfo);
  $setImageURL.setAttribute('src', 'images/placeholder-image-square.jpg');
  $getInfoFromSubmission.reset();
  $selectParagraph.classList.add('hidden');
  switchViews('entries');
}

var $setImageURL = document.querySelector('#url-value');
var $entryInputDetection = document.querySelector('#photoURL');
$entryInputDetection.addEventListener('blur', imageGenerator);

var $getInfoFromSubmission = document.querySelector('#get-entry-form');
$getInfoFromSubmission.addEventListener('submit', retrieveEntryInfo);

function createEntryTree(entry) {
  var createLiElement = document.createElement('li');
  createLiElement.setAttribute('class', 'row');
  createLiElement.setAttribute('data-view', entry.entryID);

  var createDivElement = document.createElement('div');
  createDivElement.setAttribute('class', 'column-half img-view-entry');
  createLiElement.appendChild(createDivElement);

  var createImgElement = document.createElement('img');
  createImgElement.setAttribute('src', entry.url);
  createDivElement.appendChild(createImgElement);

  var createDivTwoElement = document.createElement('div');
  createDivTwoElement.setAttribute('class', 'column-half');
  createLiElement.appendChild(createDivTwoElement);

  var createHeadingElement = document.createElement('span');
  createHeadingElement.setAttribute('class', 'view-text-entry');
  createHeadingElement.textContent = entry.title;
  createDivTwoElement.appendChild(createHeadingElement);

  var createEditIcon = document.createElement('i');
  createEditIcon.setAttribute('class', 'fas fa-pencil-alt');
  createDivTwoElement.appendChild(createEditIcon);

  var createParagraphElement = document.createElement('p');
  createParagraphElement.setAttribute('class', 'view-note-entry');
  createParagraphElement.textContent = entry.message;
  createDivTwoElement.appendChild(createParagraphElement);
  return createLiElement;
}
function displayInSessionEntry(object) {
  var $theGrandDivInSession = document.querySelector('ul');
  var sessionEntry = createEntryTree(object);
  $theGrandDivInSession.prepend(sessionEntry);
}
window.addEventListener('DOMContentLoaded', createTheJournal);
function createTheJournal(event) {
  if (data.entries.length !== 0) {
    $selectParagraph.classList.add('hidden');
  }
  for (var i = 0; i < data.entries.length; i++) {
    var $theGrandDiv = document.querySelector('.entry-render');
    var newEntry = createEntryTree(data.entries[i]);
    $theGrandDiv.appendChild(newEntry);
  }
}
// Hiding and activating when hitting new entry//
function goBackToHomePage(event) {
  switchViews('entries');
}
function goToEntryPage(event) {
  switchViews('entry-form');

}
function switchViews(view) {
  for (var index = 0; index < $views.length; index++) {
    if ($views[index].getAttribute('data-view') === view) {
      $views[index].classList.remove('hidden');
    } else {
      $views[index].classList.add('hidden');
    }
  }
}
// var $selectEntries = document.querySelectorAll('li[data-view]');
var $selectParagraph = document.querySelector('.paragraph-intro');
var $views = document.querySelectorAll('.view-container');
var $newButtonSelector = document.querySelector('.button-new-entry');
var $newBackToHomePage = document.querySelector('.view-entry-only-page');
$newButtonSelector.addEventListener('click', goToEntryPage);
$newBackToHomePage.addEventListener('click', goBackToHomePage);
