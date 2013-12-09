'use strict';

var app = angular.module('noticerDemoApp', ['sataNoticer']);

app.controller('DemoCtrl', ['$scope', 'SataNoticer', function ($scope, SataNoticer) {
	this.lastNotice = null;

	this.sendNotice = function (text, autoclose) {
		autoclose = angular.isDefined(autoclose) ? autoclose : false;
		this.lastNotice = SataNoticer.add({text: text, autoclose: autoclose});
	};

	this.replaceLastNotice = function (text) {
		if (this.lastNotice !== null) {
			SataNoticer.remove(this.lastNotice);
			this.lastNotice = SataNoticer.add(text);
		}
	};

	this.removeLastNotice = function (text) {
		if (this.lastNotice !== null) {
			SataNoticer.remove(this.lastNotice);
			this.lastNotice = null;
		}
	};

	return $scope.DemoCtrl = this;
}]);