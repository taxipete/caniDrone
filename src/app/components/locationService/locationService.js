(function () {
	'use strict';

	angular
		.module('caniDrone2')
		.service('locationService', locationService);

	/** @ngInject */
	function locationService($log,dataService) {
		var self = this;
		
		/*
		 * Returns a location value 
		 * 
		 * {country: <value>, city: <value>}
		 */

		
		// Default location
		var location = {city: "Staines", country: "UK"};
		
	
		
		self.getLocation = function(){			
			return location
		}
		
		self.getCity = function(){			
			return location.city;
		}		
		
		
		self.setLocation = function(city, county){
			location = {city: city, country: county};
		}
		
		
		self.autoLocation = function(){
		// Gets data
			dataService.getweatherAuto().then(
				function(response){
					if(response.data.location.city && response.data.location.country){
						location = {city: response.data.location.city,
									country: response.data.location.country}
						
					}

				}, function(error){
					$log.debug('getweatherAuto error :' + error);
				}
			 );
		};
		

		
	
	}

})();
