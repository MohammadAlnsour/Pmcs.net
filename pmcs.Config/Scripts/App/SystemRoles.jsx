
class AddRoleComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Modules: ""
        };

        this.handleAddRole = this.handleAddRole.bind(this);
        this.saveModulePermissionsMappings = this.saveModulePermissionsMappings.bind(this);
        this.validateAndSaveRole = this.validateAndSaveRole.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.GetModules = this.GetModules.bind(this);


    }

    handleAddRole(event) {
        $("#addRoleDialog").show();
    }

    closeModal(event) {
        $("#addRoleDialog").hide();
    }

    validateAndSaveRole(event) {

        $.validator.addMethod("onlyleters", function (value, element) {
            return this.optional(element) || /^[+]?[a-zA-Z\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\s]+([.][a-zA-Z\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\s])?$/.test(value);
        }, '');
        $.validator.addMethod("onlynumbers", function (value, element) {
            return this.optional(element) || /^[+]?[0-9]+([.][0-9])?$/.test(value);
        }, '');
        $.validator.addMethod("validateEmail", function (value, element) {
            return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        }, '');
        $.validator.addMethod("mustEqual", function (value, element, originalInput) {
            var orginalvalue = $(originalInput).val();
            return orginalvalue == value;
        }, '');
        var validator = $('#FormAddRole').validate({
            rules: {
                txtRoleName: {
                    required: true,
                    minlength: 3,
                    maxlength: 100,
                }
            },
            messages: {
                txtRoleName: {
                    required: "Please fill this required field.",
                    minlength: "This field length must be more than 3 characters.",
                    maxlength: "This field length must not exceeds 100 characters.",
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

        if ($("#FormAddRole").valid()) {

            $.post("/api/Roles/PostRole",
                {
                    RoleName: $("#txtRoleName").val(),
                    IsActive: true
                })
                .done(function (results) {
                    $("#addRoleDialog").hide();
                    $("#txtRoleName").val("");

                    $.get("/SystemRoles/GetRolesPartial")
                        .done(function (partialview) {
                            $("#tableContainer").html('<div id="divAddNewRole"></div>' + partialview);

                            $('.table-expandable').each(function () {
                                var table = $(this);
                                table.children('thead').children('tr').append('<th></th>');
                                table.children('tbody').children('tr').filter(':odd').hide();
                                table.children('tbody').children('tr').filter(':even').click(function () {
                                    var element = $(this);
                                    element.next('tr').toggle('slow');
                                    element.find(".table-expandable-arrow").toggleClass("up");
                                });
                                table.children('tbody').children('tr').filter(':even').each(function () {
                                    var element = $(this);
                                    element.append('<td><div class="table-expandable-arrow"></div></td>');
                                });
                            });

                            $.notify(
                                {
                                    icon: "ti-check-box",
                                    message: "The action has been done successfully."
                                },
                                {
                                    type: 'success',
                                    timer: 3000,
                                    placement: {
                                        from: 'top',
                                        align: 'center'
                                    }
                                });
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            $.notify(
                                {
                                    icon: "ti-face-sad",
                                    message: "Sorry, an error has occured : " + jqXHR.responseText
                                },
                                {
                                    type: 'danger',
                                    timer: 3000,
                                    placement: {
                                        from: 'top',
                                        align: 'center'
                                    }
                                });
                        });


                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    $.notify(
                        {
                            icon: "ti-face-sad",
                            message: "Sorry, an error has occured : " + jqXHR.responseText
                        },
                        {
                            type: 'danger',
                            timer: 3000,
                            placement: {
                                from: 'top',
                                align: 'center'
                            }
                        });
                });
        }
    }

    componentDidMount() {
        this.GetModules();
        this.saveModulePermissionsMappings();
    }

    GetModules() {
        var component = this;
        $.get("/api/Modules/GetModules/1")
            .done(function (modules) {
                if (modules != null) {
                    component.setState({
                        Modules: modules
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

    saveModulePermissionsMappings() {
        var component = this;
        $("body").on("click", "button[id^='btnSaveRoleSheet_']", function () {
            var roleId = $(this).attr("id").split("_")[1];

            var modules = component.state.Modules;
            if (modules != null) {

                var allMappings = [];

                for (var i = 0; i < modules.length; i++) {
                    var moduleId = modules[i].ModuleId;

                    var table = $("#TblModuleContainer-" + moduleId + "-" + roleId);
                    var trs = $(table).find("tbody tr td table tbody tr");

                    var moduleMappingsTrs = $(table).find("tbody tr td table tbody tr");
                    for (var j = 0; j < moduleMappingsTrs.length; j++) {
                        var mappingRecord = {
                            MappingId: "",
                            CanRead: "",
                            CanWrite: "",
                            CanDelete: ""
                        };
                        var checkboxes = $(moduleMappingsTrs[j]).find("input:checkbox");
                        for (var k = 0; k < checkboxes.length; k++) {
                            var id = $(checkboxes[k]).attr("id");
                            var mappingId = $(checkboxes[k]).attr("id").split("_")[1];
                            mappingRecord.MappingId = mappingId;
                            if (id.indexOf("read_") > -1) {
                                if ($(checkboxes[k]).prop("checked")) {
                                    mappingRecord.CanRead = true;
                                }
                                else
                                    mappingRecord.CanRead = false;
                            }
                            else if (id.indexOf("write_") > -1) {
                                if ($(checkboxes[k]).prop("checked")) {
                                    mappingRecord.CanWrite = true;
                                }
                                else
                                    mappingRecord.CanWrite = false;
                            }
                            else if (id.indexOf("delete_") > -1) {
                                if ($(checkboxes[k]).prop("checked")) {
                                    mappingRecord.CanDelete = true;
                                }
                                else
                                    mappingRecord.CanDelete = false;
                            }
                        }
                        allMappings.push(mappingRecord);
                    }
                }

                console.log(JSON.stringify(allMappings));
                var settings = {
                    method: "PUT",
                    url: "/api/Modules/UpdateModuleRoleMappingTable/",
                    contentType: "application/json",
                    data: JSON.stringify(allMappings),
                };
                $.ajax(settings)
                    .done(function (res) {
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


        });
    }

    render() {
        return (
            <div>
                &nbsp;&nbsp;&nbsp;
                <button id="btnAddRole" className="btn btn-primary btn-fill" onClick={this.handleAddRole}>+ Create Role</button>

                <div id="addRoleDialog" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Role</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddRole">
                                    <table style={{ width: '100%' }}>
                                        <tr>
                                            <td>
                                                Role Name :
                                    </td>
                                            <td>
                                                <input type="text" id="txtRoleName" name="RoleName" className="form-control border-input" />
                                            </td>
                                        </tr>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.validateAndSaveRole}>Save Role</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <AddRoleComponent />,
    document.getElementById("divAddNewRole"));