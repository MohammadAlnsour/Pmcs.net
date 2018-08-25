
class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Categories: "",
            Manufacturers: "",
            ParentItems: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddNewModal = this.OpenAddNewModal.bind(this);
        this.SaveEntityData = this.SaveEntityData.bind(this);
        this.LoadManufacturers = this.LoadManufacturers.bind(this);
        this.LoadCategories = this.LoadCategories.bind(this);
        this.LoadParentItems = this.LoadParentItems.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);

    }
    LoadManufacturers() {
        var component = this;
        $.get("/api/Lookups/GetManufacturers")
            .done(function (manufacturers) {
                if (manufacturers != null) {
                    var groups = [];
                    for (var i = 0; i < manufacturers.length; i++) {
                        groups.push(
                            <option value={manufacturers[i].ManufacturerId}>{manufacturers[i].ManufacturerDescription}</option>
                        );
                    }
                    component.setState({
                        Manufacturers: groups
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
    LoadCategories() {
        var component = this;
        $.get("/api/Lookups/GetInventoryCategories")
            .done(function (categories) {
                if (categories != null) {
                    var groups = [];
                    for (var i = 0; i < categories.length; i++) {
                        groups.push(
                            <option value={categories[i].CategoryId}>{categories[i].CategoryDescription}</option>
                        );
                    }
                    component.setState({
                        Categories: groups
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
    LoadParentItems() {
        var component = this;
        $.get("/api/Assets/GetItemsByInventoryId/" + $("#HiddenInventoryId").val())
            .done(function (items) {
                if (items != null) {
                    var groups = [];
                    for (var i = 0; i < items.length; i++) {
                        groups.push(
                            <option value={items[i].ItemId}>{items[i].ItemDescription}</option>
                        );
                    }
                    component.setState({
                        ParentItems: groups
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
                ItemDescription: {
                    required: true,
                    maxlength: 50,
                    minlength: 2
                },
                InventoryCategoryId: {
                    required: true
                },
                InventoryQuantity: {
                    maxlength: 15,
                    onlynumbers: true
                },
                ManufacturerId: {
                    required: false
                },
                PartNumber: {
                    maxlength: 50
                },
                SerialNumber: {
                    maxlength: 50
                }
            },
            messages: {
                ItemDescription: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                InventoryCategoryId: {
                    required: "Please enter this required field."
                },
                InventoryQuantity: {
                    onlynumbers: "This field accepts only numbers and floats.",
                    maxlength: "This field should not exceeds 15 number"
                },
                PartNumber: {
                    maxlength: "This field should not exceeds 50 characters"
                },
                SerialNumber: {
                    maxlength: "This field should not exceeds 50 characters"
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
                url: "/api/Assets/PostItem",
                contentType: "application/json",
                data: JSON.stringify({
                    SiteInventoryId: $("#HiddenInventoryId").val(),
                    ParentItemId: $("#ParentItemId").val(),
                    InventoryCategoryId: $("#InventoryCategoryId").val(),
                    ItemDescription: $("#ItemDescription").val(),
                    InventoryQuantity: $("#InventoryQuantity").val(),
                    ManufacturerId: $("#ManufacturerId").val(),
                    PartNumber: $("#PartNumber").val(),
                    SerialNumber: $("#SerialNumber").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivInventoryItems").html(res);
                    $("#addNewEntityModal").modal("hide");
                    component.ClearUpForm();
                    $("#TableTreeTable").treetable({ expandable: true, initialState: "expanded" }, true);

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
        this.LoadCategories();
        this.LoadManufacturers();
        this.LoadParentItems();
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
                                <h5 className="modal-title">Add New Item</h5>
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
                                                    Item Description : *
                                                </td>
                                                <td>
                                                    <input type="text" id="ItemDescription" name="ItemDescription" maxLength="50" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Inventory Category: *
                                                </td>
                                                <td>
                                                    <select id="InventoryCategoryId" name="InventoryCategoryId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select Item Category</option>
                                                        {this.state.Categories}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Parent Item :
                                                </td>
                                                <td>
                                                    <select id="ParentItemId" name="ParentItemId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select Parent Item</option>
                                                        {this.state.ParentItems}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Inventory Quantity:
                                                </td>
                                                <td>
                                                    <input type="number" id="InventoryQuantity" name="InventoryQuantity" maxLength="15" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Manufacturer :
                                                </td>
                                                <td>
                                                    <select id="ManufacturerId" name="ManufacturerId" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select Manufacturer</option>
                                                        {this.state.Manufacturers}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Part Number:
                                                </td>
                                                <td>
                                                    <input type="text" id="PartNumber" name="PartNumber" maxLength="50" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Serial Number :
                                                </td>
                                                <td>
                                                    <input type="text" id="SerialNumber" name="SerialNumber" maxLength="50" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}></td>
                                                <td></td>
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

ReactDOM.render(<AddItem />,
    document.getElementById("DivAddEntity"));