

class GanntScheduler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProjectLoaded: "",
            ProjectId: ""
        };

        this.LoadProjectDynamicTasks = this.LoadProjectDynamicTasks.bind(this);
        this.GanttProjectSheet = this.GanttProjectSheet.bind(this);
        this.GanttAddTask = this.GanttAddTask.bind(this);
        this.GanttEditTask = this.GanttEditTask.bind(this);
    }
    GanttAddTask(id, task) {
        var component = this;
        if (task !== null) {
            var dhtmlxganttTask = {
                "id": task.id,
                "text": task.text,
                "start_date": task.start_date,
                "duration": Number(task.duration),
                "parent": task.parent,
                "type": (task.type == "task" ? "gantt.config.types.task" : "gantt.config.types.milestone"),
                "projectId": component.state.ProjectId
            };

            var settings = {
                method: "POST",
                url: "/api/Projects/PostTask",
                contentType: "application/json",
                data: JSON.stringify(dhtmlxganttTask),
            };
            $.ajax(settings)
                .done(function (taskId) {
                    if (taskId !== null && taskId !== '') {
                        gantt.changeTaskId(task.id, taskId);
                        gantt.refreshData();
                    }
                    $.notify(
                        {
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
    GanttEditTask(id, task) {
        var component = this;
        if (task !== null) {

            var dhtmlxganttTask = {
                "id": task.id,
                "text": task.text,
                "start_date": task.start_date,
                "duration": Number(task.duration),
                "parent": task.parent,
                "type": (task.type == "task" ? "gantt.config.types.task" : "gantt.config.types.milestone")
                //"projectId": component.state.ProjectId
            };

            var settings = {
                method: "PUT",
                url: "/api/Projects/EditTask",
                contentType: "application/json",
                data: JSON.stringify(dhtmlxganttTask),
            };
            $.ajax(settings)
                .done(function (taskId) {
                    if (taskId !== null && taskId !== '') {
                        gantt.changeTaskId(task.id, taskId);
                    }
                    $.notify(
                        {
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
    GanttProjectSheet(tasks) {

        var component = this;
        if ($("#HiddenGanttRendered").val() !== '' && $("#HiddenGanttRendered").val() !== null) {
            gantt.clearAll();
        }
        gantt.config.lightbox.sections = [
            { name: "description", height: 70, map_to: "text", type: "textarea" },
            { name: "type", height: 50, type: "typeselect", map_to: "type" },
            { name: "time", type: "duration", map_to: "auto" }
        ];

        var mappedTasks = tasks.data.map((t) => {
            return {
                "id": t.id,
                "text": t.text,
                "start_date": t.start_date,
                "duration": t.duration,
                "parent": t.parent,
                "progress": t.progress,
                "open": t.open,
                "type": (t.type == "gantt.config.types.task" ? gantt.config.types.task : gantt.config.types.milestone)
            }
        });
        var convertedObj = {
            "data": mappedTasks,
            "links": tasks.links
        };
        //console.log(convertedObj);
        gantt.config.autosize = "y";
        gantt.config.fit_tasks = true;
        gantt.init("gantt_here");
        gantt.parse(convertedObj);
        $("#HiddenGanttRendered").val("true");
        this.setState({ ProjectLoaded: true });
    }
    LoadProjectDynamicTasks() {
        var component = this;
        $("body").on("change", "#SelectProjectId", function (e) {
            var projectId = $(this).val();
            component.setState({
                ProjectId: projectId
            });

            $.get("/api/ProjectManagement/GetProjectTasks/" + projectId)
                .done(function (tasks) {
                    if (tasks != null) {
                        component.GanttProjectSheet(tasks);
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    $.notify(
                        {
                            icon: "fa fa-exclamation-square",
                            message: "Sorry, an error has occured : " + jqXHR.responseText
                        }, {
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
        gantt.attachEvent("onAfterTaskAdd", function (id, item) {
            component.GanttAddTask(id, item);
        });
        gantt.attachEvent("onAfterTaskUpdate", function (id, item) {
            component.GanttEditTask(id, item);
        });
        this.LoadProjectDynamicTasks();
    }
    render() {
        var scheduleStyle = {
            width: '100%',
            height: '100%'
        };
        return (
            <div>
                <div id="gantt_here" style={scheduleStyle}></div>
            </div>
        );
    }
}

ReactDOM.render(<GanntScheduler />,
    document.getElementById("divGanttScheduler"));