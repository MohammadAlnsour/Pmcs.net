
class AddPAT extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            PATTypes: "",
            PATInspectors: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddNewModal = this.OpenAddNewModal.bind(this);
        this.SaveEntityData = this.SaveEntityData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);

        this.LoadPATTypes = this.LoadPATTypes.bind(this);
        this.LoadInspectors = this.LoadInspectors.bind(this);
    }
    LoadPATTypes() {
        var component = this;
        $.get("/api/Lookups/GetPATStatusTypes")
            .done(function (PATTypes) {
                if (PATTypes != null) {
                    var PATTypesHtml = [];
                    for (var i = 0; i < PATTypes.length; i++) {
                        PATTypesHtml.push(
                            <option value={PATTypes[i].Id}>{PATTypes[i].Name}</option>
                        );
                    }
                    component.setState({
                        PATTypes: PATTypesHtml
                    });
                    $('.selectpicker').selectpicker('refresh');
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
    LoadInspectors() {
        var component = this;
        $.get("/api/Auth/GetInspectors")
            .done(function (inspectors) {
                if (inspectors != null) {
                    var inspectorsUsers = [];
                    for (var i = 0; i < inspectors.length; i++) {
                        inspectorsUsers.push(
                            <option value={inspectors[i].UserId}>{inspectors[i].FullName}</option>
                        );
                    }
                    component.setState({
                        PATInspectors: inspectorsUsers
                    });
                    $('.selectpicker').selectpicker('refresh');
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
        $("#addNewPATModal").modal("hide");
    }
    OpenAddNewModal() {
        $("#addNewPATModal").modal("show");
    }
    ClearUpForm() {
        $("#FormAddPAT")[0].reset();
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
        $('#FormAddPAT').validate({
            rules: {
                SelectPATStatusId: {
                    required: true
                },
                TxtPATCompletionDate: {
                    required: true
                },
                TxtPATIssueDate: {
                    required: true
                },
                TxtOILClearedDate: {
                    //maxlength: 15,
                    //minlength: 1,
                    //onlynumbers: true
                },
                SelectPATSupervisorId: {
                    required: true
                }
            },
            messages: {
                SelectPATStatusId: {
                    required: "Please enter this required field."
                },
                TxtPATCompletionDate: {
                    required: "Please enter this required field."
                },
                TxtPATIssueDate: {
                    required: "Please enter this required field."
                },
                TxtOILClearedDate: {
                    minlength: "This field should contain at least 1 number.",
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "Not valid number, a valid number is required"
                },
                SelectPATSupervisorId: {
                    required: "Please enter this required field."
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
        if ($("#FormAddPAT").valid()) {

            var settings = {
                method: "POST",
                url: "/api/PATs/PostPAT",
                contentType: "application/json",
                data: JSON.stringify({
                    JobId: $("#HiddenJobId").val(),
                    PATStatusId: $("#SelectPATStatusId").val(),
                    OILClearedDate: $("#TxtOILClearedDate").val(),
                    PATCompletionDate: $("#TxtPATCompletionDate").val(),
                    PATIssueDate: $("#TxtPATIssueDate").val(),
                    FATCompletiondate: $("#TxtFATCompletiondate").val(),
                    Remarks: $("#TxtRemarks").val(),
                    FACIssueDate: $("#TxtFACIssueDate").val(),
                    PATSupervisorId: $("#SelectPATSupervisorId").val(),
                    IsOIL: $("#SelectIsOIL").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivPATTable").html(res);
                    $("#addNewPATModal").modal("hide");
                    component.ClearUpForm();

                    $.notify(
                        {
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
        $(".datepicker").datepicker();
        this.LoadPATTypes();
        this.LoadInspectors();
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button className="btn btn-primary" onClick={this.OpenAddNewModal}>
                                    <i className="fa fa-plus-circle"></i>&nbsp;
                                      Issue PAT
                                </button>
                            </td>
                        </tr>
                        <tr><td>&nbsp;</td></tr>
                    </tbody>
                </table>
                <div id="addNewPATModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New PAT</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddPAT">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    PAT Status Type: *
                                                </td>
                                                <td>
                                                    <select id="SelectPATStatusId" name="SelectPATStatusId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select PAT Status</option>
                                                        {this.state.PATTypes}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PAT Completion Date : *
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtPATCompletionDate" name="TxtPATCompletionDate" readOnly className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    PAT Issue Date : *
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtPATIssueDate" name="TxtPATIssueDate" readOnly className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    OIL Cleared Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtOILClearedDate" name="TxtOILClearedDate" readOnly className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    FAT Completion Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtFATCompletiondate" name="TxtFATCompletiondate" readOnly className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    FAC Issue Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtFACIssueDate" name="TxtFACIssueDate" readOnly className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Is OIL :
                                                </td>
                                                <td>
                                                    <select id="SelectIsOIL" name="SelectIsOIL" style={{ width: '100%' }} className="form-control" >
                                                        <option value="false">No</option>
                                                        <option value="true">Yes</option>
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Remarks :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtRemarks" name="TxtRemarks" maxLength="300" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    PAT Inspector: *
                                                </td>
                                                <td>
                                                    <select id="SelectPATSupervisorId" name="SelectPATSupervisorId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select PAT Supervisor</option>
                                                        {this.state.PATInspectors}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.SaveEntityData}>Save Item</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

ReactDOM.render(<AddPAT />,
    document.getElementById("DivAddPAT"));