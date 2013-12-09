'use strict';

var app = angular.module('sataNoticer', []);

app.provider('SataNoticer', function () {

	this.defaults = {
	};

	this.$get = function () {
		return {
			defaults: this.defaults,
			notices: [],
			add: function (text, type) {
				if (!angular.isObject(text)) {
					text = {text: text};
				}

				var notice = angular.extend({}, this.defaults, text);
				this.notices.push(notice);
				return notice;
			},
			remove: function(notice){
				var noticeIndex = this.notices.indexOf(notice);
				if (noticeIndex !== -1) {
					this.notices.splice(noticeIndex, 1);
				}
			}
		};
	};
});

app.directive('sataNoticer', function () {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		template: '<div><div ng-transclude ng-repeat="notice in notices"></div></div>',
		controller: ['$scope', 'SataNoticer', function ($scope, SataNoticer) {
			$scope.notices = SataNoticer.notices;
		}]
	};
});