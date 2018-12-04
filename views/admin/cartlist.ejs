<%- include('header'); %>

    <div class="panel panel-warning">
        <div class="panel-heading">
            <h4>Cart list</h4>
        </div>
        <div class="panel-body" ng-controller="cartController">
            <table class="table table-bordered table-hover">
                <thead>

                    <tr bgcolor="#eee">
                        <th nowrap="">#</th>
                        <th nowrap="">Người đặt</th>
                        <th nowrap="">Ngày đặt</th>
                        <th nowrap="">Danh sách mặt hàng</th>
                        <th nowrap="">Tổng tiền</th>
                        <th nowrap="">Trạng thái</th>
                        <th nowrap="">Xác nhận</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="item in cartlist">
                        <td title="29">{{$index + 1}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.time}}</td>
                        <td>
                            <ul class="productlist">
                                <li ng-repeat="item2 in item.cartdetaillist">
                                    <p class="productitem pointer" data=".{{item2.productimg}}">
                                        Product: {{item2.productname}}, Quantity order: {{item2.quantity}}, Product cost: {{item2.cost}}
                                    </p>
                                </li>

                            </ul>
                        </td>
                        <td>{{item.tongtien | number}} VNĐ</td>
                        <td>{{item.Isdone.status}}</td>
                        <td nowrap="">
                            <div ng-if="!item.Isdone.check">
                                <button class="btn btn-success btn-sm edit" ng-click="xacnhan(item)" role="button"><i class="fas fa-check"></i> Xác
                                    nhận</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div id="popup" style="display:none">
        <div id="innerpopup">
            <div class="functionedit">
                <span class="close-pop"><i class="far fa-times-circle"></i></span>

            </div>

            <img src="" id="imgpopup">
        </div>

    </div>
    <script>
        // angulajs

        app.controller("cartController", ['$scope', "cart", function($scope, cart) {
            $scope.checkedit = false;
            // load user info
            cart.get().then(function(response) {
                $scope.cartlist = response.data;

                $(document).ready(function() {
                    $(".productitem").click(function() {
                        $("#popup").show();
                        var src = $(this).attr("data");
                        $("#imgpopup").attr("src", src)

                    });
                    $(".close-pop").click(function() {
                        $("#popup").hide();
                        $("#formedit").hide();
                    });
                });
            });

            $scope.xacnhan = function(item) {

                cart.xacnhan(item).then(function(response) {
                    $scope.cartlist = response.data;
                    $(document).ready(function() {
                        $(".productitem").click(function() {
                            $("#popup").show();
                            var src = $(this).attr("data");
                            $("#imgpopup").attr("src", src)

                        });
                        $(".close-pop").click(function() {
                            $("#popup").hide();
                            $("#formedit").hide();
                        });
                    });

                });


            }
            $scope.before_editcart = function(item) {

            }
            $scope.editcart = function(item) {

                cart.editcart(item).then(function(response) {
                    $scope.cartlist = response.data;
                    // // insert jquery
                    // $(document).ready(function() {
                    //     $(".extract_item").click(function() {

                    //         $("#item").attr("src", "/product?cartid=" + $(this).attr("data"));
                    //         $(".duocchon").attr("class", "");
                    //         $("#items" + $(this).attr("data")).attr("class", "duocchon");
                    //     })

                    // })
                });
            }
            $scope.deletecart = function(item) {
                cart.deletecart(item.id).then(function(response) {
                    $scope.cartlist = response.data;
                    // // insert jquery
                    // $(document).ready(function() {
                    //     $(".extract_item").click(function() {

                    //         $("#item").attr("src", "/product?cartid=" + $(this).attr("data"));
                    //         $(".duocchon").attr("class", "");
                    //         $("#items" + $(this).attr("data")).attr("class", "duocchon");
                    //     })

                    // })
                });
            }
        }]);
        app.factory("cart", ["$http", function($http) {
            return {
                get: function() {
                    return $http.get("/api/cartlist");
                },
                xacnhan: function(item) {

                    return $http.put("/api/xacnhanorder", {
                        id: item.cartid
                    });
                },
                deletecart: function(id) {
                    return $http.delete("/api/deletecart/" + id);
                },
                editcart: function(cartinfo) {
                    return $http.put("/api/editcart/", cartinfo);
                }
            }
        }]);
    </script>

    <%- include('footer'); %>