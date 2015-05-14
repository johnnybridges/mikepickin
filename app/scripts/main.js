console.log('yo yo');

var fullScreenVideo = fullScreenVideo || {};

fullScreenVideo = {
  name: 'fullScreenVideo',
  backgroundvideo: 'thykky9hdh',
  backgroundideoDiv: '#wistia_thykky9hdh',

  embedVideo: function() {
    var videoOptions = {};

    // Add the crop fill plugin to the videoOptions
    Wistia.obj.merge(videoOptions, {
      plugin: {
        cropFill: {
          src: "//fast.wistia.com/labs/crop-fill/plugin.js"
        }
      }
    });

    // Video in the background
    wistiaEmbed = Wistia.embed(fullScreenVideo.backgroundvideo, videoOptions);

    /**
     * We load the thumbnail in the background while we wait
     * for the video to load and play. Once loaded, we pause, reset to
     * frame zero, show the video then play it.
     */
    wistiaEmbed.bind("play", function() {
      wistiaEmbed.pause();
      wistiaEmbed.time(0);
      $(fullScreenVideo.backgroundideoDiv).css('visibility', 'visible');
      wistiaEmbed.play();
      return this.unbind;
    });
  },

  fixTextPosition: function() {
    var width = $(window).width();
    var height = $(window).height();
    textWidth = $(".intro-text").width();
    textHeight = $(".intro-text").height();
    $(".video-background-container").css("width", width).css("height", height);
    $(".intro-text").css("left", (width / 2) - (textWidth / 2)).css("top", (height / 2) - (textHeight / 2));
  }
}


function fitFullViewport() {
  var winHeight = $(window).innerHeight();
  var winWidth = $(window).innerWidth();
  $('.full-screen').css({'width':winWidth,'height':winHeight});
  $('.video-background-container').css({'width':winWidth,'height':winHeight});
  fullScreenVideo.fixTextPosition();
}

$(document).ready(function() {
  fitFullViewport();
  fullScreenVideo.embedVideo();
  fullScreenVideo.fixTextPosition();
  $(".intro-text, .nav").delay(200).animate({
    opacity: 1
  }, 1250);
  $('.sponsor-toggle.button').click(function(e) {
    e.preventDefault();
    $('.sponsor-toggle-text').toggle();
  });

  // sticky nav

  var headOptions = {
    offset: ($(window).innerHeight())
  }
  var headhesive = new Headhesive('.nav', headOptions);


  $(".media-gallery").skippr({
        transition: 'slide',
        speed: 1000,
        easing: 'easeOutQuart',
        navType: 'block',
        childrenElementType: 'div',
        arrows: true,
        autoPlay: true,
        autoPlayDuration: 6000,
        keyboardOnAlways: true,
        hidePrevious: false
    });
});


$(window).resize(function() {
  fitFullViewport();
});
// $(window).resize(fullScreenVideo.fixTextPosition);
