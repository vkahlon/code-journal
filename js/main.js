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
  var createDivElement = document.createElement('div');
  createDivElement.setAttribute('class', 'row');

  var createLiElement = document.createElement('li');
  createLiElement.setAttribute('class', 'column-half img-view-entry');
  createDivElement.appendChild(createLiElement);

  var createImgElement = document.createElement('img');
  createImgElement.setAttribute('src', entry.url);
  createLiElement.appendChild(createImgElement);

  var createSecondLiElement = document.createElement('li');
  createSecondLiElement.setAttribute('class', 'column-half');
  createDivElement.appendChild(createSecondLiElement);

  var createHeadingELement = document.createElement('h2');
  createHeadingELement.setAttribute('class', 'view-text-entry');
  createHeadingELement.textContent = entry.title;
  createSecondLiElement.appendChild(createHeadingELement);

  var createParagraphElement = document.createElement('p');
  createParagraphElement.setAttribute('class', 'view-note-entry');
  createParagraphElement.textContent = entry.message;
  createSecondLiElement.appendChild(createParagraphElement);
  return createDivElement;
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
// var $selectEntries = document.querySelectorAll('div[data-view]');
var $selectParagraph = document.querySelector('.paragraph-intro');
var $views = document.querySelectorAll('.view-container');
var $newButtonSelector = document.querySelector('.button-new-entry');
var $newBackToHomePage = document.querySelector('.view-entry-only-page');
$newButtonSelector.addEventListener('click', goToEntryPage);
$newBackToHomePage.addEventListener('click', goBackToHomePage);
