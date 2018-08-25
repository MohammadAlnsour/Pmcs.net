
class EditInvoice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            POs: "",
            TasksMilestones: "",
            InvoiceClassifications: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenEditModal = this.OpenEditModal.bind(this);
        this.EditEntityData = this.EditEntityData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);

        this.LoadPOs = this.LoadPOs.bind(this);
        this.LoadInvoiceClassifications = this.LoadInvoiceClassifications.bind(this);
        this.LoadTasksByPOIdEdit = this.LoadTasksByPOIdEdit.bind(this);
        this.LoadEditInvoice = this.LoadEditInvoice.bind(this);
        this.LoadTasksByPOId = this.LoadTasksByPOId.bind(this);

    }
    LoadEditInvoice() {

        var invoiceId = $("#HiddenInvoiceId").val();
        var component = this;

        $.get("/api/Invoices/GetInvoice/" + invoiceId)
            .done(function (invoice) {
                if (invoice != null) {

                    var RecievedDate = "";
                    if (invoice.RecievedDate) {
                        RecievedDate = new Date(invoice.RecievedDate.replace("T00:00:00", "").split("-")[0],
                            invoice.RecievedDate.replace("T00:00:00", "").split("-")[1],
                            invoice.RecievedDate.replace("T00:00:00", "").split("-")[2]);
                    }

                    $("#POIdEdit").val(invoice.POId);
                    $('#POIdEdit').selectpicker('val', invoice.POId);
                    component.LoadTasksByPOId(invoice.POId, invoice.MilestoneId);

                    $("#InvoiceNumberEdit").val(invoice.InvoiceNumber);
                    $("#MilestoneIdEdit").val(invoice.MilestoneId);
                    //$("#TxtEditLeaseEndDate").datepicker("setDate", leaseEndDate);
                    $("#InvoiceClassificationIdEdit").val(invoice.InvoiceClassificationId);
                    $("#DescriptionTextEdit").val(invoice.DescriptionText);
                    $("#CreditNoteNumberEdit").val(invoice.CreditNoteNumber);
                    $("#ExcludeAgingEdit").val(invoice.ExcludeAging.toString());
                    $("#ExcludeAgingEditReasonsEdit").val(invoice.ExcludeAgingReasons);
                    $("#GrossCULPayableEdit").val(invoice.GrossCULPayable);
                    $("#SpecialDiscountEdit").val(invoice.SpecialDiscount);
                    $("#AfterDiscountEdit").val(invoice.AfterDiscount);
                    $("#LessPercentDiscountEdit").val(invoice.LessPercentDiscount);
                    $("#AfterLessDiscountEdit").val(invoice.AfterLessDiscount);
                    $("#DiscountOnNetEdit").val(invoice.DiscountOnNet);
                    $("#PercentageClaimedEdit").val(invoice.PercentageClaimed);
                    $("#AdvancePaymentEdit").val(invoice.AdvancePayment);
                    $("#TotalPreviousClaimEdit").val(invoice.TotalPreviousClaim);
                    $("#JobLevelDiscountEdit").val(invoice.JobLevelDiscount);
                    $("#JobLevelAdvanceEdit").val(invoice.JobLevelAdvance);
                    $("#JobLevelCreditNoteEdit").val(invoice.JobLevelCreditNote);
                    $("#LessRetentionEdit").val(invoice.LessRetention);
                    $("#LessFreeOfChargeEdit").val(invoice.LessFreeOfCharge);
                    $("#LessPenalityEdit").val(invoice.LessPenality);
                    $("#LessAdjustDeductionEdit").val(invoice.LessAdjustDeduction);
                    $("#DeductionRemarksEdit").val(invoice.DeductionRemarks);
                    $("#CreditNoteAmountEdit").val(invoice.CreditNoteAmount);
                    $("#SubtotalPayableEdit").val(invoice.SubtotalPayable);
                    $("#SubtotalDeductionsEdit").val(invoice.SubtotalDeductions);
                    $("#LessCreditNotesEdit").val(invoice.LessCreditNotes);
                    $("#AmountPayableEdit").val(invoice.AmountPayable);
                    $("#RecievedDateEdit").datepicker("setDate", RecievedDate);
                    $("#InvoiceAmountEdit").val(invoice.InvoiceAmount);

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
        $("#editContractModal").modal("show");
    }
    LoadPOs() {
        var component = this;
        $.get("/api/POs/GetPOs")
            .done(function (POs) {
                if (POs != null) {
                    var groups = [];
                    for (var i = 0; i < POs.length; i++) {
                        groups.push(
                            <option value={POs[i].PoId}>{POs[i].PONumber}</option>
                        );
                    }
                    component.setState({
                        POs: groups
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
    LoadTasksByPOIdEdit(e) {
        var component = this;
        $.get("/api/Tasks/GetTasksByPOId/" + e.target.value)
            .done(function (tasks) {
                if (tasks != null) {
                    var tasksHtml = [];
                    for (var i = 0; i < tasks.length; i++) {
                        tasksHtml.push(
                            <option value={tasks[i].TaskId}>{tasks[i].TaskName}</option>
                        );
                    }
                    component.setState({
                        TasksMilestones: tasksHtml
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
    LoadTasksByPOId(poId, taskId) {
        var component = this;
        $.get("/api/Tasks/GetTasksByPOId/" + poId)
            .done(function (tasks) {
                if (tasks != null) {
                    var tasksHtml = [];
                    for (var i = 0; i < tasks.length; i++) {
                        tasksHtml.push(
                            <option value={tasks[i].TaskId}>{tasks[i].TaskName}</option>
                        );
                    }
                    component.setState({
                        TasksMilestones: tasksHtml
                    });

                    $("#MilestoneIdEdit").val(taskId);
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
    LoadInvoiceClassifications() {
        var component = this;
        $.get("/api/Lookups/GetInvoiceClassifications")
            .done(function (classifications) {
                if (classifications != null) {
                    var classificationsHtml = [];
                    for (var i = 0; i < classifications.length; i++) {
                        classificationsHtml.push(
                            <option value={classifications[i].Id}>{classifications[i].Name}</option>
                        );
                    }
                    component.setState({
                        InvoiceClassifications: classificationsHtml
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
    CloseModal() {
        $("#editEntityModal").modal("hide");
    }
    OpenEditModal() {
        $("#editEntityModal").modal("show");
    }
    ClearUpForm() {
        $("#FormEditEntity")[0].reset();
    }
    EditEntityData() {
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
        $('#FormEditEntity').validate({
            rules: {
                POIdEdit: {
                    required: true
                },
                InvoiceNumberEdit: {
                    required: true,
                    maxlength: 50,
                },
                MilestoneIdEdit: {
                    required: true
                },
                DescriptionTextEdit: {
                    maxlength: 80,
                },
                CreditNoteNumberEdit: {
                    maxlength: 80,
                },
                ExcludeAgingEdit: {
                    required: true
                },
                ExcludeAgingEditReasonsEdit: {
                    required: true,
                    maxlength: 80,
                },
                GrossCULPayableEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                SpecialDiscountEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                AfterDiscountEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessPercentDiscountEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                AfterLessDiscountEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                DiscountOnNetEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                PercentageClaimedEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                AdvancePaymentEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                TotalPreviousClaimEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                JobLevelDiscountEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                JobLevelAdvanceEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                JobLevelCreditNoteEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessRetentionEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessFreeOfChargeEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessPenalityEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessAdjustDeductionEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                DeductionRemarksEdit: {
                    maxlength: 150,
                },
                CreditNoteAmountEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                SubtotalPayableEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                SubtotalDeductionsEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessCreditNotesEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                AmountPayableEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                InvoiceAmountEdit: {
                    maxlength: 15,
                    onlynumbers: true
                }
            },
            messages: {
                POIdEdit: {
                    required: "Please enter this required field."
                },
                InvoiceNumberEdit: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                MilestoneIdEdit: {
                    required: "Please enter this required field."
                },
                DescriptionTextEdit: {
                    maxlength: "This field should not exceeds 80 characters"
                },
                CreditNoteNumberEdit: {
                    maxlength: "This field should not exceeds 50 numbers",
                },
                ExcludeAgingEditReasonsEdit: {
                    required: "Please enter this required field."
                },
                GrossCULPayableEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                SpecialDiscountEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                AfterDiscountEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessPercentDiscountEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                AfterLessDiscountEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                DiscountOnNetEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                PercentageClaimedEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                AdvancePaymentEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                TotalPreviousClaimEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                JobLevelDiscountEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                JobLevelAdvanceEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                JobLevelCreditNoteEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessRetentionEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessFreeOfChargeEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessPenalityEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessAdjustDeductionEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                DeductionRemarksEdit: {
                    maxlength: "This field should not exceeds 15 numbers"
                },
                CreditNoteAmountEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                SubtotalPayableEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                SubtotalDeductionsEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessCreditNotesEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                AmountPayableEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                InvoiceAmountEdit: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                }
            },
            errorElement: 'div',
            errorLabelContainer: '.alert alert-danger',
            errorPlacement: function (errorlabel, element) {
                errorlabel.addClass("alert bg-danger");
                $(errorlabel).css({ position: "relative" });
                errorlabel.insertAfter(element);
            }
        });
        if ($("#FormEditEntity").valid()) {

            var settings = {
                method: "PUT",
                url: "/api/Invoices/EditInvoice",
                contentType: "application/json",
                data: JSON.stringify({
                    InvoiceId: $("#HiddenInvoiceId").val(),
                    POId: $("#POIdEdit").val(),
                    InvoiceNumber: $("#InvoiceNumberEdit").val(),
                    MilestoneId: $("#MilestoneIdEdit").val(),
                    InvoiceClassificationId: $("#InvoiceClassificationIdEdit").val(),
                    DescriptionText: $("#DescriptionTextEdit").val(),
                    CreditNoteNumber: $("#CreditNoteNumberEdit").val(),
                    ExcludeAging: $("#ExcludeAgingEdit").val(),
                    ExcludeAgingReasons: $("#ExcludeAgingEditReasonsEdit").val(),
                    GrossCULPayable: $("#GrossCULPayableEdit").val(),
                    SpecialDiscount: $("#SpecialDiscountEdit").val(),
                    AfterDiscount: $("#AfterDiscountEdit").val(),
                    LessPercentDiscount: $("#LessPercentDiscountEdit").val(),
                    AfterLessDiscount: $("#AfterLessDiscountEdit").val(),
                    DiscountOnNet: $("#DiscountOnNetEdit").val(),
                    PercentageClaimed: $("#PercentageClaimedEdit").val(),
                    AdvancePayment: $("#AdvancePaymentEdit").val(),
                    TotalPreviousClaim: $("#TotalPreviousClaimEdit").val(),
                    JobLevelDiscount: $("#JobLevelDiscountEdit").val(),
                    JobLevelAdvance: $("#JobLevelAdvanceEdit").val(),
                    JobLevelCreditNote: $("#JobLevelCreditNoteEdit").val(),
                    LessRetention: $("#LessRetentionEdit").val(),
                    LessFreeOfCharge: $("#LessFreeOfChargeEdit").val(),
                    LessPenality: $("#LessPenalityEdit").val(),
                    LessAdjustDeduction: $("#LessAdjustDeductionEdit").val(),
                    DeductionRemarks: $("#DeductionRemarksEdit").val(),
                    CreditNoteAmount: $("#CreditNoteAmountEdit").val(),
                    SubtotalPayable: $("#SubtotalPayableEdit").val(),
                    SubtotalDeductions: $("#SubtotalDeductionsEdit").val(),
                    LessCreditNotes: $("#LessCreditNotesEdit").val(),
                    AmountPayable: $("#AmountPayableEdit").val(),
                    RecievedDate: $("#RecievedDateEdit").val(),
                    InvoiceAmount: $("#InvoiceAmountEdit").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivEntityList").html(res);
                    $("#editEntityModal").modal("hide");
                    component.ClearUpForm();
                    $('#TblInvoices').DataTable({"ordering": false});

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
        $(".datepicker").datepicker();
        this.LoadPOs();
        this.LoadInvoiceClassifications();

        $("body").on("click", "button[id^='BtnEditInvoice_']", function () {
            var invoiceId = $(this).attr('id').split("_")[1];
            $("#HiddenInvoiceId").val(invoiceId);
            component.LoadEditInvoice();
            component.OpenEditModal();
        });
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">
                <div id="editEntityModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Invoice</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditEntity">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Purchase Order : *
                                                </td>
                                                <td>
                                                    <select id="POIdEdit" name="POIdEdit" style={{ width: '100%' }} onChange={this.LoadTasksByPOIdEdit} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select PO</option>
                                                        {this.state.POs}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Invoice Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="InvoiceNumberEdit" name="InvoiceNumberEdit" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Task(Milestone) : *
                                                </td>
                                                <td>
                                                    <select id="MilestoneIdEdit" name="MilestoneIdEdit" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select Task(Milestone)</option>
                                                        {this.state.TasksMilestones}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Invoice Classification : *
                                                </td>
                                                <td>
                                                    <select id="InvoiceClassificationIdEdit" name="InvoiceClassificationIdEdit" style={{ width: '100%' }} className="form-control">
                                                        <option value="">Select Classification</option>
                                                        {this.state.InvoiceClassifications}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Description Text :
                                                </td>
                                                <td>
                                                    <input type="text" id="DescriptionTextEdit" name="DescriptionTextEdit" maxLength="150" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Credit Note Number :
                                                </td>
                                                <td>
                                                    <input type="text" id="CreditNoteNumberEdit" name="CreditNoteNumberEdit" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Exclude Aging :
                                                </td>
                                                <td>
                                                    <select id="ExcludeAgingEdit" name="ExcludeAgingEdit" style={{ width: '100%' }} className="form-control">
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Exclude Aging Reasons :
                                                </td>
                                                <td>
                                                    <input type="text" id="ExcludeAgingEditReasonsEdit" name="ExcludeAgingEditReasonsEdit" maxLength="100" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Gross CUL Payable :
                                                </td>
                                                <td>
                                                    <input type="number" id="GrossCULPayableEdit" name="GrossCULPayableEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Special Discount :
                                                </td>
                                                <td>
                                                    <input type="number" id="SpecialDiscountEdit" name="SpecialDiscountEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    After Discount :
                                                </td>
                                                <td>
                                                    <input type="number" id="AfterDiscountEdit" name="AfterDiscountEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Less Percent Discount :
                                                </td>
                                                <td>
                                                    <input type="number" id="LessPercentDiscountEdit" name="LessPercentDiscountEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    After Less Discount :
                                                </td>
                                                <td>
                                                    <input type="number" id="AfterLessDiscountEdit" name="AfterLessDiscountEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Discount On Net :
                                                </td>
                                                <td>
                                                    <input type="number" id="DiscountOnNetEdit" name="DiscountOnNetEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Percentage Claimed :
                                                </td>
                                                <td>
                                                    <input type="number" id="PercentageClaimedEdit" name="PercentageClaimedEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Advance Payment :
                                                </td>
                                                <td>
                                                    <input type="number" id="AdvancePaymentEdit" name="AdvancePaymentEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Total Previous Claim :
                                                </td>
                                                <td>
                                                    <input type="number" id="TotalPreviousClaimEdit" name="TotalPreviousClaimEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Job Level Discount :
                                                </td>
                                                <td>
                                                    <input type="number" id="JobLevelDiscountEdit" name="JobLevelDiscountEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Job Level Advance :
                                                </td>
                                                <td>
                                                    <input type="number" id="JobLevelAdvanceEdit" name="JobLevelAdvanceEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Job Level Credit Note :
                                                </td>
                                                <td>
                                                    <input type="number" id="JobLevelCreditNoteEdit" name="JobLevelCreditNoteEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Less Retention :
                                                </td>
                                                <td>
                                                    <input type="number" id="LessRetentionEdit" name="LessRetentionEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Less Free Of Charge :
                                                </td>
                                                <td>
                                                    <input type="number" id="LessFreeOfChargeEdit" name="LessFreeOfChargeEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Less Penality :
                                                </td>
                                                <td>
                                                    <input type="number" id="LessPenalityEdit" name="LessPenalityEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Less Adjust Deduction :
                                                </td>
                                                <td>
                                                    <input type="number" id="LessAdjustDeductionEdit" name="LessAdjustDeductionEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Deduction Remarks :
                                                </td>
                                                <td>
                                                    <input type="number" id="DeductionRemarksEdit" name="DeductionRemarksEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Credit Note Amount :
                                                </td>
                                                <td>
                                                    <input type="number" id="CreditNoteAmountEdit" name="CreditNoteAmountEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Subtotal Payable :
                                                </td>
                                                <td>
                                                    <input type="number" id="SubtotalPayableEdit" name="SubtotalPayableEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Subtotal Deductions :
                                                </td>
                                                <td>
                                                    <input type="number" id="SubtotalDeductionsEdit" name="SubtotalDeductionsEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Less Credit Notes :
                                                </td>
                                                <td>
                                                    <input type="text" id="LessCreditNotesEdit" name="LessCreditNotesEdit" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Amount Payable :
                                                </td>
                                                <td>
                                                    <input type="number" id="AmountPayableEdit" name="AmountPayableEdit" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Recieved Date :
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="RecievedDateEdit" name="RecievedDateEdit" readOnly maxLength="15" className="form-control" />
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Invoice Amount :
                                                </td>
                                                <td>
                                                    <input type="number" id="InvoiceAmountEdit" name="InvoiceAmountEdit" maxLength="15" className="form-control" />
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
                                <button type="button" className="btn btn-primary" onClick={this.EditEntityData}>Save Item</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<EditInvoice />,
    document.getElementById("DivEditEtity"));