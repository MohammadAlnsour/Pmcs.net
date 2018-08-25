
class EditUserAccountComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserData: "",
            UserRoles: ""
        };

        this.EditUserAccount = this.EditUserAccount.bind(this);
        this.EnableDisableAccount = this.EnableDisableAccount.bind(this);
        this.HideEditUserModal = this.HideEditUserModal.bind(this);
        this.HideViewUserModal = this.HideViewUserModal.bind(this);
        this.HideCreateUserModal = this.HideCreateUserModal.bind(this);
        this.HideConfirmationModal = this.HideConfirmationModal.bind(this);
        this.ShowCreateUserModal = this.ShowCreateUserModal.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);

    }

    HideEditUserModal(event) {
        $("#editUserDialog").hide();
    }

    HideCreateUserModal(event) {
        $("#AddUserDialog").hide();
    }

    ShowCreateUserModal(event) {
        $("#AddUserDialog").show();
    }

    HideViewUserModal(event) {
        $("#viewUserDialog").hide();
    }

    HideConfirmationModal(event) {
        $("#confirmationDialog").hide();
    }

    ClearUpForm() {
        $("#TxtEmail").val("");
        $("#TxtFullName").val("");
        $('#CheckIsAdmin').prop('checked', false);
        $("#TxtMobileNumber").val("");
        $("#TxtPassword").val("");
        $("#TxtUserName").val("");
        $("input[name='RolesCheckboxes']").prop("checked", false);
    }

    LoadUserRoles() {
        var component = this;
        $.get("/api/Roles/GetRoles/1")
            .done(function (roles) {
                var checkboxes = [];
                if (roles != null) {
                    checkboxes = roles.map((r) => {
                        var checkbox = <input type="checkbox" value={r.RoleId} name="RolesCheckboxes" id={"CheckIsAdmin_" + r.RoleId} />;
                        return (
                            <tr>
                                <td>
                                    <label>
                                        {checkbox}
                                        &nbsp;
                                        {r.RoleName}
                                    </label>
                                </td>
                            </tr>
                        );
                    });
                }
                component.setState({ UserRoles: checkboxes });
            })
            .fail(function (xhr, responseText) {
                $.notify(
                    {
                        icon: "ti-na",
                        message: "A problem has occured : " + xhr.responseText
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

    componentDidMount() {
        var component = this;
        this.LoadUserRoles();
        $("body").on("click", "button[id^='btnEditUser_']", function (e) {
            var accountId = $(this).attr("id").split("_")[1];
            $("#hiddenUserId").val(accountId);
            $.get("/api/UsersAccounts/GetUserAccount/" + accountId)
                .done(function (results) {
                    if (results != null) {
                        $("#TxtFullName").val(results.FullName);
                        $("#TxtUserName").val(results.UserName);
                        $("#TxtPassword").val("**********");
                        $("#TxtMobileNumber").val(results.Mobile);
                        $("#TxtEmail").val(results.Email);
                        if (results.IsAdministrator) {
                            $('#CheckIsAdmin').prop('checked', true);
                        }
                        else {
                            $('#CheckIsAdmin').prop('checked', false);
                        }

                        $.get("/api/UsersAccounts/GetUserAccountRoles/" + accountId)
                            .done(function (roles) {
                                var checkboxes = [];
                                if (roles != null) {
                                    checkboxes = roles.map((r) => {
                                        var checkbox;
                                        if (r.IsMemeberOfRole) {
                                            checkbox = <input type="checkbox" value={r.RoleId} name="RolesCheckboxes" id={"CheckIsAdmin_" + r.RoleId} checked />;
                                        }
                                        else {
                                            checkbox = <input type="checkbox" value={r.RoleId} name="RolesCheckboxes" id={"CheckIsAdmin_" + r.RoleId} />;
                                        }

                                        return (
                                            <tr>
                                                <td>
                                                    <label>
                                                        {checkbox}
                                                        &nbsp;
                                                        {r.RoleName}
                                                    </label>
                                                </td>
                                            </tr>
                                        );
                                    });
                                }
                                component.setState({ UserRoles: checkboxes });
                            }.bind(this))
                            .fail(function (xhr, responseText) {
                                $.notify(
                                    {
                                        icon: "ti-na",
                                        message: "A problem has occured : " + xhr.responseText
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

                        $("#editUserDialog").show();
                    }
                }.bind(this))
                .fail(function (xhr, responseText) {
                    $.notify(
                        {
                            icon: "ti-na",
                            message: "A problem has occured : " + xhr.responseText
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
        });
        $("body").on("click", "button[id^='btnDetailsUser_']", function (e) {
            var accountId = $(this).attr("id").split("_")[1];
            $("#hiddenUserId").val(accountId);
            $.get("/api/UsersAccounts/GetUserAccount/" + accountId)
                .done(function (results) {
                    if (results != null) {
                        $("#LblFullName").text(results.FullName);
                        $("#LblUserName").text(results.UserName);
                        $("#LblMobileNumber").text(results.Mobile);
                        $("#LblEmail").text(results.Email);
                        if (results.IsAdministrator) {
                            $('#LblIsAdmin').text("Yes");
                        }
                        else {
                            $('#LblIsAdmin').text("No");
                        }

                        $.get("/api/UsersAccounts/GetUserAccountRoles/" + accountId)
                            .done(function (roles) {
                                var checkboxes = [];
                                if (roles != null) {
                                    checkboxes = roles.map((r) => {
                                        var label;
                                        if (r.IsMemeberOfRole) {
                                            label = <label>{r.RoleName}</label>;
                                            return (
                                                <tr>
                                                    <td>
                                                        {label}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    });
                                }
                                component.setState({ UserRoles: checkboxes });
                            }.bind(this))
                            .fail(function (xhr, responseText) {
                                $.notify(
                                    {
                                        icon: "ti-na",
                                        message: "A problem has occured : " + xhr.responseText
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

                        $("#viewUserDialog").show();
                    }
                }.bind(this))
                .fail(function (xhr, responseText) {
                    $.notify(
                        {
                            icon: "ti-na",
                            message: "A problem has occured : " + xhr.responseText
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
        });
        $("body").on("click", "button[id^='btnDisableUser_']", function (e) {
            var accountId = $(this).attr("id").split("_")[1];
            $("#hiddenUserId").val(accountId);
            $("#hiddenOperationType").val("disable");
            $("#confirmationDialog").show();
            //component.EnableDisableAccount();
        });
        $("body").on("click", "button[id^='btnEnableUser_']", function (e) {
            var accountId = $(this).attr("id").split("_")[1];
            $("#hiddenUserId").val(accountId);
            $("#hiddenOperationType").val("enable");
            $("#confirmationDialog").show();
            //component.EnableDisableAccount();
        });
    }

    EditUserAccount() {
        var userId = $("#hiddenUserId").val();
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
        $('#FormEditAccount').validate({
            rules: {
                TxtFullName: {
                    required: true,
                    maxlength: 50,
                    minlength: 5
                },
                TxtUserName: {
                    required: true,
                    maxlength: 50,
                    minlength: 5
                },
                TxtPassword: {
                    required: true,
                    maxlength: 50,
                    minlength: 3
                },
                TxtMobileNumber: {
                    required: false,
                    maxlength: 15,
                    minlength: 5,
                    onlynumbers: ''
                },
                TxtEmail: {
                    required: true,
                    maxlength: 50,
                    minlength: 5,
                    validateEmail: ''
                },
            },
            messages: {
                TxtFullName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 5 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                TxtUserName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 5 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                TxtPassword: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                TxtMobileNumber: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 50 characters",
                    onlynumbers: "This field accepts numbers only."
                },
                TxtEmail: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 50 characters",
                    validateEmail: "This field accepts email formats only."
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

        if ($("#FormEditAccount").valid()) {
            var rolesIds = "";
            $("input[name='RolesCheckboxes']").each(function () {
                //alert($(this).prop("checked"));
                if ($(this).prop("checked"))
                    rolesIds += $(this).val() + ","
            });
            //alert(rolesIds);
            rolesIds = rolesIds.substring(0, rolesIds.length - 1);
            //alert(rolesIds);
            var settings = {
                method: "PUT",
                url: "/UsersAccounts/EditUserAccount",
                contentType: "application/json",
                data: JSON.stringify({
                    Email: $("#TxtEmail").val(),
                    FullName: $("#TxtFullName").val(),
                    IsActive: true,
                    IsAdministrator: $('#CheckIsAdmin').prop('checked'),
                    Mobile: $("#TxtMobileNumber").val(),
                    Password: $("#TxtPassword").val(),
                    UserId: userId,
                    UserName: $("#TxtUserName").val(),
                    UserRolesIds: rolesIds
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#tableOnlyContainer").html(res);
                    $("#editUserDialog").hide();
                    component.ClearUpForm();

                    $.notify(
                        {
                            icon: "ti-check",
                            message: "The action has been completed successfully."
                        }, {
                            type: 'success',
                            timer: 3000,
                            placement: {
                                from: 'top',
                                align: 'center'
                            }
                        });
                })
                .fail(function (xhr, responseText) {
                    $.notify(
                        {
                            icon: "ti-na",
                            message: "A problem has occured : " + xhr.responseText
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

    CreateUserAccount() {
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
        $('#FormCreateAccount').validate({
            rules: {
                TxtAddFullName: {
                    required: true,
                    maxlength: 50,
                    minlength: 5
                },
                TxtAddUserName: {
                    required: true,
                    maxlength: 50,
                    minlength: 5
                },
                TxtAddPassword: {
                    required: true,
                    maxlength: 50,
                    minlength: 3,
                    mustEqual: '#TxtAddRepeatPassword'
                },
                TxtAddRepeatPassword: {
                    required: true,
                    maxlength: 50,
                    minlength: 3,
                    mustEqual: '#TxtAddPassword'
                },
                TxtAddMobileNumber: {
                    required: false,
                    maxlength: 15,
                    minlength: 5,
                    onlynumbers: ''
                },
                TxtAddEmail: {
                    required: true,
                    maxlength: 50,
                    minlength: 5,
                    validateEmail: ''
                },
            },
            messages: {
                TxtAddFullName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 5 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                TxtAddUserName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 5 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                TxtAddPassword: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 50 characters",
                    mustEqual: "Please check your password and write it correctly."
                },
                TxtAddRepeatPassword: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 50 characters",
                    mustEqual: "Please check your password and write it correctly."
                },
                TxtAddMobileNumber: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 50 characters",
                    onlynumbers: "This field accepts numbers only."
                },
                TxtAddEmail: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 3 characters.",
                    maxlength: "This field should not exceeds 50 characters",
                    validateEmail: "This field accepts email formats only."
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

        if ($("#FormCreateAccount").valid()) {
            var rolesIds = "";
            $("input[name='RolesCheckboxes']").each(function () {
                if ($(this).prop("checked"))
                    rolesIds += $(this).val() + ","
            });
            rolesIds = rolesIds.substring(0, rolesIds.length - 1);

            var settings = {
                method: "POST",
                url: "/api/UsersAccounts/PostUserAccount",
                contentType: "application/json",
                data: JSON.stringify({
                    Email: $("#TxtAddEmail").val(),
                    FullName: $("#TxtAddFullName").val(),
                    IsActive: true,
                    IsAdministrator: $('#CheckAddIsAdmin').prop('checked'),
                    Mobile: $("#TxtAddMobileNumber").val(),
                    Password: $("#TxtAddPassword").val(),
                    //UserId: userId,
                    UserName: $("#TxtAddUserName").val(),
                    UserRolesIds: rolesIds
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#tableOnlyContainer").html(res);
                    $("#AddUserDialog").hide();
                    $("#TxtEmail").val("");
                    $("#TxtFullName").val("");
                    $('#CheckIsAdmin').prop('checked', false);
                    $("#TxtMobileNumber").val("");
                    $("#TxtPassword").val("");
                    $("#TxtUserName").val("");
                    $("input[name='RolesCheckboxes']").prop("checked", false);

                    $.notify(
                        {
                            icon: "ti-check",
                            message: "The action has been completed successfully."
                        }, {
                            type: 'success',
                            timer: 3000,
                            placement: {
                                from: 'top',
                                align: 'center'
                            }
                        });
                })
                .fail(function (xhr, responseText) {
                    $.notify(
                        {
                            icon: "ti-na",
                            message: "A problem has occured : " + xhr.responseText
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

    EnableDisableAccount() {
        var userId = $("#hiddenUserId").val();
        //enable or disable.
        var operationType = $("#hiddenOperationType").val();
        var component = this;

        var url = operationType == "enable" ?
            "/UsersAccounts/EnableUserAccount" :
            "/UsersAccounts/DisableUserAccount";

        var settings = {
            method: "PUT",
            url: url,
            contentType: "application/json",
            data: JSON.stringify({
                userId: userId,
            }),
        };
        $.ajax(settings)
            .done(function (res) {
                $("#tableOnlyContainer").html(res);
                $("#confirmationDialog").hide();
                $.notify(
                    {
                        icon: "ti-check",
                        message: "The action has been completed successfully."
                    }, {
                        type: 'success',
                        timer: 3000,
                        placement: {
                            from: 'top',
                            align: 'center'
                        }
                    });
            })
            .fail(function (xhr, responseText) {
                $.notify(
                    {
                        icon: "ti-na",
                        message: "A problem has occured : " + xhr.responseText
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

    render() {

        return (

            <div id="allDialogs">

                <button className="btn btn-primary" id="BtnCreateUserAccount" onClick={this.ShowCreateUserModal}>Create User Account</button>

                <div id="AddUserDialog" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create user account dialog</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.HideCreateUserModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormCreateAccount" name="FormCreateAccount">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input type="text" id="TxtAddFullName" name="TxtFullName" className="form-control border-input" placeholder="Full Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>User Name</label>
                                                <input type="text" id="TxtAddUserName" name="TxtAddUserName" className="form-control border-input" placeholder="User Name" />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" id="TxtAddPassword" name="TxtAddPassword" className="form-control border-input" />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Repeat Password</label>
                                                <input type="password" id="TxtAddRepeatPassword" name="TxtAddRepeatPassword" className="form-control border-input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Mobile Number</label>
                                                <input type="text" id="TxtAddMobileNumber" name="TxtAddMobileNumber" className="form-control border-input" placeholder="966 557 8658 952" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" id="TxtAddEmail" name="TxtAddEmail" className="form-control border-input" placeholder="someone@domain.com" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>
                                                    <input type="checkbox" id="CheckAddIsAdmin" name="CheckAddIsAdmin" className="border-input" />&nbsp;
                                                       Is Administrator
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <h5 className="modal-title">User Roles</h5>
                                                <hr />
                                                <table>
                                                    <tbody>
                                                        {this.state.UserRoles}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info btn-fill btn-wd" onClick={this.CreateUserAccount}>Create User Account</button>
                                <button type="button" className="btn btn-secondary btn-fill" data-dismiss="modal" onClick={this.HideCreateUserModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="editUserDialog" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit user account dialog</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.HideEditUserModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditAccount" name="FormEditAccount">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input type="text" id="TxtFullName" name="TxtFullName" className="form-control border-input" placeholder="Full Name" value={this.state.UserData.FullName} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>User Name</label>
                                                <input type="text" id="TxtUserName" name="TxtUserName" className="form-control border-input" placeholder="User Name" value={this.state.UserData.UserName} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" id="TxtPassword" name="TxtPassword" className="form-control border-input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Mobile Number</label>
                                                <input type="text" id="TxtMobileNumber" name="TxtMobileNumber" className="form-control border-input" placeholder="966 557 8658 952" value={this.state.UserData.Mobile} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" id="TxtEmail" name="TxtEmail" className="form-control border-input" placeholder="someone@domain.com" value={this.state.UserData.Email} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    <input type="checkbox" id="CheckIsAdmin" name="CheckIsAdmin" className="border-input" checked={this.state.UserData.IsAdministrator} />&nbsp;
                                                Is Administrator
                                            </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <h5 className="modal-title">User Roles</h5>
                                                <hr />
                                                <table>
                                                    <tbody>
                                                        {this.state.UserRoles}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info btn-fill btn-wd" onClick={this.EditUserAccount}>Edit User Account</button>
                                <button type="button" className="btn btn-secondary btn-fill" data-dismiss="modal" onClick={this.HideEditUserModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="viewUserDialog" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">User account info dialog</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.HideViewUserModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditAccount" name="FormEditAccount">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Full Name: &nbsp;</label>
                                                <label id="LblFullName">{this.state.UserData.FullName}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>User Name: &nbsp;</label>
                                                <label id="LblUserName">{this.state.UserData.UserName}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Password: &nbsp;</label>
                                                <label id="LblPassword">**********</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Mobile Number: &nbsp;</label>
                                                <label id="LblMobileNumber">{this.state.UserData.Mobile}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Email: &nbsp;</label>
                                                <label id="LblEmail">{this.state.UserData.Email}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Is Administrator: &nbsp;</label>
                                                <label id="LblIsAdmin">{this.state.UserData.IsAdministrator}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <h5 className="modal-title">User Roles</h5>
                                                <hr />
                                                <table>
                                                    <tbody>
                                                        {this.state.UserRoles}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-fill" data-dismiss="modal" onClick={this.HideViewUserModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="confirmationDialog" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation dialog</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.HideConfirmationModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5>Are you sure you want to complete this action?</h5>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info btn-fill btn-wd" onClick={this.EnableDisableAccount}>Yes Sure</button>
                                <button type="button" className="btn btn-secondary btn-fill" data-dismiss="modal" onClick={this.HideConfirmationModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }

}

ReactDOM.render(
    <EditUserAccountComponent />,
    document.getElementById("divAddNewUser"));