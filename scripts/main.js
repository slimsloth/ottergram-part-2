var DETAIL_IMAGE_SELECTOR = '[data-image-role=\"target\"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role=\"title\"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role=\"trigger\"]';

function setDetails() {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', 'img/otter3.jpg');

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = 'You Should Be Dancing';
}