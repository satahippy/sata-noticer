'use strict';

var app = angular.module('noticerDemoApp', ['sataNoticer']);

app.controller('DemoCtrl', ['$scope', 'SataNoticer', function ($scope, SataNoticer) {
	this.sendNotice = function () {
		SataNoticer.add({
			text: $scope.text,
			type: $scope.type,
			closeable: $scope.closeable,
			autoclose: $scope.autoclose || false
		});
		$scope.text = '';
	};

	$scope.type = 'info';
	$scope.closeable = true;
	return $scope.DemoCtrl = this;
}]);