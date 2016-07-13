angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('StopCtrl', function ($scope, $http, $stateParams, $rootScope) {
    $scope.name = $stateParams.stopName;
    $http.get('https://applications002.brest-metropole.fr/WIPOD01/Transport/REST/getNextDepartures?format=json&route_id=' + $stateParams.routeID + '&stop_name=' + $stateParams.stopName + '&trip_headsign=' + $rootScope.tripHeadsing).success(function (data) {
    //$http.get('stop.json').success(function (data) {
        $scope.stop = data;
        console.log(data);
    })

    //angular.extend($scope, {
    //    busStop: {
    //        lat: Math.round($stateParams.lat * 1000) / 1000,
    //        lon: Math.round($stateParams.lon * 1000) / 1000,
    //        zoom: 15
    //    },
    //    marker: {
    //        lat: Math.round($stateParams.lat * 1000) / 1000,
    //        lon: Math.round($stateParams.lon * 1000) / 1000
    //    },
    //    controls: [
    //            { name: 'zoom', active: false },
    //            { name: 'rotate', active: false },
    //            { name: 'attribution', active: false }
    //    ]
    //});
    var mainMarker = {
        lat: Math.round($stateParams.lat * 1000) / 1000,
        lng: Math.round($stateParams.lon * 1000) / 1000,
        focus: true,
        draggable: false
    };
    angular.extend($scope, {
        stop: {
            lat: Math.round($stateParams.lat * 1000) / 1000,
            lng: Math.round($stateParams.lon * 1000) / 1000,
            zoom: 16
        },
        markers: {
            mainMarker: angular.copy(mainMarker)
        },
        position: {
            lat: Math.round($stateParams.lat * 1000) / 1000,
            lng: Math.round($stateParams.lon * 1000) / 1000
        },
        defaults: {
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false
        },
        events: { // or just {} //all events
            markers: {
                enable: ['dragend']
                //logic: 'emit'
            }
        }
    });
})

.controller('LinesCtrl', function ($scope, $http) {
    $http.get('https://applications002.brest-metropole.fr/WIPOD01/Transport/REST/getRoutes?format=json').success(function (data) {
    //$http.get('lines.json').success(function (data) {
        $scope.lines = data;
    })
})

.controller('NewsCtrl', function ($scope, $http) {
    $http.get('https://applications002.brest-metropole.fr/WIPOD01/Transport.svc/getPerturbations?format=json').success(function (data) {
    //$http.get('news.json').success(function (data) {
        $scope.news = data;
    })
})

.controller('MeCtrl', function ($scope, $http, $cordovaGeolocation) {

    var watchOptions = {
        frequency: 100,
        timeout: 20 * 100,
        enableHighAccuracy: false // may cause errors if true
    };
    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function (err) {
          alert("WatchPosition failed: " + JSON.stringify(err));
      },
      function (position) {
          $scope.center.lat = position.coords.latitude;
          $scope.center.lon = position.coords.longitude;
      }
    );

    angular.extend($scope, {
        center: {
            lat: 48.39,
            lng: -4.435,
            zoom: 12
        },
        markers: []
    });

    $scope.markers = [];
    $http.get('https://applications002.brest-metropole.fr/WIPOD01/Transport/REST/getStopsNear?format=json&latitude=' + $scope.center.lat + '&longitude=' + $scope.center.lon).then(function (responseData) {
    //$http.get('stopnear.json').then(function (responseData) {
        for (var i = 0; i < responseData.data.length; i++) {
            $scope.markers[i] = L.latLng(responseData.data[i].Stop_lat,responseData.data[i].Stop_lon);
        }
    })
})

.controller('TraceLineCtrl', function ($scope, $http, $stateParams, $rootScope) {

    var mainMarker = {
        lat: Math.round($stateParams.lat * 1000) / 1000,
        lng: Math.round($stateParams.lon * 1000) / 1000,
        focus: true,
        draggable: false
    };
    angular.extend($scope, {
        paths: {},
        position: {
            lat: 48.39,
            lng: -4.435,
            zoom: 12
        },
        events: { // or just {} //all events
            markers: {
                enable: ['dragend']
                //logic: 'emit'
            }
        }
    });
    $scope.loadPaths = function loadPaths() {
        $http.get('paths.json').success(function (data) {
            var path = '{ "p1": { "color": "red", "weight": 3, "latlngs": [';
            console.log("------------------------");
            for (var k in data) {
                console.log(data[k].Stop_lat);
                path = path + '{ "lat": ' + data[k].Stop_lat + ', "lng":' + data[k].Stop_lon + '},';
            }
            path = path.substring(0, path.length-1);
            path = path + '] } }';;
            console.log(path);
            $scope.paths = JSON.parse(path);

            var position = 'stop: { lat:' + data[Math.round(data.length / 2)].Stop_lat + ', lng: ' + data[Math.round(data.length / 2)].Stop_lon + ', zoom: 12 }';
            console.log("------------------------");
            //console.log(Object.keys(data).length);
            angular.extend($scope, {
                position: {
                    lat: 0,
                    lng: data[Math.round(data.length / 2)].Stop_lon,
                    zoom: 12
                }
            });
            
            console.log(path);
        });
    };
})

.controller('SettingsCtrl', function ($translate, $scope, $ionicPopup, $timeout, $rootScope) {
    $scope.updateTheme = function (item) {
        if (item) {
            console.log(item);
            $rootScope.style = "dark";
        }
        else {
            console.log(item);
            $rootScope.style = "style";
        }
    }

    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Informations',
            template: 'Developpement : Nicolas Le Gall\nRessources graphiques : Alice Sahin'
        });

        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };

    $scope.languages = ["fr", "en"];
    $scope.refreshLanguage = function (id) {
        $translate.use(this.language);
    }
})

.controller('LineCtrl', function ($scope, $http, $stateParams, $rootScope) {
    $scope.id = $stateParams.lineID;
    $http.get('https://applications002.brest-metropole.fr/WIPOD01/Transport/REST/getDestinations?format=json&route_id=' + $stateParams.lineID).success(function (data) {
    //$http.get('terminus.json').success(function (data) {
        $scope.destinations = data;
    })
    $scope.refreshStop = function(id) {
        console.log("Value" + this.line);
        $rootScope.tripHeadsing = this.line;
        //$http.get('Oceanopolis.json').success(function (data) {        
        $http.get('https://applications002.brest-metropole.fr/WIPOD01/Transport/REST/getStops_route?format=json&route_id='+this.id+'&trip_headsign='+this.line).success(function (data) {
            $scope.stops = data;
        })
    }
});
