(function () {
	'use strict';

	angular
		.module('caniDrone2')
		.directive('sidebar', sidebar);

	/** @ngInject */
	function sidebar() {
		var directive = {
			restrict: 'E', 
			templateUrl: 'app/components/sidebar/sidebar.html',
			

		};

		return directive;

		/** @ngInject */

	}

})();