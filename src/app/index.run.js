(function() {
  'use strict';

  angular
    .module('caniDrone2')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
