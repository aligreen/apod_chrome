$(document).ready(function() {

  var API_URL = 'https://astronomy-pic-of-the-day.herokuapp.com/api.json',
      FALLBACK_PICTURE_URI = 'images/fallback.jpg',
      FALLBACK_PICTURE_TEXT = 'It is a familiar sight to sky enthusiasts with even a small telescope.  There is much more to the <a href="http://en.wikipedia.org/wiki/Ring_nebula">Ring Nebula (M57)</a>, however, than can be seen through a <a href="http://cl.jroo.me/z3/j/I/f/e/a.baa-Dog-watching-through-a-teles.jpg">small telescope</a>.  The easily visible <a href="http://antwrp.gsfc.nasa.gov/apod/image/0303/m57ring_hst_big.jpg">central ring</a> is about one <a href="http://chandra.harvard.edu/photo/cosmic_distance.html">light-year</a> across, but <a href="http://www.robgendlerastropics.com/M57-HST-LBT.html">this remarkably deep exposure</a> - a collaborative effort combining data from three different large telescopes - <a href="http://arxiv.org/abs/astro-ph/0401056">explores</a> the looping filaments of glowing gas extending much farther from the nebula\'s <a href="http://hubblesite.org/newscenter/archive/releases/1997/ 38/background/">central star</a>.  This remarkable <a href="http://www.robgendlerastropics.com/M57-HST-LBT.html">composite image</a> includes narrowband hydrogen image, visible light emission, and <a href="http://missionscience.nasa.gov/ems/07_infraredwaves.html">infrared light</a> emission.  Of course, in this <a href="http://www.caha.es/the-ring-nebula.html">well-studied example</a> of a <a href="http://www.noao.edu/jacoby/">planetary nebula</a>, the glowing material does not come from planets.  Instead, the <a href="ap030614.html">gaseous shroud</a> represents outer layers expelled from a dying, sun-like star.  The <a href="https://www.youtube.com/watch?v=OiYRL3HFULU">Ring Nebula</a> is about 2,000 light-years away toward the musical <a href="http://www.hawastsoc.org/deepsky/lyr/index.html">constellation Lyra</a>.  ',
      FALLBACK_TITLE = 'Rings Around the Ring Nebula',
      fallback = { url: FALLBACK_PICTURE_URI, explanation: FALLBACK_PICTURE_TEXT, title: FALLBACK_TITLE };
      is_military = false;

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
    $('.info-icon').click(function() { $('.info-container').slideToggle('fast'); });
  }

  /**
  @function showExplanationOnClick
  **/
  function showCreditOnClick() {
    $('.credit-icon').click(function() { $('.credit').slideToggle('fast'); });
  }

  /**
  @funtion displayTime
  **/
  function displayTime() {
    var time;

    if(is_military) {
      time = moment().format("HH:mm:ss");
    } else {
      time = moment().format("h:mm:ss");
    }
    $('.time').html(time);

    $('.time').on('click', function() {
        if(!is_military) {
          time = moment().format("HH:mm:ss");
          is_military = true;
        } else {
          time = moment().format("h:mm:ss");
          is_military = false;
        }

        $('.time').html(time);
    });

  }

  /**
  @function render
  @param String imageSrc
  @param String explanation
  @param String title
  **/
  function render(imageSrc, explanation, title) {
    var now, date;

    $("#background").attr("src", imageSrc);
    $('.title').html(title);
    $('.info').html(explanation);

    // set date
    date = moment().format("MMM Do");
    $('.date').html(date);

    showExplanationOnClick();
    showCreditOnClick();

    setInterval(function() {
      displayTime();
    }, 1000);
  }

  /**
  @function init
  **/
  function init() {
    var success = function (data) { render(data.url, data.explanation, data.title) },
        failure = function (data) { render(fallback.url, fallback.explanation, fallback.title) };

    getLatestApod(API_URL, success, failure);
  }

  init();
});
