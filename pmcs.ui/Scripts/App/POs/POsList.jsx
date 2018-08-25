
class AddPO extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CULGroups: "",
            TasksMilestones: "",
            Contractors: "",
            Currencies: "",
            Projects: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddNewPOModal = this.OpenAddNewPOModal.bind(this);
        this.SavePOData = this.SavePOData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.LoadCULGroups = this.LoadCULGroups.bind(this);
        this.LoadProjects = this.LoadProjects.bind(this);
        this.LoadContractors = this.LoadContractors.bind(this);
        this.LoadCurrencies = this.LoadCurrencies.bind(this);
        this.LoadTaskByProjectId = this.LoadTaskByProjectId.bind(this);

    }
    LoadCULGroups() {
        var component = this;
        $.get("/api/CULs/GetCULGroups")
            .done(function (culGroups) {
                if (culGroups != null) {
                    var groups = [];
                    for (var i = 0; i < culGroups.length; i++) {
                        groups.push(
                            <option value={culGroups[i].CULGroupId}>{culGroups[i].Description}</option>
                        );
                    }
                    component.setState({
                        CULGroups: groups
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
    LoadProjects() {
        var component = this;
        $.get("/api/Projects/GetProjectsList")
            .done(function (projects) {
                if (projects != null) {
                    var projectHtml = [];
                    for (var i = 0; i < projects.length; i++) {
                        projectHtml.push(
                            <option value={projects[i].ProjectId}>{projects[i].ProjectName}</option>
                        );
                    }
                    component.setState({
                        Projects: projectHtml
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
    LoadContractors() {
        var component = this;
        $.get("/api/Contractors/GetContractors")
            .done(function (contractors) {
                if (contractors != null) {
                    var contractorsHtml = [];
                    for (var i = 0; i < contractors.length; i++) {
                        contractorsHtml.push(
                            <option value={contractors[i].ContractorId}>{contractors[i].ContractorName}</option>
                        );
                    }
                    component.setState({
                        Contractors: contractorsHtml
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
    LoadCurrencies() {
        var component = this;
        $.get("/api/Lookups/GetCurrencies")
            .done(function (currencies) {
                if (currencies != null) {
                    var currenciesHtml = [];
                    for (var i = 0; i < currencies.length; i++) {
                        currenciesHtml.push(
                            <option value={currencies[i].CurrencyId}>{currencies[i].CurrencyName}</option>
                        );
                    }
                    component.setState({
                        Currencies: currenciesHtml
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
    LoadTaskByProjectId(e) {
        var component = this;
        $.get("/api/Tasks/GetTasksByProjectId/" + e.target.value)
            .done(function (tasks) {
                if (tasks != null) {
                    var tasksHtml = [];
                    for (var i = 0; i < tasks.length; i++) {
                        tasksHtml.push(
                            <option value={tasks[i].TaskId}>{tasks[i].TaskName}</option>
                        );
                    }
                    component.setState({
                        TasksMilestones: tasksHtml
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
        $("#addNewPOModal").modal("hide");
    }
    OpenAddNewPOModal() {
        $("#addNewPOModal").modal("show");
    }
    ClearUpForm() {
        $("#FormAddPO")[0].reset();
    }
    SavePOData() {
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
        $('#FormAddPO').validate({
            rules: {
                SelectProjectId: {
                    required: true
                },
                TxtPONumber: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                TxtPoGross: {
                    required: true,
                    maxlength: 50,
                    minlength: 1,
                    onlynumbers: true
                },
                TxtPoNet: {
                    required: true,
                    maxlength: 50,
                    minlength: 1,
                    onlynumbers: true
                },
                TxtFOCGross: {
                    maxlength: 80,
                    minlength: 1,
                },
                TxtPaymentTermsDays: {
                    maxlength: 50,
                    minlength: 1,
                    onlynumbers: true
                },
                SelectContractorId: {
                    required: true
                },
                TxtPODate: {
                    required: true
                },
                SelectCULGroupId: {
                    required: true
                },
                TxtImplementationEndDate: {
                    required: false
                },
                SelectPOClassificationId: {
                    required: true
                },
                SelectPOStatus: {
                    required: true
                },
                ProjectTaskId: {
                    required: true
                }
            },
            messages: {
                SelectProjectId: {
                    required: "Please enter this required field."
                },
                TxtPONumber: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                TxtPoGross: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers",
                    onlynumbers: "Please input a valid number."
                },
                TxtPoNet: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers",
                    onlynumbers: "Please input a valid number."
                },
                TxtFOCGross: {
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers",
                },
                TxtPaymentTermsDays: {
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers",
                    onlynumbers: "Please input a valid number."
                },
                SelectContractorId: {
                    required: "Please enter this required field."
                },
                TxtPODate: {
                    required: "Please enter this required field."
                },
                SelectCULGroupId: {
                    required: "Please enter this required field."
                },
                SelectPOClassificationId: {
                    required: "Please enter this required field."
                },
                SelectPOStatus: {
                    required: "Please enter this required field."
                },
                ProjectTaskId: {
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
        if ($("#FormAddPO").valid()) {

            var settings = {
                method: "POST",
                url: "/api/POs/PostPO",
                contentType: "application/json",
                data: JSON.stringify({
                    ProjectId: $("#SelectProjectId").val(),
                    PONumber: $("#TxtPONumber").val(),
                    PoGross: $("#TxtPoGross").val(),
                    PoNet: $("#TxtPoNet").val(),
                    FOCGross: $("#TxtFOCGross").val(),
                    CurrencyId: $("#SelectCurrencyId").val(),
                    PaymentTermsDays: $("#TxtPaymentTermsDays").val(),
                    ContractorId: $("#SelectContractorId").val(),
                    PODate: $("#TxtPODate").val(),
                    CULGroupId: $("#SelectCULGroupId").val(),
                    ImplementationEndDate: $("#TxtImplementationEndDate").val(),
                    Remarks: $("#TxtRemarks").val(),
                    POClassificationId: null, //$("#TxtPOClassificationId").val(),
                    POStatus: $("#SelectPOStatus").val(),
                    FOCInGross: $("#TxtFOCInGross").val(),
                    ProjectTaskId: $("#SelectProjectTaskId").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivPOList").html(res);
                    $("#addNewPOModal").modal("hide");
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
        this.LoadCULGroups();
        this.LoadProjects();
        this.LoadContractors();
        this.LoadCurrencies();
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">
                <button className="btn btn-primary" onClick={this.OpenAddNewPOModal}>
                    <i className="fa fa-plus-circle"></i>&nbsp;
                    Add New Purchase Order
                </button>
                <br />
                <br />
                <div id="addNewPOModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Purchase Order</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddPO">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Project : *
                                                </td>
                                                <td>
                                                    <select id="SelectProjectId" name="SelectProjectId" onChange={this.LoadTaskByProjectId} style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="Projects">
                                                            <option value="">Select Project</option>
                                                            {this.state.Projects}
                                                        </optgroup>
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PO Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtPONumber" name="TxtPONumber" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    PO Gross : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtPoGross" name="TxtPoGross" maxLength="30" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PO Net : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtPoNet" name="TxtPoNet" maxLength="30" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    FOC Gross :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtFOCGross" name="TxtFOCGross" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Currency :
                                                </td>
                                                <td>
                                                    <select id="SelectCurrencyId" name="SelectCurrencyId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="Currency">
                                                            {this.state.Currencies}
                                                        </optgroup>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Payment Terms Days :
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtPaymentTermsDays" name="TxtPaymentTermsDays" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Contractor : *
                                                </td>
                                                <td>
                                                    <select id="SelectContractorId" name="SelectContractorId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="Contractor">
                                                            {this.state.Contractors}
                                                        </optgroup>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    PO Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtPODate" name="TxtPODate" readOnly className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    CUL Group : *
                                                </td>
                                                <td>
                                                    <select id="SelectCULGroupId" name="SelectCULGroupId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="CUL Group">
                                                            {this.state.CULGroups}
                                                        </optgroup>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Implementation End Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtImplementationEndDate" name="TxtImplementationEndDate" readOnly className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PO Classification : *
                                                </td>
                                                <td>
                                                    <select id="SelectPOClassificationId" name="SelectPOClassificationId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="PO Classification">
                                                            <option value="1">Select Classification</option>
                                                        </optgroup>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Project Task/Milestone :
                                                </td>
                                                <td>
                                                    <select id="SelectProjectTaskId" name="SelectProjectTaskId" style={{ width: '100%' }} className="form-control">
                                                        <option value="">Select Task</option>
                                                        {this.state.TasksMilestones}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PO Status : *
                                                </td>
                                                <td>
                                                    <select id="SelectPOStatus" name="SelectPOStatus" style={{ width: '100%' }} className="form-control">
                                                        <option value="1">Open</option>
                                                        <option value="2">Closed</option>
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
                                <button type="button" className="btn btn-primary" onClick={this.SavePOData}>Save PO</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

class EditPO extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CULGroups: "",
            TasksMilestones: "",
            Contractors: "",
            Currencies: "",
            Projects: ""
        };
        this.CloseModal = this.CloseModal.bind(this);
        this.EditPOData = this.EditPOData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.LoadPOData = this.LoadPOData.bind(this);

        this.LoadCULGroups = this.LoadCULGroups.bind(this);
        this.LoadProjects = this.LoadProjects.bind(this);
        this.LoadContractors = this.LoadContractors.bind(this);
        this.LoadCurrencies = this.LoadCurrencies.bind(this);
        this.LoadTaskByProjectId = this.LoadTaskByProjectId.bind(this);
    }
    LoadPOData() {
        //api/CULs/GetCUL/{culId}
        var POId = $("#HiddenPOId").val();
        $.get("/api/POs/GetPO/" + POId)
            .done(function (PO) {
                if (PO != null) {

                    var pODate;
                    var ImplementationEndDate;

                    if (PO.PODate) {
                        pODate = new Date(PO.PODate.replace("T00:00:00", "").split("-")[0],
                            PO.PODate.replace("T00:00:00", "").split("-")[1],
                            PO.PODate.replace("T00:00:00", "").split("-")[2]);
                    }

                    if (PO.ImplementationEndDate) {
                        ImplementationEndDate = new Date(PO.ImplementationEndDate.replace("T00:00:00", "").split("-")[0],
                            PO.ImplementationEndDate.replace("T00:00:00", "").split("-")[1],
                            PO.ImplementationEndDate.replace("T00:00:00", "").split("-")[2]);
                    }

                    $("#SelectEditProjectId").val(PO.ProjectId);
                    $("#TxtEditPONumber").val(PO.PONumber);
                    $("#TxtEditPoGross").val(PO.PoGross);
                    $("#TxtEditPoNet").val(PO.PoNet);
                    $("#TxtEditFOCGross").val(PO.FOCGross);
                    $("#SelectEditCurrencyId").val(PO.CurrencyId);
                    $("#TxtEditPaymentTermsDays").val(PO.PaymentTermsDays);
                    $("#SelectEditContractorId").val(PO.ContractorId);
                    $("#TxtEditPODate").datepicker("setDate", pODate);
                    $("#SelectEditCULGroupId").val(PO.CULGroupId);
                    $("#TxtEditImplementationEndDate").datepicker("setDate", ImplementationEndDate);
                    $("#SelectEditPOClassificationId").val(PO.POClassificationId);
                    $("#SelectEditProjectTaskId").val(PO.ProjectTaskId);
                    $("#SelectEditPOStatus").val(PO.POStatus);
                    $("#EditPOModal").modal("show");
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
    LoadCULGroups() {
        var component = this;
        $.get("/api/CULs/GetCULGroups")
            .done(function (culGroups) {
                if (culGroups != null) {
                    var groups = [];
                    for (var i = 0; i < culGroups.length; i++) {
                        groups.push(
                            <option value={culGroups[i].CULGroupId}>{culGroups[i].Description}</option>
                        );
                    }
                    component.setState({
                        CULGroups: groups
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
    LoadProjects() {
        var component = this;
        $.get("/api/Projects/GetProjectsList")
            .done(function (projects) {
                if (projects != null) {
                    var projectHtml = [];
                    for (var i = 0; i < projects.length; i++) {
                        projectHtml.push(
                            <option value={projects[i].ProjectId}>{projects[i].ProjectName}</option>
                        );
                    }
                    component.setState({
                        Projects: projectHtml
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
    LoadContractors() {
        var component = this;
        $.get("/api/Contractors/GetContractors")
            .done(function (contractors) {
                if (contractors != null) {
                    var contractorsHtml = [];
                    for (var i = 0; i < contractors.length; i++) {
                        contractorsHtml.push(
                            <option value={contractors[i].ContractorId}>{contractors[i].ContractorName}</option>
                        );
                    }
                    component.setState({
                        Contractors: contractorsHtml
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
    LoadCurrencies() {
        var component = this;
        $.get("/api/Lookups/GetCurrencies")
            .done(function (currencies) {
                if (currencies != null) {
                    var currenciesHtml = [];
                    for (var i = 0; i < currencies.length; i++) {
                        currenciesHtml.push(
                            <option value={currencies[i].CurrencyId}>{currencies[i].CurrencyName}</option>
                        );
                    }
                    component.setState({
                        Currencies: currenciesHtml
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
    LoadTaskByProjectId(e) {
        var component = this;
        $.get("/api/Tasks/GetTasksByProjectId/" + e.target.value)
            .done(function (tasks) {
                if (tasks != null) {
                    var tasksHtml = [];
                    for (var i = 0; i < tasks.length; i++) {
                        tasksHtml.push(
                            <option value={tasks[i].TaskId}>{tasks[i].TaskName}</option>
                        );
                    }
                    component.setState({
                        TasksMilestones: tasksHtml
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
        $("#EditPOModal").modal("hide");
    }
    ClearUpForm() {
        $("#FormEditPO")[0].reset();
    }
    EditPOData() {
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
        $('#FormEditPO').validate({
            rules: {
                SelectEditProjectId: {
                    required: true
                },
                TxtEditPONumber: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                TxtEditPoGross: {
                    required: true,
                    maxlength: 50,
                    minlength: 1,
                    onlynumbers: true
                },
                TxtEditPoNet: {
                    required: true,
                    maxlength: 50,
                    minlength: 1,
                    onlynumbers: true
                },
                TxtEditFOCGross: {
                    maxlength: 80,
                    minlength: 1,
                },
                TxtEditPaymentTermsDays: {
                    maxlength: 50,
                    minlength: 1,
                    onlynumbers: true
                },
                SelectEditContractorId: {
                    required: true
                },
                TxtEditPODate: {
                    required: true
                },
                SelectEditCULGroupId: {
                    required: true
                },
                TxtEditImplementationEndDate: {
                    required: false
                },
                SelectEditPOClassificationId: {
                    required: true
                },
                SelectEditPOStatus: {
                    required: true
                }
            },
            messages: {
                SelectEditProjectId: {
                    required: "Please enter this required field."
                },
                TxtEditPONumber: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                TxtEditPoGross: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers",
                    onlynumbers: "Please input a valid number."
                },
                TxtEditPoNet: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers",
                    onlynumbers: "Please input a valid number."
                },
                TxtEditFOCGross: {
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers",
                },
                TxtEditPaymentTermsDays: {
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers",
                    onlynumbers: "Please input a valid number."
                },
                SelectEditContractorId: {
                    required: "Please enter this required field."
                },
                TxtEditPODate: {
                    required: "Please enter this required field."
                },
                SelectEditCULGroupId: {
                    required: "Please enter this required field."
                },
                SelectEditPOClassificationId: {
                    required: "Please enter this required field."
                },
                SelectEditPOStatus: {
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

        if ($("#FormEditPO").valid()) {

            var settings = {
                method: "PUT",
                url: "/api/POs/EditPO",
                contentType: "application/json",
                data: JSON.stringify({
                    POId: $("#HiddenPOId").val(),
                    ProjectId: $("#SelectEditProjectId").val(),
                    PONumber: $("#TxtEditPONumber").val(),
                    PoGross: $("#TxtEditPoGross").val(),
                    PoNet: $("#TxtEditPoNet").val(),
                    FOCGross: $("#TxtEditFOCGross").val(),
                    CurrencyId: $("#SelectEditCurrencyId").val(),
                    PaymentTermsDays: $("#TxtEditPaymentTermsDays").val(),
                    ContractorId: $("#SelectEditContractorId").val(),
                    PODate: $("#TxtEditPODate").val(),
                    CULGroupId: $("#SelectEditCULGroupId").val(),
                    ImplementationEndDate: $("#TxtEditImplementationEndDate").val(),
                    Remarks: $("#TxtEditRemarks").val(),
                    POClassificationId: null, //$("#TxtPOClassificationId").val(),
                    POStatus: $("#SelectEditPOStatus").val(),
                    FOCInGross: $("#TxtEditFOCInGross").val(),
                    ProjectTaskId: $("#SelectEditProjectTaskId").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivPOList").html(res);
                    $("#EditPOModal").modal("hide");
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
        $("body").on("click", "button[id^='BtnEditPO_']", function (e) {
            var poId = $(this).attr("id").split("_")[1];
            $("#HiddenPOId").val(poId);
            $(".datepicker").datepicker();
            component.LoadCULGroups();
            component.LoadProjects();
            component.LoadContractors();
            component.LoadCurrencies();
            component.LoadPOData();
        });

        $("body").on("click", "button[id^='BtnShowJobs_']", function (e) {
            var poId = $(this).attr("id").split("_")[1];
            window.location.href = '/Contracts/POs/' + poId + '#jobs';
        });
        $("body").on("click", "button[id^='BtnShowBOQ_']", function (e) {
            var poId = $(this).attr("id").split("_")[1];
            window.location.href = '/Contracts/POs/' + poId + '#BOQs';
        });
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div>
                <div id="EditPOModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Purchase Order</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditPO">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Project : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditProjectId" name="SelectEditProjectId" onChange={this.LoadTaskByProjectId} style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="Projects">
                                                            <option value="">Select Project</option>
                                                            {this.state.Projects}
                                                        </optgroup>
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PO Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditPONumber" name="TxtEditPONumber" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    PO Gross : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditPoGross" name="TxtEditPoGross" maxLength="30" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PO Net : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditPoNet" name="TxtEditPoNet" maxLength="30" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    FOC Gross :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditFOCGross" name="TxtEditFOCGross" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Currency :
                                                </td>
                                                <td>
                                                    <select id="SelectEditCurrencyId" name="SelectEditCurrencyId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="Currency">
                                                            {this.state.Currencies}
                                                        </optgroup>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Payment Terms Days :
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditPaymentTermsDays" name="TxtEditPaymentTermsDays" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Contractor : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditContractorId" name="SelectEditContractorId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="Contractor">
                                                            {this.state.Contractors}
                                                        </optgroup>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    PO Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtEditPODate" name="TxtEditPODate" readOnly className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    CUL Group : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditCULGroupId" name="SelectEditCULGroupId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="CUL Group">
                                                            {this.state.CULGroups}
                                                        </optgroup>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Implementation End Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtEditImplementationEndDate" name="TxtEditImplementationEndDate" readOnly className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PO Classification : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditPOClassificationId" name="SelectEditPOClassificationId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <optgroup label="PO Classification">
                                                            <option value="1">Select Classification</option>
                                                        </optgroup>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Project Task/Milestone :
                                                </td>
                                                <td>
                                                    <select id="SelectEditProjectTaskId" name="SelectEditProjectTaskId" style={{ width: '100%' }} className="form-control">
                                                        <option value="">Select Task</option>
                                                        {this.state.TasksMilestones}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PO Status : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditPOStatus" name="SelectEditPOStatus" style={{ width: '100%' }} className="form-control">
                                                        <option value="1">Open</option>
                                                        <option value="2">Closed</option>
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
                                <button type="button" className="btn btn-primary" onClick={this.EditPOData}>Edit PO</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

//class SearchPOs extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            Results: ""
//        };
//        this.SearchAction = this.SearchAction.bind(this);
//    }
//    SearchAction() {
//        var searchText = $("#TxtSearch").val();
//        if (searchText !== '' && searchText != null) {
//            $.get("/api/CULs/SearchCULs/" + searchText)
//                .done(function (res) {
//                    $("#DivCULList").html(res);
//                    //$.notify(
//                    //    {
//                    //        // icon: "fa fa-check-square",
//                    //        message: "<i class='fa fa-check-square' style='font-size:30px; float: left;'></i>  <h5 style='float: left;'> The action has been completed successfully. </h5> <br /><br />"
//                    //    }
//                    //    ,
//                    //    {
//                    //        type: 'success',
//                    //        timer: 2000,
//                    //        placement: {
//                    //            from: 'top',
//                    //            align: 'center'
//                    //        }
//                    //    });
//                })
//                .fail(function (xhr, responseText) {
//                    $.notify(
//                        {
//                            icon: "fa fa-exclamation-square",
//                            message: "A problem has occured : " + xhr.responseText
//                        }
//                        ,
//                        {
//                            type: 'danger',
//                            timer: 2000,
//                            placement: {
//                                from: 'top',
//                                align: 'center'
//                            }
//                        });
//                });
//        }
//    }
//    componentDidMount() {
//        var component = this;
//    }
//    render() {
//        return (
//            <div className="col-md-12 row">
//                <table className="table">
//                    <tbody>
//                        <tr>
//                            <td style={{ "width": "15%" }}>
//                                Search CULs Items :
//                            </td>
//                            <td style={{ "width": "40%" }}>
//                                <input type="text" className="form-control" id="TxtSearch" name="TxtSearch" maxLength="20" />
//                            </td>
//                            <td>
//                                <button className="btn btn-primary" id="BtnSearchNow" name="BtnSearchNow" onClick={this.SearchAction}>Search</button>
//                            </td>
//                        </tr>
//                    </tbody>
//                </table>
//            </div>
//        );
//    }
//}

ReactDOM.render(<EditPO />,
    document.getElementById("DivEditPO"));

//ReactDOM.render(<SearchPOs />,
//    document.getElementById("DivSearchPO"));

ReactDOM.render(<AddPO />,
    document.getElementById("DivAddPO"));