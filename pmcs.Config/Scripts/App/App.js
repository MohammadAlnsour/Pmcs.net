
(function () {

    $(document).ajaxStart(function () {
        $("#loadingdiv").css({ "display": "" });
    });
    $(document).ajaxStop(function () {
        $("#loadingdiv").css({ "display": "none" });
    });
    $(document).ajaxError(function () {
        $("#loadingdiv").css({ "display": "none" });
    });


})();