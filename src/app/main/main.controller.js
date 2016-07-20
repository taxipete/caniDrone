(function () {
	'use strict';

	angular
		.module('caniDrone2')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController($scope, $timeout, $log, $mdSidenav, dataService, timeService, locationService, processWeatherData) {
		var self = this;
		self.returnedWeatherData = []; // object for storing the raw weather data, will be re-used if hours change
		self.weatherData = []; // model for the displayed  processed weather data.

		var day = 0; // Set the default day displayed as today or zero index
		var ModelDroneWeather = []; // container for the processed weather infomation

		self.errorMessageForUser = "";	// Simple error message displayed in Settings Panel

		locationService.autoLocation();	// Tries to set the location from IP Address

		// This is the actual lookup and display function
		self.updateData = function () {
			self.errorMessageForUser = "";
			// Gets data
			dataService.getWeatherDatabyCountry(locationService.getLocation()).then(
				function (response) {
					if (!response.data.hourly_forecast) {

						self.errorMessageForUser = "Could not find weather infomation for " + locationService.getCity();
						return;
					}
					dataService.storeResponse(response);
					ModelDroneWeather = processWeatherData.processWeatherData();
					self.weatherData = ModelDroneWeather[day];

				}
				, function (error) {
					$log.debug('getWeatherDatabyCountry error :' + error);
				}
			);
		}

		self.updateData();
		

		// This updates the model hence the view - Scope used here as it available to other controllers - stackExchange - read up
		$scope.updateModelWeather = function () {
			ModelDroneWeather = processWeatherData.processWeatherData();
			self.weatherData = ModelDroneWeather[day];
		}

		/*
		 * Some view stuff
		 */
		
		//   BACK TODAY AND NEXT BUTTONS
		self.nextDay = function () {
			day = day + 1;
			self.weatherData = ModelDroneWeather[day];

		}
		self.backDay = function () {
			day = day - 1;
			self.weatherData = ModelDroneWeather[day];

		}
		self.today = function () {
			day = 0;
			self.weatherData = ModelDroneWeather[day];
		}
		
		// Settings button
		self.showSettings = function () {
			$mdSidenav('left').toggle();
		}
		
		// Watching the location services for changes 
		$scope.$watch(function () {
			return locationService.getLocation();
		}, function (newVal) {
			$log.debug('locationService data changes into: ' + newVal);
			self.updateData();
		}, true);
		
		
}

	
	
	
	
})();