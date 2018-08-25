
class MainTabsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#ServerSettings">Server Settings</a></li>
                    <li><a data-toggle="tab" href="#AccountSettings">Account Settings</a></li>
                    <li><a data-toggle="tab" href="#EmailTemplates">EmailTemplates</a></li>
                </ul>
                <div className="tab-content">
                    <ServerSettingsComponent />
                    <AccountSettingsComponent />
                    <EmailsTemplatesComponent />
                </div>
            </div>
        );
    }
}

class ServerSettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.GetModules = this.GetModules.bind(this);
    }
    LoadSmtpServer() {
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
    }
    componentDidMount() {

    }
    render() {
        return (
            <div id="ServerSettings" className="tab-pane fade in active">
                <h3>Server Settings</h3>
                <form id="FormServerSettings" name="FormServerSettings">
                    <table className="table" style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '20%' }}>SMTP Server *</td>
                                <td style={{ width: '50%' }}>
                                    <input type="text" id="TxtSmtpServer" name="TxtSmtpServer" className="form-control border-input" placeholder="SMTP server" required />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ width: '20%' }}>Port Number *</td>
                                <td style={{ width: '50%' }}>
                                    <input type="text" id="TxtPortNumber" name="TxtPortNumber" className="form-control border-input" placeholder="Port number" required />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ width: '20%' }}>Enable SSL</td>
                                <td style={{ width: '50%' }}>
                                    <select className="form-control border-input" id="SelectEnableSSL" name="SelectEnableSSL">
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <button id="BtnSaveMailServerSettings" className="btn btn-info btn-fill btn-wd" style={{ float: 'right' }}>Update Server Settings</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}
class AccountSettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="AccountSettings" className="tab-pane fade">
                <h3>Account Settings</h3>
                <form id="FormAccountSettings" name="FormAccountSettings">
                    <table className="table" style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '20%' }}>From *</td>
                                <td style={{ width: '50%' }}>
                                    <input type="text" id="TxtFromEmail" name="TxtFromEmail" className="form-control border-input" placeholder="from email" required />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ width: '20%' }}>Email Account Email *</td>
                                <td style={{ width: '50%' }}>
                                    <input type="text" id="TxtEmailUser" name="TxtEmailUser" className="form-control border-input" placeholder="Account Email" required />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ width: '20%' }}>Email Account Password *</td>
                                <td style={{ width: '50%' }}>
                                    <input type="password" id="TxtEmailPassword" name="TxtEmailPassword" className="form-control border-input" placeholder="Email Account Password" required />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <button id="BtnSaveAccountSettings" className="btn btn-info btn-fill btn-wd" style={{ float: 'right' }}>Update Account Settings</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}
class EmailsTemplatesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="EmailTemplates" className="tab-pane fade">
                <h3>Email Templates</h3>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
            </div>
        );
    }
}

ReactDOM.render(
    <MainTabsContainer />,
    document.getElementById("Maincontentcontainer"));