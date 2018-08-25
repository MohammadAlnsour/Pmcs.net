
class CreateDocument extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            receivers: ""
        }

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenAddNewModal = this.OpenAddNewModal.bind(this);
        this.LoadUsers = this.LoadUsers.bind(this);
        this.UploadFile = this.UploadFile.bind(this);
        this.SendDocument = this.SendDocument.bind(this);
        this.EditDocumentData = this.EditDocumentData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.LoadDocumentData = this.LoadDocumentData.bind(this);

    }
    UploadFile(e) {

        var file = $('#uploadDocumentPath')[0].files[0];
        if (file == null) {
            alert("Please select a file.");
            e.preventDefault();
            return false;
        }
        var data = new FormData();
        data.append('file', file);

        $.ajax({
            url: '/api/DocumentManagement/UploadFile',
            processData: false,
            contentType: false,
            data: data,
            type: 'POST'
        }).done(function (res) {
            $("#LnkFile").text(res);
            $("#LnkFile").attr("href", res);
            $("#LnkFile").attr("target", "_blank");
            $("#BtnUpload").prop("disabled", "disabled");

        }).fail(function (xhr, responseText) {
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

        e.preventDefault();
        return false;
    }
    CloseModal() {
        $("#addNewEntityModal").modal("hide");
    }
    OpenAddNewModal() {
        $("#addNewEntityModal").modal("show");
    }
    LoadUsers() {
        var component = this;
        $.get("/api/Auth/GetUsersExceptCurrent")
            .done(function (users) {
                if (users != null) {
                    var html = [];
                    for (var i = 0; i < users.length; i++) {
                        html.push(
                            <option value={users[i].UserId}>{users[i].FullName}</option>
                        );
                    }
                    component.setState({
                        receivers: html
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
    ClearUpForm() {
        $("#FormAddEntity")[0].reset();
    }

    SendDocument() {
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
                SelectReceiverId: {
                    required: true
                },
                TxtDocSubject: {
                    required: true,
                    maxlength: 150,
                    minlength: 2
                },
                TxtDocDescription: {
                    maxlength: 300,
                    minlength: 2
                },
                uploadDocumentPath: {
                    required: true
                }
            },
            messages: {
                SelectReceiverId: {
                    required: "Please enter this required field."
                },
                TxtDocSubject: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 150 numbers or characters."
                },
                TxtDocDescription: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 300 numbers or characters."
                },
                uploadDocumentPath: {
                    required: "Please enter this required field."
                }
            },
            errorElement: 'div',
            errorLabelContainer: 'alert bg-danger',
            errorPlacement: function (errorlabel, element) {
                errorlabel.addClass("alert bg-danger");
                $(errorlabel).css({ position: "fixed" });
                errorlabel.insertAfter(element);
            }
        });

        if ($("#FormAddEntity").valid()) {
            $('.selectpicker').selectpicker('refresh');
            var settings = {
                method: "POST",
                url: "/api/DocumentManagement/PostDocument",
                contentType: "application/json",
                data: JSON.stringify({
                    DocSubject: $("#TxtDocSubject").val(),
                    DocDescription: $("#TxtDocDescription").val(),
                    ReceiverId: $("#SelectReceiverId").val(),
                    DocumentPath: $("#LnkFile").text()
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    component.ClearUpForm();
                    $("#divOutboxTableContainer").html(res);
                    $("#addNewEntityModal").modal("hide");
                    $('#OutboxDocs').DataTable({"ordering": false});
                    $('#TblInbox').DataTable({"ordering": false});

                    $.notify(
                        {
                            // icon: "fa fa-check-square",
                            message: "<h5> The action has been completed successfully. </h5> <br /><br />"
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
    EditDocumentData() {
        var thiscomponent = this;

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
        $('#FormLoadDocumentData').validate({
            rules: {
                TxtLoadDocumentDataCode: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                TxtLoadDocumentDataName: {
                    required: true,
                    maxlength: 150,
                    minlength: 4
                },
                TxtLoadDocumentDataShortName: {
                    maxlength: 50,
                    minlength: 2
                },
                SelectEditSite: {
                    required: true
                }
            },
            messages: {
                TxtLoadDocumentDataCode: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 numbers or characters."
                },
                TxtLoadDocumentDataName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 4 characters.",
                    maxlength: "This field should not exceeds 150 numbers or characters."
                },
                TxtLoadDocumentDataShortName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 2 characters.",
                    maxlength: "This field should not exceeds 50 numbers or characters."
                },
                SelectEditSite: {
                    required: "Please enter this required field."
                }
            },
            errorElement: 'div',
            errorLabelContainer: 'alert bg-danger',
            errorPlacement: function (errorlabel, element) {
                errorlabel.addClass("alert bg-danger");
                $(errorlabel).css({ position: "fixed" });
                errorlabel.insertAfter(element);
            }
        });

        if ($("#FormLoadDocumentData").valid()) {

            var settings = {
                method: "PUT",
                url: "/api/Projects/LoadDocumentData",
                contentType: "application/json",
                data: JSON.stringify({
                    ProjectCode: $("#TxtLoadDocumentDataCode").val(),
                    ProjectShortName: $("#TxtLoadDocumentDataShortName").val(),
                    ProjectName: $("#TxtLoadDocumentDataName").val(),
                    SiteId: $("#SelectEditSite").val(),
                    ProjectId: $("#HiddenLoadDocumentDataId").val()
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    //thiscomponent.ClearUpForm();
                    $("#divProjectsList").html(res);
                    $("#LoadDocumentDataModal").modal("hide");

                    $.notify(
                        {
                            //// icon: "fa fa-check-square",
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
    LoadDocumentData() {
        var component = this;

        $("body").on("click", "button[id^='BtnLoadDocumentData_']", function (e) {
            var projectId = $(this).attr("id").split("_")[1];
            $("#HiddenLoadDocumentDataId").val(projectId);

            $.get("/api/Projects/GetProject/" + projectId)
                .done(function (project) {
                    var actionsHtml = [];
                    if (project != null) {
                        $("#TxtLoadDocumentDataCode").val(project.ProjectCode);
                        $("#TxtLoadDocumentDataName").val(project.ProjectName);
                        $("#SelectEditSite").val(project.SiteId);
                        $("#TxtLoadDocumentDataShortName").val(project.ProjectShortName);
                        $("#LoadDocumentDataModal").modal("show");
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
        });
    }

    componentDidMount() {
        var component = this;
        this.LoadUsers();
        $('.selectpicker').selectpicker('refresh');
        $('#OutboxDocs').DataTable({"ordering": false});
        $('#TblInbox').DataTable({"ordering": false});
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
                     Send Document
                </button>
                <br />
                <br />
                <div id="addNewEntityModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Send New Document</h5>
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
                                                    Receiver : *
                                                </td>
                                                <td>
                                                    <select name="SelectReceiverId" id="SelectReceiverId" className="form-control selectpicker">
                                                        {this.state.receivers}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Subject : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtDocSubject" name="TxtDocSubject" maxLength="100" className="form-control" />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Description :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtDocDescription" name="TxtDocDescription" maxLength="300" className="form-control" />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Upload Document : *
                                                </td>
                                                <td>
                                                    <table style={{ width: '100%' }}>
                                                        <tr>
                                                            <td>
                                                                <input type="file" id="uploadDocumentPath" name="uploadDocumentPath" className="form-control" />
                                                            </td>
                                                            <td>
                                                                <button id="BtnUpload" className="btn btn-primary" onClick={this.UploadFile}><i className="fa fa-cloud-upload"></i>Upload</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2">
                                                                <label id="lblUploadDocumentName"></label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2">
                                                                <a id="LnkFile" ></a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.SendDocument}>Save Item</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

ReactDOM.render(<CreateDocument />,
    document.getElementById("divSendDocument"));