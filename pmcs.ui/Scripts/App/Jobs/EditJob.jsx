﻿
class EditJob extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            POs: "",
            Elements: "",
            TasksMilestones: "",
            JobsTypes: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenEditModal = this.OpenEditModal.bind(this);
        this.SaveEntityData = this.SaveEntityData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);

        this.LoadPOs = this.LoadPOs.bind(this);
        this.LoadElements = this.LoadElements.bind(this);
        this.LoadJobTypes = this.LoadJobTypes.bind(this);
        this.LoadTasksByPOId = this.LoadTasksByPOId.bind(this);

        this.LoadJob = this.LoadJob.bind(this);
    }
    LoadJob() {
        var component = this;
        var jobId = $("#HiddenJobId").val();
        $.get("/api/Jobs/GetJob/" + jobId)
            .done(function (job) {
                if (job != null) {
                    $("#SelectEditPOId").val(job.POId);
                    $("#TxtEditJobNumber").val(job.JobNumber);
                    $("#SelectEditElementId").val(job.ElementId);
                    $("#SelectEditFOC").val(job.FOC.toString());
                    (job.FOC == true ? $("#SelectEditFOC").val("True") : $("#SelectEditFOC").val("False"));
                    $("#TxtEditFOCGross").val(job.FOCGross);
                    $("#TxtEditSubContractor").val(job.SubContractor);
                    $("#SelectEditJobType").val(job.JobType);
                    component.LoadTasksPOForEdit(job.POId, job.ProjectTaskId);
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
    LoadPOs() {
        var component = this;
        $.get("/api/POs/GetPOs")
            .done(function (POs) {
                if (POs != null) {
                    var groups = [];
                    for (var i = 0; i < POs.length; i++) {
                        groups.push(
                            <option value={POs[i].PoId}>{POs[i].PONumber}</option>
                        );
                    }
                    component.setState({
                        POs: groups
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
    LoadElements() {
        var component = this;
        $.get("/api/Elements/GetElements")
            .done(function (elements) {
                if (elements != null) {
                    var elementsHtml = [];
                    for (var i = 0; i < elements.length; i++) {
                        elementsHtml.push(
                            <option value={elements[i].ElementId}>{elements[i].ElementName}</option>
                        );
                    }
                    component.setState({
                        Elements: elementsHtml
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
    LoadTasksByPOId(e) {
        var component = this;
        $.get("/api/Tasks/GetTasksByPOId/" + e.target.value)
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
    LoadTasksPOForEdit(poId, taskId) {
        var component = this;
        $.get("/api/Tasks/GetTasksByPOId/" + poId)
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
                    $("#SelectEditProjectTaskId").val(taskId);
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
    LoadJobTypes() {
        var component = this;
        $.get("/api/Lookups/GetJobTypes")
            .done(function (jobType) {
                if (jobType != null) {
                    var typesHtml = [];
                    for (var i = 0; i < jobType.length; i++) {
                        typesHtml.push(
                            <option value={jobType[i].Id}>{jobType[i].Name}</option>
                        );
                    }
                    component.setState({
                        JobsTypes: typesHtml
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
        $("#EditEntityModal").modal("hide");
    }
    OpenEditModal() {
        $("#EditEntityModal").modal("show");
    }
    ClearUpForm() {
        $("#FormEditEntity")[0].reset();
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
        $('#FormEditEntity').validate({
            rules: {
                SelectEditPOId: {
                    required: true
                },
                TxtEditJobNumber: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                SelectEditElementId: {
                    required: true
                },
                SelectEditFOC: {
                    required: true
                },
                TxtEditSubContractor: {
                    maxlength: 80,
                    minlength: 1,
                },
                ProjectTaskId: {
                    required: false
                },
                SelectEditJobType: {
                    required: false
                }
            },
            messages: {
                SelectEditPOId: {
                    required: "Please enter this required field."
                },
                TxtEditJobNumber: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                SelectEditElementId: {
                    required: "Please enter this required field."
                },
                SelectEditFOC: {
                    required: "Please enter this required field."
                },
                TxtEditSubContractor: {
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers",
                },
                SelectEditJobType: {
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
        if ($("#FormEditEntity").valid()) {

            var settings = {
                method: "PUT",
                url: "/api/Jobs/EditJob",
                contentType: "application/json",
                data: JSON.stringify({
                    JobId: $("#HiddenJobId").val(),
                    POId: $("#SelectEditPOId").val(),
                    JobNumber: $("#TxtEditJobNumber").val(),
                    ElementId: $("#SelectEditElementId").val(),
                    FOC: $("#SelectEditFOC").val(),
                    SubContractor: $("#TxtEditSubContractor").val(),
                    ProjectTaskId: $("#SelectEditProjectTaskId").val(),
                    JobType: $("#SelectEditJobType").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivEntityList").html(res);
                    $("#EditEntityModal").modal("hide");
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
        this.LoadPOs();
        this.LoadElements();
        this.LoadJobTypes();

        $("body").on("click", "button[id^='BtnEditJob_']", function (e) {
            var jobId = $(this).attr("id").split("_")[1];
            $("#HiddenJobId").val(jobId);
            $(".datepicker").datepicker();
            component.LoadJob();
        });
        $("body").on("click", "button[id^='BtnShowAsBuilt_']", function (e) {
            var jobId = $(this).attr("id").split("_")[1];
            window.location.href = '/Contracts/Jobs/' + jobId + '#asBuilt';
        });
        $("body").on("click", "button[id^='BtnShowPATs_']", function (e) {
            var jobId = $(this).attr("id").split("_")[1];
            window.location.href = '/Contracts/Jobs/' + jobId + '#PATs';
        });
        $("body").on("click", "button[id^='BtnShowOILs_']", function (e) {
            var jobId = $(this).attr("id").split("_")[1];
            window.location.href = '/Contracts/Jobs/' + jobId + '#OILs';
        });
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">
                <div id="EditEntityModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Job</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditEntity">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Purchase Order : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditPOId" name="SelectEditPOId" style={{ width: '100%' }} onChange={this.LoadTasksByPOId} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select PO</option>
                                                        {this.state.POs}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Job Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditJobNumber" name="TxtEditJobNumber" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Element : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditElementId" name="SelectEditElementId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select Element</option>
                                                        {this.state.Elements}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    FOC : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditFOC" name="SelectEditFOC" style={{ width: '100%' }} className="form-control">
                                                        <option value="False">No</option>
                                                        <option value="True">Yes</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    SubContractor :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditSubContractor" name="TxtEditSubContractor" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Project Task/Milestone :
                                                </td>
                                                <td>
                                                    <select id="SelectEditProjectTaskId" name="SelectEditProjectTaskId" style={{ width: '100%' }} className="form-control">
                                                        <option value="">Select Task</option>
                                                        {this.state.TasksMilestones}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Job Type : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditJobType" name="SelectEditJobType" style={{ width: '100%' }} className="form-control">
                                                        <option value="">Select Job Type</option>
                                                        {this.state.JobsTypes}
                                                    </select>
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

ReactDOM.render(<EditJob />,
    document.getElementById("DivEditEntity"));