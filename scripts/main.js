var DETAIL_IMAGE_SELECTOR = '[data-image-role=\"target\"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role=\"title\"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role=\"trigger\"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var DETAIL_IMAGE_BUTTON_BACK = '[data-image-role=\"prev\"]';
var DETAIL_IMAGE_BUTTON_NEXT = '[data-image-role=\"next\"]';

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHander() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function nextPicture() {
    'use strict';
    var target = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var thumbnails = getThumbnailsArray();
    for (var i = 0; i < thumbnails.length; i++) {
        if (target.getAttribute('src') === imageFromThumb(thumbnails[i])) {
            var x = (i + 1) % thumbnails.length;
            setDetailsFromThumb(thumbnails[x]);
            showDetails();
            break;
        }
    }

}

function backPicture() {
    'use strict';
    var target = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var thumbnails = getThumbnailsArray();
    for (var i = 0; i < thumbnails.length; i++) {
        if (target.getAttribute('src') === imageFromThumb(thumbnails[i])) {
            var x;
            if (i === 0) {
                x = thumbnails.length - 1;
            } else {
                x = i - 1;
            }
            setDetailsFromThumb(thumbnails[x]);
            showDetails();
        }
    }
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    var nextButton = document.querySelector(DETAIL_IMAGE_BUTTON_NEXT);
    nextButton.addEventListener('click', function (event) {
        event.preventDefault();
        nextPicture();
    });
    var backButton = document.querySelector(DETAIL_IMAGE_BUTTON_BACK);
    backButton.addEventListener('click', function (event) {
        event.preventDefault();
        backPicture();
    });
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHander();
}

initializeEvents();