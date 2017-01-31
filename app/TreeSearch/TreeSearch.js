'use strict';

angular.module('myApp.TreeSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/TreeSearch', {
        templateUrl: 'TreeSearch/TreeSearch.html',
        controller: 'TreeSearchCtrl'
    });
}])

.controller('TreeSearchCtrl', ['$scope', '$q', function($scope, $q) {

    var lookup = new TreeLookup();

    var nodesFrom = [];

    var path = "";

    var foundNumber = false;

    //promisifying `lookup.getChildrenAsCallback`
    function getChildrenAsPromise(path) {
        return new Promise(function(resolve, reject) {
            lookup.getChildrenAsCallback(path, function(err, nodes) {
                if (err) reject(err);
                else resolve(nodes);
            });
        })
    }

    //resucrive version of `getChildrenAsPromise`
    function nodeSearch(path) {
        //get the direct children for this path
        return getChildrenAsPromise("/" + path)
            //get their descendants
            .then(function(nodes) {
                return Promise.all(nodes.map(function(node) {
                    nodesFrom.push(path + "/" + node);
                    if (foundNumber == false) {

                        if (node == $scope.searchText) {
                            foundNumber = true;
                            $scope.searchResult = path + "/" + node; //angular.copy(nodesFrom);
                            $scope.noResult = '';
                            $scope.$apply();

                            return;
                        } else {

                            if (foundNumber == false) {
                                $scope.noResult = "No search result found";
                            } else {
                                $scope.noResult = '';
                            }

                            $scope.$apply();
                            return nodeSearch(path + "/" + node);
                        }
                    } else {

                        return;
                    }
                }))
            });
    }

    $scope.search = function() {
        $scope.noResult = "";
        $scope.searchResult = '';
        foundNumber = false;
        nodesFrom = [];
        nodeSearch(path);
    }

}]);
