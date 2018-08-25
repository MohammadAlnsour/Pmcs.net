
class ViewDocumentReplies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            replies: "",
            Subject: "",
            FileName: "",
            URL: ""
        }
        this.CloseModal = this.CloseModal.bind(this);
        this.OpenModal = this.OpenModal.bind(this);
        this.LoadDocument = this.LoadDocument.bind(this);
        this.LoadDocumentReplies = this.LoadDocumentReplies.bind(this);
        this.SendReply = this.SendReply.bind(this);
    }

    CloseModal() {
        $("#documentRepliesModal").modal("hide");
    }
    OpenModal() {
        $("#documentRepliesModal").modal("show");
    }
    LoadDocument() {
        var documentId = $("#HiddenDocumentId").val();
        var component = this;
        $.get("/api/DocumentManagement/GetDocument/" + documentId)
            .done(function (document) {
                if (document != null) {
                    component.setState({
                        Subject: document.DocSubject
                    });
                    component.setState({
                        FileName: document.DocumentPath.substring(document.DocumentPath.lastIndexOf("/") + 1)
                    });
                    component.setState({
                        URL: document.DocumentPath
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
    LoadDocumentReplies() {
        var documentId = $("#HiddenDocumentId").val();

        var component = this;
        $.get("/api/DocumentManagement/GetDocumentReplies/" + documentId)
            .done(function (replies) {
                if (replies != null) {

                    var repliesHtml = [];
                    for (var i = 0; i < replies.length; i++) {
                        var reply =
                            <li className="left clearfix">
                                <span className="chat-img pull-left">
                                    <img src="/Contents/img/genericUser.png" alt="User Avatar" className="img-circle" />
                                </span>
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font">{replies[i].SenderName}</strong>
                                        <small className="text-muted">{replies[i].SendDate}</small>
                                    </div>
                                    <p>
                                        {replies[i].ReplyDescription}
                                    </p>
                                    <br />
                                </div>
                            </li>;

                        repliesHtml.push(reply);
                    }

                    component.setState({
                        replies: repliesHtml
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

    SendReply() {
        var documentId = $("#HiddenDocumentId").val();
        var component = this;
        if ($("#TxtReplyText").val() != null && $("#TxtReplyText").val() != '') {
            var settings = {
                method: "POST",
                url: "/api/DocumentManagement/PostReply",
                contentType: "application/json",
                data: JSON.stringify({
                    DocumentId: documentId,
                    ReplyDescription: $("#TxtReplyText").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (replies) {

                    var repliesHtml = [];
                    for (var i = 0; i < replies.length; i++) {
                        var reply =
                            <li className="left clearfix">
                                <span className="chat-img pull-left">
                                    <img src="/Contents/img/genericUser.png" alt="User Avatar" className="img-circle" />
                                </span>
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font">{replies[i].SenderName}</strong>
                                        <small className="text-muted">{replies[i].SendDate}</small>
                                    </div>
                                    <p>
                                        {replies[i].ReplyDescription}
                                    </p>
                                    <br />
                                </div>
                            </li>;

                        repliesHtml.push(reply);
                    }
                    component.setState({
                        replies: repliesHtml
                    });
                    $("#TxtReplyText").val("");

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

    componentDidMount() {
        var component = this;
        $("body").on("click", "button[id^='BtnViewOutboxReplies_']", function () {
            var documentId = $(this).attr("id").split("_")[1];
            $("#HiddenDocumentId").val(documentId);
            component.LoadDocument();
            component.LoadDocumentReplies();
            component.OpenModal();
        });

        $("body").on("click", "button[id^='BtnViewReplies_']", function () {
            var documentId = $(this).attr("id").split("_")[1];
            $("#HiddenDocumentId").val(documentId);
            component.LoadDocument();
            component.LoadDocumentReplies();
            component.OpenModal();
        });

        $("body").on("click", "button[id^='BtnAddReply_']", function () {
            var documentId = $(this).attr("id").split("_")[1];
            $("#HiddenDocumentId").val(documentId);
            component.LoadDocument();
            component.LoadDocumentReplies();
            component.OpenModal();
        });
    }

    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div id="documentRepliesModal" className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content" style={modalStyle}>
                        <div className="modal-header">
                            <h5 className="modal-title">Document Replies</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '13%' }}>
                                            <h5>Document Subject :</h5>
                                        </th>
                                        <th>
                                            <h5><label>{this.state.Subject}</label></h5>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '13%' }}>
                                            <h5>Document :</h5>
                                        </td>
                                        <td>
                                            <h5>
                                                <a href={this.state.URL} target="_blank">{this.state.FileName}</a>
                                            </h5>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />

                            <ul style={{ listStyle: 'none' }}>
                                {this.state.replies}
                            </ul>
                            <div className="input-group">
                                <input id="TxtReplyText" type="text" maxLength="300" className="form-control input-md" placeholder="Type your reply text here..." />
                                <span className="input-group-btn">
                                    <button className="btn btn-primary btn-md" id="btn-chat" onClick={this.SendReply}>Send</button>
                                </span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

ReactDOM.render(<ViewDocumentReplies />,
    document.getElementById("divReplies"));