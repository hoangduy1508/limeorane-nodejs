<%- include('header'); %>

    <div id="content-wrapper" ng-controller="notiController">
        <h1 class="jumbotron">Danh sách thông báo

            <a class="btn btn-primary btn-sm " role="button" href="admin/add_notication">Thêm mới</a>

        </h1>
        <table class="table table-bordered table-hover">
            <thead>
                <th>Stt</th>
                <th>Ngày</th>
                <th>Tiều đề</th>
                <th>Xem</th>

            </thead>

            <tr ng-repeat="item in notilist">
                <td>
                    {{$index + 1}}
                </td>
                <td>
                    {{item.time}}
                </td>

                <td>
                    {{item.title}}
                </td>
                <td><a class="btn btn-warning btn-sm " role="button" href="admin/notication/{{item.id}}">Xem</a>
                    <button class="btn btn-danger btn-sm" ng-click="deletenoti(item)" role="button"><i class="fas fa-trash-alt"></i></button></td>



        </table>


    </div>
    <script>
        // angulajs

        app.controller("notiController", ['$scope', "noti", function($scope, noti) {
            $scope.checkedit = false;
            // load user info
            noti.get().then(function(response) {
                $scope.notilist = response.data;

            });



            $scope.deletenoti = function(item) {
                noti.deletenoti(item.id).then(function(response) {
                    $scope.notilist = response.data;
                });
            }
        }]);
        app.factory("noti", ["$http", function($http) {
            return {
                get: function() {
                    return $http.get("/api/notilist");
                },
                deletenoti: function(id) {
                    return $http.delete("/api/deletenoti/" + id);
                }
            }
        }]);
    </script>
    <%- include('footer'); %>