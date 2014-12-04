(function () {

  var FALLBACK_URI = '../images/fallback.jpg',
      FALLBACK_EXPLANATION = "It is a familiar sight to sky enthusiasts with even a small telescope.  There is much more to the <a href='http://en.wikipedia.org/wiki/Ring_nebula'>Ring Nebula (M57)</a>, however, than can be seen through a <a href='http://cl.jroo.me/z3/j/I/f/e/a.baa-Dog-watching-through-a-teles.jpg'>small telescope</a>.  The easily visible <a href='http://antwrp.gsfc.nasa.gov/apod/image/0303/m57ring_hst_big.jpg'>central ring</a> is about one <a href='http://chandra.harvard.edu/photo/cosmic_distance.html'>light-year</a> across, but <a href='http://www.robgendlerastropics.com/M57-HST-LBT.html'>this remarkably deep exposure</a> - a collaborative effort combining data from three different large telescopes - <a href='http://arxiv.org/abs/astro-ph/0401056'>explores</a> the looping filaments of glowing gas extending much farther from the nebula\'s <a href='http://hubblesite.org/newscenter/archive/releases/1997/ 38/background/'>central star</a>.  This remarkable <a href='http://www.robgendlerastropics.com/M57-HST-LBT.html'>composite image</a> includes narrowband hydrogen image, visible light emission, and <a href='http://missionscience.nasa.gov/ems/07_infraredwaves.html'>infrared light</a> emission.  Of course, in this <a href='http://www.caha.es/the-ring-nebula.html'>well-studied example</a> of a <a href='http://www.noao.edu/jacoby/'>planetary nebula</a>, the glowing material does not come from planets.  Instead, the <a href='ap030614.html'>gaseous shroud</a> represents outer layers expelled from a dying, sun-like star.  The <a href='https://www.youtube.com/watch?v=OiYRL3HFULU'>Ring Nebula</a> is about 2,000 light-years away toward the musical <a href='http://www.hawastsoc.org/deepsky/lyr/index.html'>constellation Lyra</a>. ",
      FALLBACK_TITLE = 'Rings Around the Ring Nebula';

  var Apod = React.createClass({

    getDefaultProps: function () {
      return {
        imageSrc: FALLBACK_URI,
        title: FALLBACK_TITLE,
        explanation: FALLBACK_EXPLANATION,
        stretchImage: true,
        showSettings: true,
        militaryTime: false
      }
    },

    getInitialState: function () {
      return {
        showCredit: false,
        showInfo: false,
        time: moment()
      }
    },

    render: function () {
      var infoClasses, creditClasses, settingsClasses, date, timeFormat, formattedTime;

      infoClasses = React.addons.classSet({
        'info-container': true,
        'show-info': this.state.showInfo
      });

      creditClasses = React.addons.classSet({
        'credit': true,
        'show-credit': this.state.showCredit
      });

      settingsClasses = React.addons.classSet({
        'settings': true,
        'show-settings': this.props.showSettings
      });

      imageClasses = React.addons.classSet({
        'stretch': this.props.stretchImage,
        'center': !this.props.stretchImage
      });

      if (this.props.stretchImage) {
        imageClasses = 'stretch'
        stretchInput = <input id="stretch" name="view" type="radio" onClick={this.stretchImage} checked />;
        centerInput = <input id="center" name="view" type="radio" onClick={this.centerImage} />;
      }
      else {
        imageClasses = 'center'
        stretchInput = <input id="stretch" name="view" type="radio" onClick={this.stretchImage} />;
        centerInput = <input id="center" name="view" type="radio" onClick={this.centerImage} checked />;
      }

      timeFormat = this.props.militaryTime ? 'HH:mm:ss' : 'h:mm:ss';
      formattedTime = this.state.time.format(timeFormat);
      date = this.state.time.format('MMM D');

      return(
        <div>
          <img ref="apodImage" id='background' src={this.props.imageSrc} className={imageClasses}/>
          <div id='gradient-overlay' />

          <div className='settings-container'>
            <div className='settings-icon' onClick={this.showSettings}>S</div>
            <div className={settingsClasses}>
              <div className="switch-toggle switch-candy settings-switch">
                {stretchInput}
                <label htmlFor="stretch" onclick="">Stretch</label>
                {centerInput}
                <label htmlFor="center" onclick="">Center</label>
                <a></a>
              </div>
            </div>
          </div>

          <h1>
            <a href='http://apod.nasa.gov'>Astronomy Picture of the Day</a>
          </h1>

          <div className='info-icon' onClick={this.showInfo}>?</div>
          <div className={infoClasses}>
            <div className='info-wrapper'>
              <div className='title' dangerouslySetInnerHTML={{ __html: this.props.title}} />
              <div className='info' dangerouslySetInnerHTML={{ __html: this.props.explanation}} />
            </div>
          </div>

          <div className='credit-icon' onClick={this.showCredit}>i</div>
          <div className='credit-container'>
            <div className={creditClasses}>
              All images are from <a href='http://apod.nasa.gov/'>APOD</a>. Extension made by <a href='http://twitter.com/ohohbot'>Ali</a> and <a href='http://twitter.com/flahertyb'>Bart</a> for fun.
            </div>
          </div>

          <div className='time' onClick={this.toggleMiltaryTime}>{formattedTime}</div>
          <div className='date'>{date}</div>
        </div>
      );
    },

    componentDidMount: function () {
      this.updateTime();
    },

    componentDidUpdate: function () {
      this.updateTime();
    },

    updateTime: function () {
      setTimeout(function () { this.setState({time: moment()}) }.bind(this), 1000);
    },

    showInfo: function () {
      this.setState({showInfo: !this.state.showInfo});
    },

    showCredit: function () {
      this.setState({showCredit: !this.state.showCredit});
    },

    showSettings: function () {
      var state = { showSettings: !this.props.showSettings };
      this.props.persistState(state);
    },

    toggleMiltaryTime: function () {
      var state = { militaryTime: !this.props.militaryTime };
      this.props.persistState(state);
    },

    stretchImage: function () {
      var state = { stretchImage: true };
      this.props.persistState(state);
    },

    centerImage: function () {
      var state = { stretchImage: false };
      this.props.persistState(state);
    }

  });

  var getApod = function (onSuccess, onFailure) {
    reqwest({
      url: 'https://astronomy-pic-of-the-day.herokuapp.com/api.json',
      dataType: 'json',
      success: onSuccess,
      error: onFailure
    });
  };

  var keyExistsInStorage = function (key) {
    return localStorage.hasOwnProperty('__apod_chrome__' + key);
  };

  var retrieveState = function (key) {
    return JSON.parse(localStorage['__apod_chrome__' + key]);
  };

  var render = function (imageSrc, explanation, title) {
    var component = React.render(
      <Apod imageSrc={imageSrc} explanation={explanation} title={title} />,
      container
    );

    var persistState = function (state) {
      for (var key in state) {
        if (state.hasOwnProperty(key)) {
          localStorage['__apod_chrome__' + key] = JSON.stringify(state[key]);
        }
      }

      component.setProps(state);
    };

    component.setProps({persistState: persistState});

    if (keyExistsInStorage('stretchImage')) {
      component.setProps({stretchImage: retrieveState('stretchImage')});
    }
    if (keyExistsInStorage('showSettings')) {
      component.setProps({showSettings: retrieveState('showSettings')});
    }
    if (keyExistsInStorage('militaryTime')) {
      component.setProps({militaryTime: retrieveState('militaryTime')});
    }
  };

  var onApodSuccess = function (response) {
    render(response.url, response.explanation, response.title);
  };

  var onApodFailure = function (response) {
    render(FALLBACK_URI, FALLBACK_EXPLANATION, FALLBACK_TITLE);
  };

  getApod(onApodSuccess, onApodFailure);

}());
