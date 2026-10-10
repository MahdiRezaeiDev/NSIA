var app=angular.module('publicApp',[], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('||');
    $interpolateProvider.endSymbol('||');
 
});

app.controller('IndividualFormCtrl',function($scope,$http){
    $scope.is_kochi=false;
    $scope.has_second_citizenship=false;
    $scope.step = 1;
    $scope.setRadioValues=function(oldData){
        console.log(oldData);
        $scope.military_service     = parseFloat(oldData.military_service);
        $scope.is_educated          = parseFloat(oldData.is_educated);
        $scope.is_kochi             = parseFloat(oldData.is_kochi);
        $scope.disability_type      = oldData.disability_type;
        $scope.gender               = oldData.gender;
        $scope.has_second_citizenship = parseFloat(oldData.has_second_citizenship);

    }
    $scope.submitForm=function(){
        $http.post("/submit-individual-form",$scope.Form).then(function(res){
           $scope.errors = res.data.errors;
        }).catch(function(res){
            $scope.errors = res.data.errors;
                console.log('errors',res);
        });
    }
});

app.directive('validationMessages',function(){
    return {
        scope:{ errors:"@"},
        template:"<div class='alert alert-danger' ng-repeat='e in errors track by $index'> ||e||</div>", 
    };
});