(function () {
	'use strict';

	angular
		.module('caniDrone2')
		.service('timeService', timeService);

	/** @ngInject */
	function timeService() {
		var self = this;

		/*
		 * Returns a time segmates by hours in array 
		 */

		// Default set hours
		var hours = [12, 13];


		// Returns hours 
		self.gethours = function () {
			return hours;
		}


		self.sethours = function (newhours) {
			hours = newhours;
		}

	}

})();
