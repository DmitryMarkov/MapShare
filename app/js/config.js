(function () {
  'use strict';

  angular.module('mapshare')
    .constant("CONFIG", {

      "APPNAME"   : "MapShare",
      "APPVER"    : "0.1.0",
      "BASEURL"   : "http://localhost:3000/",
      "IMAGEDIR"  : "images/",
      "DOCDIR"    : "docs/",
      "LANGUAGE"  : "EN"
    })

    .constant("MESSAGES", {

      "RU" : {
        "error" : "что-то пошло не так",
        "about" : "Сайт и приложение MapShare."
      },

      "EN" : {
        "error" : "something goes wrong",
        "about" : "MapShare website and application."
      }
    });
})();
