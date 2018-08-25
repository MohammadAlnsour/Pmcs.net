
class EditElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CULs: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenEditModal = this.OpenEditModal.bind(this);
        this.SaveEntityData = this.SaveEntityData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.LoadElement = this.LoadElement.bind(this);
    }
    LoadElement() {
        var component = this;
        var elementId = $("#HiddenId").val();
        $.get("/api/Elements/GetElement/" + elementId)
            .done(function (element) {
                if (element != null) {
                    $("#TxtEditElementName").val(element.ElementName);
                    $("#TxtEditElementName2").val(element.ElementName2);
                    $("#TxtEditDescription").val(element.Description);
                    component.OpenEditModal();
                }
                $('.selectpicker').selectpicker('refresh');
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                $.notify(
                    {
                        icon: "fa fa-exclamation-square",
                        message: "Sorry, an error has occured : " + jqXHR.responseText
                    },
                    {
                        type: 'danger',
                        timer: 2000,
                        placement: {
                            from: 'top',
                            align: 'center'
                        }
                    });
            });
    }
    CloseModal() {
        $("#EditElementModal").modal("hide");
    }
    OpenEditModal() {
        $("#EditElementModal").modal("show");
    }
    ClearUpForm() {
        $("#FormEditElement")[0].reset();
    }
    SaveEntityData() {
        var component = this;

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
        $('#FormAddEntity').validate({
            rules: {
                TxtEditElementName: {
                    required: true,
                    maxlength: 50,
                    minlength: 2
                },
                TxtEditElementName2: {
                    required: false,
                    maxlength: 50,
                    minlength: 2
                },
                Description: {
                    maxlength: 300,
                    minlength: 2
                }
            },
            messages: {
                TxtEditElementName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                TxtEditElementName2: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                Description: {
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 200 characters"
                }
            },
            errorElement: 'div',
            errorLabelContainer: '.alert alert-danger',
            errorPlacement: function (errorlabel, element) {
                errorlabel.addClass("alert bg-danger");
                $(errorlabel).css({ position: "fixed" });
                errorlabel.insertAfter(element);
            }
        });
        if ($("#FormAddEntity").valid()) {

            var settings = {
                method: "PUT",
                url: "/api/Elements/EditElement",
                contentType: "application/json",
                data: JSON.stringify({
                    ElementId: $("#HiddenId").val(),
                    ElementName: $("#TxtEditElementName").val(),
                    ElementName2: $("#TxtEditElementName2").val(),
                    Description: $("#TxtEditDescription").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivEntityList").html(res);
                    $("#EditElementModal").modal("hide");
                    component.ClearUpForm();
                    $.notify(
                        {
                            // icon: "fa fa-check-square",
                            message: "<i class='fa fa-check-square' style='font-size:30px; float: left;'></i>  <h5 style='float: left;'> &nbsp; The action has been completed successfully. </h5> <br /><br />"
                        }, {
                            type: 'success',
                            timer: 2000,
                            placement: {
                                from: 'top',
                                align: 'center'
                            }
                        });
                })
                .fail(function (xhr, responseText) {
                    $.notify(
                        {
                            icon: "fa fa-exclamation-square",
                            message: "A problem has occured : " + xhr.responseText
                        }
                        ,
                        {
                            type: 'danger',
                            timer: 2000,
                            placement: {
                                from: 'top',
                                align: 'center'
                            }
                        });
                });
        }
    }
    componentDidMount() {
        var component = this;
        $("body").on("click", "button[id^='BtnEditElement_']", function (e) {
            var elementId = $(this).attr("id").split("_")[1];
            $("#HiddenId").val(elementId);
            $(".datepicker").datepicker();
            component.LoadElement();
        });
        $("body").on("click", "button[id^='BtnJobs_']", function (e) {
            var elementId = $(this).attr("id").split("_")[1];
            $("#HiddenId").val(elementId);
            window.location.href = '/Contracts/Elements/' + elementId + '#jobs';
        });
        $("body").on("click", "button[id^='BtnBoQ_']", function (e) {
            var boqId = $(this).attr("id").split("_")[1];
            $("#HiddenId").val(boqId);
            window.location.href = '/Contracts/Elements/' + boqId + '#BOQs';
        });
        $("body").on("click", "button[id^='BtnDiscounts_']", function (e) {
            var boqId = $(this).attr("id").split("_")[1];
            $("#HiddenId").val(boqId);
            window.location.href = '/Contracts/Elements/' + boqId + '#Discounts';
        });
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">

                <div id="EditElementModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Element</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditElement">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Element1 : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditElementName" name="TxtEditElementName" maxLength="50" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Element2 : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditElementName2" name="TxtEditElementName2" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Description : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditDescription" name="TxtEditDescription" maxLength="200" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.SaveEntityData}>Edit Item</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

ReactDOM.render(<EditElement />,
    document.getElementById("DivEditEntity"));