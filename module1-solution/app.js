(
  function () {
    'use strict';
    angular.module("LunchCheck",[])
    .controller("LunchCheckController",controllerFunction);
    controllerFunction.$inject=["$scope","$filter"];
    function controllerFunction($scope,$filter) {
      $scope.food="";
      $scope.message="";
      $scope.state="message";
      $scope.validity="empty";
      $scope.checkFood=function () {
        if(!$scope.food){
          $scope.state="error";
          $scope.validity="invalid";
          $scope.message="Please enter data first";
        }
        else{
          $scope.state="info";
          $scope.validity="valid";
          var foods=$scope.food.split(",");
          var foodCount=0;
          for(var i=0;i<foods.length;i++){
            if(!foods[i].trim()){
              //empty string inside
            }
            else{
              foodCount++;
            }
          }
          if(foodCount<=3){
            $scope.message="Enjoy!";
          }
          else{
            $scope.message="Too much!";
          }
        }
      };
      $scope.clearMessage=function () {
        $scope.validity="empty";        
          $scope.message="";
      };
    }
  }
)();
