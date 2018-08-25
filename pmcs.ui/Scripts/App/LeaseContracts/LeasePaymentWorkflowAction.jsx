
class LeasePaymentWorkflowAction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workflow: "",
            allowedActions: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.RenderWorkflowAction = this.RenderWorkflowAction.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
    }
    ClearUpForm() {
        $("#TextWorkflowRemarks").val("");
    }
    DoAction() {
        var component = this;
        var workflowId = $("#HiddenWorkflowId").val();
        var settings = {
            method: "PUT",
            url: "/api/LeaseContracts/DoPaymentWorkflowAction",
            contentType: "application/json",
            data: JSON.stringify({
                Id: workflowId,
                Status: Number($("#SelectWorkflowAction").val()),
                OwnerName: "",
                ProcessedDate: "",
                Remarks: $("#TextWorkflowRemarks").val()
            }),
        };
        $.ajax(settings)
            .done(function (res) {
                $("#DivLeasePaymentWorkflowContainer").html(res);
                $("#PaymentWrokflowActionModal").modal("hide");
                $("#TextWorkflowRemarks").val("");
                $.notify(
                    {
                        // icon: "fa fa-check-square",
                        message: "<i class='fa fa-check-square' style='font-size:30px; float: left;'></i>  <h5 style='float: left;'> &nbsp; The action has been completed successfully. </h5> <br /><br />"
                    }, {
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
    ClearUpForm() {
        $("#FormPaymentWorkflowAction")[0].reset();
    }
    RenderWorkflowAction() {
        var workflowId = $("#HiddenWorkflowId").val();
        var component = this;

        if (workflowId !== '' && workflowId > 0) {

            $.get("/api/LeaseContracts/GetLeaseWorkflowDetail/" + workflowId)
                .done(function (workflow) {
                    if (workflow != null) {
                        var allowedActionsHtml = [];
                        var allowedActions = workflow.StageAllowedActions;
                        for (var i = 0; i < allowedActions.length; i++) {
                            switch (allowedActions[i]) {

                                case "2":
                                    allowedActionsHtml.push(<option value="2">Forward</option>);
                                    break;

                                case "3":
                                    allowedActionsHtml.push(<option value="3">Approve</option>);
                                    break;

                                case "4":
                                    allowedActionsHtml.push(<option value="4">Reject</option>);
                                    break;

                                case "5":
                                    allowedActionsHtml.push(<option value="5">Cancel</option>);
                                    break;

                                //case "6":
                                //    allowedActionsHtml.push(<option value="6">Held</option>);
                                //    break;
                                default:
                            }
                        }
                        component.setState({
                            workflow: workflow
                        });
                        component.setState({
                            allowedActions: allowedActionsHtml
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
    }
    componentDidMount() {
        var component = this;
        $("body").on("click", "button[id^='BtnApproveRejectWorkflow_']", function (e) {
            var workflowId = $(this).attr("id").split("_")[1];
            $('#HiddenWorkflowId').val(workflowId);
            component.RenderWorkflowAction(component);
            $('#PaymentWrokflowActionModal').modal('show');
        });
    }
    CloseModal() {
        $("#PaymentWrokflowActionModal").modal("hide");
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div>
                <div id="PaymentWrokflowActionModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Payment workflow action</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-bordered" style={{ width: '60%' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '20%' }}>Lease Number : </td>
                                            <td> {this.state.workflow.LeaseContractNumber} </td>
                                        </tr>
                                        <tr>
                                            <td>Payment Number : </td>
                                            <td> {this.state.workflow.TransactionId} </td>
                                        </tr>
                                        <tr>
                                            <td>Payment Stage : </td>
                                            <td> {this.state.workflow.StageName} </td>
                                        </tr>
                                        <tr>
                                            <td>Received date : </td>
                                            <td> {this.state.workflow.ReceivedDateString} </td>
                                        </tr>

                                    </tbody>
                                </table>
                                <br />
                                <form id="FormPaymentWorkflowAction" name="FormPaymentWorkflowAction">
                                    <div className="row">

                                        <div className="col-md-12">
                                            <div className="col-md-4">
                                                Action : *
                                                <select id="SelectWorkflowAction" className="form-control">
                                                    {this.state.allowedActions}
                                                </select>
                                            </div>
                                        </div>
                                        <br />&nbsp;
                                        <div className="col-md-12">
                                            <div className="col-md-8">
                                                Remarks - Notes :
                                                <textarea id="TextWorkflowRemarks" style={{ height: '100px' }} className="form-control"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.DoAction}><i className="fa fa-check-square"></i> Do Action</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


ReactDOM.render(<LeasePaymentWorkflowAction />,
    document.getElementById("divPaymentsWorkflowAction"));