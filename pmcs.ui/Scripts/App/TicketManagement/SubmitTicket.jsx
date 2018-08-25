
class SubmitTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Modules: "",
            Users: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenSubmitTicketModal = this.OpenSubmitTicketModal.bind(this);
        this.SaveTicketData = this.SaveTicketData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.LoadSystemModules = this.LoadSystemModules.bind(this);
        this.LoadAssignedTo = this.LoadAssignedTo.bind(this);

    }
    LoadSystemModules() {
        var component = this;
        $.get("/api/Lookups/GetSystemModules")
            .done(function (modules) {
                if (modules != null) {
                    var modulesHtml = [];
                    for (var i = 0; i < modules.length; i++) {
                        modulesHtml.push(
                            <option value={modules[i].ModuleId}>{modules[i].ModuleName}</option>
                        );
                    }
                    component.setState({
                        Modules: modulesHtml
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
    LoadAssignedTo() {
        var component = this;
        $.get("/api/Auth/GetUsersExceptCurrent")
            .done(function (users) {
                if (users != null) {
                    var usersHtml = [];
                    for (var i = 0; i < users.length; i++) {
                        usersHtml.push(
                            <option value={users[i].UserId}>{users[i].FullName}</option>
                        );
                    }
                    component.setState({
                        Users: usersHtml
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
        $("#SubmitTicketModal").modal("hide");
    }
    OpenSubmitTicketModal() {
        $("#SubmitTicketModal").modal("show");
    }
    ClearUpForm() {
        $("#FormSubmitTicket")[0].reset();
    }
    SaveTicketData() {
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
        $('#FormSubmitTicket').validate({
            rules: {
                SelectModuleId: {
                    required: true
                },
                TxtTicketSubject: {
                    required: true,
                    maxlength: 100,
                    minlength: 1
                },
                TxtDescription: {
                    required: true,
                    maxlength: 1000,
                    minlength: 1
                },
                SelectSeverityId: {
                    required: true
                },
                SelectStatus: {
                    required: true
                },
                SelectAssignedTo: {
                    required: true
                }

            },
            messages: {
                SelectModuleId: {
                    required: "Please enter this required field."
                },
                TxtTicketSubject: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 100 characters"
                },
                TxtDescription: {
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 1000 numbers"
                },
                SelectSeverityId: {
                    required: "Please enter this required field."
                },
                SelectStatus: {
                    required: "Please enter this required field."
                },
                SelectAssignedTo: {
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
        if ($("#FormSubmitTicket").valid()) {

            var settings = {
                method: "POST",
                url: "/api/Tickets/PostTicket",
                contentType: "application/json",
                data: JSON.stringify({
                    ModuleId: $("#SelectModuleId").val(),
                    TicketSubject: $("#TxtTicketSubject").val(),
                    Description: $("#TxtDescription").val(),
                    SeverityId: $("#SelectSeverityId").val(),
                    Stage: "",
                    PriorityId: $("#SelectSeverityId").val(),
                    Status: $("#SelectStatus").val(),
                    AssignedTo: $("#SelectAssignedTo").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#divTableContainer").html(res);
                    $("#SubmitTicketModal").modal("hide");
                    component.ClearUpForm();

                    $.notify(
                        {
                            // icon: "fa fa-check-square",
                            message: "<i class='fa fa-check-square' style='font-size:30px; float: left;'></i>  <h5 style='float: left;'> &nbsp; The action has been completed successfully. </h5> <br /><br />"
                        }
                        , {
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
        this.LoadSystemModules();
        this.LoadAssignedTo();
        //$('.datatable').DataTable({
        //    ordering: false
        //});
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">
                <button className="btn btn-primary" onClick={this.OpenSubmitTicketModal}>
                    <i className="fa fa-plus-circle"></i>&nbsp;
                    Submit Ticket
                </button>
                <br />
                <br />
                <div id="SubmitTicketModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Purchase Order</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormSubmitTicket">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Module : *
                                                </td>
                                                <td>
                                                    <select id="SelectModuleId" name="SelectModuleId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="Modules">
                                                            <option value="">Select Module</option>
                                                            {this.state.Modules}
                                                        </optgroup>
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Ticket Subject : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtTicketSubject" name="TxtTicketSubject" maxLength="100" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Description :
                                                </td>
                                                <td>
                                                    <textarea id="TxtDescription" name="TxtDescription" maxLength="1000" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Severity : *
                                                </td>
                                                <td>
                                                    <select id="SelectSeverityId" name="SelectSeverityId" style={{ width: '100%' }} className="form-control" >
                                                        <option value="1">Enhancement</option>
                                                        <option value="2">Normal</option>
                                                        <option value="3">High</option>
                                                        <option value="4">Critical</option>
                                                        <option value="5">Blocker</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Status : *
                                                </td>
                                                <td>
                                                    <select id="SelectStatus" name="SelectStatus" style={{ width: '100%' }} className="form-control" >
                                                        <option value="1">Open</option>
                                                        <option value="2">Closed</option>
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Assigned To : *
                                                </td>
                                                <td>
                                                    <select id="SelectAssignedTo" name="SelectAssignedTo" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="Assigned To">
                                                            {this.state.Users}
                                                        </optgroup>
                                                    </select>
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
                                <button type="button" className="btn btn-primary" onClick={this.SaveTicketData}>Submit Ticket</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<SubmitTicket />,
    document.getElementById("DivSubmitTicket"));