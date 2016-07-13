// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['openlayers-directive', 'ionic', 'starter.controllers', 'pascalprecht.translate', 'leaflet-directive'    ])

.run(function ($ionicPlatform, $rootScope) {
    $rootScope.style = "style";
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '/languages/',
        suffix: '.json'
    });
    $translateProvider.registerAvailableLanguageKeys(['en', 'fr']);
    $translateProvider.preferredLanguage('fr');

  $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

  .state('app.home', {
      url: '/home',
      views: {
          'menuContent': {
              templateUrl: 'templates/home.html'
          }
      }
  })

  .state('app.news', {
      url: '/news',
      views: {
          'menuContent': {
              templateUrl: 'templates/news.html'
          }
      }
  })

  .state('app.lines', {
      url: '/lines',
      views: {
          'menuContent': {
              templateUrl: 'templates/lines.html',
              controller: 'LinesCtrl'
          }
      }
  })

  .state('app.line', {
      url: '/line/:lineID',
      views: {
          'menuContent': {
              templateUrl: 'templates/line.html',
              controller: 'LineCtrl'
          }
      }
  })

  .state('app.stop', {
      url: '/stop/:routeID/:stopName/:lat/:lon',
      views: {
          'menuContent': {
              templateUrl: 'templates/stop.html',
              controller: 'StopCtrl'
          }
      }
  })

  .state('app.traceLine', {
      url: '/traceLine/:routeID',
      views: {
          'menuContent': {
              templateUrl: 'templates/traceLine.html',
              controller: 'TraceLineCtrl'
          }
      }
  })

  .state('app.bookmarks', {
      url: '/bookmarks',
      views: {
          'menuContent': {
              templateUrl: 'templates/bookmarks.html'
          }
      }
  })

  .state('app.settings', {
      url: '/settings',
      views: {
          'menuContent': {
              templateUrl: 'templates/settings.html',
              controller: 'SettingsCtrl'
          }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
