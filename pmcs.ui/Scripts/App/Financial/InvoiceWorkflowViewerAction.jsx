﻿
class InvoiceWorkflowViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workflow: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.RenderInvoiceWorkflow = this.RenderInvoiceWorkflow.bind(this);
        //this.OpenAddLeasePayment = this.OpenAddLeasePayment.bind(this);
        //this.SaveLeasePayment = this.SaveLeasePayment.bind(this);
        //this.ClearUpForm = this.ClearUpForm.bind(this);
    }
    RenderInvoiceWorkflow() {
        var invoiceId = $("#HiddenInvoiceId").val();
        var component = this;

        if (invoiceId !== '' && invoiceId > 0) {

            $.get("/api/Invoices/GetInvoiceWorkflowList/" + invoiceId)
                .done(function (workflow) {
                    var workflowHtml = [];
                    if (workflow != null) {

                        for (var i = 0; i < workflow.length; i++) {
                            if (workflow[i].ProcessedDate == null) {

                                workflowHtml.push(
                                    <li>
                                        <div className="timeline-badge"><i className="glyphicon glyphicon-hourglass"></i></div>
                                        <div className="timeline-panel">
                                            <div className="timeline-heading">
                                                <h4 className="timeline-title">
                                                    <b> {workflow[i].StageName} </b>
                                                </h4>
                                            </div>
                                            <div className="timeline-body">
                                                <div className="col-md-5">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <b> Received Date : </b>
                                                                </td>
                                                                <td>
                                                                    <b> {workflow[i].ReceivedDateString} </b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <b> Status: </b>
                                                                </td>
                                                                <td>
                                                                    <b> {workflow[i].StatusName} </b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <b> Processed date: </b>
                                                                </td>
                                                                <td>
                                                                    <b> {workflow[i].ProcessedDate == null ? '-' : workflow[i].ProcessedDate} </b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <b> Processed by: </b>
                                                                </td>
                                                                <td>
                                                                    <b> {(workflow[i].OwnerName == null || workflow[i].OwnerName == '') ? '-' : workflow[i].OwnerName} </b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <b> Notes: </b>
                                                                </td>
                                                                <td>
                                                                    <b> {workflow[i].Remarks == null ? '-' : workflow[i].Remarks} </b>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-md-3">
                                                </div>
                                                <br />
                                            </div>
                                        </div>
                                    </li>
                                );

                            }

                            else {

                                workflowHtml.push(
                                    <li>
                                        <div className="timeline-badge primary"><i className="fa fa-check-circle"></i></div>
                                        <div className="timeline-panel">
                                            <div className="timeline-heading">
                                                <h4 className="timeline-title">
                                                    <b> {workflow[i].StageName} </b>
                                                </h4>
                                            </div>
                                            <div className="timeline-body">
                                                <div className="col-md-5">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <b> Received Date : </b>
                                                                </td>
                                                                <td>
                                                                    <b> {workflow[i].ReceivedDateString} </b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <b> Status: </b>
                                                                </td>
                                                                <td>
                                                                    <b> {workflow[i].StatusName} </b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <b> Processed date: </b>
                                                                </td>
                                                                <td>
                                                                    <b> {workflow[i].ProcessedDate == null ? '-' : workflow[i].ProcessedDate} </b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <b> Processed by: </b>
                                                                </td>
                                                                <td>
                                                                    <b> {(workflow[i].OwnerName == null || workflow[i].OwnerName == '') ? '-' : workflow[i].OwnerName} </b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <b> Notes: </b>
                                                                </td>
                                                                <td>
                                                                    <b> {workflow[i].Remarks == null ? '-' : workflow[i].Remarks} </b>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-md-3">
                                                </div>
                                                <br />
                                            </div>
                                        </div>
                                    </li>
                                );
                            }

                        }
                        component.setState({
                            workflow: workflowHtml
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
        $("body").on("click", "button[id^='BtnWorkflow_']", function (e) {
            //var invoiceId = $(this).attr("id").split("_")[1];
            //$('#HiddenInvoiceId').val(invoiceId);
            component.RenderInvoiceWorkflow(component);
            $('#InvoiceWorkflowModal').modal('show');
        });
    }
    CloseModal() {
        $("#InvoiceWorkflowModal").modal("hide");
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div>
                <div id="InvoiceWorkflowModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Invoice Workflow</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ul className="timeline">
                                    {this.state.workflow}
                                </ul>
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


ReactDOM.render(<InvoiceWorkflowViewer />,
    document.getElementById("divInvoiceWorkflowViewerContainer"));