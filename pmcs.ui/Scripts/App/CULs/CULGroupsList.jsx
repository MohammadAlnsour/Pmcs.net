
class AddCULGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CULItems: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddCULGroupModal = this.OpenAddCULGroupModal.bind(this);
        this.SaveCULGroupData = this.SaveCULGroupData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.LoadCULItems = this.LoadCULItems.bind(this);
    }
    CloseModal() {
        $("#AddCULGroupModal").modal("hide");
    }
    OpenAddCULGroupModal() {
        $("#AddCULGroupModal").modal("show");
    }
    ClearUpForm() {
        $("#FormAddCULGroup")[0].reset();
    }
    SaveCULGroupData() {
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
        $('#FormAddCULGroup').validate({
            rules: {
                TxtKey: {
                    required: true,
                    maxlength: 20,
                    minlength: 1
                },
                TxtDescription: {
                    required: true,
                    maxlength: 100,
                    minlength: 3
                }
            },
            messages: {
                TxtKey: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 20 characters"
                },
                TxtDescription: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 100 characters"
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

        if ($("#FormAddCULGroup").valid()) {
            var settings = {
                method: "POST",
                url: "/api/CULs/PostCULGroup",
                contentType: "application/json",
                data: JSON.stringify({
                    Key: $("#TxtKey").val(),
                    Description: $("#TxtDescription").val(),
                    IsActive: true,
                    CULItemsIds: $("#SelectCULItems").val()
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivCULGroupsList").html(res);
                    $("#AddCULGroupModal").modal("hide");
                    component.ClearUpForm();
                    $.notify(
                        {
                            // icon: "fa fa-check-square",
                            message: "<i class='fa fa-check-square' style='font-size:30px; float: left;'></i>  <h5 style='float: left;'> The action has been completed successfully. </h5> <br /><br />"
                        },
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
    LoadCULItems() {
        //$("#SelectCULItems").val("");
        var component = this;
        $.get("/api/CULs/GetCULs")
            .done(function (CULItems) {
                if (CULItems != null) {
                    var options = [];
                    for (var i = 0; i < CULItems.length; i++) {
                        options.push(
                            <option value={CULItems[i].CULId}>{CULItems[i].Description}</option>
                        );
                    }
                    component.setState({
                        CULItems: options
                    });
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
    componentDidMount() {
        this.LoadCULItems();
        //var component = this;
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">

                <button className="btn btn-primary" onClick={this.OpenAddCULGroupModal}>
                    <i className="fa fa-plus-circle"></i>&nbsp;
                    Add New CUL Group
                </button>
                <br />
                <br />
                <div id="AddCULGroupModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New CUL Group</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddCULGroup">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Key : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtKey" name="TxtKey" className="form-control" />
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
                                                    CUL Items : *
                                                </td>
                                                <td colSpan="4">
                                                    <select id="SelectCULItems" name="SelectCULItems" style={{ width: '100%' }} className="selectpicker" multiple data-live-search="true" data-live-search-placeholder="Search" >
                                                        {this.state.CULItems}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.SaveCULGroupData}>Save CUL</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

class EditCULGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CULItems: ""
        };
        this.CloseModal = this.CloseModal.bind(this);
        this.EditCULGroup = this.EditCULGroup.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.LoadCULGroup = this.LoadCULGroup.bind(this);
        this.LoadCULItems = this.LoadCULItems.bind(this);
    }
    LoadCULGroup() {
        var groupId = $("#HiddenCULGroupId").val();
        $.get("/api/CULs/GetCULGroup/" + groupId)
            .done(function (culGroup) {
                if (culGroup != null) {
                    $("#TxtEditKey").val(culGroup.Key);
                    $("#TxtEditDescription").val(culGroup.Description);
                    $.get("/api/CULs/GetGroupCULs/" + groupId)
                        .done(function (culs) {
                            if (culs != null) {
                                for (var i = 0; i < culs.length; i++) {
                                    $("#SelectEditCULItems option[value='" + culs[i].CULId + "']").prop("selected", true);
                                }
                                $('.selectpicker').selectpicker('refresh');
                                $("#EditCULGroupModal").modal("show");
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

                    $("#EditCULGroupModal").modal("show");
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
        $("#EditCULGroupModal").modal("hide");
    }
    ClearUpForm() {
        $("#FormEditCULGroup")[0].reset();
    }
    EditCULGroup() {
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
        $('#FormEditCULGroup').validate({
            rules: {
                TxtEditKey: {
                    required: true,
                    maxlength: 20,
                    minlength: 1
                },
                TxtEditDescription: {
                    required: true,
                    maxlength: 100,
                    minlength: 3
                }
            },
            messages: {
                TxtEditKey: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 20 characters"
                },
                TxtEditDescription: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 100 characters"
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

        if ($("#FormEditCULGroup").valid()) {
            var settings = {
                method: "PUT",
                url: "/api/CULs/UpdateCULGroup",
                contentType: "application/json",
                data: JSON.stringify({
                    CULGroupId: $("#HiddenCULGroupId").val(),
                    Key: $("#TxtEditKey").val(),
                    Description: $("#TxtEditDescription").val(),
                    IsActive: true,
                    CULItemsIds: $("#SelectEditCULItems").val()
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivCULGroupsList").html(res);
                    $("#EditCULGroupModal").modal("hide");
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
    LoadCULItems() {
        var component = this;
        $.get("/api/CULs/GetCULs")
            .done(function (CULItems) {
                if (CULItems != null) {
                    var options = [];
                    for (var i = 0; i < CULItems.length; i++) {
                        options.push(
                            <option value={CULItems[i].CULId}>{CULItems[i].Description}</option>
                        );
                    }
                    component.setState({
                        CULItems: options
                    });
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
    componentDidMount() {
        this.LoadCULItems();
        var component = this;
        $("body").on("click", "button[id^='BtnEditCULGroup_']", function (e) {
            var culId = $(this).attr("id").split("_")[1];
            $("#HiddenCULGroupId").val(culId);
            //$("#SelectEditCULItems").val("");
            component.LoadCULGroup();
        });
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div>
                <div id="EditCULGroupModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit CUL Item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditCULGroup">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Code : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditKey" name="TxtEditCULCode" className="form-control" />
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
                                                    CUL Items : *
                                                </td>
                                                <td colSpan="4">
                                                    <select id="SelectEditCULItems" style={{ width: '100%' }} className="selectpicker" multiple data-live-search="true" data-live-search-placeholder="Search" >
                                                        {this.state.CULItems}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.EditCULGroup}>Edit CUL</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


ReactDOM.render(<EditCULGroup />,
    document.getElementById("DivEditCULGroup"));

ReactDOM.render(<AddCULGroup />,
    document.getElementById("DivAddCULGroup"));