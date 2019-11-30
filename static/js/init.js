(function (doc) {
  'use strict';

  var slider = new Glider(doc.querySelector('.carousel'), {
    slidesToShow: 3,
    draggable: true
  });

  slider.centerItem(4);

}(window.document));
