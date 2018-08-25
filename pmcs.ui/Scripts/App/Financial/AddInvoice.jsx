
class AddInvoice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            POs: "",
            TasksMilestones: "",
            InvoiceClassifications: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddNewModal = this.OpenAddNewModal.bind(this);
        this.SaveEntityData = this.SaveEntityData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);

        this.LoadPOs = this.LoadPOs.bind(this);
        this.LoadInvoiceClassifications = this.LoadInvoiceClassifications.bind(this);
        this.LoadTasksByPOId = this.LoadTasksByPOId.bind(this);

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
    LoadTasksByPOId(e) {
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
        $("#addNewEntityModal").modal("hide");
    }
    OpenAddNewModal() {
        $("#addNewEntityModal").modal("show");
    }
    ClearUpForm() {
        $("#FormAddEntity")[0].reset();
    }
    SaveEntityData() {
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
        $('#FormAddEntity').validate({
            rules: {
                POId: {
                    required: true
                },
                InvoiceNumber: {
                    required: true,
                    maxlength: 50,
                },
                MilestoneId: {
                    required: true
                },
                DescriptionText: {
                    maxlength: 80,
                },
                CreditNoteNumber: {
                    maxlength: 80,
                },
                ExcludeAging: {
                    required: true
                },
                ExcludeAgingReasons: {
                    required: true,
                    maxlength: 80,
                },
                GrossCULPayable: {
                    maxlength: 15,
                    onlynumbers: true
                },
                SpecialDiscount: {
                    maxlength: 15,
                    onlynumbers: true
                },
                AfterDiscount: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessPercentDiscount: {
                    maxlength: 15,
                    onlynumbers: true
                },
                AfterLessDiscount: {
                    maxlength: 15,
                    onlynumbers: true
                },
                DiscountOnNet: {
                    maxlength: 15,
                    onlynumbers: true
                },
                PercentageClaimed: {
                    maxlength: 15,
                    onlynumbers: true
                },
                AdvancePayment: {
                    maxlength: 15,
                    onlynumbers: true
                },
                TotalPreviousClaim: {
                    maxlength: 15,
                    onlynumbers: true
                },
                JobLevelDiscount: {
                    maxlength: 15,
                    onlynumbers: true
                },
                JobLevelAdvance: {
                    maxlength: 15,
                    onlynumbers: true
                },
                JobLevelCreditNote: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessRetention: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessFreeOfCharge: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessPenality: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessAdjustDeduction: {
                    maxlength: 15,
                    onlynumbers: true
                },
                DeductionRemarks: {
                    maxlength: 150,
                },
                CreditNoteAmount: {
                    maxlength: 15,
                    onlynumbers: true
                },
                SubtotalPayable: {
                    maxlength: 15,
                    onlynumbers: true
                },
                SubtotalDeductions: {
                    maxlength: 15,
                    onlynumbers: true
                },
                LessCreditNotes: {
                    maxlength: 15,
                    onlynumbers: true
                },
                AmountPayable: {
                    maxlength: 15,
                    onlynumbers: true
                },
                InvoiceAmount: {
                    maxlength: 15,
                    onlynumbers: true
                }
            },
            messages: {
                POId: {
                    required: "Please enter this required field."
                },
                InvoiceNumber: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                MilestoneId: {
                    required: "Please enter this required field."
                },
                DescriptionText: {
                    maxlength: "This field should not exceeds 80 characters"
                },
                CreditNoteNumber: {
                    maxlength: "This field should not exceeds 50 numbers",
                },
                ExcludeAgingReasons: {
                    required: "Please enter this required field."
                },
                GrossCULPayable: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                SpecialDiscount: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                AfterDiscount: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessPercentDiscount: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                AfterLessDiscount: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                DiscountOnNet: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                PercentageClaimed: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                AdvancePayment: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                TotalPreviousClaim: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                JobLevelDiscount: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                JobLevelAdvance: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                JobLevelCreditNote: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessRetention: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessFreeOfCharge: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessPenality: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessAdjustDeduction: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                DeductionRemarks: {
                    maxlength: "This field should not exceeds 15 numbers"
                },
                CreditNoteAmount: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                SubtotalPayable: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                SubtotalDeductions: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                LessCreditNotes: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                AmountPayable: {
                    maxlength: "This field should not exceeds 15 numbers",
                    onlynumbers: "This field only accepts numbers"
                },
                InvoiceAmount: {
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
        if ($("#FormAddEntity").valid()) {

            var settings = {
                method: "POST",
                url: "/api/Invoices/PostInvoice",
                contentType: "application/json",
                data: JSON.stringify({
                    POId: $("#POId").val(),
                    InvoiceNumber: $("#InvoiceNumber").val(),
                    MilestoneId: $("#MilestoneId").val(),
                    InvoiceClassificationId: $("#InvoiceClassificationId").val(),
                    DescriptionText: $("#DescriptionText").val(),
                    CreditNoteNumber: $("#CreditNoteNumber").val(),
                    ExcludeAging: $("#ExcludeAging").val(),
                    ExcludeAgingReasons: $("#ExcludeAgingReasons").val(),
                    GrossCULPayable: $("#GrossCULPayable").val(),
                    SpecialDiscount: $("#SpecialDiscount").val(),
                    AfterDiscount: $("#AfterDiscount").val(),
                    LessPercentDiscount: $("#LessPercentDiscount").val(),
                    AfterLessDiscount: $("#AfterLessDiscount").val(),
                    DiscountOnNet: $("#DiscountOnNet").val(),
                    PercentageClaimed: $("#PercentageClaimed").val(),
                    AdvancePayment: $("#AdvancePayment").val(),
                    TotalPreviousClaim: $("#TotalPreviousClaim").val(),
                    JobLevelDiscount: $("#JobLevelDiscount").val(),
                    JobLevelAdvance: $("#JobLevelAdvance").val(),
                    JobLevelCreditNote: $("#JobLevelCreditNote").val(),
                    LessRetention: $("#LessRetention").val(),
                    LessFreeOfCharge: $("#LessFreeOfCharge").val(),
                    LessPenality: $("#LessPenality").val(),
                    LessAdjustDeduction: $("#LessAdjustDeduction").val(),
                    DeductionRemarks: $("#DeductionRemarks").val(),
                    CreditNoteAmount: $("#CreditNoteAmount").val(),
                    SubtotalPayable: $("#SubtotalPayable").val(),
                    SubtotalDeductions: $("#SubtotalDeductions").val(),
                    LessCreditNotes: $("#LessCreditNotes").val(),
                    AmountPayable: $("#AmountPayable").val(),
                    RecievedDate: $("#RecievedDate").val(),
                    InvoiceAmount: $("#InvoiceAmount").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivEntityList").html(res);
                    $("#addNewEntityModal").modal("hide");
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
        $('#TblInvoices').DataTable({"ordering": false});
        this.LoadPOs();
        this.LoadInvoiceClassifications();
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button className="btn btn-primary" onClick={this.OpenAddNewModal}>
                                    <i className="fa fa-plus-circle"></i>&nbsp;
                                      Create New Item
                                </button>
                            </td>
                        </tr>
                        <tr><td>&nbsp;</td></tr>
                    </tbody>
                </table>
                <div id="addNewEntityModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Invoice</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddEntity">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Purchase Order : *
                                                </td>
                                                <td>
                                                    <select id="POId" name="POId" style={{ width: '100%' }} onChange={this.LoadTasksByPOId} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select PO</option>
                                                        {this.state.POs}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Invoice Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="InvoiceNumber" name="InvoiceNumber" maxLength="50" className="form-control" />
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
                                                    <select id="MilestoneId" name="MilestoneId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select Task(Milestone)</option>
                                                        {this.state.TasksMilestones}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Invoice Classification : *
                                                </td>
                                                <td>
                                                    <select id="InvoiceClassificationId" name="InvoiceClassificationId" style={{ width: '100%' }} className="form-control">
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
                                                    <input type="text" id="DescriptionText" name="DescriptionText" maxLength="150" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Credit Note Number :
                                                </td>
                                                <td>
                                                    <input type="text" id="CreditNoteNumber" name="CreditNoteNumber" maxLength="50" className="form-control" />
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
                                                    <select id="ExcludeAging" name="ExcludeAging" style={{ width: '100%' }} className="form-control">
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Exclude Aging Reasons :
                                                </td>
                                                <td>
                                                    <input type="text" id="ExcludeAgingReasons" name="ExcludeAgingReasons" maxLength="100" className="form-control" />
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
                                                    <input type="number" id="GrossCULPayable" name="GrossCULPayable" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Special Discount :
                                                </td>
                                                <td>
                                                    <input type="number" id="SpecialDiscount" name="SpecialDiscount" maxLength="15" className="form-control" />
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
                                                    <input type="number" id="AfterDiscount" name="AfterDiscount" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Less Percent Discount :
                                                </td>
                                                <td>
                                                    <input type="number" id="LessPercentDiscount" name="LessPercentDiscount" maxLength="15" className="form-control" />
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
                                                    <input type="number" id="AfterLessDiscount" name="AfterLessDiscount" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Discount On Net :
                                                </td>
                                                <td>
                                                    <input type="number" id="DiscountOnNet" name="DiscountOnNet" maxLength="15" className="form-control" />
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
                                                    <input type="number" id="PercentageClaimed" name="PercentageClaimed" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Advance Payment :
                                                </td>
                                                <td>
                                                    <input type="number" id="AdvancePayment" name="AdvancePayment" maxLength="15" className="form-control" />
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
                                                    <input type="number" id="TotalPreviousClaim" name="TotalPreviousClaim" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Job Level Discount :
                                                </td>
                                                <td>
                                                    <input type="number" id="JobLevelDiscount" name="JobLevelDiscount" maxLength="15" className="form-control" />
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
                                                    <input type="number" id="JobLevelAdvance" name="JobLevelAdvance" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Job Level Credit Note :
                                                </td>
                                                <td>
                                                    <input type="number" id="JobLevelCreditNote" name="JobLevelCreditNote" maxLength="15" className="form-control" />
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
                                                    <input type="number" id="LessRetention" name="LessRetention" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Less Free Of Charge :
                                                </td>
                                                <td>
                                                    <input type="number" id="LessFreeOfCharge" name="LessFreeOfCharge" maxLength="15" className="form-control" />
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
                                                    <input type="number" id="LessPenality" name="LessPenality" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Less Adjust Deduction :
                                                </td>
                                                <td>
                                                    <input type="number" id="LessAdjustDeduction" name="LessAdjustDeduction" maxLength="15" className="form-control" />
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
                                                    <input type="number" id="DeductionRemarks" name="DeductionRemarks" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Credit Note Amount :
                                                </td>
                                                <td>
                                                    <input type="number" id="CreditNoteAmount" name="CreditNoteAmount" maxLength="15" className="form-control" />
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
                                                    <input type="number" id="SubtotalPayable" name="SubtotalPayable" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Subtotal Deductions :
                                                </td>
                                                <td>
                                                    <input type="number" id="SubtotalDeductions" name="SubtotalDeductions" maxLength="15" className="form-control" />
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
                                                    <input type="text" id="LessCreditNotes" name="LessCreditNotes" maxLength="15" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Amount Payable :
                                                </td>
                                                <td>
                                                    <input type="number" id="AmountPayable" name="AmountPayable" maxLength="15" className="form-control" />
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
                                                        <input type="text" id="RecievedDate" name="RecievedDate" readOnly maxLength="15" className="form-control" />
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
                                                    <input type="number" id="InvoiceAmount" name="InvoiceAmount" maxLength="15" className="form-control" />
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
                                <button type="button" className="btn btn-primary" onClick={this.SaveEntityData}>Save Item</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<AddInvoice />,
    document.getElementById("DivAddEntity"));