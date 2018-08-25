
class SitesList extends React.Component {

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
        this.OpenAddNewSiteModal = this.OpenAddNewSiteModal.bind(this);
        this.SaveSiteData = this.SaveSiteData.bind(this);
        this.ClearUpForm = this.ClearUpForm.bind(this);
        this.InitializeGoogleMaps = this.InitializeGoogleMaps.bind(this);
    }
    InitializeGoogleMaps() {

        var map;
        marker = null;
        map = new google.maps.Map(document.getElementById('GoogleMapAddMarker'), {
            center: { lat: 24.747246997895175, lng: 46.68365478515625 },
            zoom: 8,
            mapTypeId: 'roadmap'
        });

        var input = document.getElementById('TxtSearchGoogleMap1');
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
            document.getElementById('TxtLatitude').value = event.latLng.lat();
            document.getElementById('TxtLongitude').value = event.latLng.lng();
        });
    }
    CloseModal() {
        $("#addNewSite").modal("hide");
    }
    OpenAddNewSiteModal() {
        $("#addNewSite").modal("show");
    }
    ClearUpForm() {
        $("#TxtSiteNumber").val("");
        $("#SelectSiteType").val("");
        $("#SelectSitePriority").val("");
        $("#SelectSiteOwner").val("");
        $("#SelectGoveronate").val("");
        $("#SelectDistrict").val("");
        $("#TxtBlockNumber").val("");
        $("#TxtStreetNumber").val("");
        $("#TxtSubStreetNumber").val("");
        $("#TxtBuildingNumber").val("");
        $("#TxtBuildingName").val("");
        $("#TxtSiteName").val("");
        $("#SelectProject").val("");
        $("#SelectTasks").val("");
    }
    SaveSiteData() {
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
        $('#FormAddSite').validate({
            rules: {
                TxtSiteNumber: {
                    required: true,
                    maxlength: 50,
                    minlength: 1
                },
                SelectSiteType: {
                    required: true
                },
                TxtSiteName: {
                    required: true,
                    maxlength: 100,
                    minlength: 4
                },
                SelectSitePriority: {
                    required: true
                },
                SelectSiteOwner: {
                    required: true
                },
                SelectProject: {
                    required: true
                },
                TxtLatitude: {
                    required: true
                },
                TxtLongitude: {
                    required: true
                },
            },
            messages: {
                TxtSiteNumber: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 1 characters.",
                    maxlength: "This field should not exceeds 50 characters"
                },
                SelectSiteType: {
                    required: "Please enter this required field."
                },
                TxtSiteName: {
                    required: "Please enter this required field.",
                    minlength: "This field should contain at least 4 characters.",
                    maxlength: "This field should not exceeds 100 characters"
                },
                SelectSitePriority: {
                    required: "Please enter this required field."
                },
                SelectSiteOwner: {
                    required: "Please enter this required field."
                },
                SelectProject: {
                    required: "Please enter this required field."
                },
                TxtLatitude: {
                    required: "Please enter this required field."
                },
                TxtLongitude: {
                    required: "Please enter this required field."
                },
            },
            errorElement: 'div',
            errorPlacement: function (errorlabel, element) {
                //$(error).css({ color: "red" });
                //var placement = $(element).data('error');
                //if (placement) {
                //    $(placement).append(error);
                //} else {
                //    error.insertAfter(element);
                //}
                errorlabel.addClass("alert bg-danger");
                $(errorlabel).css({ position: "fixed" });
                errorlabel.insertAfter(element);
            }
        });

        if ($("#FormAddSite").valid()) {

            var settings = {
                method: "POST",
                url: "/api/Sites/PostSite",
                contentType: "application/json",
                data: JSON.stringify({
                    SiteNumber: $("#TxtSiteNumber").val(),
                    SiteType: $("#SelectSiteType").val(),
                    SitePriority: $("#SelectSitePriority").val(),
                    Latitude: $("#TxtLatitude").val(),
                    Longtitude: $("#TxtLongitude").val(),
                    SiteOwnerId: $("#SelectSiteOwner").val(),
                    GevernorateId: $("#SelectGoveronate").val(),
                    DistrictId: $("#SelectDistrict").val(),
                    BlockNumber: $("#TxtBlockNumber").val(),
                    StreetNumber: $("#TxtStreetNumber").val(),
                    SubStreetNumber: $("#TxtSubStreetNumber").val(),
                    BuildingNumber: $("#TxtBuildingNumber").val(),
                    BuildingName: $("#TxtBuildingName").val(),
                    SiteName: $("#TxtSiteName").val(),
                    IsActive: true
                }),
            };
            $.ajax(settings)
                .done(function (res) {
                    $("#divSitesList").html(res);
                    $("#addNewSite").modal("hide");
                    component.ClearUpForm();

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
    componentDidMount() {
        var component = this;
        this.InitializeGoogleMaps();

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
                <button className="btn btn-primary" id="BtnAddNewSite" onClick={this.OpenAddNewSiteModal}>
                    <i className="fa fa-plus-circle"></i>&nbsp;
                    Add New Site
                </button>

                <div id="addNewSite" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" style={modalStyle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Site</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="FormAddSite">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>
                                                    Site Number : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtSiteNumber" name="TxtSiteNumber" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Site Type : *
                                                </td>
                                                <td>
                                                    <select id="SelectSiteType" name="SelectSiteType" className="form-control">
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
                                                    <input type="text" id="TxtSiteName" name="TxtSiteName" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Site Priority : *
                                                </td>
                                                <td>
                                                    <select id="SelectSitePriority" name="SelectSitePriority" className="form-control">
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
                                                    <select id="SelectSiteOwner" name="SelectSiteOwner" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        {this.state.SiteOwners}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Gevernorate :
                                                </td>
                                                <td>
                                                    <select id="SelectGoveronate" name="SelectGoveronate" className="form-control">
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
                                                    <select id="SelectDistrict" name="SelectDistrict" className="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        {this.state.Districts}
                                                    </select>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Block Number :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtBlockNumber" name="TxtBlockNumber" className="form-control" />
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
                                                    <input type="text" id="TxtStreetNumber" name="TxtStreetNumber" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Sub Street Number :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtSubStreetNumber" name="TxtSubStreetNumber" className="form-control" />
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
                                                    <input type="text" id="TxtBuildingNumber" name="TxtBuildingNumber" className="form-control" />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Building Name :
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtBuildingName" name="TxtBuildingName" className="form-control" />
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
                                                    <input type="text" id="TxtLatitude" name="TxtLatitude" className="form-control" readOnly />
                                                </td>
                                                <td>&nbsp;</td>
                                                <td style={{ width: '15%' }}>
                                                    Longitude : *
                                                </td>
                                                <td>
                                                    <input type="text" id="TxtLongitude" name="TxtLongitude" className="form-control" readOnly />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    &nbsp;
                                            </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">
                                                    <input type="text" id="TxtSearchGoogleMap1" style={{ width: '50%' }} placeholder="Search Box" />
                                                    <div id="GoogleMapAddMarker" style={mapStyle}></div>
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
                                <button type="button" className="btn btn-primary" onClick={this.SaveSiteData}>Save Site</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.CloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<SitesList />,
    document.getElementById("divAddSite"));