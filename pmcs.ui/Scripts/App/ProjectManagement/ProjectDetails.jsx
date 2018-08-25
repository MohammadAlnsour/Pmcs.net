

class ProjectDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProjectLoaded: "",
            ProjectId: ""
        };

        this.LoadProjectDynamicTasks = this.LoadProjectDynamicTasks.bind(this);
        this.GanttProjectSheet = this.GanttProjectSheet.bind(this);
    }
    GanttProjectSheet(tasks) {
        var component = this;
        //if ($("#HiddenGanttRendered").val() !== '' && $("#HiddenGanttRendered").val() !== null) {
        //    gantt.clearAll();
        //}
        //gantt.config.lightbox.sections = [
        //    { name: "description", height: 70, map_to: "text", type: "textarea" },
        //    { name: "type", height: 50, type: "typeselect", map_to: "type" },
        //    { name: "time", type: "duration", map_to: "auto" }
        //];
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
        gantt.config.readonly = true;
        gantt.config.autosize = "y";
        gantt.config.fit_tasks = true;
        gantt.init("gantt_here");
        gantt.parse(convertedObj);
        this.setState({ ProjectLoaded: true });
    }
    LoadProjectDynamicTasks() {
        var component = this;
        var projectId = $("#HiddenProjectId").val();
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
    }
    componentDidMount() {
        var component = this;
        this.LoadProjectDynamicTasks();
    }
    render() {
        var scheduleStyle = {
            width: '100%',
            height: '100%'
        };
        return (
            <div id="gantt_here" style={scheduleStyle}></div>
        );
    }
}

ReactDOM.render(<ProjectDetails />,
    document.getElementById("divGanttScheduler"));