(function () {
	'use strict';

	angular
		.module('caniDrone2')
		.controller('locationSlctCtrl', locationSlctCtrl);

	/** @ngInject */
	function locationSlctCtrl($scope, $timeout, $log, $mdSidenav,dataService, locationService) {
		var self = this;
		
		self.autolocation = true // check button for auto location
		
		// The action when autolocation is click
		self.autolocationToggle = function(){
			self.autolocation = !self.autolocation;
			if(self.autolocation){
				// enable the auto location
				locationService.autoLocation();
			}
			
		}
		
		self.lookUpcity = locationService.getCity(); // Current city displayed in the search
		
		self.geoLookup = function () {

			dataService.geolookup(self.lookUpcity).then(
				function (response) {

					if (response.data.response.results) { // Multiple locations returned
						self.lookupResultsArray = [];
						response.data.response.results.forEach(function (value) {
							var results = [];
							results.city = value.city;
							results.country = value.country;
							self.lookupResultsArray.push(results);

						})

					} else if (response.data.location) { // Single location
						//self.getbyLocations(response.data.location.country, response.data.location.city )
						locationService.setLocation(response.data.location.city, response.data.location.country);

					} else { // Not found or no response
						self.locationLookupError = response.data.response.error.description || "Not found";

					}

				}
				, function (error) {
					$log.debug('geolookup error :' + error);
				}
			);


		}
		
		self.getbyLocations = function (country,city){
			locationService.setLocation(city, country);
		}
		
}

	
	
	
	
})();