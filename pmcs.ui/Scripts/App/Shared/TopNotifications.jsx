
class TopNotifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            NumberOfNotifications: "",
            UserNotifications: ""
        };
        this.LoadUserNotifications = this.LoadUserNotifications.bind(this);
    }

    componentDidMount() {
        this.LoadUserNotifications();
    }

    LoadUserNotifications() {

        var component = this;
        $.get("/api/Notifications/GetUserUnreadNotifications/")
            .done(function (notifications) {
                if (notifications != null) {

                    component.setState({
                        NumberOfNotifications: notifications.length
                    });

                    var notificationsHtml = [];
                    for (var i = 0; i < notifications.length; i++) {
                        notificationsHtml.push(
                            <li>
                                <div className="dropdown-messages-box" style={{ marginLeft: '12px' }}>
                                    <h5>
                                        {notifications[i].NotificationSubject}
                                    </h5>
                                    <div className="message-body">
                                        <a href={notifications[i].URL}>
                                            {notifications[i].NotificationBody}
                                            <br />
                                            <small className="text-muted">{notifications[i].NotificationDateString}</small>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        );
                        if ((i + 1) !== notifications.length) {
                            notificationsHtml.push(<li className='divider'></li>);
                        }
                    }
                    component.setState({
                        UserNotifications: notificationsHtml
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

    render() {
        return (
            <li className="dropdown">
                <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                    <em className="fa fa-bell"></em>
                    <span className="label label-info">{this.state.NumberOfNotifications}</span>
                </a>
                <ul className='dropdown-menu dropdown-alerts'>
                    {this.state.UserNotifications}
                </ul>
            </li>
        );
    }

}

ReactDOM.render(<TopNotifications />,
    document.getElementById("HeaderNotifications"));