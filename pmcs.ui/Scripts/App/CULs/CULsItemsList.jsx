
class AddCULItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CULGroups: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddNewCULModal = this.OpenAddNewCULModal.bind(this);
        this.SaveCULData = this.SaveCULData.bind(this);
        //  this.FilterCULGroups = this.FilterCULGroups.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.FillTable = this.FillTable.bind(this);
    }
    CloseModal() {
        $("#addNewCULModal").modal("hide");
    }
    OpenAddNewCULModal() {
        $("#addNewCULModal").modal("show");
    }
    ClearUpForm() {
        $("#FormAddCUL")[0].reset();
    }
    SaveCULData() {
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
        $('#FormAddCUL').validate({
            rules: {
                TxtCULCode: {
                    required: true,
                    maxlength: 20,
                    minlength: 1
                },
                TxtDescription: {
                    required: true,
                    maxlength: 100,
                    minlength: 3
                },
                TxtUnitprice: {
                    required: true,
                    maxlength: 20,
                    minlength: 1,
                    onlynumbers: true
                },
                TxtDiscount: {
                    required: true,
                    maxlength: 20,
                    minlength: 1,
                    onlynumbers: true
                },
                TxtUnitOfMeasure: {
                    required: true,
                    maxlength: 80,
                    minlength: 2,
                }
            },
            messages: {
                TxtCULCode: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 20 characters"
                },
                TxtDescription: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 100 characters"
                },
                TxtUnitprice: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 20 numbers",
                    onlynumbers: "Please input a valid number."
                },
                TxtDiscount: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 20 numbers",
                    onlynumbers: "Please input a valid number."
                },
                TxtUnitOfMeasure: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 80 numbers",
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

        if ($("#FormAddCUL").valid()) {

            var settings = {
                method: "POST",
                url: "/api/CULs/PostCUL",
                contentType: "application/json",
                data: JSON.stringify({
                    Code: $("#TxtCULCode").val(),
                    Description: $("#TxtDescription").val(),
                    UnitPrice: $("#TxtUnitprice").val(),
                    Discount: $("#TxtDiscount").val(),
                    UnitOfMeasure: $("#TxtUnitOfMeasure").val(),
                    Remarks: $("#TxtRemarks").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivCULList").html(res);
                    $("#addNewCULModal").modal("hide");
                    component.ClearUpForm();

                    $.notify(
                        {
                            // icon: "fa fa-check-square",
                            message: "<i class='fa fa-check-square' style='font-size:30px; float: left;'></i>  <h5 style='float: left;'> The action has been completed successfully. </h5> <br /><br />"
                        }
                        ,
                        {
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
    FillTable(data) {
        if (data != null) {
            $("#TableCULs tbody tr").remove();
            for (var i = 0; i < data.length; i++) {
                var tr = "<tr>" +
                    "<td>" +
                    data[i].CULId +
                    "</td>" +
                    "<td>" +
                    data[i].Code +
                    "</td>" +
                    "<td>" +
                    data[i].Description +
                    "</td>" +
                    "<td>" +
                    data[i].Discount +
                    "</td>" +
                    "<td>" +
                    data[i].UnitPrice +
                    "</td>" +
                    "<td>" +
                    data[i].UnitOfMeasure +
                    "</td>" +
                    "<td>" +
                    "<button class='btn btn-primary btn-xs' id='BtnEditCUL_" + data[i].CULId + "'>" +
                    "<i class='fa fa-refresh'></i>" +
                    "Edit CUL" +
                    "</button>" +
                    "</td>" +
                    "</tr>";
                $("#TableCULs tbody").append(tr);
            }
        }
    }
    componentDidMount() {
        var component = this;

        $('#paginator').pagination({
            total: 100,
            current: 1,
            length: 10,
            size: 2,
            click: function (options, $target) {
                $target.next(".show").text('Current: Page ' + options.current);
            },
            ajax: function (options, refresh, $target) {
                $.ajax({
                    url: '/api/CULs/GetCULsPaged/' + options.length + '/' + options.current
                }).done(function (res) {
                    component.FillTable(res.data);
                    console.log(res.totalNumberOfRecords);
                    refresh({
                        total: res.totalNumberOfRecords,// 可选
                        length: res.pageSize // 可选
                    });
                }).fail(function (error) {

                });
            }
        });

        //this.InitializeGoogleMaps();

        //$('#TableCULs').DataTable({
        //    "paging": true,
        //    "processing": true,
        //    "serverSide": true,
        //    "pageLength": 10,
        //    "ajax": "/api/CULs/GetCULsDataTable",
        //    //aoColumns: [
        //    //    { mData: 'CULId' },
        //    //    { mData: 'Code' },
        //    //    { mData: 'Description' },
        //    //    { mData: 'Discount' },
        //    //    { mData: 'UnitPrice' },
        //    //    { mData: 'UnitOfMeasure' },
        //    //]
        //});
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">
                <button className="btn btn-primary" onClick={this.OpenAddNewCULModal}>
                    <i className="fa fa-plus-circle"></i>&nbsp;
                                      Add New CUL
                </button>
                <br />
                <br />
                <div id="addNewCULModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New CUL Item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddCUL">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Code : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtCULCode" name="TxtCULCode" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Description : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtDescription" name="TxtDescription" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Unit Price : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtUnitprice" name="TxtUnitprice" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Discount : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtDiscount" name="TxtDiscount" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Unit Of Measure : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtUnitOfMeasure" name="TxtUnitOfMeasure" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Remarks :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtRemarks" name="TxtRemarks" className="form-control" />
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
                                <button type="button" className="btn btn-primary" onClick={this.SaveCULData}>Save CUL</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

class EditCULItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Goups: ""
        };
        this.CloseModal = this.CloseModal.bind(this);
        this.EditCULData = this.EditCULData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.LoadCULItem = this.LoadCULItem.bind(this);
    }
    LoadCULItem() {
        //api/CULs/GetCUL/{culId}
        var culId = $("#HiddenCULId").val();
        $.get("/api/CULs/GetCUL/" + culId)
            .done(function (cul) {
                if (cul != null) {
                    $("#TxtEditCULCode").val(cul.Code);
                    $("#TxtEditDescription").val(cul.Description);
                    $("#TxtEditUnitprice").val(cul.UnitPrice);
                    $("#TxtEditDiscount").val(cul.Discount);
                    $("#TxtEditUnitOfMeasure").val(cul.UnitOfMeasure);
                    $("#TxtEditRemarks").val(cul.Remarks);
                    $("#EditCULItemModal").modal("show");
                }
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
        $("#EditCULItemModal").modal("hide");
    }
    ClearUpForm() {
        $("#FormEditCUL")[0].reset();
    }
    EditCULData() {
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
        $('#FormEditCUL').validate({
            rules: {
                TxtEditCULCode: {
                    required: true,
                    maxlength: 20,
                    minlength: 1
                },
                TxtEditDescription: {
                    required: true,
                    maxlength: 100,
                    minlength: 3
                },
                TxtEditUnitprice: {
                    required: true,
                    maxlength: 20,
                    minlength: 1,
                    onlynumbers: true
                },
                TxtEditDiscount: {
                    required: true,
                    maxlength: 20,
                    minlength: 1,
                    onlynumbers: true
                },
                TxtEditUnitOfMeasure: {
                    required: true,
                    maxlength: 80,
                    minlength: 2,
                }
            },
            messages: {
                TxtEditCULCode: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 20 characters"
                },
                TxtEditDescription: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 100 characters"
                },
                TxtEditUnitprice: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 20 numbers",
                    onlynumbers: "Please input a valid number."
                },
                TxtEditDiscount: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 20 numbers",
                    onlynumbers: "Please input a valid number."
                },
                TxtEditUnitOfMeasure: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 80 numbers",
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

        if ($("#FormEditCUL").valid()) {

            var settings = {
                method: "PUT",
                url: "/api/CULs/UpdateCUL",
                contentType: "application/json",
                data: JSON.stringify({
                    CULId: $("#HiddenCULId").val(),
                    Code: $("#TxtEditCULCode").val(),
                    Description: $("#TxtEditDescription").val(),
                    UnitPrice: $("#TxtEditUnitprice").val(),
                    Discount: $("#TxtEditDiscount").val(),
                    UnitOfMeasure: $("#TxtEditUnitOfMeasure").val(),
                    Remarks: $("#TxtEditRemarks").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivCULList").html(res);
                    $("#EditCULItemModal").modal("hide");
                    component.ClearUpForm();

                    $.notify(
                        {
                            // icon: "fa fa-check-square",
                            message: "<i class='fa fa-check-square' style='font-size:30px; float: left;'></i>  <h5 style='float: left;'> The action has been completed successfully. </h5> <br /><br />"
                        }
                        ,
                        {
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
        $("body").on("click", "button[id^='BtnEditCUL_']", function (e) {
            var culId = $(this).attr("id").split("_")[1];
            $("#HiddenCULId").val(culId);
            component.LoadCULItem();
        });
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div>
                <div id="EditCULItemModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit CUL Item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditCUL">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Code : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditCULCode" name="TxtEditCULCode" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Description : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditDescription" name="TxtEditDescription" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Unit Price : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditUnitprice" name="TxtEditUnitprice" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Discount : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditDiscount" name="TxtEditDiscount" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Unit Of Measure : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditUnitOfMeasure" name="TxtEditUnitOfMeasure" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Remarks :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditRemarks" name="TxtEditRemarks" className="form-control" />
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
                                <button type="button" className="btn btn-primary" onClick={this.EditCULData}>Edit CUL</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

class SearchCULItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Results: ""
        };
        this.SearchAction = this.SearchAction.bind(this);
    }
    SearchAction() {
        var searchText = $("#TxtSearch").val();
        if (searchText !== '' && searchText != null) {
            $.get("/api/CULs/SearchCULs/" + searchText)
                .done(function (res) {
                    $("#DivCULList").html(res);
                    //$.notify(
                    //    {
                    //        // icon: "fa fa-check-square",
                    //        message: "<i class='fa fa-check-square' style='font-size:30px; float: left;'></i>  <h5 style='float: left;'> The action has been completed successfully. </h5> <br /><br />"
                    //    }
                    //    ,
                    //    {
                    //        type: 'success',
                    //        timer: 2000,
                    //        placement: {
                    //            from: 'top',
                    //            align: 'center'
                    //        }
                    //    });
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
    }
    render() {
        return (
            <div className="col-md-12 row">
                <div className="col-md-2 row">
                    Search CULs Items :
                </div>
                <div className="col-md-9 row">
                    <div className="col-md-5 row">
                        <input type="text" className="form-control" id="TxtSearch" name="TxtSearch" maxLength="20" />
                    </div>
                    <div className="col-md-1 row"></div>
                    <div className="col-md-3 row">
                        <button className="btn btn-primary" id="BtnSearchNow" name="BtnSearchNow" onClick={this.SearchAction}>Search</button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<EditCULItem />,
    document.getElementById("DivEditCUL"));

ReactDOM.render(<SearchCULItems />,
    document.getElementById("DivSearchCUL"));

ReactDOM.render(<AddCULItem />,
    document.getElementById("DivAddCUL"));