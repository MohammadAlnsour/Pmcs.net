
class EditLeaseContract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SiteOwners: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.LoadEditContract = this.LoadEditContract.bind(this);
        this.EditContractData = this.EditContractData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
    }
    CloseModal() {
        $("#editContractModal").modal("hide");
    }
    LoadEditContract() {

        var contractId = $("#HiddenContractId").val();

        $.get("/api/LeaseContracts/GetLeaseContract/" + contractId)
            .done(function (contract) {
                var actionsHtml = [];
                if (contract != null) {

                    var leaseStartDate = "";
                    var leaseEndDate = "";
                    var pREnteredDate = "";
                    var pRApprovedDate = "";
                    var pODate = "";
                    var pRReservationDate = "";

                    if (contract.LeaseStartDate) {
                        leaseStartDate = new Date(contract.LeaseStartDate.replace("T00:00:00", "").split("-")[0],
                            contract.LeaseStartDate.replace("T00:00:00", "").split("-")[1],
                            contract.LeaseStartDate.replace("T00:00:00", "").split("-")[2]);
                    }

                    if (contract.LeaseEndDate) {
                        leaseEndDate = new Date(contract.LeaseEndDate.replace("T00:00:00", "").split("-")[0],
                            contract.LeaseEndDate.replace("T00:00:00", "").split("-")[1],
                            contract.LeaseEndDate.replace("T00:00:00", "").split("-")[2]);
                    }
                    if (contract.PREnteredDate) {
                        pREnteredDate = new Date(contract.PREnteredDate.replace("T00:00:00", "").split("-")[0],
                            contract.PREnteredDate.replace("T00:00:00", "").split("-")[1],
                            contract.PREnteredDate.replace("T00:00:00", "").split("-")[2]);
                    }

                    if (contract.PRApprovedDate) {
                        pRApprovedDate = new Date(contract.PRApprovedDate.replace("T00:00:00", "").split("-")[0],
                            contract.PRApprovedDate.replace("T00:00:00", "").split("-")[1],
                            contract.PRApprovedDate.replace("T00:00:00", "").split("-")[2]);
                    }

                    if (contract.PODate) {
                        pODate = new Date(contract.PODate.replace("T00:00:00", "").split("-")[0],
                            contract.PODate.replace("T00:00:00", "").split("-")[1],
                            contract.PODate.replace("T00:00:00", "").split("-")[2]);
                    }

                    if (contract.PRReservationDate) {
                        pRReservationDate = new Date(contract.PRReservationDate.replace("T00:00:00", "").split("-")[0],
                            contract.PRReservationDate.replace("T00:00:00", "").split("-")[1],
                            contract.PRReservationDate.replace("T00:00:00", "").split("-")[2]);
                    }

                    $("#TxtEditLeaseContractNumber").val(contract.LeaseContractNumber);
                    $("#SelectEditSiteOwner").val(contract.SiteOwnerId);
                    $("#TxtEditLeaseStartDate").datepicker("setDate", leaseStartDate);
                    $("#TxtEditLeaseEndDate").datepicker("setDate", leaseEndDate);
                    $("#SelectEditPaymentFrequency").val(contract.PaymentFrequency);
                    $("#TxtEditNumberOfPayments").val(contract.NumberOfPayments);
                    $("#TxtEditAmountPerPayment").val(contract.AmountPerPayment);
                    $("#TxtEditPRNumber").val(contract.PRNumber);
                    $("#TxtEditTotalLeaseAmount").val(contract.TotalLeaseAmount);
                    $("#TxtEditPRReservationDate").datepicker("setDate", pRReservationDate);
                    $("#TxtEditPREnteredDate").datepicker("setDate", pREnteredDate);
                    $("#TxtEditPRApprovedDate").datepicker("setDate", pRApprovedDate);
                    $("#TxtEditPONumber").val(contract.PONumber);
                    $("#TxtEditPODate").datepicker("setDate", pODate);
                    $("#TxtEditPOValue").val(contract.POValue);
                    $("#TxtEditBalance").val(contract.Balance);
                    $("#TxtEditDuration").val(contract.LeaseDuration);
                    $("#HiddenContractCreatedDate").val(contract.CreatedDate);

                    $("#editContractModal").modal("show");
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
    ClearUpForm() {
        $("#FormEditLeaseContract")[0].reset();
    }
    EditContractData() {
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
        $('#FormEditLeaseContract').validate({
            rules: {
                TxtEditLeaseContractNumber: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                SelectEditSiteOwner: {
                    required: true
                },
                TxtEditLeaseStartDate: {
                    required: true
                },
                TxtEditLeaseEndDate: {
                    required: true,
                    afterDate: '#TxtEditLeaseStartDate'
                },
                SelectEditPaymentFrequency: {
                    required: true
                },
                TxtEditPRNumber: {
                    required: true
                },
                TxtEditPRReservationDate: {
                    required: true
                },
                TxtEditTotalLeaseAmount: {
                    required: true
                },
                TxtEditNumberOfPayments: {
                    onlynumbers: true
                },
                TxtEditAmountPerPayment: {
                    onlynumbers: true
                },
                TxtEditTotalLeaseAmount: {
                    onlynumbers: true
                },
                TxtEditPOValue: {
                    onlynumbers: true
                },
                TxtEditBalance: {
                    onlynumbers: true
                }
            },
            messages: {
                TxtEditLeaseContractNumber: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers or characters."
                },
                SelectEditSiteOwner: {
                    required: "Please enter this required field."
                },
                TxtEditLeaseStartDate: {
                    required: "Please enter this required field."
                },
                TxtEditLeaseEndDate: {
                    required: "Please enter this required field.",
                    afterDate: "Lease end date must be after lease start date."
                },
                SelectEditPaymentFrequency: {
                    required: "Please enter this required field."
                },
                TxtEditPRNumber: {
                    required: "Please enter this required field."
                },
                TxtEditPRReservationDate: {
                    required: "Please enter this required field."
                },
                TxtEditTotalLeaseAmount: {
                    required: "Please enter this required field."
                },
                TxtEditNumberOfPayments: {
                    onlynumbers: "Valid numbers are allowed only."
                },
                TxtEditAmountPerPayment: {
                    onlynumbers: "Valid numbers are allowed only."
                },
                TxtEditTotalLeaseAmount: {
                    onlynumbers: "Valid numbers are allowed only."
                },
                TxtEditPOValue: {
                    onlynumbers: "Valid numbers are allowed only."
                },
                TxtEditBalance: {
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

        if ($("#FormEditLeaseContract").valid()) {

            var settings = {
                method: "PUT",
                url: "/api/LeaseContracts/PutLeaseContract",
                contentType: "application/json",
                data: JSON.stringify({
                    ContractId: $("#HiddenContractId").val(),
                    LeaseContractNumber: $("#TxtEditLeaseContractNumber").val(),
                    LeaseStartDate: $("#TxtEditLeaseStartDate").val(),
                    LeaseEndDate: $("#TxtEditLeaseEndDate").val(),
                    LeaseDuration: "",
                    PaymentFrequency: $("#SelectEditPaymentFrequency").val(),
                    NumberOfPayments: $("#TxtEditNumberOfPayments").val(),
                    AmountPerPayment: $("#TxtEditAmountPerPayment").val(),
                    PRNumber: $("#TxtEditPRNumber").val(),
                    SiteOwnerId: $("#SelectEditSiteOwner").val(),
                    IsLocked: false,
                    TotalLeaseAmount: $("#TxtEditTotalLeaseAmount").val(),
                    PRReservationDate: $("#TxtEditPRReservationDate").val(),
                    PREnteredDate: $("#TxtEditPREnteredDate").val(),
                    PRApprovedDate: $("#TxtEditPRApprovedDate").val(),
                    PONumber: $("#TxtEditPONumber").val(),
                    PODate: $("#TxtEditPODate").val(),
                    POValue: $("#TxtEditPOValue").val(),
                    Balance: $("#TxtEditBalance").val(),
                    SitesIds: "",
                    IsActive: true,
                    CreatedDate: $("#HiddenContractCreatedDate").val()
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    component.ClearUpForm();
                    $("#divTableContainer").html(res);
                    $("#editContractModal").modal("hide");

                    $.notify(
                        {
                            // icon: "fa fa-check-square",
                            message: "<i class='fa fa-check-square' style='font-size:30px; float: left;'></i>  <h5 style='float: left;'> The action has been completed successfully. </h5> <br /><br />"
                        },
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
        $("body").on("click", "button[id^='BtnEditContract_']", function (e) {
            var contractId = $(this).attr("id").split("_")[1];
            $("#HiddenContractId").val(contractId);
            component.LoadEditContract();
        });
        $(".datepicker").datepicker();

        $.get("/api/Sites/GetSiteTypes")
            .done(function (types) {
                var actionsHtml = [];
                if (types != null) {

                    for (var i = 0; i < types.length; i++) {
                        actionsHtml.push(
                            <option value={types[i].Id}>{types[i].Name}</option>
                        );
                    }
                    component.setState({
                        SiteTypes: actionsHtml
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

        $.get("/api/Sites/GetSiteOwners")
            .done(function (owners) {
                var ownersHtml = [];
                if (owners != null) {

                    for (var i = 0; i < owners.length; i++) {
                        ownersHtml.push(
                            <option value={owners[i].OwnerId}>{owners[i].Name}</option>
                        );
                    }
                    component.setState({
                        SiteOwners: ownersHtml
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

        $.get("/api/Sites/GetGoveronates")
            .done(function (goveronates) {
                var goveronatesHtml = [];
                if (goveronates != null) {

                    for (var i = 0; i < goveronates.length; i++) {
                        goveronatesHtml.push(
                            <option value={goveronates[i].Id}>{goveronates[i].Name}</option>
                        );
                    }
                    component.setState({
                        SiteGoveronates: goveronatesHtml
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

        $.get("/api/Sites/GetDistricts")
            .done(function (districts) {
                var districtsHtml = [];
                if (districts != null) {

                    for (var i = 0; i < districts.length; i++) {
                        districtsHtml.push(
                            <option value={districts[i].Id}>{districts[i].Name}</option>
                        );
                    }
                    component.setState({
                        Districts: districtsHtml
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

        $.get("/api/Projects/GetProjectsList")
            .done(function (projects) {
                var projectsHtml = [];
                if (projects != null) {

                    for (var i = 0; i < projects.length; i++) {
                        projectsHtml.push(
                            <option value={projects[i].ProjectId}>{projects[i].ProjectName}</option>
                        );
                    }
                    component.setState({
                        Projects: projectsHtml
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
                <div id="editContractModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Lease Contract</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditLeaseContract">
                                    <input type="hidden" id="HiddenContractCreatedDate" name="HiddenContractCreatedDate" />
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Contract Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditLeaseContractNumber" name="TxtEditLeaseContractNumber" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Site Owner : *
                                                </td>
                                                <td>
                                                    <select id="SelectEditSiteOwner" name="SelectEditSiteOwner" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        {this.state.SiteOwners}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Lease Start Date : *
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtEditLeaseStartDate" readOnly name="TxtEditLeaseStartDate" className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Lease End Date : *
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtEditLeaseEndDate" readOnly name="TxtEditLeaseEndDate" className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Payment Frequecy :
                                                </td>
                                                <td>
                                                    <select id="SelectEditPaymentFrequency" name="SelectEditPaymentFrequency" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        <option value="1">Monthly</option>
                                                        <option value="2">Quarterly</option>
                                                        <option value="3">Bi Quartely</option>
                                                        <option value="4">Yearly</option>
                                                        {this.state.PaymentFrequency}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Number of payments :
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditNumberOfPayments" name="TxtEditNumberOfPayments" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Amount Per Payment :
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditAmountPerPayment" name="TxtEditAmountPerPayment" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PR Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditPRNumber" name="TxtEditPRNumber" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Total Lease Amount :
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditTotalLeaseAmount" name="TxtEditTotalLeaseAmount" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PR Reservation Date : *
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtEditPRReservationDate" readOnly name="TxtEditPRReservationDate" className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    PR Entered Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtEditPREnteredDate" readOnly name="TxtEditPREnteredDate" className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PR Approved Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtEditPRApprovedDate" readOnly name="TxtEditPRApprovedDate" className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    PO Number :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtEditPONumber" name="TxtEditPONumber" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PO Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtEditPODate" name="TxtEditPODate" readOnly className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    PO Value :
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditPOValue" name="TxtEditPOValue" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Balance :
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditBalance" name="TxtEditBalance" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Lease Duration :
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtEditDuration" name="TxtEditDuration" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Lease Contract Sites :
                                                </td>
                                                <td>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.EditContractData}>Save Contract</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

ReactDOM.render(<EditLeaseContract />,
    document.getElementById("divEditLeaseContract"));