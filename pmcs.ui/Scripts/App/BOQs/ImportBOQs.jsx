
class ImportDesignBOQs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Jobs: "",
            POs: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenImportModal = this.OpenImportModal.bind(this);
        this.ParseExcelEntries = this.ParseExcelEntries.bind(this);

        //this.LoadPOs = this.LoadPOs.bind(this);
    }
    ParseExcelEntries() {
        var filePath = $("#LnkUploadedFilePath").attr("href");

        $.ajax({
            url: '/api/BOQs/ParseBOQDesignExcel/',
            data: { "filePath": filePath.substr(filePath.lastIndexOf('/') + 1)},
            type: 'Get'
        }).done(function (res) {
            $("#LnkUploadedFilePath").text("");
            $("#LnkUploadedFilePath").attr("href", "#");
            $("#LnkUploadedFilePath").attr("target", "_blank");
            $("#LnkUploadedFilePath").css("display", "");
            $("#BtnUpload").prop("disabled", "");
            $("#importModal").modal("hide");

            $("#DivEntityList").html(res);

            //$('#TblDesignBOQ').DataTable().fnDestroy();
            //$('#TblDesignBOQ').DataTable({
            //    "destroy": true
            //});
            $('#TblDesignBOQ').DataTable().destroy();
            // then initialize table again
            $('#TblDesignBOQ').DataTable();
            //$("#TblDesignBOQ").DataTable();

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
    }
    //LoadJobByPOId() {
    //    var component = this;
    //    $.get("/api/Jobs/GetJobs")
    //        .done(function (jobs) {
    //            if (jobs != null) {
    //                var html = [];
    //                for (var i = 0; i < jobs.length; i++) {
    //                    html.push(
    //                        <option value={jobs[i].JobId}>{jobs[i].JobNumber}</option>
    //                    );
    //                }
    //                component.setState({
    //                    Jobs: html
    //                });

    //            }
    //        })
    //        .fail(function (jqXHR, textStatus, errorThrown) {
    //            $.notify(
    //                {
    //                    icon: "fa fa-exclamation-square",
    //                    message: "Sorry, an error has occured : " + jqXHR.responseText
    //                },
    //                {
    //                    type: 'danger',
    //                    timer: 2000,
    //                    placement: {
    //                        from: 'top',
    //                        align: 'center'
    //                    }
    //                });
    //        });
    //}
    //LoadPOs() {
    //    var component = this;
    //    $.get("/api/POs/GetPOs")
    //        .done(function (pos) {
    //            if (pos != null) {
    //                var html = [];
    //                for (var i = 0; i < pos.length; i++) {
    //                    html.push(
    //                        <option value={pos[i].PoId}>{pos[i].PONumber}</option>
    //                    );
    //                }
    //                component.setState({
    //                    POs: html
    //                });
    //            }
    //        })
    //        .fail(function (jqXHR, textStatus, errorThrown) {
    //            $.notify(
    //                {
    //                    icon: "fa fa-exclamation-square",
    //                    message: "Sorry, an error has occured : " + jqXHR.responseText
    //                },
    //                {
    //                    type: 'danger',
    //                    timer: 2000,
    //                    placement: {
    //                        from: 'top',
    //                        align: 'center'
    //                    }
    //                });
    //        });
    //}
    CloseModal() {
        $("#importModal").modal("hide");
    }
    OpenImportModal() {
        $("#importModal").modal("show");
    }
    UploadExcelFile(e) {
        var filePath = $("#fileDesignExcel").val();
        if (filePath == null || filePath == '') {
            alert('Please select a valid excel file.');
            return false;
        }
        var fileName = filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[0];
        var fileExtension = filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1];
        if (fileExtension.toLowerCase() != 'xls' && fileExtension.toLowerCase() != 'xlsx') {
            alert('Please select a valid excel file.');
            return false;
        }

        var file = $('#fileDesignExcel')[0].files[0];
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
            $("#LnkUploadedFilePath").text(res);
            $("#LnkUploadedFilePath").attr("href", res);
            $("#LnkUploadedFilePath").attr("target", "_blank");
            $("#LnkUploadedFilePath").css("display", "");
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

    componentDidMount() {

    }
    render() {
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div className="col-md-12 row">

                <button className="btn btn-primary" onClick={this.OpenImportModal}>
                    <i className="fa fa-file-excel-o"></i>&nbsp;
                       Import Design BOQ
                </button>
                <br />
                <br />
                <div id="importModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Import Design BOQ</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '15%' }}>
                                                Design BOQ Excel File : *
                                                </td>
                                            <td>
                                                <input type="file" id="fileDesignExcel" name="fileDesignExcel" className="form-control" />
                                            </td>
                                            <td>&nbsp;</td>
                                            <td style={{ width: '15%' }}>
                                                <a href="#" target="_blank">Download Sample</a>
                                            </td>
                                            <td>
                                                <button id="BtnUpload" onClick={this.UploadExcelFile} className="btn btn-primary"><i className="fa fa-cloud-upload"></i>Upload</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <a id="LnkUploadedFilePath" style={{ display: "none" }} target="_blank"></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <br />
                                <br />
                                <br />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.ParseExcelEntries}>Import Data</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

ReactDOM.render(<ImportDesignBOQs />,
    document.getElementById("DivImportBOQ"));