var apod = 'https://astronomy-pic-of-the-day.herokuapp.com/api.json';
var picture, 
    info;

function parseAPOD(url) {
  $.ajax({
    url : url,
    dataType: 'json',
    success: function(data) {
      parseData(data);
    }
  });
}

function parseData(data) {
  if (data) {
    picture = data.url;
    info = data.text;
  } else {
    picture = fallback.url;
    info = fallback.text;
  }
  setData(picture, info);
}

function setData(picture, info) {
  $("#background").attr("src", picture);
  $('.info').html(info);
}

parseAPOD(apod);