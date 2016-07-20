(function () {
	'use strict';

	angular
		.module('caniDrone2')
		.directive('displayResults', displayResults);

	/** @ngInject */
	function displayResults() {
		var directive = {
			restrict: 'E'
			, templateUrl: 'app/components/displayResults/displayResults.html'
			, scope: {
				data: '='
			}

		};

		return directive;

		/** @ngInject */

	}

})();