var app = angular.module('myApp', []);
app.controller('myAppCtrl', function ($scope, $http) {

	$scope.hideAddBtn = false;

	var getContactList = function () {
		$http.get('/contact-list').success(function (res) {
			$scope.contactList = res;
			$scope.contactObj = '';
		});
	};

	$scope.addContact = function (obj) {			
		if (obj.empName && obj.empId) {
			$http.post('/contact-list', obj).success(function (res) {
				getContactList();
			});
		} else {
			$('#errorModal').modal('show');
		}
	};

	$scope.editContact = function (obj) {
		$scope.hideAddBtn = true;
		$http.get('/contact-list/' + obj._id).success(function (res) {
			$scope.contactObj = res;
		});
	};

	$scope.deleteContact = function (obj) {
		$http.delete('/contact-list/' + obj._id).success(function (res) {
			getContactList();
		});
	};

	$scope.save = function (obj) {		
		$scope.hideAddBtn = false;
		$http.put('/contact-list/' + obj._id, obj).success(function (res) {
			getContactList();
		});
	}
	
	getContactList();
});



