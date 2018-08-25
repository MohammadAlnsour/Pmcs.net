
class AddLeaseContract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SiteOwners: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddNewContract = this.OpenAddNewContract.bind(this);
        this.SaveContractData = this.SaveContractData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
    }
    CloseModal() {
        $("#addNewContractModal").modal("hide");
    }
    OpenAddNewContract() {
        $("#addNewContractModal").modal("show");
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
        $("#FormAddLeaseContract")[0].reset();
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
                    onlynumbers : true
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
                    onlynumbers : "Valid numbers are allowed only."
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
    componentDidMount() {
        var component = this;

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
                <button className="btn btn-primary" onClick={this.OpenAddNewContract}>
                    <i className="fa fa-plus-circle"></i>&nbsp;
                    Add New Lease Contract
                </button>

                <div id="addNewContractModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add Lease Contract</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddLeaseContract">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Contract Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtLeaseContractNumber" name="TxtLeaseContractNumber" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Site Owner : *
                                                </td>
                                                <td>
                                                    <select id="SelectSiteOwner" name="SelectSiteOwner" className="form-control">
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
                                                        <input type="text" id="TxtLeaseStartDate" readOnly name="TxtLeaseStartDate" className="form-control" />
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
                                                        <input type="text" id="TxtLeaseEndDate" readOnly name="TxtLeaseEndDate" className="form-control" />
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
                                                    <select id="SelectPaymentFrequency" name="SelectPaymentFrequency" className="form-control">
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
                                                    <input type="number" id="TxtNumberOfPayments" name="TxtNumberOfPayments" className="form-control" />
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
                                                    <input type="number" id="TxtAmountPerPayment" name="TxtAmountPerPayment" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PR Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtPRNumber" name="TxtPRNumber" className="form-control" />
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
                                                    <input type="number" id="TxtTotalLeaseAmount" name="TxtTotalLeaseAmount" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PR Reservation Date : *
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtPRReservationDate" readOnly name="TxtPRReservationDate" className="form-control" />
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
                                                        <input type="text" id="TxtPREnteredDate" readOnly name="TxtPREnteredDate" className="form-control" />
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
                                                        <input type="text" id="TxtPRApprovedDate" readOnly name="TxtPRApprovedDate" className="form-control" />
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
                                                    <input type="text" id="TxtPONumber" name="TxtPONumber" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    PO Date : 
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="TxtPODate" name="TxtPODate" readOnly className="form-control" />
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
                                                    <input type="number" id="TxtPOValue" name="TxtPOValue" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Balance :
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtBalance" name="TxtBalance" className="form-control" />
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
                                                    <input type="number" id="TxtDuration" name="TxtDuration" className="form-control" />
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
                                <button type="button" className="btn btn-primary" onClick={this.SaveContractData}>Save Contract</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<AddLeaseContract />,
    document.getElementById("divAddLeaseContract"));