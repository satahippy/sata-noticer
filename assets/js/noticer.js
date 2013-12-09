'use strict';

var app = angular.module('sataNoticer', []);

app.run(['$templateCache', function($templateCache){
	$templateCache.put('sata/noticer/themes/tranclude.html', '<div><div sata-notice ng-transclude ng-repeat="notice in notices"></div></div>');
	$templateCache.put('sata/noticer/themes/default.html', '<div><div sata-notice ng-repeat="notice in notices" ng-class="notice.type && \'notice-\' + notice.type"><button ng-show="notice.closeable" type="button" class="notice-close" ng-click="notice.remove()">&times;</button><div class="notice-text">{{notice.text}}</div></div></div>');
	$templateCache.put('sata/noticer/themes/bootstrap.html', '<div><div sata-notice ng-repeat="notice in notices" class="alert" ng-class="notice.type && \'alert-\' + notice.type"><button ng-show="notice.closeable" type="button" class="close" ng-click="notice.remove()">&times;</button>{{notice.text}}</div></div>');
}]);

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
		replace: true,
		transclude: true,
		templateUrl: function (tElement, tAttrs) {
			if (!angular.isDefined(tAttrs.theme)) {
				tAttrs.theme = 'sata/noticer/themes/tranclude.html';
			}
			return tAttrs.theme;
		},
		controller: ['$scope', 'SataNoticer', function ($scope, SataNoticer) {
			$scope.notices = SataNoticer.notices;
		}]
	};
});

app.directive('sataNotice', function () {
	return {
		controller: ['$scope', '$timeout', function ($scope, $timeout) {
			if ($scope.notice.autoclose !== false) {
				$timeout(function () {
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
	type: 'info',
	autoclose: false,
	closeable: true
};

SataNotice.prototype.noticer = null;

SataNotice.prototype.remove = function () {
	this.noticer.remove(this);
};