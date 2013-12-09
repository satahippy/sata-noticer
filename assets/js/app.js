'use strict';

var app = angular.module('noticerDemoApp', ['sataNoticer']);

app.run(['$templateCache', function($templateCache){
	$templateCache.put('templates/custom-notice.html', '<div>\n\t<div sata-notice ng-repeat="notice in notices" class="alert" ng-class="notice.type && \'alert-\' + notice.type">\n\t\t<button ng-show="notice.closeable" type="button" class="close" ng-click="notice.remove()">&times;</button>\n\t\tText: {{notice.text}}\n\t\t<br/>\n\t\tType: {{notice.type}}\n\t</div>\n</div>');
	$templateCache.put('templates/custom-notice-directive.html', '<div>\n\t<div custom-notice ng-repeat="notice in notices" class="alert" ng-class="notice.type && \'alert-\' + notice.type">\n\t\t<button ng-show="notice.closeable" type="button" class="close" ng-click="notice.remove()">&times;</button>\n\t\t{{notice.text}}\n\t\t<br/>\n\t\t<a href="" ng-click="alert()">Alert!</a>\n\t</div>\n</div>');
}]);

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

	$scope.getCountNotices = function(){
		return SataNoticer.notices.length;
	}

	$scope.type = 'info';
	$scope.closeable = true;

	return $scope.DemoCtrl = this;
}]);

app.directive('customNotice', function () {
	return {
		controller: ['$scope', '$timeout', function ($scope, $timeout) {
			if ($scope.notice.autoclose !== false) {
				$timeout(function () {
					$scope.notice.remove();
				}, $scope.notice.autoclose);
			}
			$scope.alert = function(){
				alert($scope.notice.type + ': ' + $scope.notice.text);
			};
		}]
	};
});