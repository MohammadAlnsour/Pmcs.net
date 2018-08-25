
class CreateChangeWorkflowStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AllowedActions: "",
            EditUserActions: "",
            RolesHtml: "",
            EditRoles: "",
            RolesIds: "",
            RolesNames: "",
            AboveStageOrderNumber: ""
        };
        this.addChangeWorkflowStageModal = this.addChangeWorkflowStageModal.bind(this);
        this.getAllowedActions = this.getAllowedActions.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.SaveWorkflowStage = this.SaveWorkflowStage.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.editChangeWorkflowStage = this.editChangeWorkflowStage.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
    }

    componentDidMount() {
        this.editChangeWorkflowStage();
        var component = this;

        $.get("/api/WorkflowDesign/GetSystemRoles")
            .done(function (roles) {
                var rolesHtml = [];
                var rolesIdsArr = [];
                var rolesNamesArr = [];
                if (roles != null) {

                    for (var i = 0; i < roles.length; i++) {
                        rolesHtml.push(
                            <option value={roles[i].RoleId}>{roles[i].RoleName}</option>
                        );
                        rolesIdsArr.push(roles[i].RoleId);
                        rolesNamesArr.push(roles[i].RoleName);
                    }
                    component.setState({
                        RolesHtml: rolesHtml,
                        RolesIds: rolesIdsArr,
                        RolesNames: rolesNamesArr
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

    closeEditModal() {
        $("#editChangeWorkflowStage").hide();
    }

    editChangeWorkflowStage() {

        var component = this;

        $(".timeline-panel").on("mouseover", function (e) {
            $(this).find('.btn').show();
        });
        $(".timeline-panel").on("mouseout", function (e) {
            $(this).find('.btn').hide();
        });
        $("body").on("click", "button[id^='BtnEditChangeWorkflowStage_']", function (e) {
            var workflowStageId = $(this).attr("id").split("_")[1];

            $.get("/api/WorkflowDesign/GetChangeRequestWorkflowStage/" + workflowStageId)
                .done(function (workflowStage) {
                    var actionsHtml = [];
                    if (workflowStage != null) {

                        $("#txtEditChangeStageName").val(workflowStage.StageName);
                        var allowedActionsIds = workflowStage.AllowedActionsIds.split(",");
                        var allowedActionsNames = workflowStage.AllowedActions.split(",");

                        for (var i = 0; i < allowedActionsIds.length; i++) {
                            actionsHtml.push(
                                <div className="col-md-4">
                                    <label>
                                        <input type="checkbox" id={allowedActionsIds[i]} name="CheckBoxChangeActionId" value={allowedActionsIds[i]} checked />
                                        <span>{allowedActionsNames[i]}</span>
                                    </label>
                                </div>
                            );
                        }

                        var allRoles = component.state.RolesIds;
                        var allRolesNames = component.state.RolesNames;
                        var editRolesHtml = [];
                        for (var i = 0; i < allRoles.length; i++) {
                            if (workflowStage.RoleId == allRoles[i]) {
                                editRolesHtml.push(
                                    <option value={allRoles[i]} selected>{allRolesNames[i]}</option>
                                );
                            }
                            else {
                                editRolesHtml.push(
                                    <option value={allRoles[i]}>{allRolesNames[i]}</option>
                                );
                            }
                        }

                        component.setState({
                            EditUserActions: actionsHtml,
                            EditRoles: editRolesHtml
                        });

                        $("#editChangeWorkflowStage").modal("show");
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
        $("body").on("click", "button[id^='BtnAddChangeWorkflowStage_']", function (e) {
            var workflowStageId = $(this).attr("id").split("_")[1];

            $.get("/api/WorkflowDesign/GetChangeRequestWorkflowStage/" + workflowStageId)
                .done(function (workflowStage) {
                    if (workflowStage != null) {
                        var orderNumber = workflowStage.StageOrderNumber;
                        component.setState({ AboveStageOrderNumber: orderNumber });
                        $("#addChangeWorkflowStage").modal("show");
                        component.getAllowedActions();
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

    addChangeWorkflowStageModal(event) {
        $("#addChangeWorkflowStage").modal("show");
        this.getAllowedActions();
    }

    closeModal() {
        $("#addChangeWorkflowStage").modal("hide");
    }

    ClearUpForm() {
        $("#txtChangeStageName").val("");
        $("input[name='CheckBoxChangeActionId']").each(function () {
            $(this).prop("checked", false);
        });
    }

    getAllowedActions() {

        var component = this;
        $.get("/api/WorkflowDesign/GetAllowedActionsList")
            .done(function (actions) {
                var actionsHtml = [];
                if (actions != null) {
                    for (var i = 0; i < actions.length; i++) {
                        actionsHtml.push(
                            <div className="col-md-4">
                                <label>
                                    <input type="checkbox" id={actions[i].ActionId} name="CheckBoxChangeActionId" value={actions[i].ActionId} />
                                    <span>{actions[i].ActionName}</span>
                                </label>
                            </div>
                        );
                    }
                }
                component.setState({
                    AllowedActions: actionsHtml
                });
                //$.notify(
                //    {
                //        icon: "fa fa-check-square-box",
                //        message: "The action has been done successfully."
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

    SaveWorkflowStage() {

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
        $('#FormAddChangeWorkflowStage').validate({
            rules: {
                txtChangeStageName: {
                    required: true,
                    maxlength: 50,
                    minlength: 4
                },
                CheckBoxChangeActionId: {
                    required: true
                },
                SelectChangeRoleId: {
                    required: true
                }
            },
            messages: {
                txtChangeStageName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 4 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                CheckBoxChangeActionId: {
                    required: "Please enter this required field."
                },
                SelectChangeRoleId: {
                    required: "Please enter this required field."
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

        if ($("#FormAddChangeWorkflowStage").valid()) {
            var actionsIds = "";
            $("input[name='CheckBoxChangeActionId']").each(function () {
                if ($(this).prop("checked"))
                    actionsIds += $(this).val() + ","
            });
            actionsIds = actionsIds.substring(0, actionsIds.length - 1);

            var aboveLevelOrderNumber = component.state.AboveStageOrderNumber;
            if (aboveLevelOrderNumber == null || aboveLevelOrderNumber == '') {
                aboveLevelOrderNumber = 1;
            }

            var settings = {
                method: "POST",
                url: "/api/WorkflowDesign/PostChangeWorkflowStage",
                contentType: "application/json",
                data: JSON.stringify({
                    StageName: $("#txtChangeStageName").val(),
                    AllowedActionsIds: actionsIds,
                    RoleId: $("#SelectChangeRoleId").val(),
                    IsActive: true,
                    TrackingEntity: "1",
                    TrackingOwner: "1",
                    StageOrderNumber: aboveLevelOrderNumber,
                    ReferenceNumberRequired: true,
                    UserName: $("#TxtChangeUserName").val(),
                    UserRolesHtml: actionsIds
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#divChangeWorkflowStages").html(res);
                    $("#addChangeWorkflowStage").modal("hide");
                    component.ClearUpForm();
                    component.setState({ AboveStageOrderNumber: "" });

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

    render() {
        return (

            <div>
                <button className="btn btn-primary" onClick={this.addChangeWorkflowStageModal}>
                    <i className="fa fa-plus-circle"></i>
                    Add New Stage
                </button>

                <div id="addChangeWorkflowStage" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Workflow Stage</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddChangeWorkflowStage">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '30%' }}>
                                                    Stage Name : *
                                            </td>
                                                <td>
                                                    <input type="text" id="txtChangeStageName" name="txtChangeStageName" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '30%' }}>
                                                    Responsible Role : *
                                                </td>
                                                <td>
                                                    <select id="SelectChangeRoleId" name="SelectChangeRoleId" className="form-control">
                                                        {this.state.RolesHtml}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '30%' }}>
                                                    Allowed Actions : *
                                                </td>
                                                <td>
                                                    {this.state.AllowedActions}
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.SaveWorkflowStage}>Save Stage</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="editChangeWorkflowStage" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Workflow Stage</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeEditModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddChangeWorkflowStage">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '30%' }}>
                                                    Stage Name :
                                            </td>
                                                <td>
                                                    <input type="text" id="txtEditChangeStageName" name="txtEditChangeStageName" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '30%' }}>
                                                    Responsible Role : *
                                                </td>
                                                <td>
                                                    <select id="SelectChangeRoleIdEdit" name="SelectChangeRoleIdEdit" className="form-control">
                                                        {this.state.EditRoles}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '30%' }}>
                                                    Allowed Actions :
                                            </td>
                                                <td>
                                                    {this.state.EditUserActions}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.SaveWorkflowStage}>Save Stage</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeEditModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}


ReactDOM.render(
    <CreateChangeWorkflowStage />,
    document.getElementById("divAddChangeWorkflowStage"));