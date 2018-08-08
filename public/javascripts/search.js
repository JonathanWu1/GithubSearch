var app = angular.module('angularApp',[]);

app.controller('HttpPostController', function($scope,$http) {
  $scope.vals = [5,10,20,50,100];
  $scope.getUserData = function(username){
    $http.get('/'+username)
    .then((data)=>{
      $scope.userdetails=data.data;
      $scope.showDetails= true;
    })
    .catch((response)=>{
      console.log(response);
    });
  }
  $scope.SendData = function(page,num_per_page){
    if($scope.searchTerm == null){
      $scope.searchTerm = '';
    }
    if($scope.num_per_page == null || $scope.num_per_page==''){
      $scope.num_per_page = 4;
    }
    var data = {
      name:$scope.searchTerm,
      page:page,
      num_per_page: $scope.num_per_page
    };
    $http.post('/', data)
    .then((data)=>{
      $scope.PostDataResponse = data.data;
      $scope.showDetails= false;
      if($scope.PostDataResponse.total_count == 0){
        $scope.showPagination=false;
      }
      else{
        $scope.showPagination=true;
        if($scope.PostDataResponse.next != null){
          $scope.currPage = parseInt($scope.PostDataResponse.next.page)-1;
        }
        else if($scope.PostDataResponse.prev != null){
          $scope.currPage = parseInt($scope.PostDataResponse.prev.page)+1;
        }
        else if($scope.PostDataResponse.first.page == null && $scope.PostDataResponse.last.page == null){
          $scope.currPage = 1;
        }
      }
    })
    .catch((response)=>{
      console.log(response);
    });

  };
});
