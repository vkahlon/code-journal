/* global data */
/* exported data */
function imageGenerator(event) {
  $setImageURL.setAttribute('src', event.target.value);
}

function retrieveEntryInfo(event) {
  event.preventDefault();
  if (data.editing === null) {
    var entryInfo = {};
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
    $selectParagraph.classList.add('hidden');
  } else {
    var editEntryInfo = {};
    var editedTitleValue = $getInfoFromSubmission.elements.title.value;
    var editedUrlValue = $getInfoFromSubmission.elements.url.value;
    var editedMessageValue = $getInfoFromSubmission.elements.message.value;
    var grabTheEntryValue = data.editing;
    editEntryInfo.title = editedTitleValue;
    editEntryInfo.url = editedUrlValue;
    editEntryInfo.message = editedMessageValue;
    editEntryInfo.entryID = grabTheEntryValue;
    var $selectEntries = document.querySelectorAll('li');
    var createReplacementObject = createEntryTree(editEntryInfo);
    for (var index = 0; index < data.entries.length; index++) {
      var convertEntrytoString = String(grabTheEntryValue);
      var retrieveCorrectList = $selectEntries[index].getAttribute('data-view');
      if (convertEntrytoString === retrieveCorrectList) {
        $selectEntries[index].replaceWith(createReplacementObject);
        data.entries[index] = editEntryInfo;
      }
    }
    data.editing = null;
  }
  resetFormToDefault();
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

  var createDedicatedFormatDiv = document.createElement('div');
  createDedicatedFormatDiv.setAttribute('class', 'row edit-icon-wrapper');
  createDivTwoElement.appendChild(createDedicatedFormatDiv);

  var createHeadingElement = document.createElement('span');
  createHeadingElement.setAttribute('class', 'view-text-entry');
  createHeadingElement.textContent = entry.title;
  createDedicatedFormatDiv.appendChild(createHeadingElement);

  var createEditIcon = document.createElement('i');
  createEditIcon.setAttribute('class', 'fas fa-pencil-alt');
  createDedicatedFormatDiv.appendChild(createEditIcon);

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
function goBackToHomePage(event) {
  resetFormToDefault();
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
// For Editing
function clickEntry(event) {
  var $selectEntries = document.querySelectorAll('li');
  if (event.target.tagName === 'I') {
    var $closestIdiom = event.target.closest('LI');
    $closestIdiom = $closestIdiom.getAttribute('data-view');
    for (var i = 0; i < data.entries.length; i++) {
      var retrieveCorrectList = $selectEntries[i].getAttribute('data-view');
      if (retrieveCorrectList === $closestIdiom) {
        var editObject = data.entries[i];
        editEntry(editObject);
        switchViews('entry-form');
      }
    }
  }
}
function editEntry(object) {
  $modifyHeader.textContent = 'Edit Entry';
  $setImageURL.setAttribute('src', object.url);
  $modTitle.setAttribute('value', object.title);
  $modURL.setAttribute('value', object.url);
  $modParagraph.textContent = object.message;
  data.editing = object.entryID;
  $activateDelete.textContent = 'Delete Entry';
}
function omitEntryWindow(event) {
  modalPopup(true);
}
function cancelChoice(event) {
  modalPopup(false);
}
function deleteChoice(event) {
  var $selectEntries = document.querySelectorAll('li');
  var whichEntry = data.editing;
  if (whichEntry !== null) {
    for (var index = 0; index < data.entries.length; index++) {
      var convertDeleteEntryToString = String(whichEntry);
      var retrieveCorrectList = $selectEntries[index].getAttribute('data-view');
      if (convertDeleteEntryToString === retrieveCorrectList) {
        $selectEntries[index].remove();
        data.entries.splice(index, 1);
        data.editing = null;
      }
    }
  }
  modalPopup(false);
  switchViews('entries');
}

function modalPopup(view) {
  if (view === true) {
    $theChoice.classList.remove('hidden');
  } else {
    $theChoice.classList.add('hidden');
  }
}

function resetFormToDefault(event) {
  $setImageURL.setAttribute('src', 'images/placeholder-image-square.jpg');
  $modifyHeader.textContent = 'New Entry';
  $modTitle.setAttribute('value', '');
  $modURL.setAttribute('value', '');
  $modParagraph.textContent = '';
  $activateDelete.textContent = '';
}

var $awaitClicks = document.querySelector('ul');
$awaitClicks.addEventListener('click', clickEntry);
var $selectParagraph = document.querySelector('.paragraph-intro');
var $views = document.querySelectorAll('.view-container');
var $newButtonSelector = document.querySelector('.button-new-entry');
var $newBackToHomePage = document.querySelector('.view-entry-only-page');
$newButtonSelector.addEventListener('click', goToEntryPage);
$newBackToHomePage.addEventListener('click', goBackToHomePage);

var $modifyHeader = document.querySelector('.new-text-entry');
var $modTitle = document.querySelector('#entry-title');
var $modURL = document.querySelector('#photoURL');
var $modParagraph = document.querySelector('#message');
var $activateDelete = document.querySelector('.delete-anchor');
$activateDelete.addEventListener('click', omitEntryWindow);

var $theChoice = document.querySelector('.the-choice');
var $cancelChoice = document.querySelector('.cancel');
$cancelChoice.addEventListener('click', cancelChoice);
var $deleteChoice = document.querySelector('.confirm');
$deleteChoice.addEventListener('click', deleteChoice);
