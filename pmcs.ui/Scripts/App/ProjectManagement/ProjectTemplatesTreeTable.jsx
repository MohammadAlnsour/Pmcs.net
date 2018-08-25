
class ProjectTemplatesTreeTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            TemplatesTree: "",
            Templates: "",
            ParentTasks: "",
            ParentTasksWithoutParentChilds: ""
        };
        this.LoadTasksByTemplate = this.LoadTasksByTemplate.bind(this);
        this.ShowActions = this.ShowActions.bind(this);
        this.HideActions = this.HideActions.bind(this);
        this.LoadTemplates = this.LoadTemplates.bind(this);

        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.CloseModal = this.CloseModal.bind(this);

        this.ShowModal = this.ShowModal.bind(this);
        this.LoadParentTasksByTemplateId = this.LoadParentTasksByTemplateId.bind(this);
        this.LoadParentTasksByTemplateIdAndTaskId = this.LoadParentTasksByTemplateIdAndTaskId.bind(this);
        this.ChangeTaskType = this.ChangeTaskType.bind(this);
        this.LoadTasksHtmlByTemplate = this.LoadTasksHtmlByTemplate.bind(this);

        this.EditTask = this.EditTask.bind(this);
        this.SaveTask = this.SaveTask.bind(this);
        this.SaveTemplate = this.SaveTemplate.bind(this);

        this.LoadTaskData = this.LoadTaskData.bind(this);
        this.DeleteTaskData = this.DeleteTaskData.bind(this);
    }
    ClearUpForm() {
        $("#FormAddTemplate")[0].reset();
        $("#FormAddTask")[0].reset();
        $("#FormEditTask")[0].reset();
    }
    CloseModal() {
        $("#AddTemplateModal").modal("hide");
        $("#AddTaskModal").modal("hide");
        $("#EditTaskModal").modal("hide");
    }
    ShowModal() {
        $("#AddTemplateModal").modal("show");
    }

    ShowActions(taskId) {
        if (taskId != null) {
            $("#SpanTasks_" + taskId).css("display", "");
        }
    }
    HideActions(taskId) {
        if (taskId != null) {
            //$("#SpanTasks_" + taskId).hide();
            $("#SpanTasks_" + taskId).css("display", "none");
        }
    }

    LoadTemplates() {
        var component = this;
        $.get("/api/ProjectManagement/GetTemplates")
            .done(function (templates) {
                var allTemplatesHtml = [];
                for (var i = 0; i < templates.length; i++) {
                    allTemplatesHtml.push(
                        <option value={templates[i].TemplateId}>{templates[i].TemplateName}</option>
                    );
                }
                component.setState({
                    Templates: allTemplatesHtml
                });
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
    LoadTasksByTemplate(e) {
        var component = this;
        var templateId = e.target.value;
        if (templateId != "" && templateId !== null) {
            $("#BtnAddRootTask").prop("disabled", "");

            $.get("/api/ProjectManagement/GetTemplateTasks/" + templateId)
                .done(function (rootNodes) {
                    $("#DivTreeTableContainer").html("");

                    var table = "<table id='TableTreeTable' class='table'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>Task Name &nbsp; <button class='btn btn-primary btn-xs' id='BtnAddRootTask' title='Add Task' onClick='this.AddNewTemplateTask'><i class='fa fa-plus-square'></i></button> </th>" +
                        "<th>Task Code</th>" +
                        "<th>Task Template Type</th>" +
                        "<th>Task Duration</th>" +
                        "<th>Predecessor Relationship Type</th>" +
                        "<th>Lag Days</th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>";

                    for (var i = 0; i < rootNodes.length; i++) {
                        var tr = "<tr class='TemplateTr' data-tt-id='" + rootNodes[i].DataTTId + "' data-tt-parent-id='" + rootNodes[i].DataTTParentId + "'>" +
                            "<td>" +
                            rootNodes[i].TaskName +
                            "&nbsp;" +
                            "&nbsp;" +
                            "<label id='SpanTasks_" + rootNodes[i].Id + "' style='display:none'>" +
                            "<button class='btn btn-success btn-xs' id='BtnAddTaskBeneath_" + rootNodes[i].Id + "' title='Add Sub Task'>" +
                            "<i class='fa fa-plus-square'></i>" +
                            "</button>" +
                            "&nbsp;" +
                            "<button class='btn btn-primary btn-xs' id='BtnEditTask_" + rootNodes[i].Id + "' title='Edit Task'>" +
                            "<i class='fa fa-refresh'></i>" +
                            "</button>" +
                            "&nbsp;" +
                            "<button class='btn btn-danger btn-xs' id='BtnDeleteTask_" + rootNodes[i].Id + "' title='Delete Task'>" +
                            "<i class='fa fa-close'></i>" +
                            "</button>" +
                            "</label>" +
                            "</td>" +
                            "<td>" +
                            rootNodes[i].TaskCode +
                            "</td>" +
                            "<td>" +
                            rootNodes[i].TaskTemplateTypeName +
                            "</td>" +
                            "<td>" +
                            rootNodes[i].TaskDuration +
                            "</td>" +
                            "<td>" +
                            rootNodes[i].TaskRelationshipTypeName +
                            "</td>" +
                            "<td>" +
                            rootNodes[i].LagdaysString +
                            "</td>" +
                            "</tr>";
                        table += tr;
                    }
                    table += "</tbody>" +
                        "</table>";

                    $("#DivTreeTableContainer").html(table);
                    $("#TableTreeTable").treetable({ expandable: true, initialState: "expanded" }, true);
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
        //if (templateId == "" || templateId == null) {
        //    $("#BtnAddRootTask").prop("disabled", "disabled");
        //}
    }
    LoadParentTasksByTemplateId(templateId) {
        var component = this;
        $.get("/api/ProjectManagement/GetTasksByTemplateId/" + templateId)
            .done(function (parentTasks) {
                var ParentTasksHtml = [];
                for (var i = 0; i < parentTasks.length; i++) {
                    ParentTasksHtml.push(
                        <option value={parentTasks[i].Id}>{parentTasks[i].TaskName}</option>
                    );
                }
                component.setState({
                    ParentTasks: ParentTasksHtml
                });
                $('.selectpicker').selectpicker('refresh');
                if ($("#hiddenParentTaskId").val() != null && $("#hiddenParentTaskId").val() != "") {
                    $("#ParentTaskId").val($("#hiddenParentTaskId").val());
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
    LoadParentTasksByTemplateIdAndTaskId(templateId, taskId) {
        var component = this;
        $.get("/api/ProjectManagement/GetTasksByTemplateIdAndTaskId/" + templateId + "/" + taskId)
            .done(function (parentTasks) {
                var ParentTasksHtml = [];
                for (var i = 0; i < parentTasks.length; i++) {
                    ParentTasksHtml.push(
                        <option value={parentTasks[i].Id}>{parentTasks[i].TaskName}</option>
                    );
                }
                component.setState({
                    ParentTasksWithoutParentChilds: ParentTasksHtml
                });
                $('.selectpicker').selectpicker('refresh');
                if ($("#hiddenParentTaskId").val() != null && $("#hiddenParentTaskId").val() != "") {
                    $("#ParentTaskId").val($("#hiddenParentTaskId").val());
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
    LoadTasksHtmlByTemplate(templateId) {
        var component = this;
        if (templateId != "" && templateId !== null) {
            $("#BtnAddRootTask").prop("disabled", "");
            $.get("/api/ProjectManagement/GetTemplateTasks/" + templateId)
                .done(function (rootNodes) {
                    $("#DivTreeTableContainer").html("");

                    var table = "<table id='TableTreeTable' class='table'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>Task Name &nbsp; <button class='btn btn-primary btn-xs' disabled id='BtnAddRootTask' title='Add Task' onClick='this.AddNewTemplateTask'><i class='fa fa-plus-square'></i></button> </th>" +
                        "<th>Task Code</th>" +
                        "<th>Task Template Type</th>" +
                        "<th>Task Duration</th>" +
                        "<th>Predecessor Relationship Type</th>" +
                        "<th>Lag days</th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>";

                    for (var i = 0; i < rootNodes.length; i++) {
                        var tr = "<tr class='TemplateTr' data-tt-id='" + rootNodes[i].DataTTId + "' data-tt-parent-id='" + rootNodes[i].DataTTParentId + "'>" +
                            "<td>" +
                            rootNodes[i].TaskName +
                            "&nbsp;" +
                            "&nbsp;" +
                            "<label id='SpanTasks_" + rootNodes[i].Id + "' style='display:none'>" +
                            "<button class='btn btn-success btn-xs' id='BtnAddTaskBeneath_" + rootNodes[i].Id + "' title='Add Sub Task'>" +
                            "<i class='fa fa-plus-square'></i>" +
                            "</button>" +
                            "&nbsp;" +
                            "<button class='btn btn-primary btn-xs' id='BtnEditTask_" + rootNodes[i].Id + "' title='Edit Task'>" +
                            "<i class='fa fa-refresh'></i>" +
                            "</button>" +
                            "&nbsp;" +
                            "<button class='btn btn-danger btn-xs' id='BtnDeleteTask_" + rootNodes[i].Id + "' title='Delete Task'>" +
                            "<i class='fa fa-close'></i>" +
                            "</button>" +
                            "</label>" +
                            "</td>" +
                            "<td>" +
                            rootNodes[i].TaskCode +
                            "</td>" +
                            "<td>" +
                            rootNodes[i].TaskTemplateTypeName +
                            "</td>" +
                            "<td>" +
                            rootNodes[i].TaskDuration +
                            "</td>" +
                            "<td>" +
                            rootNodes[i].TaskRelationshipTypeName +
                            "</td>" +
                            "<td>" +
                            rootNodes[i].LagdaysString +
                            "</td>" +
                            "</tr>";
                        table += tr;
                    }
                    table += "</tbody>" +
                        "</table>";

                    $("#DivTreeTableContainer").html(table);
                    $("#TableTreeTable").treetable({ expandable: true, initialState: "expanded" }, true);
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
        //if (templateId == "" || templateId == null) {
        //    $("#BtnAddRootTask").prop("disabled", "disabled");
        //}
    }

    LoadTaskData(taskId) {
        var component = this;

        var settings = {
            method: "GET",
            url: "/api/ProjectManagement/GetTemplateTask/" + taskId,
            contentType: "application/json"
        };
        $.ajax(settings)
            .done(function (task) {
                if (task != null && task != "") {
                    $("#HiddentTaskId").val(taskId);
                    $("#EditTaskName").val(task.TaskName);
                    $("#EditTaskCode").val(task.TaskCode);
                    $("#EditSelectTaskType").val(task.TaskTemplateType);
                    $("#EditTaskDuration").val(task.TaskDuration);
                    $("#EditSelectTemplateId").val(task.TemplateId);
                    $("#EditParentTaskId").val(task.ParentTaskId);
                    $("#EditTaskRelationship").val(task.TaskRelationshipType);
                    $("#EditLagDays").val(task.Lagdays);
                    $('.selectpicker').selectpicker('refresh');
                    $("#EditTaskModal").modal("show");
                }
            })
            .fail(function (xhr, responseText) {
                $.notify(
                    {
                        icon: "fa fa-exclamation-square",
                        message: "A problem has occured : " + xhr.responseText
                    }, {
                        type: 'danger',
                        timer: 2000,
                        placement: {
                            from: 'top',
                            align: 'center'
                        }
                    });
            });
    }
    DeleteTaskData(taskId) {

        var component = this;
        var settings = {
            method: "DELETE",
            url: "/api/ProjectManagement/DeleteTemplateTask/" + taskId,
            contentType: "application/json"
        };
        $.ajax(settings)
            .done(function (res) {
                $('.selectpicker').selectpicker('refresh');
                if ($("#SelectTemplateId").val() != "" && $("#SelectTemplateId").val() != null) {
                    component.LoadTasksHtmlByTemplate($("#SelectTemplateId").val());
                }
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
                    }, {
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
        var component = this;
        this.LoadTemplates();
        $("#TableTreeTable").treetable({ expandable: true, initialState: "expanded" }, true);
        $("body").on("mouseover", ".TemplateTr", function () {
            var tds = $(this).find("td");
            var td = $(tds)[0];
            var span = $(td).find("label")[0];
            var taskId = $(span).attr("id").split("_")[1];
            component.ShowActions(taskId);
        });
        $("body").on("mouseout", ".TemplateTr", function () {
            var span = $(this).find("td:first-child").find("label");
            var taskId = $(span).attr("id").split("_")[1];
            component.HideActions(taskId);
        });
        $("body").on("click", "button[id^='BtnAddTaskBeneath_']", function (e) {
            var taskId = $(this).attr("id").split("_")[1];
            var trTTId = $(this).parent().parent().parent();
            $("#hiddenNodeTTId").val($(trTTId).attr("data-tt-id"));
            if (taskId != "" && taskId != null) {
                $('.selectpicker').selectpicker('refresh');
                $("#hiddenParentTaskId").val(taskId);
                component.LoadParentTasksByTemplateId($("#SelectTemplateId").val());
                $("#AddTaskModal").modal("show");
            }
        });
        $("body").on("click", "button[id^='BtnEditTask_']", function (e) {
            var taskId = $(this).attr("id").split("_")[1];
            if (taskId != "" && taskId != null) {
                $('.selectpicker').selectpicker('refresh');
                $("#hiddenParentTaskId").val(taskId);
                $("#HiddentTaskId").val(taskId);
                component.LoadParentTasksByTemplateIdAndTaskId($("#SelectTemplateId").val(), taskId);
                component.LoadTaskData(taskId);
            }
        });
        $("body").on("click", "button[id^='BtnDeleteTask_']", function (e) {
            var taskId = $(this).attr("id").split("_")[1];
            if (taskId != "" && taskId != null) {
                if (confirm('Delete this task and its all sub tasks Are you sure?')) {
                    component.DeleteTaskData(taskId);
                }
            }
        });
        $("body").on("click", "#BtnAddRootTask", function (e) {
            $('.selectpicker').selectpicker('refresh');
            var templateId = $("#SelectTemplateId").val();
            if (templateId != '' && templateId != "") {
                component.LoadParentTasksByTemplateId(templateId);
                $("#AddTaskModal").modal("show");
            }
            //$("#SelectTemplateId").val("");
            //$('.selectpicker').selectpicker('refresh');
        });
    }
    EditTask() {

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
        $('#FormEditTask').validate({
            rules: {
                EditTaskName: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                EditTaskCode: {
                    required: true,
                    maxlength: 15,
                    minlength: 1
                },
                EditTaskTemplateType: {
                    required: true
                },
                EditTaskDuration: {
                    required: true,
                    onlynumbers: true
                },
                EditLagDays: {
                    onlynumbers: true
                }
            },
            messages: {
                EditTaskName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                EditTaskCode: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 15 characters"
                },
                EditTaskTemplateType: {
                    required: "Please enter this required field."
                },
                EditTaskDuration: {
                    required: "Please enter this required field.",
                    onlynumbers: "This field accepts only numbers."
                },
                EditLagDays: {
                    onlynumbers: "This field accepts only numbers."
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
        if ($("#FormEditTask").valid()) {
            $('.selectpicker').selectpicker('refresh');
            var settings = {
                method: "PUT",
                url: "/api/ProjectManagement/PutTask",
                contentType: "application/json",
                data: JSON.stringify({
                    Id: $("#HiddentTaskId").val(),
                    TaskName: $("#EditTaskName").val(),
                    TaskCode: $("#EditTaskCode").val(),
                    TaskTemplateType: $("#EditSelectTaskType").val(),
                    TaskDuration: $("#EditTaskDuration").val(),
                    TemplateId: $("#SelectTemplateId").val(),
                    ParentTaskId: ($("#EditParentTaskId").val() == '' && $("#EditParentTaskId").val() == null) ? null : $("#EditParentTaskId").val(),
                    TaskRelationshipType: $("#EditTaskRelationship").val(),
                    Lagdays: $("#EditLagDays").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#EditTaskModal").modal("hide");
                    component.ClearUpForm();
                    $('.selectpicker').selectpicker('refresh');
                    if ($("#SelectTemplateId").val() != "" && $("#SelectTemplateId").val() != null) {
                        component.LoadTasksHtmlByTemplate($("#SelectTemplateId").val());
                    }
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
                        }, {
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
    SaveTask() {
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
        $('#FormAddTask').validate({
            rules: {
                TaskName: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                TaskCode: {
                    required: true,
                    maxlength: 15,
                    minlength: 1
                },
                TaskTemplateType: {
                    required: true
                },
                TaskDuration: {
                    required: true,
                    onlynumbers: true
                },
                LagDays: {
                    onlynumbers: true
                }
            },
            messages: {
                TaskName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                TaskCode: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 15 characters"
                },
                TaskTemplateType: {
                    required: "Please enter this required field."
                },
                TaskDuration: {
                    required: "Please enter this required field.",
                    onlynumbers: "This field accepts only numbers."
                }
                ,
                LagDays: {
                    onlynumbers: "This field accepts only numbers."
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
        if ($("#FormAddTask").valid()) {
            $('.selectpicker').selectpicker('refresh');
            var settings = {
                method: "POST",
                url: "/api/ProjectManagement/PostTask",
                contentType: "application/json",
                data: JSON.stringify({
                    TaskName: $("#TaskName").val(),
                    TaskCode: $("#TaskCode").val(),
                    TaskTemplateType: $("#SelectTaskType").val(),
                    TaskDuration: $("#TaskDuration").val(),
                    TemplateId: $("#SelectTemplateId").val(),
                    ParentTaskId: ($("#ParentTaskId").val() == '' && $("#ParentTaskId").val() == null) ? null : $("#ParentTaskId").val(),
                    TaskRelationshipType: $("#SelectTaskRelationship").val(),
                    Lagdays: $("#LagDays").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings).done(function (res) {
                $("#AddTaskModal").modal("hide");
                component.ClearUpForm();
                $('.selectpicker').selectpicker('refresh');
                if ($("#SelectTemplateId").val() != "" && $("#SelectTemplateId").val() != null) {
                    component.LoadTasksHtmlByTemplate($("#SelectTemplateId").val());
                    //var parentTTId = $("#hiddenNodeTTId").val();
                    //var node = $("#TableTreeTable").treetable("node", parentTTId);
                    //$("#TableTreeTable").treetable("loadBranch", node, row);
                }
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
                        }, {
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
    SaveTemplate() {

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
        $('#FormAddTemplate').validate({
            rules: {
                TemplateName: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                }
            },
            messages: {
                TemplateName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 characters"
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
        if ($("#FormAddTemplate").valid()) {

            var settings = {
                method: "POST",
                url: "/api/ProjectManagement/PostTemplate",
                contentType: "application/json",
                data: JSON.stringify({
                    TemplateName: $("#TemplateName").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    component.LoadTemplates();
                    $("#AddTemplateModal").modal("hide");
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
                        }, {
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
    ChangeTaskType(e) {
        var taskType = e.target.value;
        if (taskType == 2) {
            $("#TaskDuration").val(0);
            $("#TaskDuration").prop("disabled", "disabled");
        }
        else
            $("#TaskDuration").prop("disabled", "");
    }
    //ChangeTaskRelationship(e) {
    //    var relationshipType = e.target.value;
    //}

    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div>
                <div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td style={{ width: "15%" }}>Select Template</td>
                                <td>
                                    <select id="SelectTemplateId" name="SelectTemplateId" onChange={this.LoadTasksByTemplate} style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                        <option value="">Select Template</option>
                                        {this.state.Templates}
                                    </select>
                                </td>
                                <td>
                                    <button id="BtnAddTemplate" className="btn btn-primary" onClick={this.ShowModal}>
                                        Add Template
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="DivTreeTableContainer">
                    <table id="TableTreeTable" className="table">
                        <thead>
                            <tr>
                                <th>Task Name &nbsp; <button className="btn btn-primary btn-xs" disabled id="BtnAddRootTask" title="Add Task" onClick={this.AddNewTemplateTask}><i className="fa fa-plus-square"></i></button> </th>
                                <th>Task Code</th>
                                <th>Task Template Type</th>
                                <th>Task Duration</th>
                                <th>Predecessor Relation Type</th>
                                <th>Lag Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.TemplatesTree}
                        </tbody>
                    </table>
                </div>
                <div id="AddTemplateModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Template</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddTemplate">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Template Name : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TemplateName" name="TemplateName" maxLength="50" className="form-control" />
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
                                <button type="button" className="btn btn-primary" onClick={this.SaveTemplate}>Save Template</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="AddTaskModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Task</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddTask">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Task Name : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TaskName" name="TaskName" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Task Code : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TaskCode" name="TaskCode" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Parent Task :
                                                </td>
                                                <td>
                                                    <select id="ParentTaskId" name="ParentTaskId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select Parent Task</option>
                                                        {this.state.ParentTasks}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Task Type : *
                                                </td>
                                                <td>
                                                    <select id="SelectTaskType" name="SelectTaskType" className="form-control" onChange={this.ChangeTaskType}>
                                                        <option value="1">Task</option>
                                                        <option value="2">Milestone</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Task Duration(in days) : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TaskDuration" name="TaskDuration" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Relationship to precedessor : *
                                                </td>
                                                <td>
                                                    <select id="SelectTaskRelationship" name="SelectTaskRelationship" className="form-control">
                                                        <option value="1">Finish to start</option>
                                                        <option value="2">Start to finish</option>
                                                        <option value="3">Start to start</option>
                                                        <option value="4">Finish to finish</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Lag days :
                                                </td>
                                                <td>
                                                    <input type="number" id="LagDays" name="LagDays" maxLength="3" className="form-control" />
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
                                <button type="button" className="btn btn-primary" onClick={this.SaveTask}>Save Task</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="EditTaskModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Task</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditTask">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Task Name : *
                                                </td>
                                                <td>
                                                    <input type="text" id="EditTaskName" name="EditTaskName" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Task Code : *
                                                </td>
                                                <td>
                                                    <input type="text" id="EditTaskCode" name="EditTaskCode" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Parent Task :
                                                </td>
                                                <td>
                                                    <select id="EditParentTaskId" name="EditParentTaskId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select Parent Task</option>
                                                        {this.state.ParentTasksWithoutParentChilds}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Task Type : *
                                                </td>
                                                <td>
                                                    <select id="EditSelectTaskType" name="EditSelectTaskType" className="form-control" onChange={this.ChangeTaskType}>
                                                        <option value="1">Task</option>
                                                        <option value="2">Milestone</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Task Duration(in days) : *
                                                </td>
                                                <td>
                                                    <input type="number" id="EditTaskDuration" name="EditTaskDuration" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Relationship to precedessor : *
                                                </td>
                                                <td>
                                                    <select id="EditTaskRelationship" name="EditTaskRelationship" className="form-control">
                                                        <option value="1">Finish to start</option>
                                                        <option value="2">Start to finish</option>
                                                        <option value="3">Start to start</option>
                                                        <option value="4">Finish to finish</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '25%' }}>
                                                    Lag days :
                                                </td>
                                                <td>
                                                    <input type="number" id="EditLagDays" name="EditLagDays" maxLength="3" className="form-control" />
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
                                <button type="button" className="btn btn-primary" onClick={this.EditTask}>Edit Task</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<ProjectTemplatesTreeTable />,
    document.getElementById("DivTreeTableContrainer"));