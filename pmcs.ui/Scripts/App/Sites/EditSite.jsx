
class EditSites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SiteTypes: "",
            SitePriorities: "",
            SiteOwners: "",
            SiteGoveronates: "",
            Districts: "",
            Projects: "",
            Tasks: ""
        };

        this.CloseModal = this.CloseModal.bind(this);
        this.OpenEditModal = this.OpenEditModal.bind(this);
        this.EditSiteData = this.EditSiteData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.InitializeGoogleMaps = this.InitializeGoogleMaps.bind(this);
        this.LoadSite = this.LoadSite.bind(this);
    }
    InitializeGoogleMaps() {

        var map;
        marker = null;
        map = new google.maps.Map(document.getElementById('GoogleMapAddMarkerEdit'), {
            center: { lat: 24.747246997895175, lng: 46.68365478515625 },
            zoom: 8,
            mapTypeId: 'roadmap'
        });

        var input = document.getElementById('TxtSearchGoogleMap2');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
        map.addListener('click', function (event) {
            if (marker == null) {
                marker = new google.maps.Marker({
                    position: event.latLng,
                    map: map
                });
            } else {
                marker.setPosition(event.latLng);
            }
            document.getElementById('TxtLatitudeEdit').value = event.latLng.lat();
            document.getElementById('TxtLongitudeEdit').value = event.latLng.lng();
        });
    }
    CloseModal() {
        $("#editNewSite").hide();
    }
    OpenEditModal() {
        $("#editNewSite").modal("show");
    }
    ClearUpForm() {
        $("#TxtSiteNumberEdit").val("");
        $("#SelectSiteTypeEdit").val("");
        $("#SelectSitePriorityEdit").val("");
        $("#SelectSiteOwnerEdit").val("");
        $("#SelectGoveronateEdit").val("");
        $("#SelectDistrictEdit").val("");
        $("#TxtBlockNumberEdit").val("");
        $("#TxtStreetNumberEdit").val("");
        $("#TxtSubStreetNumberEdit").val("");
        $("#TxtBuildingNumberEdit").val("");
        $("#TxtBuildingNameEdit").val("");
        $("#TxtSiteNameEdit").val("");
        $("#SelectProjectEdit").val("");
        $("#SelectTasksEdit").val("");
    }
    EditSiteData() {
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
        $('#FormEditSite').validate({
            rules: {
                TxtSiteNumberEdit: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                SelectSiteTypeEdit: {
                    required: true
                },
                TxtSiteNameEdit: {
                    required: true,
                    maxlength: 100,
                    minlength: 4
                },
                SelectSitePriorityEdit: {
                    required: true
                },
                SelectSiteOwnerEdit: {
                    required: true
                },
                SelectProjectEdit: {
                    required: true
                },
                TxtLatitudeEdit: {
                    required: true
                },
                TxtLongitudeEdit: {
                    required: true
                },
            },
            messages: {
                TxtSiteNumberEdit: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                SelectSiteTypeEdit: {
                    required: "Please enter this required field."
                },
                TxtSiteNameEdit: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 4 characters.",
                    maxlength: "This field should not exceeds 100 characters"
                },
                SelectSitePriorityEdit: {
                    required: "Please enter this required field."
                },
                SelectSiteOwnerEdit: {
                    required: "Please enter this required field."
                },
                SelectProjectEdit: {
                    required: "Please enter this required field."
                },
                TxtLatitudeEdit: {
                    required: "Please enter this required field."
                },
                TxtLongitudeEdit: {
                    required: "Please enter this required field."
                },
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

        if ($("#FormEditSite").valid()) {

            var settings = {
                method: "PUT",
                url: "/api/Sites/EditSite",
                contentType: "application/json",
                data: JSON.stringify({
                    SiteNumber: $("#TxtSiteNumberEdit").val(),
                    SiteType: $("#SelectSiteTypeEdit").val(),
                    SitePriority: $("#SelectSitePriorityEdit").val(),
                    Latitude: $("#TxtLatitudeEdit").val(),
                    Longtitude: $("#TxtLongitudeEdit").val(),
                    SiteOwnerId: $("#SelectSiteOwnerEdit").val(),
                    GevernorateId: $("#SelectGoveronateEdit").val(),
                    DistrictId: $("#SelectDistrictEdit").val(),
                    BlockNumber: $("#TxtBlockNumberEdit").val(),
                    StreetNumber: $("#TxtStreetNumberEdit").val(),
                    SubStreetNumber: $("#TxtSubStreetNumberEdit").val(),
                    BuildingNumber: $("#TxtBuildingNumberEdit").val(),
                    BuildingName: $("#TxtBuildingNameEdit").val(),
                    SiteName: $("#TxtSiteNameEdit").val(),
                    IsActive: true,
                    SiteId: $("#HiddenSiteId").val()
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#divSitesList").html(res);
                    $("#editNewSite").modal("hide");
                    component.ClearUpForm();
                    $(".datatable").DataTable({"ordering": false});
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
    }
    LoadSite() {
        var component = this;
        var siteId = $("#HiddenSiteId").val();
        $.get("/api/Sites/GetSite/" + siteId)
            .done(function (site) {
                if (site != null) {
                    $("#TxtSiteNumberEdit").val(site.SiteNumber);
                    $("#SelectSiteTypeEdit").val(site.SiteType);
                    $("#TxtSiteNameEdit").val(site.SiteName);
                    $("#SelectSitePriorityEdit").val(site.SitePriority);
                    $("#SelectSiteOwnerEdit").val(site.SiteOwnerId);
                    $("#SelectGoveronateEdit").val(site.GevernorateId);
                    $("#SelectDistrictEdit").val(site.DistrictId);
                    $("#TxtBlockNumberEdit").val(site.BlockNumber);
                    $("#TxtBuildingNameEdit").val(site.TxtBuildingName);
                    $("#TxtLatitudeEdit").val(site.Latitude);
                    $("#TxtLongitudeEdit").val(site.Longtitude);


                    var lat = Number(site.Latitude);
                    var log = Number(site.Longtitude);
                    var markerObj = { lat: lat, lng: log };

                    var map;
                    var marker = null;
                    map = new google.maps.Map(document.getElementById('GoogleMapAddMarkerEdit'), {
                        center: { lat: lat, lng: log },
                        zoom: 8,
                        mapTypeId: 'roadmap'
                    });
                    marker = new google.maps.Marker({
                        position: markerObj,
                        map: map
                    });
                    marker.setPosition(markerObj);

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
    componentDidMount() {
        var component = this;
        this.InitializeGoogleMaps();

        $("body").on("click", "button[id^='BtnEditSite_']", function () {
            var siteId = $(this).attr("id").split("_")[1];
            $("#HiddenSiteId").val(siteId);
            component.LoadSite();
        });
        $.get("/api/Sites/GetSiteTypes")
            .done(function (types) {
                var actionsHtml = [];
                if (types != null) {

                    for (var i = 0; i < types.length; i++) {
                        actionsHtml.push(
                            <option value={types[i].Id}>{types[i].Name}</option>
                        );
                    }
                    component.setState({
                        SiteTypes: actionsHtml
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

        $.get("/api/Sites/GetSiteOwners")
            .done(function (owners) {
                var ownersHtml = [];
                if (owners != null) {

                    for (var i = 0; i < owners.length; i++) {
                        ownersHtml.push(
                            <option value={owners[i].OwnerId}>{owners[i].Name}</option>
                        );
                    }
                    component.setState({
                        SiteOwners: ownersHtml
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

        $.get("/api/Sites/GetGoveronates")
            .done(function (goveronates) {
                var goveronatesHtml = [];
                if (goveronates != null) {

                    for (var i = 0; i < goveronates.length; i++) {
                        goveronatesHtml.push(
                            <option value={goveronates[i].Id}>{goveronates[i].Name}</option>
                        );
                    }
                    component.setState({
                        SiteGoveronates: goveronatesHtml
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

        $.get("/api/Sites/GetDistricts")
            .done(function (districts) {
                var districtsHtml = [];
                if (districts != null) {

                    for (var i = 0; i < districts.length; i++) {
                        districtsHtml.push(
                            <option value={districts[i].Id}>{districts[i].Name}</option>
                        );
                    }
                    component.setState({
                        Districts: districtsHtml
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

        $.get("/api/Projects/GetProjectsList")
            .done(function (projects) {
                var projectsHtml = [];
                if (projects != null) {

                    for (var i = 0; i < projects.length; i++) {
                        projectsHtml.push(
                            <option value={projects[i].ProjectId}>{projects[i].ProjectName}</option>
                        );
                    }
                    component.setState({
                        Projects: projectsHtml
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
    render() {
        var mapStyle = {
            width: '100%',
            height: '400px'
        };
        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };
        return (
            <div>
                <div id="editNewSite" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Site</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormEditSite">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Site Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtSiteNumberEdit" name="TxtSiteNumberEdit" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Site Type : *
                                                </td>
                                                <td>
                                                    <select id="SelectSiteTypeEdit" name="SelectSiteTypeEdit" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        {this.state.SiteTypes}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Site Name : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtSiteNameEdit" name="TxtSiteNameEdit" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Site Priority : *
                                                </td>
                                                <td>
                                                    <select id="SelectSitePriorityEdit" name="SelectSitePriorityEdit" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        <option value="1">Average</option>
                                                        <option value="2">Low</option>
                                                        <option value="3">High</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Site Owner : *
                                                </td>
                                                <td>
                                                    <select id="SelectSiteOwnerEdit" name="SelectSiteOwnerEdit" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        {this.state.SiteOwners}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Gevernorate :
                                                </td>
                                                <td>
                                                    <select id="SelectGoveronateEdit" name="SelectGoveronateEdit" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        {this.state.SiteGoveronates}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    District :
                                                </td>
                                                <td>
                                                    <select id="SelectDistrictEdit" name="SelectDistrictEdit" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        {this.state.Districts}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Block Number :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtBlockNumberEdit" name="TxtBlockNumberEdit" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Street Number :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtStreetNumberEdit" name="TxtStreetNumberEdit" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Sub Street Number :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtSubStreetNumberEdit" name="TxtSubStreetNumberEdit" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Building Number :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtBuildingNumberEdit" name="TxtBuildingNumberEdit" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Building Name :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtBuildingNameEdit" name="TxtBuildingNameEdit" className="form-control" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Latituade : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtLatitudeEdit" name="TxtLatitudeEdit" className="form-control" readOnly />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Longitude : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtLongitudeEdit" name="TxtLongitudeEdit" className="form-control" readOnly />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">
                                                    <input type="text" id="TxtSearchGoogleMap2" style={{ width: '50%' }} placeholder="Search Box" />
                                                    <div id="GoogleMapAddMarkerEdit" style={mapStyle}></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.EditSiteData}>Save Site</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<EditSites />,
    document.getElementById("divEditSite"));