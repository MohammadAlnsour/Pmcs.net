
class FilterPaymentWorkflow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Contracts: "",
            Payments: "",
            ContractPayments: ""
        };
        this.FilterPayments = this.FilterPayments.bind(this);
        this.LoadLeaseContracts = this.LoadLeaseContracts.bind(this);
        this.FilterWorkflowByPayment = this.FilterWorkflowByPayment.bind(this);
        this.SelectPaymentId = this.SelectPaymentId.bind(this);
    }
    LoadLeaseContracts() {
        var component = this;
        $.get("/api/LeaseContracts/GetLeaseContracts")
            .done(function (leaseContracts) {
                if (leaseContracts != null) {
                    var leaseContractsHtml = [];
                    for (var i = 0; i < leaseContracts.length; i++) {
                        leaseContractsHtml.push(
                            <option value={leaseContracts[i].ContractId}>{leaseContracts[i].LeaseContractNumber}</option>
                        );
                    }
                    component.setState({
                        Contracts: leaseContractsHtml
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
    FilterWorkflowByPayment() {
        var paymentId = $("#SelectPayment").val();
        if (paymentId !== null && paymentId !== '') {
            $.get("/api/LeaseContracts/GetPaymentWorkflow/" + paymentId)
                .done(function (leasePayments) {
                    if (leasePayments != null) {
                        // var leasePaymentTrs = [];
                        //$("#TablePaymentWorkflow tbody tr").remove();
                        var table = $('#TablePaymentWorkflow').DataTable();
                        table.rows().remove().draw();

                        for (var i = 0; i < leasePayments.length; i++) {

                            table.row.add([
                                leasePayments[i].LeaseContractNumber,
                                leasePayments[i].TransactionId,
                                leasePayments[i].StageName,
                                leasePayments[i].ReceivedDateString,
                                ((leasePayments[i].ProcessedDate == null) ? "-" : leasePayments[i].ProcessedDate),
                                ((leasePayments[i].OwnerName == '' || leasePayments[i].OwnerName == null) ? "-" : leasePayments[i].OwnerName),
                                ((leasePayments[i].Status == 1 || workflow.Status == 2) ?
                                    "<label class='label label-warning'>" + leasePayments[i].StatusName + "</label>"
                                    :
                                    "<label class='label label-info'>" + leasePayments[i].StatusName + "</label>"),
                                ((leasePayments[i].Remarks == '' || leasePayments[i].Remarks == null) ? "-" : leasePayments[i].Remarks),
                                ((!leasePayments[i].IsFinished) ?
                                    "<button class='btn btn-primary btn-xs' id='BtnApproveRejectWorkflow_" + leasePayments[i].Id + "'>" +
                                    "<i class='fa fa-check-square'></i>" +
                                    "Action" +
                                    "</button>"
                                    : "")
                            ]).draw();

                            //var tr = "<tr>" +
                            //    "<td>" +
                            //    leasePayments[i].LeaseContractNumber +
                            //    "</td>" +
                            //    "<td>" +
                            //    leasePayments[i].TransactionId +
                            //    "</td>" +
                            //    "<td>" +
                            //    leasePayments[i].StageName +
                            //    "</td>" +
                            //    "<td>" +
                            //    leasePayments[i].ReceivedDateString +
                            //    "</td>" +
                            //    "<td>" +
                            //    ((leasePayments[i].ProcessedDate == null) ? "-" : leasePayments[i].ProcessedDate) +
                            //    "</td>" +
                            //    "<td>" +
                            //    ((leasePayments[i].OwnerName == '' || leasePayments[i].OwnerName == null) ? "-" : leasePayments[i].OwnerName) +
                            //    "</td>" +
                            //    "<td>" +
                            //    ((leasePayments[i].Status == 1 || workflow.Status == 2) ?
                            //        "<label class='label label-warning'>" + leasePayments[i].StatusName + "</label>"
                            //        :
                            //        "<label class='label label-info'>" + leasePayments[i].StatusName + "</label>") +
                            //    "</td>" +
                            //    "<td>" +
                            //    ((leasePayments[i].Remarks == '' || leasePayments[i].Remarks == null) ? "-" : leasePayments[i].Remarks) +
                            //    "</td>" +
                            //    "<td>" +
                            //    ((!leasePayments[i].IsFinished) ?
                            //        "<button class='btn btn-primary btn-xs' id='BtnApproveRejectWorkflow_" + leasePayments[i].Id + "'>" +
                            //        "<i class='fa fa-check-square'></i>" +
                            //        "Action" +
                            //        "</button>"
                            //        : "") +
                            //    "</td>" +
                            //    "</tr>";

                            //$("#TablePaymentWorkflow tbody").append(tr);
                        }
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
    }
    componentDidMount() {
        var component = this;
        this.LoadLeaseContracts();
    }
    FilterPayments(e) {
        var component = this;
        var contractId = e.target.value;
        $.get("/api/LeaseContracts/GetLeaseContractPayments/" + contractId)
            .done(function (leasePayments) {
                if (leasePayments != null) {
                    var paymentOptions = [];
                    for (var i = 0; i < leasePayments.length; i++) {
                        paymentOptions.push(
                            <option value={leasePayments[i].TransactionId}>{leasePayments[i].PaymentTransactionNumber}</option>
                        );
                    }
                    component.setState({
                        ContractPayments: paymentOptions
                    });
                    $('.selectpicker').selectpicker('refresh');
                    $("#SelectPayment").prop('disabled', '');
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
    SelectPaymentId() {
        $("#BtnGetPaymentWorkflow").prop("disabled", '');
        $('.selectpicker').selectpicker('refresh');
    }
    render() {
        return (
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                Select Lease Contract :
                            </td>
                            <td>
                                <select id="SelectContract" name="SelectContract" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" onChange={this.FilterPayments}>
                                    <option value="">Select Lease Contract</option>
                                    {this.state.Contracts}
                                </select>
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;
                            </td>
                            <td>
                                Select Payment :
                            </td>
                            <td>
                                <select id="SelectPayment" name="SelectPayment" style={{ width: '100%' }} disabled className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" onChange={this.SelectPaymentId}>
                                    <option value="">Select Payment</option>
                                    {this.state.ContractPayments}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button id="BtnGetPaymentWorkflow" onClick={this.FilterWorkflowByPayment} className="btn btn-primary"> Get Payment Workflow</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(<FilterPaymentWorkflow />,
    document.getElementById("DivFilterLeasePaymentWorkflow"));