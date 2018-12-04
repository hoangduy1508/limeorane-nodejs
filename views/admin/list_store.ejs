<%- include('header'); %>
    <div class="panel-body panel-primary" ng-controller="storeController">
        <div class="panel-heading ">
            <h4>Danh sách cửa hàng</h4>
        </div>
        <table class="table table-bordered table-hover">

            <thead>
                <tr bgcolor="#eee">
                    <th>
                        #
                    </th>

                    <th>
                        <select id="thanhpho" name="thanhpho" ng-model="storeinfo.thanhpho" class="form-control" ng-init="storeinfo.thanhpho = options[0]">
                            <option value="0" selected="selected">Chọn thành phố</option>
                            <option ng-repeat="item in thanhpholist" value="{{item.IDCITY}}">{{item.NAME_VN}}</option>
                            </select>


                    </th>
                    <th>
                        <select id="huyen" name="huyen" ng-model="storeinfo.huyen" class="form-control" ng-init="storeinfo.thanhpho = options[0]">
                                <option value="0" selected="selected">Chọn Huyện</option>
                                <option ng-repeat="item in huyenlist" value="{{item.IDCITY}}">{{item.NAME_VN}}</option>
                            </select>
                    </th>
                    <th>
                        <select id="phuong" name="phuong" ng-model="storeinfo.phuong" class="form-control" ng-init="storeinfo.thanhpho = options[0]">
                                <option value="0" selected="selected">Chọn Huyện</option>
                                <option ng-repeat="item in phuonglist" value="{{item.IDCITY}}">{{item.NAME_VN}}</option>
                            </select>
                    </th>
                    <th>
                        <input type="text" ng-model="storeinfo.diachi" name="diachi" class="form-control">
                    </th>


                    <th>
                        <button id="add" ng-click="addstore(storeinfo)" name="submit" class="btn btn-primary btn-sm">Add</button>
                    </th>


                </tr>
                <tr bgcolor="#eee">
                    <th nowrap="">#</th>

                    <th nowrap="">Tỉnh/Thành phố</th>
                    <th nowrap="">Quận/Huyện</th>
                    <th nowrap="">Phường/Xã</th>
                    <th nowrap="">Địa chỉ</th>

                    <th nowrap="">Function</th>
                </tr>
            </thead>

            <tbody>
                <tr ng-onload ng-repeat="item in liststore">
                    <td title="44">{{$index + 1}}</td>
                    <td>

                        <span editable-select="item.cityid" e-name="group1" onshow="loadthanhpho()" e-form="rowform" e-ng-options="g.IDCITY as g.NAME_VN for g in groups1">
                        {{ showThanhpho(item)}}
                    </span>
                    </td>
                    <td>
                        <span editable-select="item.huyenid" e-name="group2" onshow="loadhuyen()" e-form="rowform" e-ng-options="g.IDCITY as g.NAME_VN for g in groups2">
                            {{ showHuyen(item)}}
                        </span>
                    </td>
                    <td>
                        <span editable-select="item.phuongid" e-name="group3" onshow="loadphuong()" e-form="rowform" e-ng-options="g.IDCITY as g.NAME_VN for g in groups3">
                            {{ showPhuong(item)}}
                        </span>
                    </td>
                    <td>
                        <span editable-text="item.diachi" e-name="name" e-form="rowform">
                            {{item.diachi}}
                        </span>
                    </td>


                    <td nowrap="">

                        <!-- form -->
                        <form editable-form name="rowform" onaftersave="editstore(item)" ng-show="rowform.$visible" class="form-buttons form-inline">
                            <button type="submit" ng-disabled="rowform.$waiting" class="btn btn-primary">
                            Save
                        </button>
                            <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-default">
                            Cancel
                        </button>
                        </form>
                        <div class="buttons" ng-show="!rowform.$visible">
                            <button type="button" class="btn btn-warning btn-sm" ng-click="rowform.$show()"><i class="fas fa-pencil-alt"></i></button>
                            <button type="button" class="btn btn-danger" ng-click="deletestore(item)"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
        <div id="bando">
            <iframe src="https://www.google.com/maps/d/embed?mid=159s-1wCoZkwky9kBB4A2wZurJIlpjeut"></iframe>
        </div>

    </div>
    <script>
        // angulajs
        app.run(function(editableOptions) {
            editableOptions.theme = 'bs3';
        });



        app.controller("storeController", ['$scope', '$filter', "store", function($scope, $filter, store) {
            // select thanh pho
            $scope.groups1 = [];
            $scope.loadthanhpho = function() {
                store.getcity().then(function(response) {
                    $scope.groups1 = response.data;

                });
            };


            $scope.showThanhpho = function(thanhpho) {

                if (thanhpho.group1 && $scope.groups1.length) {

                    var selected = $filter('filter')($scope.groups1, {
                        IDCITY: 10
                    });

                    return selected.length ? selected[0].cityname : 'Not set';
                } else {
                    return thanhpho.cityname;
                }
            };
            // select huyen
            $scope.groups2 = [];
            $scope.loadhuyen = function() {
                store.gethuyen().then(function(response) {
                    $scope.groups2 = response.data;
                });
            };
            $scope.showHuyen = function(huyen) {
                if (huyen.group2 && $scope.groups2.length) {
                    var selected = $filter('filter')($scope.groups2, {
                        IDCITY: huyen.huyenid
                    });
                    return selected.length ? selected[0].huyenname : 'Not set';
                } else {
                    return huyen.huyenname;
                }
            };
            // select phuong
            $scope.groups3 = [];
            $scope.loadphuong = function() {
                store.getphuong().then(function(response) {
                    $scope.groups3 = response.data;
                });
            };
            $scope.showPhuong = function(phuong) {
                if (phuong.group3 && $scope.groups3.length) {
                    var selected = $filter('filter')($scope.groups3, {
                        id: phuong.phuongid
                    });
                    return selected.length ? selected[0].phuongname : 'Not set';
                } else {
                    return phuong.phuongname;
                }
            };

            store.getallStore().then(function(response) {
                $scope.liststore = response.data;
            })
            store.getcity().then(function(response) {
                $scope.thanhpholist = response.data;
                $(document).ready(function() {
                    $('#thanhpho').change(function() {
                        var city_id = $(this).val();
                        store.gethuyen(city_id).then(function(response2) {
                            $scope.huyenlist = response2.data;
                            $(document).ready(function() {
                                $('#huyen').change(function() {
                                    var huyen_id = $(this).val();
                                    store.getphuong(huyen_id).then(function(response3) {
                                        $scope.phuonglist = response3.data;
                                    });
                                });
                            });
                        });
                    });
                })
            });
            $scope.addstore = function(storeinfo) {
                store.addstore(storeinfo).then(function(response) {
                    $scope.liststore = response.data;
                });
            }
            $scope.deletestore = function(item) {

                store.deletestore(item).then(function(response) {
                    $scope.liststore = response.data;
                });
            }
        }]);
        app.factory("store", ["$http", function($http) {
            return {
                getallStore: function() {
                    return $http.get("/api/allstorelist");
                },
                getcity: function() {
                    return $http.get("/api/citylocate");
                },
                gethuyen: function(city_id) {
                    return $http.get("/api/huyenlocate?city_id=" + city_id);
                },
                getphuong: function(huyen_id) {
                    return $http.get("/api/phuonglocate?huyen_id=" + huyen_id);
                },
                addstore: function(storeinfo) {
                    return $http.post("/api/addstore", storeinfo);
                },
                deletestore: function(item) {
                    return $http.delete("/api/delete/" + item.id);
                },
            }

        }]);
    </script>
    <%- include('footer'); %>