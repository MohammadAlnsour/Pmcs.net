

class AddLeasePayment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            LeaseContracts: "",
            LeasePaymentStatuses: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddLeasePayment = this.OpenAddLeasePayment.bind(this);
        this.SaveLeasePayment = this.SaveLeasePayment.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
    }
    CloseModal() {
        $("#addLeasePaymentModal").modal("hide");
    }
    OpenAddLeasePayment() {
        $("#addLeasePaymentModal").modal("show");
    }
    ClearUpForm() {
        //$("#TxtSiteNumber").val("");
        //$("#SelectSiteType").val("");
        //$("#SelectSitePriority").val("");
        //$("#SelectSiteOwner").val("");
        //$("#SelectGoveronate").val("");
        //$("#SelectDistrict").val("");
        //$("#TxtBlockNumber").val("");
        //$("#TxtStreetNumber").val("");
        //$("#TxtSubStreetNumber").val("");
        //$("#TxtBuildingNumber").val("");
        //$("#TxtBuildingName").val("");
        //$("#TxtSiteName").val("");
        //$("#SelectProject").val("");
        //$("#SelectTasks").val("");
        $("#FormAddLeasePayment")[0].reset();
    }
    SaveLeasePayment() {
        var component = this;

        $.validator.addMethod("onlyleters", function (value, element) {
            return this.optional(element) || /^[+]?[\s\d\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF?,-]+([.][\s\d\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF?,-])?$/.test(value);
        }, '');
        $.validator.addMethod("onlynumbers", function (value, element) {
            return this.optional(element) || /^[+]?[0-9]+([.][0-9])?$/.test(value);
        }, '');
        $.validator.addMethod("validateEmail", function (value, element) {
            return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        }, '');
        $.validator.addMethod("validateURL", function (value, element) {
            return this.optional(element) || /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value);
        }, '');
        $.validator.addMethod("mustEqual", function (value, element, originalInput) {
            var orginalvalue = $(originalInput).val();
            return orginalvalue === value;
        }, '');
        $.validator.addMethod("afterDate", function (endDate, element, startDateField) {
            var startDate = $(startDateField).val();
            //   1438/09/11
            var startYear = startDate.split('/')[0];
            var startMonth = startDate.split('/')[1];
            var startDay = startDate.split('/')[2];

            var endYear = endDate.split('/')[0];
            var endMonth = endDate.split('/')[1];
            var endDay = endDate.split('/')[2];

            var startDateValue = new Date(startYear, startMonth, startDay);
            var endDateValue = new Date(endYear, endMonth, endDay);

            return +startDateValue <= +endDateValue;

        }, '');
        $('#FormAddLeasePayment').validate({
            rules: {
                LeaseId: {
                    required: true
                },
                PaymentSequenceId: {
                    onlynumbers: true
                },
                Amount: {
                    onlynumbers: true
                },
                LeasePaymentStatus: {
                    onlynumbers: true
                }
            },
            messages: {
                LeaseId: {
                    required: "Please enter this required field."
                },
                PaymentSequenceId: {
                    onlynumbers: "Valid numbers are allowed only."
                },
                Amount: {
                    onlynumbers: "Valid numbers are allowed only."
                },
                LeasePaymentStatus: {
                    onlynumbers: "Valid numbers are allowed only."
                }
            },
            errorElement: 'div',
            errorLabelContainer: '.alert alert-danger',
            errorPlacement: function (error, element) {
                $(error).css({ color: "red" });
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error);
                } else {
                    error.insertAfter(element);
                }
            }
        });

        if ($("#FormAddLeasePayment").valid()) {

            var settings = {
                method: "POST",
                url: "/api/LeaseContracts/PostLeasePayment",
                contentType: "application/json",
                data: JSON.stringify({
                    LeaseId: $("#SelectLeaseContract").val(),
                    PaymentTransactionNumber: $("#TxtPaymentTransactionNumber").val(),
                    ElectricCharges: true,
                    LeaseDuration: "",
                    PaymentSequenceId: "0",
                    Amount: $("#TxtAmount").val(),
                    LeasePaymentStatus: $("#SelectLeasePaymentStatus").val(),
                    PaymentDueDate: $("#TxtPaymentDueDate").val(),
                    ReceipeNumber: $("#TxtReceipeNumber").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    component.ClearUpForm();
                   // $("#divPaymentsTableContainer").html(res);
                    $("#addLeasePaymentModal").modal("hide");

                    $.notify(
                        {
                            // icon: "fa fa-check-square",
                            message: "<i class='fa fa-check-square' style='font-size:30px; float: left;'></i>  <h5 style='float: left;'> The action has been completed successfully. </h5> <br /><br />"
                        }
                        ,
                        {
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
        $(".datepicker").datepicker();

        $.get("/api/LeaseContracts/GetLeaseContracts")
            .done(function (contracts) {
                var contractsHtml = [];
                if (contracts != null) {

                    for (var i = 0; i < contracts.length; i++) {
                        contractsHtml.push(
                            <option value={contracts[i].ContractId}>{contracts[i].LeaseContractNumber}</option>
                        );
                    }
                    component.setState({
                        LeaseContracts: contractsHtml
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
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div>
                <button className="btn btn-primary" onClick={this.OpenAddLeasePayment}>
                    <i className="fa fa-plus-circle"></i>&nbsp;
                    Add New Lease Payment
                </button>

                <div id="addLeasePaymentModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add Lease Payment</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddLeasePayment">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Lease Contract : *
                                                </td>
                                                <td>
                                                    <select id="SelectLeaseContract" name="SelectLeaseContract" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        {this.state.LeaseContracts}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Transaction Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtPaymentTransactionNumber" name="TxtPaymentTransactionNumber" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Amount : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtAmount" name="TxtAmount" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Lease Payment Status : *
                                                </td>
                                                <td>
                                                    <select id="SelectLeasePaymentStatus" name="SelectLeasePaymentStatus" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        <option value="Paid">Paid</option>
                                                        <option value="Delayed">Delayed</option>
                                                        <option value="Rejected">Rejected</option>
                                                        <option value="Wait for apprvoal">Wait for apprvoal</option>
                                                        {this.state.LeasePaymentStatuses}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Payment Due Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtPaymentDueDate" readOnly name="TxtPaymentDueDate" className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Receipe Number :
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtReceipeNumber" name="TxtReceipeNumber" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.SaveLeasePayment}>Save Payment</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<AddLeasePayment />,
    document.getElementById("divAddLeasePayment"));