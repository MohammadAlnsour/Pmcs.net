
class AddInventory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Sites: "",
            //TasksMilestones: "",
            //InvoiceClassifications: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddNewModal = this.OpenAddNewModal.bind(this);
        this.SaveEntityData = this.SaveEntityData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);

        this.LoadSites = this.LoadSites.bind(this);
    }
    LoadSites() {
        var component = this;
        $.get("/api/Sites/GetSites")
            .done(function (Sites) {
                if (Sites != null) {
                    var groups = [];
                    for (var i = 0; i < Sites.length; i++) {
                        groups.push(
                            <option value={Sites[i].SiteId}>{Sites[i].SiteName}</option>
                        );
                    }
                    component.setState({
                        Sites: groups
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
                SiteId: {
                    required: true
                },
                InventoryDate: {
                    required: true
                },
                Remarks: {
                    required: true
                }
            },
            messages: {
                SiteId: {
                    required: "Please enter this required field."
                },
                InventoryDate: {
                    required: "Please enter this required field."
                },
                Remarks: {
                    required: "Please enter this required field."
                }
            },
            errorElement: 'div',
            errorLabelContainer: '.alert alert-danger',
            errorPlacement: function (errorlabel, element) {
                errorlabel.addClass("alert bg-danger");
                $(errorlabel).css({ Sitesition: "relative" });
                errorlabel.insertAfter(element);
            }
        });
        if ($("#FormAddEntity").valid()) {

            var settings = {
                method: "POST",
                url: "/api/Assets/PostInventory",
                contentType: "application/json",
                data: JSON.stringify({
                    SiteId: $("#SiteId").val(),
                    InventoryDate: $("#InventoryDate").val(),
                    Remarks: $("#Remarks").val(),
                    InventoryDoneBy: '',
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivEntityList").html(res);
                    $("#addNewEntityModal").modal("hide");
                    component.ClearUpForm();
                    $('#TblAssets').DataTable({"ordering": false});

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
        this.LoadSites();
        $('#TblAssets').DataTable({"ordering": false});
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
                                <h5 className="modal-title">Add Site Inventory</h5>
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
                                                    Site : *
                                                </td>
                                                <td>
                                                    <select id="SiteId" name="SiteId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        {this.state.Sites}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Inventory Date : *
                                                </td>
                                                <td>
                                                    <div className='input-group date datepicker'>
                                                        <input type="text" id="InventoryDate" name="InventoryDate" readOnly maxLength="15" className="form-control" />
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
                                                    Remarks : *
                                                </td>
                                                <td>
                                                    <textarea className="form-control" id="Remarks" name="Remarks" style={{ height: '80px' }} />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                </td>
                                                <td>
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

ReactDOM.render(<AddInventory />,
    document.getElementById("DivAddEntity"));