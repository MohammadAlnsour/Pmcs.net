
class ProjectsStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProjectId: "",
            ProjectsOptions: "",
            ProjectTasks: "",
            SubTasks: "",
            SelectedTask: ""
        };
        this.LoadProjectsToDropdownList = this.LoadProjectsToDropdownList.bind(this);
        this.FilterTreeTableByProject = this.FilterTreeTableByProject.bind(this);
        this.LoadSubTasksRecursively = this.LoadSubTasksRecursively.bind(this);
        this.LoadTaskDetails = this.LoadTaskDetails.bind(this);
        this.CloseModal = this.CloseModal.bind(this);
        this.OpenModal = this.OpenModal.bind(this);
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
    LoadTaskDetails(taskId) {

        var component = this;
        $.get("/api/ProjectManagement/GetTaskDetails/" + taskId)
            .done(function (task) {
                if (task != null) {
                    component.setState({ SelectedTask: task });
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
    TableRowClick(taskId) {
        var component = this;
        this.LoadTaskDetails(taskId);
        this.OpenModal();
    }
    LoadSubTasksRecursively(parentTaskId, parentTTId, allTasksRows) {
        var component = this;
        $.get("/api/ProjectManagement/GetTaskChildTasksTreeTable/" + parentTaskId)
            .done(function (childNodes) {
                if (childNodes != null) {
                    for (var i = 0; i < childNodes.length; i++) {
                        var childTTId = parentTTId.toString() + "-" + (i + 1).toString();
                        allTasksRows.push(
                            <tr data-tt-id={childTTId} data-tt-parent-id={parentTTId}>
                                <td>
                                    {childNodes[i].TaskName}
                                </td>
                                <td>
                                    {childNodes[i].TaskName}
                                </td>
                                <td>
                                    {childNodes[i].TaskName}
                                </td>
                                <td>
                                    {childNodes[i].TaskName}
                                </td>
                                <td>
                                    {childNodes[i].TaskName}
                                </td>
                                <td>
                                    {childNodes[i].TaskName}
                                </td>
                            </tr>
                        );

                        component.LoadSubTasksRecursively(childNodes[i].TaskId, childTTId, allTasksRows);
                    }
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
    FilterTreeTableByProject(event) {
        var component = this;
        var projectId = event.target.value;
        if (projectId > 0) {
            $.get("/api/ProjectManagement/GetProjectRootNodesTreeTable/" + projectId)
                .done(function (rootNodes) {
                    var allTasksRows = [];
                    for (var i = 0; i < rootNodes.length; i++) {
                        allTasksRows.push(
                            <tr onClick={component.TableRowClick.bind(component, rootNodes[i].TaskId)} id={rootNodes[i].TaskId} data-tt-id={rootNodes[i].DataTTId} data-tt-parent-id={rootNodes[i].DataTTParentId}>
                                <td>
                                    {rootNodes[i].TaskName}
                                </td>
                                <td>
                                    {rootNodes[i].PlanStartDateString}
                                </td>
                                <td>
                                    {rootNodes[i].PlanEndDateString}
                                </td>
                                <td>
                                    {rootNodes[i].ActualStartDateString}
                                </td>
                                <td>
                                    {rootNodes[i].ActualEndDateString}
                                </td>
                                <td>
                                    {rootNodes[i].TaskDuration}
                                </td>
                                <td>
                                    <div className="progress">
                                        <div data-percentage={(rootNodes[i].CompletionPercentage * 100) + "%"} style={{ width: (rootNodes[i].CompletionPercentage * 100) + "%" }} className="progress-bar progress-bar-blue" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </td>
                                <td>
                                    {rootNodes[i].TaskComplete == true ? "Finished" : "Pending"}
                                </td>
                            </tr>
                        );
                    }
                    component.setState({
                        ProjectTasks: allTasksRows
                    });

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
    }
    componentDidMount() {
        var component = this;
        this.LoadProjectsToDropdownList(this);
        $("#TableTreeTable").treetable({ expandable: true, initialState: "expanded" }, true);
    }
    CloseModal() {
        $("#TaskDetailsModal").modal("hide");
    }
    OpenModal() {
        $("#TaskDetailsModal").modal("show");
    }
    render() {

        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };

        return (
            <div>
                <div className="col-md-12">
                    <div className="col-md-3">
                        <label>
                            Filter out by specific project :
                        </label>
                    </div>
                    <div className="col-md-9">
                        <select id="SelectProjects" onChange={this.FilterTreeTableByProject} className="selectpicker show-tick form-control" data-live-search="true">
                            <option value="0">Please select a project</option>
                            {this.state.ProjectsOptions}
                        </select>
                    </div>
                </div>
                <br />
                <br />

                <table id="TableTreeTable" className="table">
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Planned Start Date</th>
                            <th>Planned End Date</th>
                            <th>Actual Start Date</th>
                            <th>Actual End Date</th>
                            <th>Task Duration</th>
                            <th>Completion Percentage</th>
                            <th>Task Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ProjectTasks}
                    </tbody>
                </table>

                <div id="TaskDetailsModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Task Details</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '15%' }}>
                                                Task Name :
                                                </td>
                                            <td>
                                                {this.state.SelectedTask.TaskName}
                                            </td>
                                            <td>&nbsp;</td>
                                            <td style={{ width: '15%' }}>
                                                Project :
                                                </td>
                                            <td>
                                                <a href={"/Project/" + this.state.SelectedTask.ProjectId}>
                                                    {this.state.SelectedTask.ProjectName}
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '15%' }}>
                                                Parent Task :
                                                </td>
                                            <td>
                                                {(this.state.SelectedTask.ParentTaskId != null ? this.state.SelectedTask.ParentTaskName : "-")}
                                            </td>
                                            <td>&nbsp;</td>
                                            <td style={{ width: '15%' }}>
                                                Is MileStone :
                                            </td>
                                            <td>
                                                {(this.state.SelectedTask.IsMileStone ? "Yes" : "No")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '15%' }}>
                                                Planned Start Date :
                                                </td>
                                            <td>
                                                {this.state.SelectedTask.PlanStartDateString}
                                            </td>
                                            <td>&nbsp;</td>
                                            <td style={{ width: '15%' }}>
                                                Planned End Date :
                                                </td>
                                            <td>
                                                {this.state.SelectedTask.PlanEndDateString}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '15%' }}>
                                                Actual Start Date :
                                                </td>
                                            <td>
                                                {this.state.SelectedTask.ActualStartDateString}
                                            </td>
                                            <td>&nbsp;</td>
                                            <td style={{ width: '15%' }}>
                                                Actual End Date :
                                                </td>
                                            <td>
                                                {this.state.SelectedTask.ActualEndDateString}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '15%' }}>
                                                Task Status :
                                                </td>
                                            <td>
                                                {(this.state.SelectedTask.TaskStatus == 1) ? <img src="/Contents/img/if_status-busy_46252.png" /> : <img src="/Contents/img/if_status_46254.png" />}
                                                {this.state.SelectedTask.StatusName}
                                            </td>
                                            <td>&nbsp;</td>
                                            <td style={{ width: '15%' }}>
                                                Task Duration :
                                            </td>
                                            <td>
                                                {this.state.SelectedTask.TaskDuration} Days
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '15%' }}>
                                                Completion Percentage :
                                                </td>
                                            <td>
                                                {this.state.SelectedTask.CompletionPercentage} %
                                            </td>
                                            <td>&nbsp;</td>
                                            <td style={{ width: '15%' }}>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<ProjectsStatus />,
    document.getElementById("DivTreeTableContrainer"));