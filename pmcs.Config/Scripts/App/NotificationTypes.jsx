class AddNotificationType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.SaveNotificationType = this.SaveNotificationType.bind(this);
        this.HideAddNotificationDialog = this.HideAddNotificationDialog.bind(this);
    }
    HideAddNotificationDialog() {
        $("#addNotifiactionTypeDialog").hide();
    }
    componentDidMount() {
        tinymce.init({ selector: 'textarea' });
    }
    SaveNotificationType() {
        var typeName = $("#TxtNotificationTypeName").val();
        var typeTemplate = $("#TxtNotificationTemplate").val();

        var settings = {
            method: "POST",
            url: "/NotificationsConfiguration/SaveNotificationType",
            contentType: "application/json",
            data: JSON.stringify({
                NotificationTypeName: typeName,
                NotificationText: typeTemplate,
                NotificationTypeDescription: "",
                IsActive: true
            }),
        };
        $.ajax(settings)
            .done(function (res) {
                $("#MainTableContainer").html(res);
                $("#addNotifiactionTypeDialog").hide();
                $("#TxtNotificationTypeName").val("");
                $("#TxtNotificationTemplate").val("");

                $.notify(
                    {
                        icon: "ti-check",
                        message: "The action has been completed successfully."
                    }, {
                        type: 'success',
                        timer: 3000,
                        placement: {
                            from: 'top',
                            align: 'center'
                        }
                    });
            })
            .fail(function (xhr, responseText) {
                $.notify(
                    {
                        icon: "ti-na",
                        message: "A problem has occured : " + xhr.responseText
                    },
                    {
                        type: 'danger',
                        timer: 3000,
                        placement: {
                            from: 'top',
                            align: 'center'
                        }
                    });
            });
    }
    render() {
        return (
            <div id="allDialogs">
                <div id="addNotifiactionTypeDialog" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Notification Type dialog</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.HideAddNotificationDialog}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form id="FormAddNotificationType" name="FormAddNotificationType">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Notification Type Name</label>
                                                <input type="text" id="TxtNotificationTypeName" name="TxtNotificationTypeName" className="form-control border-input" placeholder="Notification Type Name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Notification Template</label>
                                                <textarea id="TxtNotificationTemplate" name="TxtNotificationTemplate" className="form-control border-input" placeholder="Notification Template" style={{ height: '300px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-info btn-fill btn-wd" onClick={this.SaveNotificationType}>Save Notification Type</button>
                                    <button type="button" className="btn btn-secondary btn-fill" data-dismiss="modal" onClick={this.HideAddNotificationDialog}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

ReactDOM.render(
    <AddNotificationType />,
    document.getElementById("Maincontentcontainer"));