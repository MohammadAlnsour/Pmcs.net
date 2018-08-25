
class SystemModules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.CloseModal = this.CloseModal.bind(this);
        this.OpenModal = this.OpenModal.bind(this);
        this.ChangeStatus = this.ChangeStatus.bind(this);
        this.DeactivateHandler = this.DeactivateHandler.bind(this);
        this.ActivateHandler = this.ActivateHandler.bind(this);
    }
    CloseModal() {
        $("#confirmDialog").hide();
    }
    OpenModal() {
        $("#confirmDialog").show();
    }
    componentDidMount() {
        var component = this;
        $("body").on("click", "button[id^='BtnActivate_']", function () {
            var id = $(this).attr("id").split("_")[1];
            //component.ActivateHandler(id);
            $("#HiddenId").val(id);
            $("#HiddenOp").val("activate");
            component.OpenModal();
        });
        $("body").on("click", "button[id^='BtnDeactivate_']", function () {
            var id = $(this).attr("id").split("_")[1];
            $("#HiddenId").val(id);
            $("#HiddenOp").val("Deactivate");
            //component.DeactivateHandler(id);
            component.OpenModal();
        });
    }
    ChangeStatus() {
        var id = $("#HiddenId").val();
        var op = $("#HiddenOp").val();
        if (op == "activate") {
            this.ActivateHandler(id);
        }
        else {
            this.DeactivateHandler(id);
        }
    }
    DeactivateHandler(moduleId) {
        var component = this;
        $.get("/api/Modules/Deactivate/" + moduleId)
            .done(function (results) {
                if (results != null) {
                    $("#tableContainer").html(results);
                    component.CloseModal();
                }
            })
            .fail(function (err) {
                alert(err);
            });
    }
    ActivateHandler(moduleId) {
        var component = this;
        $.get("/api/Modules/Activate/" + moduleId)
            .done(function (results) {
                if (results != null) {
                    $("#tableContainer").html(results);
                    component.CloseModal();
                }
            })
            .fail(function (err) {
                alert(err);
            });
    }
    render() {
        return (
            <div id="confirmDialog" className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmation</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to complete this action?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.ChangeStatus}>Yes</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <SystemModules />,
    document.getElementById("ModalDiv"));
