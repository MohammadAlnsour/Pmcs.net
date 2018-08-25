
class FilterInvoiceWorkflows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Invoices: "",
            Workflows: ""
        };
        this.FilterWorkflows = this.FilterWorkflows.bind(this);
        this.LoadInvoices = this.LoadInvoices.bind(this);
    }
    LoadInvoices() {
        var component = this;
        $.get("/api/Invoices/GetInvoices")
            .done(function (invoices) {
                if (invoices != null) {
                    var invoicesHtml = [];
                    for (var i = 0; i < invoices.length; i++) {
                        invoicesHtml.push(
                            <option value={invoices[i].InvoiceId}>{invoices[i].InvoiceNumber}</option>
                        );
                    }
                    component.setState({
                        Invoices: invoicesHtml
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
    componentDidMount() {
        var component = this;
        this.LoadInvoices();
        $('#TableWorkflows').DataTable({"ordering": false});
    }
    FilterWorkflows(e) {
        var contractId = e.target.value;
        $.get("/api/Invoices/GetInvoiceWorkflow/" + contractId)
            .done(function (workflows) {
                if (workflows != null) {
                    $("#DivInvoiceWorkflowContainer").html(workflows);
                    //var workflowTrs = [];
                    //$("#TableWorkflows tbody tr").remove();
                    //for (var i = 0; i < workflows.length; i++) {
                    //    $("#TableWorkflows tbody").append("<tr>" +
                    //        " <td>" +
                    //        "<a>" +
                    //        workflows[i].InvoiceNumber +
                    //        "</a>" +
                    //        "</td>" +
                    //        "<td>" +
                    //        workflows[i].StageName +
                    //        "</td>" +
                    //        "<td>" +
                    //        workflows[i].ReceivedDateString +
                    //        "</td>" +
                    //        "<td>" +
                    //        (workflows[i].ProcessedDate != null ? (workflows[i].ProcessedDate) : "")
                    //        +
                    //        "</td>" +
                    //        "<td>" +
                    //        ((workflows[i].OwnerName == null || workflows[i].OwnerName == '') ? "-" : workflows[i].OwnerName)
                    //        +
                    //        "</td>"
                    //        +
                    //        "<td>" +
                    //        workflows[i].StatusName
                    //        +
                    //        "</td>" +
                    //        +
                    //        "<td>" +
                    //        workflows[i].Remarks
                    //        +
                    //        "</td>" +
                    //        "<td>" +
                    //        (workflows[i].IsFinished ? "" : "<button class='btn btn-primary btn-xs' id='BtnApproveRejectWorkflow_" + workflows[i].Id + "'>" +
                    //            " <i class='fa fa-check-square'></i> Action " + "</button>") +
                    //        "</td>" +
                    //        "</tr>");
                    //}
                    ////component.setState({
                    ////    Workflows: leasePaymentTrs
                    ////});
                    $('.selectpicker').selectpicker('refresh');
                    $('#TableWorkflows').DataTable({"ordering": false});
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
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <td style={{ width: '15%' }}>
                                Select an invoice :
                            </td>
                            <td>
                                <select id="SelectInvoice" name="SelectInvoice" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" onChange={this.FilterWorkflows}>
                                    <option value="">Select an invoice</option>
                                    {this.state.Invoices}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(<FilterInvoiceWorkflows />,
    document.getElementById("DivFilterInvoiceWorkflow"));