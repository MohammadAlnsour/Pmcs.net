
class FilterLeasePayments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Contracts: "",
            ContractPayments: ""
        };
        this.FilterPayments = this.FilterPayments.bind(this);
        this.LoadLeaseContracts = this.LoadLeaseContracts.bind(this);
    }
    SaveContractData() {
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
        $('#FormAddLeaseContract').validate({
            rules: {
                TxtLeaseContractNumber: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                SelectSiteOwner: {
                    required: true
                },
                TxtLeaseStartDate: {
                    required: true
                },
                TxtLeaseEndDate: {
                    required: true,
                    afterDate: '#TxtLeaseStartDate'
                },
                SelectPaymentFrequency: {
                    required: true
                },
                TxtPRNumber: {
                    required: true
                },
                TxtPRReservationDate: {
                    required: true
                },
                TxtTotalLeaseAmount: {
                    required: true
                },
                TxtNumberOfPayments: {
                    onlynumbers: true
                },
                TxtAmountPerPayment: {
                    onlynumbers: true
                },
                TxtTotalLeaseAmount: {
                    onlynumbers: true
                },
                TxtPOValue: {
                    onlynumbers: true
                },
                TxtBalance: {
                    onlynumbers: true
                }
            },
            messages: {
                TxtLeaseContractNumber: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers or characters."
                },
                SelectSiteOwner: {
                    required: "Please enter this required field."
                },
                TxtLeaseStartDate: {
                    required: "Please enter this required field."
                },
                TxtLeaseEndDate: {
                    required: "Please enter this required field.",
                    afterDate: "Lease end date must be after lease start date."
                },
                SelectPaymentFrequency: {
                    required: "Please enter this required field."
                },
                TxtPRNumber: {
                    required: "Please enter this required field."
                },
                TxtPRReservationDate: {
                    required: "Please enter this required field."
                },
                TxtTotalLeaseAmount: {
                    required: "Please enter this required field."
                },
                TxtNumberOfPayments: {
                    onlynumbers: "Valid numbers are allowed only."
                },
                TxtAmountPerPayment: {
                    onlynumbers: "Valid numbers are allowed only."
                },
                TxtTotalLeaseAmount: {
                    onlynumbers: "Valid numbers are allowed only."
                },
                TxtPOValue: {
                    onlynumbers: "Valid numbers are allowed only."
                },
                TxtBalance: {
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

        if ($("#FormAddLeaseContract").valid()) {

            var settings = {
                method: "POST",
                url: "/api/LeaseContracts/PostLeaseContract",
                contentType: "application/json",
                data: JSON.stringify({
                    LeaseContractNumber: $("#TxtLeaseContractNumber").val(),
                    LeaseStartDate: $("#TxtLeaseStartDate").val(),
                    LeaseEndDate: $("#TxtLeaseEndDate").val(),
                    LeaseDuration: "",
                    PaymentFrequency: $("#SelectPaymentFrequency").val(),
                    NumberOfPayments: $("#TxtNumberOfPayments").val(),
                    AmountPerPayment: $("#TxtAmountPerPayment").val(),
                    PRNumber: $("#TxtPRNumber").val(),
                    SiteOwnerId: $("#SelectSiteOwner").val(),
                    IsLocked: false,
                    TotalLeaseAmount: $("#TxtTotalLeaseAmount").val(),
                    PRReservationDate: $("#TxtPRReservationDate").val(),
                    PREnteredDate: $("#TxtPREnteredDate").val(),
                    PRApprovedDate: $("#TxtPRApprovedDate").val(),
                    PONumber: $("#TxtPONumber").val(),
                    PODate: $("#TxtPODate").val(),
                    POValue: $("#TxtPOValue").val(),
                    Balance: $("#TxtBalance").val(),
                    SitesIds: "",
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    component.ClearUpForm();
                    $("#divTableContainer").html(res);
                    $("#addNewContractModal").modal("hide");

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
    componentDidMount() {
        var component = this;
        //$(".datatable").DataTable({"ordering": false});
        this.LoadLeaseContracts();
    }
    FilterPayments(e) {
        var contractId = e.target.value;
        $.get("/api/LeaseContracts/GetLeaseContractPayments/" + contractId)
            .done(function (leasePayments) {
                if (leasePayments != null) {
                    var leasePaymentTrs = [];
                    //$("#TableContractPayments tbody tr").remove();
                    var table = $('#TableContractPayments').DataTable();
                    table.rows().remove().draw();
                    for (var i = 0; i < leasePayments.length; i++) {
                        //$("#TableContractPayments tbody").append("<tr>" +
                        //    " <td>" +
                        //    "<a>" +
                        //    leasePayments[i].LeaseContractNumnber +
                        //    "</a>" +
                        //    "</td>" +
                        //    "<td>" +
                        //    leasePayments[i].Amount +
                        //    "</td>" +
                        //    "<td>" +
                        //    ((leasePayments[i].LeasePaymentStatus !== null && leasePayments[i].LeasePaymentStatus !== '') ? leasePayments[i].LeasePaymentStatus : "-") +
                        //    "</td>" +
                        //    "<td>" +
                        //    leasePayments[i].PaymentDueDate
                        //    +
                        //    "</td>" +
                        //    "<td>" +
                        //    leasePayments[i].ReceipeNumber
                        //    +
                        //    "</td>"
                        //    +
                        //    "<td>" +
                        //    leasePayments[i].PaymentTransactionNumber
                        //    +
                        //    "</td>" +
                        //    "<td>" +
                        //    " <button class='btn btn-primary btn-xs' id={'BtnEditPayment_" + leasePayments[i].TransactionId + "'>"
                        //    +
                        //    "       <i class='fa fa-refresh'></i> Edit" +
                        //    "</button>&nbsp;" +
                        //    "<button class='btn btn-warning btn-xs' id='BtnWorkflow_" + + leasePayments[i].TransactionId + "'>" +
                        //    "<i class='fa fa-sitemap'></i> Workflow" +
                        //    "</button> " +
                        //    "</td>" +
                        //    "</tr>");
                        table.row.add([
                            "<a>" + leasePayments[i].LeaseContractNumnber + "</a>",
                            leasePayments[i].Amount,
                            ((leasePayments[i].LeasePaymentStatus !== null && leasePayments[i].LeasePaymentStatus !== '') ? leasePayments[i].LeasePaymentStatus : "-"),
                            leasePayments[i].PaymentDueDate,
                            leasePayments[i].ReceipeNumber,
                            leasePayments[i].PaymentTransactionNumber,
                            " <button class='btn btn-primary btn-xs' id={'BtnEditPayment_" + leasePayments[i].TransactionId + "'>"
                            +
                            "       <i class='fa fa-refresh'></i> Edit" +
                            "</button>&nbsp;" +
                            "<button class='btn btn-warning btn-xs' id='BtnWorkflow_" + + leasePayments[i].TransactionId + "'>" +
                            "<i class='fa fa-sitemap'></i> Workflow" +
                            "</button> "
                        ]).draw();
                    }
                    //component.setState({
                    //    ContractPayments: leasePaymentTrs
                    //});
                    $('.selectpicker').selectpicker('refresh');
                    //$(".datatable").DataTable({"ordering": false});
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
                                Select Lease Contract :
                            </td>
                            <td>
                                <select id="SelectContract" name="SelectContract" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" onChange={this.FilterPayments}>
                                    <option value="">Select Lease Contract</option>
                                    {this.state.Contracts}
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

ReactDOM.render(<FilterLeasePayments />,
    document.getElementById("divFilterLeasePayments"));