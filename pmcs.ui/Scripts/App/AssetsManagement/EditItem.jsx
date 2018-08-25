
class EditItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Categories: "",
            Manufacturers: "",
            ParentItems: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenEditModal = this.OpenEditModal.bind(this);
        this.EditEntityData = this.EditEntityData.bind(this);
        this.LoadManufacturers = this.LoadManufacturers.bind(this);
        this.LoadCategories = this.LoadCategories.bind(this);
        this.LoadParentItems = this.LoadParentItems.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);

    }
    LoadItem() {
        var component = this;
        var itemId = $("#HiddenItemId").val();
        $.get("/api/Assets/GetInventoryItem/" + itemId)
            .done(function (item) {
                if (item != null) {
                    $("#ItemDescriptionEdit").val(item.ItemDescription);
                    $("#InventoryCategoryIdEdit").val(item.InventoryCategoryId);
                    $("#ParentItemIdEdit").val(item.ParentItemId);
                    $("#InventoryQuantityEdit").val(item.InventoryQuantity);
                    $("#ManufacturerIdEdit").val(item.ManufacturerId);
                    $("#PartNumberEdit").val(item.PartNumber);
                    $("#SerialNumberEdit").val(item.SerialNumber);
                    component.OpenEditModal();
                }
                $('.selectpicker').selectpicker('refresh');
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
        $("#EditEntityModal").modal("hide");
    }
    OpenEditModal() {
        $("#EditEntityModal").modal("show");
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
                ItemDescriptionEdit: {
                    required: true,
                    maxlength: 50,
                    minlength: 2
                },
                InventoryCategoryIdEdit: {
                    required: true
                },
                InventoryQuantityEdit: {
                    maxlength: 15,
                    onlynumbers: true
                },
                ManufacturerIdEdit: {
                    required: false
                },
                PartNumberEdit: {
                    maxlength: 50
                },
                SerialNumberEdit: {
                    maxlength: 50
                }
            },
            messages: {
                ItemDescriptionEdit: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                InventoryCategoryIdEdit: {
                    required: "Please enter this required field."
                },
                InventoryQuantityEdit: {
                    onlynumbers: "This field accepts only numbers and floats.",
                    maxlength: "This field should not exceeds 15 number"
                },
                PartNumberEdit: {
                    maxlength: "This field should not exceeds 50 characters"
                },
                SerialNumberEdit: {
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
        if ($("#FormEditEntity").valid()) {

            var settings = {
                method: "PUT",
                url: "/api/Assets/EditItem",
                contentType: "application/json",
                data: JSON.stringify({
                    ItemId: $("#HiddenItemId").val(),
                    SiteInventoryId: $("#HiddenInventoryId").val(),
                    ParentItemId: $("#ParentItemIdEdit").val(),
                    InventoryCategoryId: $("#InventoryCategoryIdEdit").val(),
                    ItemDescription: $("#ItemDescriptionEdit").val(),
                    InventoryQuantity: $("#InventoryQuantityEdit").val(),
                    ManufacturerId: $("#ManufacturerIdEdit").val(),
                    PartNumber: $("#PartNumberEdit").val(),
                    SerialNumber: $("#SerialNumberEdit").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#DivInventoryItems").html(res);
                    $("#EditEntityModal").modal("hide");
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

        $("body").on("click", "button[id^='BtnEdit_']", function () {
            var itemId = $(this).attr("id").split("_")[1];
            $("#HiddenItemId").val(itemId);
            component.LoadItem();
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
                <div id="EditEntityModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Item</h5>
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
                                                    Item Description : *
                                                </td>
                                                <td>
                                                    <input type="text" id="ItemDescriptionEdit" name="ItemDescriptionEdit" maxLength="50" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Inventory Category: *
                                                </td>
                                                <td>
                                                    <select id="InventoryCategoryIdEdit" name="InventoryCategoryIdEdit" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
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
                                                    <select id="ParentItemIdEdit" name="ParentItemIdEdit" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select Parent Item</option>
                                                        {this.state.ParentItems}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Inventory Quantity:
                                                </td>
                                                <td>
                                                    <input type="number" id="InventoryQuantityEdit" name="InventoryQuantityEdit" maxLength="15" className="form-control" />
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
                                                    <select id="ManufacturerIdEdit" name="ManufacturerIdEdit" style={{ width: '100%' }} className="selectpicker" data-live-search="true" data-live-search-placeholder="Search" >
                                                        <option value="">Select Manufacturer</option>
                                                        {this.state.Manufacturers}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Part Number:
                                                </td>
                                                <td>
                                                    <input type="text" id="PartNumberEdit" name="PartNumberEdit" maxLength="50" className="form-control" />
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
                                                    <input type="text" id="SerialNumberEdit" name="SerialNumberEdit" maxLength="50" className="form-control" />
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
                                <button type="button" className="btn btn-primary" onClick={this.EditEntityData}>Edit Item</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<EditItem />,
    document.getElementById("DivEditEntity"));