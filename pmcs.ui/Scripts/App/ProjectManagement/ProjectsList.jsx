
class ProjectsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Sites: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.CloseEditModal = this.CloseEditModal.bind(this);
        this.OpenAddNewProject = this.OpenAddNewProject.bind(this);
        this.SaveProjectData = this.SaveProjectData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.EditProject = this.EditProject.bind(this);
        this.EditProject = this.EditProject.bind(this);
        EditProjectData = this.EditProjectData.bind(this);

    }
    CloseModal() {
        $("#addNewProjectModal").modal("hide");
    }
    CloseEditModal() {
        $("#EditProjectModal").modal("hide");
    }
    OpenAddNewProject() {
        $("#addNewProjectModal").modal("show");
    }
    ClearUpForm() {
        $("#FormAddProject")[0].reset();
        $("#FormEditProject")[0].reset();
    }
    SaveProjectData() {
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
        $('#FormAddProject').validate({
            rules: {
                TxtProjectCode: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                TxtProjectName: {
                    required: true,
                    maxlength: 150,
                    minlength: 4
                },
                TxtProjectShortName: {
                    maxlength: 50,
                    minlength: 2
                },
                SelectSite: {
                    required: true
                }
            },
            messages: {
                TxtProjectCode: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers or characters."
                },
                TxtProjectName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 4 characters.",
                    maxlength: "This field should not exceeds 150 numbers or characters."
                },
                TxtProjectShortName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 50 numbers or characters."
                },
                SelectSite: {
                    required: "Please enter this required field."
                }
            },
            errorElement: 'div',
            errorLabelContainer: 'alert bg-danger',
            errorPlacement: function (errorlabel, element) {
                errorlabel.addClass("alert bg-danger");
                //$(errorlabel).css({ position: "fixed" });
                $(errorlabel).css({ position: "fixed" });
                errorlabel.insertAfter(element);
            }
        });

        if ($("#FormAddProject").valid()) {

            var settings = {
                method: "POST",
                url: "/api/Projects/PostProject",
                contentType: "application/json",
                data: JSON.stringify({
                    ProjectCode: $("#TxtProjectCode").val(),
                    ProjectShortName: $("#TxtProjectShortName").val(),
                    ProjectName: $("#TxtProjectName").val(),
                    SiteId: $("#SelectSite").val()
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    component.ClearUpForm();
                    $("#divProjectsList").html(res);
                    $("#addNewProjectModal").modal("hide");
                    $('#TblProjects').DataTable({"ordering": false});
                    $.notify(
                        {
                            // icon: "fa fa-check-square",
                            message: "<h5> The action has been completed successfully. </h5> <br /><br />"
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
    }
    EditProjectData() {
        var thiscomponent = this;

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
        $('#FormEditProject').validate({
            rules: {
                TxtEditProjectCode: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                TxtEditProjectName: {
                    required: true,
                    maxlength: 150,
                    minlength: 4
                },
                TxtEditProjectShortName: {
                    maxlength: 50,
                    minlength: 2
                },
                SelectEditSite: {
                    required: true
                }
            },
            messages: {
                TxtEditProjectCode: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers or characters."
                },
                TxtEditProjectName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 4 characters.",
                    maxlength: "This field should not exceeds 150 numbers or characters."
                },
                TxtEditProjectShortName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 50 numbers or characters."
                },
                SelectEditSite: {
                    required: "Please enter this required field."
                }
            },
            errorElement: 'div',
            errorLabelContainer: 'alert bg-danger',
            errorPlacement: function (errorlabel, element) {
                errorlabel.addClass("alert bg-danger");
                $(errorlabel).css({ position: "fixed" });
                errorlabel.insertAfter(element);
            }
        });

        if ($("#FormEditProject").valid()) {

            var settings = {
                method: "PUT",
                url: "/api/Projects/EditProject",
                contentType: "application/json",
                data: JSON.stringify({
                    ProjectCode: $("#TxtEditProjectCode").val(),
                    ProjectShortName: $("#TxtEditProjectShortName").val(),
                    ProjectName: $("#TxtEditProjectName").val(),
                    SiteId: $("#SelectEditSite").val(),
                    ProjectId: $("#HiddenEditProjectId").val()
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    //thiscomponent.ClearUpForm();
                    $("#divProjectsList").html(res);
                    $("#EditProjectModal").modal("hide");
                    $('#TblProjects').DataTable({"ordering": false});
                    $.notify(
                        {
                            //// icon: "fa fa-check-square",
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
    }
    EditProject() {
        var component = this;

        $("body").on("click", "button[id^='BtnEditProject_']", function (e) {
            var projectId = $(this).attr("id").split("_")[1];
            $("#HiddenEditProjectId").val(projectId);

            $.get("/api/Projects/GetProject/" + projectId)
                .done(function (project) {
                    var actionsHtml = [];
                    if (project != null) {
                        $("#TxtEditProjectCode").val(project.ProjectCode);
                        $("#TxtEditProjectName").val(project.ProjectName);
                        $("#SelectEditSite").val(project.SiteId);
                        $("#TxtEditProjectShortName").val(project.ProjectShortName);
                        $("#EditProjectModal").modal("show");
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
        });
    }
    componentDidMount() {
        var component = this;
        $.get("/api/Sites/GetSites")
            .done(function (sites) {
                var actionsHtml = [];
                if (sites != null) {
                    for (var i = 0; i < sites.length; i++) {
                        actionsHtml.push(
                            <option value={sites[i].SiteId}>{sites[i].SiteName}</option>
                        );
                    }
                    component.setState({
                        Sites: actionsHtml
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

        $('#TblProjects').DataTable({"ordering": false});
        component.EditProject();
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div>
                <button className="btn btn-primary" id="BtnaddNewProject" onClick={this.OpenAddNewProject}>
                    <i className="fa fa-plus-circle"></i>&nbsp;
                    Add New Project
                </button>

                <div id="addNewProjectModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add Project</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddProject">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Project Code : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtProjectCode" name="TxtProjectCode" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Project Name : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtProjectName" name="TxtProjectName" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Site : *
                                                </td>
                                                <td>
                                                    <select id="SelectSite" name="SelectSite" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        {this.state.Sites}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Project Short Name :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtProjectShortName" name="TxtProjectShortName" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.SaveProjectData}>Save Data</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="EditProjectModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Project Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditProject">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Project Code : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditProjectCode" name="TxtEditProjectCode" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Project Name : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditProjectName" name="TxtEditProjectName" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Site : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditSite" name="SelectEditSite" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        {this.state.Sites}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Project Short Name :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditProjectShortName" name="TxtEditProjectShortName" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.EditProjectData}>Edit</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseEditModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<ProjectsList />,
    document.getElementById("DivAddProject"));