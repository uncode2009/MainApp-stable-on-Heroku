angular.module('postModule')

.controller('postCtrl', function($scope, $routeParams, post, idService) {

    $scope.post = post;

    $scope.size = 150;
    $scope.correctionLevel = '';
    $scope.typeNumber = 0;
    $scope.inputMode = '';
    $scope.image = true;
    $scope.qrstring = post.source;


    $scope.starArr = [{
            id: "star1",
            value: 1
        }, {
            id: "star2",
            value: 2
        }, {
            id: "star3",
            value: 3
        }, {
            id: "star4",
            value: 4
        }, {
            id: "star5",
            value: 5
        }

    ]



    $scope.doTheBack = function() {
        window.history.back();
    };

    $scope.rate = function(elem) {

        console.log(elem.value);

        var rateSum = post.rateSum;
        var rateCount = post.rateCount;
        var rateWidth = post.rateResult;

        console.log(rateSum, rateCount, rateWidth);

        var itemVal = elem.value;
        console.log("value:", itemVal);
        rateSum += +itemVal;
        console.log("rateSum:", rateSum);
        rateCount++;
        console.log("rateCount:", rateCount);
        rateWidth = +rateSum / rateCount;
        console.log("length:", length);
        var result = rateWidth * 20 + "%";
        console.log("result:", result);

        idService.updateApp(rateSum,rateCount,result,post._id.$oid);

    }


});
