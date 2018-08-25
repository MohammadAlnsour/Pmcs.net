

class ProjectsCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProjectId: "",
            ProjectsOptions: ""
        };
        this.LoadTasksOnCalendar = this.LoadTasksOnCalendar.bind(this);
        this.LoadProjectsToDropdownList = this.LoadProjectsToDropdownList.bind(this);
        this.FilterCalendarByProject = this.FilterCalendarByProject.bind(this);
        this.ReloadAllTasksOnCalendar = this.ReloadAllTasksOnCalendar.bind(this);
    }
    LoadTasksOnCalendar() {
        $.get("/api/ProjectManagement/GetAllProjectTasks")
            .done(function (calendarTasks) {
                $('#fullCalendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay,listMonth'
                    },
                    weekNumbers: true,
                    navLinks: true, // can click day/week names to navigate views
                    editable: false,
                    eventLimit: true, // allow "more" link when too many events
                    eventSources: calendarTasks
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
    ReloadAllTasksOnCalendar() {
        $.get("/api/ProjectManagement/GetAllProjectTasks")
            .done(function (calendarTasks) {
                $('#fullCalendar').fullCalendar('removeEvents');
                $('#fullCalendar').fullCalendar('addEventSource', calendarTasks);
                $('#fullCalendar').fullCalendar('rerenderEvents');
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
    FilterCalendarByProject(event) {
        var projectId = event.target.value;
        if (projectId > 0) {
            $.get("/api/ProjectManagement/GetProjectTasksFullCalendar/" + projectId)
                .done(function (calendarTasks) {
                    console.log(JSON.stringify(calendarTasks));
                    $('#fullCalendar').fullCalendar('removeEvents');
                    $('#fullCalendar').fullCalendar('addEventSource', calendarTasks);
                    $('#fullCalendar').fullCalendar('rerenderEvents');
                    $('#fullCalendar').fullCalendar({
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay,listMonth'
                        },
                        weekNumbers: true,
                        navLinks: true, // can click day/week names to navigate views
                        editable: false,
                        eventLimit: true, // allow "more" link when too many events
                        events: calendarTasks
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
        else {
            this.ReloadAllTasksOnCalendar();
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
        this.LoadTasksOnCalendar(this);
    }
    render() {
        //var scheduleStyle = {
        //    width: '100%',
        //    height: '100%'
        //};
        return (
            <div>
                <div className="col-md-12">
                    <div className="col-md-3">
                        <h4>
                            Filter out by specific project :
                        </h4>
                    </div>
                    <div className="col-md-9">
                        <select id="SelectProjects" onChange={this.FilterCalendarByProject} className="selectpicker show-tick form-control" data-live-search="true">
                            <option value="0">All Projects</option>
                            {this.state.ProjectsOptions}
                        </select>
                    </div>
                </div>
                <br />
                <br />

                <div id="fullCalendar"></div>
            </div>
        );
    }
}

ReactDOM.render(<ProjectsCalendar />,
    document.getElementById("DivProjectsCalendar"));