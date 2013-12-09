'use strict';

var app = angular.module('sataNoticer', []);

app.provider('SataNoticer', function () {
	this.setDefaults = function (defaults) {
		SataNotice.prototype.defaults = defaults;
	};

	this.$get = function () {
		var noticer = {
			notices: [],
			add: function (text) {
				var notice = new SataNotice(text);
				this.notices.push(notice);
				return notice;
			},
			remove: function (notice) {
				var noticeIndex = this.notices.indexOf(notice);
				if (noticeIndex !== -1) {
					this.notices.splice(noticeIndex, 1);
				}
			}
		};

		SataNotice.prototype.noticer = noticer;
		return noticer;
	};
});

app.directive('sataNoticer', function () {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		template: '<div><div sata-notice ng-transclude ng-repeat="notice in notices"></div></div>',
		controller: ['$scope', 'SataNoticer', function ($scope, SataNoticer) {
			$scope.notices = SataNoticer.notices;
		}]
	};
});

app.directive('sataNotice', function () {
	return {
		controller: ['$scope', '$timeout', function ($scope, $timeout) {
			console.log($scope.notice);
			if ($scope.notice.autoclose !== false) {
				$timeout(function(){
					$scope.notice.remove();
				}, $scope.notice.autoclose);
			}
		}]
	};
});

var SataNotice = function (text) {
	if (!angular.isObject(text)) {
		text = {text: text};
	}
	angular.extend(this, this.defaults, text);
};

SataNotice.prototype.defaults = {
	autoclose: false
};

SataNotice.prototype.noticer = null;

SataNotice.prototype.remove = function () {
	this.noticer.remove(this);
};