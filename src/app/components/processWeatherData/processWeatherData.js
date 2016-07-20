(function () {
	'use strict';

	angular
		.module('caniDrone2')
		.service('processWeatherData', processWeatherData);

	/** @ngInject */
	function processWeatherData(timeService, dataService) {
		var self = this;
		

		// Need to process the returned datat
		// Takes the response from the weather api and process to be used as the model
		self.processWeatherData = function () {
			// ModelDroveWeather container for the processed weather infomation

			var response = dataService.getStoredResponse();
			var ModelDroneWeather = [];
			
			var hours = timeService.gethours(); // Get the hours


			var j = 0 // will step through the hours array
			var dayData = [];
			for (var i = 0; i < response.data.hourly_forecast.length; i++) {

				if (response.data.hourly_forecast[i].FCTTIME.hour == hours[j]) {
					// Get all the data and push to model
					var toDrone = this.toDrone(response.data.hourly_forecast[i].fctcode, response.data.hourly_forecast[i].wspd.english);
					var hourData = {
						pretty: response.data.hourly_forecast[i].FCTTIME.pretty
						, hour: response.data.hourly_forecast[i].FCTTIME.hour
						, weekday_name: response.data.hourly_forecast[i].FCTTIME.weekday_name
						, condition: response.data.hourly_forecast[i].condition
						, icon_url: response.data.hourly_forecast[i].icon_url
						, wspd: response.data.hourly_forecast[i].wspd.english
						, fctcode: response.data.hourly_forecast[i].fctcode
						, country: response.data.location.country
						, city: response.data.location.city
						, wdir: response.data.hourly_forecast[i].wdir,

						toDrone: toDrone
					}


					// OK - So I know i have done something wrong here.  BAD Pattern!!

					j++;
					dayData.push(hourData);
					hourData = {};

					if (j == hours.length) {
						j = 0;
						ModelDroneWeather.push(dayData);
						dayData = [];
					}
				}


			}

			return ModelDroneWeather;
		}	
		
		// This function works out if droning is 0 no drone, 1 maybe drone, 2 DRONE TIME
	/*
	 * Data required to make this descion are:
	 * 		fctcode
	 *   	wspd.english
	 *    
	 * 	Returns the toDrone var 0,1,2   
	 */
	self.toDrone = function (fctcode, wspd) {

		var toDrone = 1;


		// Weather conditions
		// https://www.wunderground.com/weather/api/d/docs?d=resources/phrase-glossary

		switch (parseInt(fctcode, 10)) {
		case 1:
			toDrone = 2;
			break;
		case 2:
			toDrone = 2;
			break;
		case 3:
			toDrone = 2;
			break;
		case 4:
			toDrone = 2;
			break;
		case 5:
			toDrone = 2;
			break;
		case 6: //Foggy
			toDrone = 1;
			break;
		case 7:
			toDrone = 2;
			break;
		case 8:
			toDrone = 1;
			break;
		case 9:
			toDrone = 0;
			return toDrone;
		case 10:
			toDrone = 1;
			break;
		case 11:
			toDrone = 0;
			return toDrone;
		case 12:
			toDrone = 1;
			break;
		case 13:
			toDrone = 0;
			return toDrone;
		case 14:
			toDrone = 1;
			break;
		case 15:
			toDrone = 0;
			return toDrone;
		case 16:
			toDrone = 0;
			return toDrone;
		case 17:
			toDrone = 2;
			break;
		case 18:
			toDrone = 1;
			break;
		case 19:
			toDrone = 0;
			return toDrone;
		case 20:
			toDrone = 1;
			break;
		case 21:
			toDrone = 0;
			return toDrone;
		case 22:
			toDrone = 1;
			break;
		case 23:
			toDrone = 0;
			return toDrone;
		case 24:
			toDrone = 0;
			return toDrone;
		default:
			toDrone = 1;
		}

		// Check wind speed	

		// Yes or Maybe if the wind speed is above 16 its a no
		if (parseInt(wspd, 10) > 14) { // Too Windy
			toDrone = 0;
			return toDrone;
		}

		// Otherwise excellent conditions but wind speed high its a matbe
		if (toDrone == 2 && (parseInt(wspd, 10) > 8)) { // Too Windy
			toDrone = 1;
			return toDrone;
		}

		return toDrone;
	}	


	}

})();
