(function () {

  var container = document.getElementById('container');

  var Transition = React.addons.CSSTransitionGroup;

  var getApodData = function () {
    return {
      explanation: " \n\n\u003ca href=\"http://www.nasa.gov/content/goddard/%0Aone-giant-sunspot-6-substantial-flares/\"\u003eSolar active region AR2192\u003c/a\u003e\nwas the largest recorded sunspot group of the last 24 years.\n\nBefore rotating off the\n\u003ca href=\"http://apod.nasa.gov/apod/ap141025.html\"\u003eEarth-facing side\u003c/a\u003e of the Sun at the end of\nOctober, it \u003ca href=\"http://www.nasa.gov/content/goddard/%0Asunspot-ar2192-flare-family-portrait/\"\u003eproduced a whopping\u003c/a\u003e\nsix energetic X-class flares.\n\nIts most intense flare was captured on October 24 in this\nstunning view from the orbiting\n\u003ca href=\"http://sdo.gsfc.nasa.gov/\"\u003eSolar Dynamics Observatory\u003c/a\u003e.\n\nThe scene is a\n\u003ca href=\"http://www.nasa.gov/mission_pages/sunearth/news/%0Alight-wavelengths.html\"\u003ecolor combination\u003c/a\u003e of\nimages made at three different wavelengths of\nextreme ultraviolet light;\n193 angstroms shown in blue, 171 angstroms in white, and 304 angstroms\nin red.\n\nThe emission, from highly ionized Iron and Helium atoms, traces\nmagnetic field lines looping through the hot\n\u003ca href=\"http://en.wikipedia.org/wiki/Plasma_%28physics%29\"\u003eplasma\u003c/a\u003e\nof the Sun's outer\n\u003ca href=\"http://solarscience.msfc.nasa.gov/chromos.shtml\"\u003echromosphere\u003c/a\u003e\nand corona.\n\nBeneath, the cooler solar photosphere appears dark at extreme ultraviolet\nwavelengths.\n\nThe exceptionally sharp composite image has been processed\nwith a new mathematical algorithm\n(\u003ca href=\"http://www.zam.fme.vutbr.cz/~druck/Nafe/Index.htm\"\u003eNAFE\u003c/a\u003e)\nthat adapts to noise and brightness in extreme ultraviolet\nimage data to reliably enhance small details.\n\n",
      title: "Solar Flare from a Sharper Sun",
      imageSrc: "http://apod.nasa.gov/apod/image/1411/SDO_AIA-2014_10_24-21_42UT1024.jpg"
    }
  }

  var imageSrc = getApodData().imageSrc;
  var explanation = getApodData().explanation;
  var title = getApodData().title;

  var Apod = React.createClass({

    getInitialState: function () {
      return {
        showCredit: false,
        showInfo: false,
        militaryTime: false
      }
    },

    render: function () {
      var info, credit, infoClasses, creditClasses;

      infoClasses = React.addons.classSet({
        'info-container': true,
        'show-info': this.state.showInfo
      });

      creditClasses = React.addons.classSet({
        'credit': true,
        'show-credit': this.state.showCredit
      });

      return(
        <div>
          <img id="background" src={this.props.imageSrc} />
          <h1>
            <a href="http://apod.nasa.gov">Astronomy Picture of the Day</a>
          </h1>

          <div className="info-icon" onClick={this.showInfo}>?</div>
          <div className={infoClasses}>
            <div className="info-wrapper">
              <div className="title" dangerouslySetInnerHTML={{ __html: this.props.title}} />
              <div className="info" dangerouslySetInnerHTML={{ __html: this.props.explanation}} />
            </div>
          </div>

          <div className="credit-icon" onClick={this.showCredit}>i</div>
          <div className="credit-container">
            <div className={creditClasses}>
              All images are from <a href="http://apod.nasa.gov/">APOD</a>. Extension made by <a href="http://twitter.com/ohohbot">Ali</a> and <a href="http://twitter.com/flahertyb">Bart</a> for fun.
            </div>
          </div>

        </div>
      );
    },

    showInfo: function () {
      this.setState({showInfo: !this.state.showInfo});
    },

    showCredit: function () {
      this.setState({showCredit: !this.state.showCredit});
    }
  });

  React.render(
    <Apod imageSrc={imageSrc} explanation={explanation} title={title} />,
    container
  );

}());
