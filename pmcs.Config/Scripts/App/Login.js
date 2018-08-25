(function () {

    $.validator.addMethod("onlyleters", function (value, element) {
        return this.optional(element) || /^[+]?[\s\d\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF?,-]+([.][\s\d\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF?,-])?$/.test(value);
    }, '');
    $.validator.addMethod("onlynumbers", function (value, element) {
        return this.optional(element) || /^[+]?[0-9]+([.][0-9])?$/.test(value);
    }, '');
    $.validator.addMethod("validateEmail", function (value, element) {
        return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }, '');
    $.validator.addMethod("validateURL", function (value, element) {
        return this.optional(element) || /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value);
    }, '');
    $.validator.addMethod("mustEqual", function (value, element, originalInput) {
        var orginalvalue = $(originalInput).val();
        return orginalvalue === value;
    }, '');
    $.validator.addMethod("afterDate", function (endDate, element, startDateField) {
        var startDate = $(startDateField).val();
        //   1438/09/11
        var startYear = startDate.split('/')[0];
        var startMonth = startDate.split('/')[1];
        var startDay = startDate.split('/')[2];

        var endYear = endDate.split('/')[0];
        var endMonth = endDate.split('/')[1];
        var endDay = endDate.split('/')[2];

        var startDateValue = new Date(startYear, startMonth, startDay);
        var endDateValue = new Date(endYear, endMonth, endDay);

        return +startDateValue <= +endDateValue;

    }, '');
    var validator = $('#loginForm').validate({
        rules: {
            Username: {
                required: true,
                maxlength: 50,
                minlength: 5
            },
            password: {
                required: true,
                maxlength: 50,
                minlength: 3
            }
        },
        messages: {
            Username: {
                required: "Please enter this required field.",
                minlength: "This field should contain at least 5 characters.",
                maxlength: "This field should not exceeds 50 characters"
            },
            password: {
                required: "Please enter this required field.",
                minlength: "This field should contain at least 3 characters.",
                maxlength: "This field should not exceeds 50 characters"
            }
        },
        errorElement: 'div',
        errorLabelContainer: '.alert alert-danger',
        errorPlacement: function (error, element) {
            $(error).css({ color: "red" });
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error);
            } else {
                error.insertAfter(element);
            }
        }
    });


})();