
class AddBOQ extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Jobs: "",
            CULs: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddNewModal = this.OpenAddNewModal.bind(this);
        this.SaveEntityData = this.SaveEntityData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.LoadJobs = this.LoadJobs.bind(this);
        this.LoadCULs = this.LoadCULs.bind(this);
    }
    LoadJobs() {
        var component = this;
        $.get("/api/Jobs/GetJobs")
            .done(function (jobs) {
                if (jobs != null) {
                    var html = [];
                    for (var i = 0; i < jobs.length; i++) {
                        html.push(
                            <option value={jobs[i].JobId}>{jobs[i].JobNumber}</option>
                        );
                    }
                    component.setState({
                        Jobs: html
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
    LoadCULs() {
        var component = this;
        $.get("/api/CULs/GetCULs")
            .done(function (culs) {
                if (culs != null) {
                    var html = [];
                    for (var i = 0; i < culs.length; i++) {
                        html.push(
                            <option value={culs[i].CULId}>{culs[i].Description}</option>
                        );
                    }
                    component.setState({
                        CULs: html
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
                SelectJobId: {
                    required: true
                },
                SelectCULId: {
                    required: true
                },
                TxtQuantity: {
                    required: true,
                    maxlength: 18
                },
                TxtFOC: {
                    required: true,
                    maxlength: 18,
                },
                TxtPayable: {
                    required: true,
                    maxlength: 18,
                },
                SelectIsFOC: {
                    required: true
                }
            },
            messages: {
                SelectJobId: {
                    required: "Please enter this required field."
                },
                SelectCULId: {
                    required: "Please enter this required field."
                },
                TxtQuantity: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 200 characters"
                },
                TxtFOC: {
                    required: "Please enter this required field.",
                    onlynumbers: true,
                    maxlength: "This field should not exceeds 18 number"
                },
                TxtPayable: {
                    required: "Please enter this required field.",
                    onlynumbers: true,
                    maxlength: "This field should not exceeds 18 number"
                },
                SelectIsFOC: {
                    required: "Please enter this required field."
                }
            },
            errorElement: 'div',
            errorLabelContainer: '.alert alert-danger',
            errorPlacement: function (errorlabel, element) {
                errorlabel.addClass("alert bg-danger");
                $(errorlabel).css({ position: "fixed" });
                errorlabel.insertAfter(element);
            }
        });
        if ($("#FormAddEntity").valid()) {

            var settings = {
                method: "POST",
                url: "/api/BOQs/PostBOQ",
                contentType: "application/json",
                data: JSON.stringify({
                    JobId: $("#SelectJobId").val(),
                    CULId: $("#SelectCULId").val(),
                    Quantity: $("#TxtQuantity").val(),
                    FOC: $("#TxtFOC").val(),
                    Payable: $("#TxtPayable").val(),
                    IsFOC: $("#SelectIsFOC").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivEntityList").html(res);
                    $("#addNewEntityModal").modal("hide");
                    component.ClearUpForm();

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
        this.LoadCULs();
        this.LoadJobs();
    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">

                <button className="btn btn-primary" onClick={this.OpenAddNewModal}>
                    <i className="fa fa-plus-circle"></i>&nbsp;
                                      Create New Item
                </button>
                <br />
                <br />
                <div id="addNewEntityModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New BOQ</h5>
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
                                                    Job : *
                                                </td>
                                                <td>
                                                    <select name="SelectJobId" id="SelectJobId" className="form-control">
                                                        {this.state.Jobs}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    CUL : *
                                                </td>
                                                <td>
                                                    <select name="SelectCULId" id="SelectCULId" className="form-control">
                                                        {this.state.CULs}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Quantity : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtQuantity" name="TxtQuantity" maxLength="18" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    FOC : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtFOC" name="TxtFOC" maxLength="18" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Payable : *
                                                </td>
                                                <td>
                                                    <input type="number" id="TxtPayable" name="TxtPayable" maxLength="18" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Is FOC : *
                                                </td>
                                                <td>
                                                    <select name="SelectIsFOC" id="SelectIsFOC" className="form-control">
                                                        <option value="false">No</option>
                                                        <option value="true">Yes</option>
                                                    </select>
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

            </div >
        );
    }
}

ReactDOM.render(<AddBOQ />,
    document.getElementById("DivAddEntity"));