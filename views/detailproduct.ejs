<%- include('header'); %>
    <div id="detailproduct" class="main-body container" ng-controller="orderController">
        <h3 class="title">THÔNG TIN SẢN PHẨM</h3>

        <div id="productdetail">
            <!-- img product slide -->
            <div id="imgproduct-slide" class="main-slide-wrap col-md-6 ">
                <div class="main-slide">
                    <% product.forEach(function(item){ %>

                        <div>

                            <img src=".<%= item.img_main %>" class="img-responsive des-slide " alt="MAIN PC SLIDE IMAGE">


                        </div>
                        <% }); %>
                            <% product.forEach(function(item){ %>

                                <div>

                                    <img src=".<%= item.img_sub %>" class="img-responsive des-slide " alt="MAIN PC SLIDE IMAGE">


                                </div>
                                <% }); %>


                </div>

            </div>
            <!-- img product slide -->
            <div class="col-md-6 productinfodetail">

                <% product.forEach(function(item){ %>

                    <h3 class="producname">
                        <span>Tên sản phẩm:</span>
                        <%= item.name %>
                    </h3>
                    <h3 class="productcost">
                        <span>Giá bán:</span>
                        <%= item.cost %>
                    </h3>
                    <div class="orderproduct">

                        <input type="hidden" class="form-control" name="productid" value="<%= item.id %>">
                        <span class="col-md-4">Số lượng: </span>
                        <div class="col-md-4"><input type="number" ng-model="productinfo.quantity" class="form-control" name="quantity"></div>
                        <div class="col-md-12">
                            <button class="btn btn-warning btn-sm edit" ng-click="Order(productinfo)" role="button">Đặt hàng</button>
                        </div>
                        <div class="alert alert-success" id="tinnhan" style="display:none">
                            <strong>Chúc mừng!!</strong> Bạn đã đặt hàng thành công vui lòng kiểm tra lại trong giỏ hàng của mình.
                        </div>

                    </div>
            </div>

            <% }); %>
        </div>
    </div>

    </div>
    <script>
        // angulajs

        app.controller("orderController", ['$scope', "order", function($scope, order) {
            // order product
            $scope.Order = function(productinfo) {
                var productid = angular.element(document.getElementsByName('productid')[0]).val();
                var productinfo2 = {
                    productid: productid,
                    quantity: productinfo.quantity
                };

                order.Order(productinfo2).then(function(response) {
                    var tinnhan = response.data;

                    if (tinnhan.status == true) {
                        $("#tinnhan").show();
                    }
                    $(document).ready(function() {
                        socket.emit("orderproduct");
                        // push event




                    });
                });


            };
        }]);
        app.factory("order", ["$http", function($http) {
            return {

                Order: function(productinfo) {
                    return $http.post("/api/orderproduct", productinfo)
                }
            }
        }]);
    </script>
    <script src="../assets/js/slick.js"></script>
    <script>
        $(document).ready(function() {




            $('.main-slide').slick({
                dots: true,
                infinite: true,
                autoplay: true,
                speed: 2000,
                slidesToShow: 1,
                adaptiveHeight: false,
                pauseOnHover: false
            });
        });
    </script>

    <%- include('footer'); %>