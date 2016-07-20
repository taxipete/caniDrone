(function () {
	'use strict';

	angular
		.module('caniDrone2')
		.config(config);

	/** @ngInject */
	function config($logProvider, $mdThemingProvider) {
		// Enable log
		$logProvider.debugEnabled(true);		
		$mdThemingProvider.theme('default')	;
	
	}

})();