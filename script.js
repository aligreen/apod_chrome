$(document).ready(function() {

  var API_URL = 'https://astronomy-pic-of-the-day.herokuapp.com/api.json',
      FALLBACK_PICTURE_URI = 'images/fallback.png',
      FALLBACK_PICTURE_TEXT = 'Head to http://apod.nasa.gov/ for more great astronomy pictures',
      fallback = { url: FALLBACK_PICTURE_URI, text: FALLBACK_PICTURE_TEXT };

  /**
  @function getLatestApod
  @param String apiUrl
  @param Function callback
  **/
  function getLatestApod(apiUrl, callback, failureCallback) {
    $.ajax({
      url : apiUrl,
      dataType: 'json',
      success: callback,
      failure: failureCallback
    });
  }

  /**
  @function showExplanationOnClick
  **/
  function showExplanationOnClick() {
    $('.info-icon').click(function() { $('.info').slideToggle('fast'); });
  }

  /**
  @function render
  @param String imageSrc
  @param String explanation
  **/
  function render(imageSrc, explanation) {
    var now, date, time;
    var military = false;

    $("#background").attr("src", imageSrc);
    $('.info').html(explanation);

    // set date
    date = moment().format("MMM Do");
    $('.date').html(date);

    time = moment().format("h:mm:ss");
    $('.time').html(time);

    $('.time').on('click', function() {
        if(!military) {
          time = moment().format("HH:mm:ss");
          $('.time').html(time);
          military = true;
        } else {
          time = moment().format("h:mm:ss");
          $('.time').html(time);
          military = false;
        }
    });

    showExplanationOnClick();
  }

  /**
  @function init
  **/
  function init() {
    var success = function (data) { render(data.url, data.text) },
        failure = function (data) { render(fallback.url, fallback.text) };

    getLatestApod(API_URL, success, failure);
  }

  init();
});
