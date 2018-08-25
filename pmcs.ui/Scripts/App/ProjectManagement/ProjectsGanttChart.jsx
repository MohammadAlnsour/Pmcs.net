

class ProjectsGanttChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProjectId: "",
            ProjectsOptions: ""
        };
        this.LoadProjectsToDropdownList = this.LoadProjectsToDropdownList.bind(this);
        this.GetProjectGantt = this.GetProjectGantt.bind(this);
        this.GanttProjectSheet = this.GanttProjectSheet.bind(this);
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

        gantt.config.autosize = "y";
        gantt.config.fit_tasks = true;
        gantt.config.readonly = true;
        gantt.init("gantt_here");
        gantt.parse(convertedObj);
        $("#HiddenGanttRendered").val("true");
        this.setState({ ProjectLoaded: true });
    }
    GetProjectGantt(event) {
        var component = this;
        var projectId = event.target.value;
        if (projectId > 0) {
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
    LoadProjectsToDropdownList() {
        var component = this;
        $.get("/api/Projects/GetProjectsList")
            .done(function (projects) {
                var optionsHtml = [];
                for (var i = 0; i < projects.length; i++) {
                    optionsHtml.push(
                        <option value={projects[i].ProjectId}>{projects[i].ProjectName}</option>
                    );
                }
                component.setState({
                    ProjectsOptions: optionsHtml
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
    componentDidMount() {
        var component = this;
        this.LoadProjectsToDropdownList(this);
    }
    render() {
        var scheduleStyle = {
            width: '100%',
            height: '100%'
        };
        return (
            <div>
                <div className="col-md-12">
                    <div className="col-md-2">
                        Please select the project :
                    </div>
                    <div className="col-md-10">
                        <select id="SelectProjects" onChange={this.GetProjectGantt} className="selectpicker show-tick form-control" data-live-search="true">
                            <option value="0">Please select the project</option>
                            {this.state.ProjectsOptions}
                        </select>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <hr />
                <div id="gantt_here" style={scheduleStyle}></div>
            </div>
        );
    }
}

ReactDOM.render(<ProjectsGanttChart />,
    document.getElementById("DivFilterProjects"));