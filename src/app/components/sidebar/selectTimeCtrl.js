(function () {
	'use strict';

	angular
		.module('caniDrone2')
		.controller('selectTimeCtrl', selectTimeCtrl);

	/** @ngInject */
	function selectTimeCtrl($scope, $timeout, $log, $mdSidenav, timeService) {
		var self = this;


		self.hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];	// Set the displayed hours that can be selected


		self.selection = timeService.gethours();	// puts ticks in the hours already selected
		// toggle selection for a given hour by name
		self.toggleSelection = function toggleSelection(hourName) {

			var idx = self.selection.indexOf(hourName);

			// is currently selected
			if (idx > -1) {
				self.selection.splice(idx, 1);
			}

			// is newly selected
			else {
				self.selection.push(hourName);
			}
		};


		self.closePanel = function () {
			// submit new hours to the timeservice
			// Quick sort to put them in the right order
			self.selection.sort(function (a, b) {
				return a - b
			});
			// pasted to the timeService
			timeService.sethours(self.selection);
			$scope.$parent.updateModelWeather();	// Had to stackExchange this one

		}
		
}

	
	
	
	
})();