(function (prototype) {
  'use strict';

  prototype.centerItem = function (slide, dot, e) {
    if (e) e.preventDefault();

    var _ = this;

    var originalSlide = slide;
    ++_.animate_id;

    if (dot === true) {
      slide = slide * _.containerWidth;
      slide = Math.round(slide / _.itemWidth) * _.itemWidth;
    } else {
      if (typeof slide === 'string') {
        var backwards = slide === 'prev';

        // use precise location if fractional slides are on
        if (_.opt.slidesToScroll % 1 || _.opt.slidesToShow % 1) {
          slide = _.round(_.ele.scrollLeft / _.itemWidth);
        } else {
          slide = _.slide;
        }

        if (backwards) {
          slide -= _.opt.slidesToScroll;
        } else {
          slide += _.opt.slidesToScroll;
        }

        if (_.opt.rewind) {
          var scrollLeft = _.ele.scrollLeft;
          slide =
            backwards && !scrollLeft
              ? _.slides.length
              : !backwards &&
                scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)
                ? 0
                : slide;
        }
      }

      slide = Math.max(Math.min(slide, _.slides.length), 0);

      _.slide = slide;
      slide = _.itemWidth * slide;
    }

    if (slide) {
      slide = slide - ((this.containerWidth/2) - (this.itemWidth/2));
    }

    _.scrollTo(
      slide,
      _.opt.duration * Math.abs(_.ele.scrollLeft - slide),
      function () {
        _.updateControls();
        _.emit('animated', {
          value: originalSlide,
          type:
            typeof originalSlide === 'string' ? 'arrow' : dot ? 'dot' : 'slide'
        });
      }
    )

    return false;
  }

}(window.Glider.prototype));
