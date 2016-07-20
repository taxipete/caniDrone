(function () {
	'use strict';

	angular
		.module('caniDrone2')
		.service('dataService', dataService);

	/** @ngInject */
	function dataService($http) {
		var self = this;
		// Simple GET and return via promise 
		self.getweather = function () {
			//var url = "http://api.wunderground.com/api/6b8888a9de9b373a/hourly/q/autoip.json"; 
			//var url = "http://api.wunderground.com/api/6b8888a9de9b373a/hourly/geolookup/q/autoip.json"; 
			//var url = "http://api.wunderground.com/api/6b8888a9de9b373a/hourly/geolookup/q/51.445985,-0.448585.json";
			//var url = "http://api.wunderground.com/api/6b8888a9de9b373a/hourly10day/geolookup/q/51.445985,-0.448585.json";
			var url = "http://api.wunderground.com/api/6b8888a9de9b373a/hourly10day/geolookup/q/autoip.json";
			var promise = $http.get(url);
			return promise;
		};


		self.getWeatherDatabyCountry = function (obj) {
			var url = "http://api.wunderground.com/api/6b8888a9de9b373a/hourly10day/geolookup/q/" + obj.country + "/" + obj.city + ".json";
			var promise = $http.get(url);
			return promise;
		};			
		
		
		
		// Found closest weather station - This does not seem to work!  - Returns location that have no weather information!
		self.getweatherAuto = function () {
			var url = "http://api.wunderground.com/api/6b8888a9de9b373a/geolookup/q/autoip.json";
			var promise = $http.get(url);
			return promise;
		};			
		
		
		// will try and find a weather station for the city entered
		self.geolookup = function (city){
			var url = "http://api.wunderground.com/api/6b8888a9de9b373a/geolookup/q/" + city + ".json";
			var promise = $http.get(url);
			return promise;
			
		}
		
		
		
		/*
		 * 
		 * 	Storing the http repsonses to reduce calls
		 * 
		 */
		var repsonseStore = {};
		
		self.storeResponse = function(response){
			repsonseStore = response;
		}

		self.getStoredResponse = function(){
			return repsonseStore;
		}
		

	}

})();
