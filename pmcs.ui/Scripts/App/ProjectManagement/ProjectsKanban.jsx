
class ProjectsKanban extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Late: "",
            Finished: "",
            Ongoing: ""
        };
        this.FilterKanbanBoardByProject = this.FilterKanbanBoardByProject.bind(this);
        this.GetOngoingTasks = this.GetOngoingTasks.bind(this);
        this.GetFinishedTasks = this.GetFinishedTasks.bind(this);
        this.GetLateTasks = this.GetLateTasks.bind(this);
    }
    FilterKanbanBoardByProject(projectId) {
        var component = this;
        //var projectId = event.target.value;
        if (projectId != "" && projectId != null) {
            this.GetOngoingTasks(projectId);
            this.GetLateTasks(projectId);
            this.GetFinishedTasks(projectId);
        }
    }

    GetOngoingTasks(projectId) {
        var component = this;
        this.setState({
            Ongoing: ""
        });
        $.get("/api/ProjectManagement/GetProjectKanbanOngoingTasks/" + projectId)
            .done(function (tasks) {
                var taskCards = [];
                for (var i = 0; i < tasks.length; i++) {
                    taskCards.push(

                        <li className="dd-item" data-id="1">
                            <h3 className="title dd-handle">
                                {tasks[i].TaskName}
                            </h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 'normal' }}>
                                            Task duration :
                                        </td>
                                        <td style={{ fontWeight: 'normal' }}>
                                            {tasks[i].TaskDuration} days
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="actions">
                                <a className="btn btn-primary" href={tasks[i].TaskURL}>
                                    <i className="material-icons"></i>
                                    Details
                                </a>
                            </div>
                        </li>
                    );
                }
                component.setState({
                    Ongoing: taskCards
                });
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
    GetFinishedTasks(projectId) {
        var component = this;
        this.setState({
            Finished: ""
        });
        $.get("/api/ProjectManagement/GetProjectKanbanFinishedTasks/" + projectId)
            .done(function (tasks) {
                var taskCards = [];
                for (var i = 0; i < tasks.length; i++) {
                    taskCards.push(
                        <li className="dd-item" data-id="1">
                            <h3 className="title dd-handle">
                                {tasks[i].TaskName}
                            </h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 'normal' }}>
                                            Task duration :
                                        </td>
                                        <td style={{ fontWeight: 'normal' }}>
                                            {tasks[i].TaskDuration} days
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="actions">
                                <a className="btn btn-primary" href={tasks[i].TaskURL}>
                                    <i className="material-icons"></i>
                                    Details
                                    </a>
                            </div>
                        </li>
                    );
                }
                component.setState({
                    Finished: taskCards
                });
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
    GetLateTasks(projectId) {
        var component = this;
        this.setState({
            Late: ""
        });
        $.get("/api/ProjectManagement/GetProjectKanbanLateTasks/" + projectId)
            .done(function (tasks) {
                var taskCards = [];
                for (var i = 0; i < tasks.length; i++) {
                    taskCards.push(
                        <li className="dd-item" data-id="1">
                            <h3 className="title dd-handle">
                                {tasks[i].TaskName}
                            </h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 'normal' }}>
                                            Task duration :
                                        </td>
                                        <td style={{ fontWeight: 'normal' }}>
                                            {tasks[i].TaskDuration} days
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="actions">
                                <a className="btn btn-primary" href={tasks[i].TaskURL}>
                                    <i className="material-icons"></i>
                                    Details
                                </a>
                            </div>
                        </li>
                    );
                }
                component.setState({
                    Late: taskCards
                });
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
        $("#SelectProject").change(function (e) {
            var projectId = $(this).val();
            //alert(projectId);
            if (projectId != "" && projectId != null) {
                component.FilterKanbanBoardByProject(projectId);
            }
        });
    }
    render() {

        return (
            <div style={{ width: '100%' }}>

                <ol style={{ maxWidth: '350px !important' }} className="kanban progress">
                    <div className="kanban__title">
                        <h2>
                            <i className="fa fa-spinner"></i> Ongoing Tasks
                        </h2>
                    </div>
                    {this.state.Ongoing}
                </ol>
                <ol style={{ maxWidth: '350px !important' }} className="kanban  Done">
                    <div className="kanban__title">
                        <h2>
                            <i className="fa fa-check-square"></i> Finished Tasks
                        </h2>
                    </div>
                    {this.state.Finished}
                </ol>
                <ol style={{ maxWidth: '350px !important' }} className="kanban Gone">
                    <div className="kanban__title">
                        <h2>
                            <i className="fa fa-history"></i> Late Tasks
                        </h2>
                    </div>
                    {this.state.Late}
                </ol>

            </div>
        );
    }
}

ReactDOM.render(<ProjectsKanban />,
    document.getElementById("DivProjectsKanban"));