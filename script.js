(function () {
  var fallback = new Object();
  fallback.url = 'http://apod.nasa.gov/apod/image/1408/m57_nasagendler_3000.jpg';
  fallback.text = 'Head to http://apod.nasa.gov/ for more great astronomy pictures';

  var apod = 'https://astronomy-pic-of-the-day.herokuapp.com/api.json',
      picture, 
      info;

  function parseAPOD(url) {
    $.ajax({
      url : url,
      dataType: 'json',
      success: function(data) {
        parseData(data);
      },
      error: function() {
        setData(fallback.url, fallback.text);
      }
    });
  }

  function parseData(data) {
    if (data) {
      picture = data.url;
      info = data.text;
    }
    setData(picture, info);
  }

  function setData(picture, info) {
    var now, formattedDate, months;
    $("#background").attr("src", picture);
    $('.info').html(info);

    // set date
    now = new Date();
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    formattedDate = months[now.getMonth()] + ' ' + now.getDate();
    $('.date').html(formattedDate); 
  }

  function displayInfo() {
    $('.info-icon').click( function() {
        $('.info').slideToggle('slow');
      }
    );  
  }

  function init() {
    
      parseAPOD(apod);
      $( document ).ready(function() {
        displayInfo();
      });
  }

  if (document.location.pathname === '/apod.html') {
    init();
  }
})();