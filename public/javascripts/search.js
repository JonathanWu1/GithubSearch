var app = angular.module('angularApp',[]);

app.controller('HttpPostController', function($scope,$http) {
  $scope.vals = [1,2,3,4,5,6,7,8,9,10];
  $scope.SendData = function(page,num_per_page){
    console.log($scope.num_per_page);
    if($scope.searchTerm!=null){
      var data = {
        name:$scope.searchTerm,
        page:page,
        num_per_page: $scope.num_per_page
      };
    }
    else{
      var data = {
        name:'',
        page:page,
        num_per_page: $scope.num_per_page
      };
    }
    $http.post('/', data)
    .then((data)=>{
      $scope.PostDataResponse = data.data;
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
    })

  };
});
