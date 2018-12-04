<%- include('header'); %>

    <div class="panel panel-warning">
        <div class="panel-heading">
            <h4>Category product</h4>
        </div>
        <div class="panel-body" ng-controller="cateController">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr bgcolor="#eee">
                        <th> </th>
                        <th><input class="form-control" ng-model="cateinfo.name" name="tablename" id="tablename" value="" title="Tên loại" placeholder="Tên loại hàng">
                        </th>
                        <th>
                            <button type="submit" id="add" ng-click="addCate(cateinfo)" name="submit" class="btn btn-primary btn-sm">Thêm
                                vào</button>


                        </th>
                    </tr>
                    <tr bgcolor="#eee">
                        <th nowrap="">#</th>
                        <th nowrap="">Category name</th>

                        <th nowrap="">Function</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="item in catelist">
                        <td title="29">{{$index + 1}}</td>
                        <td data="{{item.id}}" class="extract_item "><span onaftersave="editCate(item)" editable-text="item.name" e-form="textBtnForm">{{item.name}}</span></td>

                        <td nowrap="">
                            <button class="btn btn-warning btn-sm edit" ng-click="textBtnForm.$show()" ng-hide="textBtnForm.$visible" role="button"><i class="fas fa-pencil-alt"></i></button>
                            <button class="btn btn-danger btn-sm" ng-click="deletecate(item)" role="button"><i class="fas fa-trash-alt"></i></button>


                        </td>
                    </tr>

                </tbody>
            </table>

        </div>
    </div>

    <script>
        // angulajs

        app.controller("cateController", ['$scope', "cate", function($scope, cate) {
            $scope.checkedit = false;
            // load user info
            cate.get().then(function(response) {
                $scope.catelist = response.data;
                // insert jquery
                $(document).ready(function() {
                    $(".extract_item").click(function() {

                        $("#item").attr("src", "/product?cateid=" + $(this).attr("data"));
                        $(".duocchon").attr("class", "");
                        $("#items" + $(this).attr("data")).attr("class", "duocchon");
                    })

                })
            });

            $scope.addCate = function(cateinfo) {

                cate.addCate(cateinfo).then(function(response) {
                    $scope.catelist = response.data;
                    $scope.cateinfo.name = "";
                    // // insert jquery
                    // $(document).ready(function() {
                    //     $(".extract_item").click(function() {

                    //         $("#item").attr("src", "/product?cateid=" + $(this).attr("data"));
                    //         $(".duocchon").attr("class", "");
                    //         $("#items" + $(this).attr("data")).attr("class", "duocchon");
                    //     })

                    // })
                });


            }
            $scope.before_editcate = function(item) {

            }
            $scope.editCate = function(item) {

                cate.editcate(item).then(function(response) {
                    $scope.catelist = response.data;
                    // // insert jquery
                    // $(document).ready(function() {
                    //     $(".extract_item").click(function() {

                    //         $("#item").attr("src", "/product?cateid=" + $(this).attr("data"));
                    //         $(".duocchon").attr("class", "");
                    //         $("#items" + $(this).attr("data")).attr("class", "duocchon");
                    //     })

                    // })
                });
            }
            $scope.deletecate = function(item) {
                cate.deletecate(item.id).then(function(response) {
                    $scope.catelist = response.data;
                    // // insert jquery
                    // $(document).ready(function() {
                    //     $(".extract_item").click(function() {

                    //         $("#item").attr("src", "/product?cateid=" + $(this).attr("data"));
                    //         $(".duocchon").attr("class", "");
                    //         $("#items" + $(this).attr("data")).attr("class", "duocchon");
                    //     })

                    // })
                });
            }
        }]);
        app.factory("cate", ["$http", function($http) {
            return {
                get: function() {
                    return $http.get("/api/catelist");
                },
                addCate: function(cateinfo) {
                    return $http.post("/api/addcate", cateinfo);
                },
                deletecate: function(id) {
                    return $http.delete("/api/deletecate/" + id);
                },
                editcate: function(cateinfo) {
                    return $http.put("/api/editcate/", cateinfo);
                }
            }
        }]);
    </script>

    <%- include('footer'); %>