
$(".datepicker").datepicker();
$('.selectpicker').selectpicker({ liveSearch: true, maxOptions: 1 });
$('#calendar').datepicker({});

$("document").ready(function () {
    $('.datatable').DataTable({
        ordering: false
    });
});

//$(".datatable").DataTable({ "ordering": false });
//if ($.fn.dataTable.isDataTable('.datatable')) {
//    //table = $('.datatable').DataTable();
//}
//else {
//    table = 
//}


!function ($) {
    $(document).on("click", "ul.nav li.parent > a ", function () {
        $(this).find('em').toggleClass("fa-minus");
    });
    $(".sidebar span.icon").find('em:first').addClass("fa-plus");
}

    (window.jQuery);
$(window).on('resize', function () {
    if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
})
$(window).on('resize', function () {
    if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
})

$(document).on('click', '.panel-heading span.clickable', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('em').removeClass('fa-toggle-up').addClass('fa-toggle-down');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('em').removeClass('fa-toggle-down').addClass('fa-toggle-up');
    }
})

$(document).bind("ajaxSend", function () {
    $("#loadingdiv").show();
}).bind("ajaxComplete", function () {
    $("#loadingdiv").hide();
});
