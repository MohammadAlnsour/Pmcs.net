
class SiteOwnersTable extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        //alert('site owners render method');
        return (
            <div id="DivSiteOwners" className="DivLookup" style={{ display: 'none' }}>
                <h4>
                    Site owners lookup
                </h4>
                <div>
                    <button className="btn btn-primary btn-fill">Add Item</button>
                </div>
                <br />
                <table className="table">
                    <tbody>
                        <tr>
                            <td>100</td>
                            <td>International Industry company</td>
                            <td>
                                <button className="btn btn-primary btn-fill">Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>101</td>
                            <td>Trade Company Limited</td>
                            <td>
                                <button className="btn btn-primary btn-fill">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );

    }
}
class ServiceTable extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div id="DivServiceLookup" className="DivLookup" style={{ display: 'none' }}>
                <h4>
                    Activity Type lookup
                </h4>
                <div>
                    <button className="btn btn-primary btn-fill">Add Item</button>
                </div>
                <br />
                <table className="table">
                    <tbody>
                        <tr>
                            <td>100</td>
                            <td>Activity Type1</td>
                            <td>
                                <button className="btn btn-primary btn-fill">Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>101</td>
                            <td>Activity Type2</td>
                            <td>
                                <button className="btn btn-primary btn-fill">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


class LookupTablesTree extends React.Component {
    constructor() {
        super();
        this.state = {
            componentName: ""
        };
    }
    componentDidMount() {
        var component = this;
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: true,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pId",
                    rootPId: ""
                }
            },
            callback: {
                beforeClick: function (treeId, treeNode) {
                    var zTree = $.fn.zTree.getZTreeObj("tree");
                    if (treeNode.isParent) {
                        zTree.expandNode(treeNode);
                        return false;
                    } else {
                        component.setState({
                            componentName: treeNode.id
                        });
                        $(".DivLookup").hide();

                        switch (treeNode.id) {
                            case 101:
                                $("#DivSiteOwners").show();
                                break;
                            case 102:
                                $("#DivServiceLookup").show();
                                break;
                            default:
                        }
                        return true;
                    }
                }
            }
        };
        var zNodes = [
            { id: 1, pId: 0, name: "Project Management Module", open: true },
            { id: 101, pId: 1, name: "Activity Status", file: "SiteOwners" },
            { id: 102, pId: 1, name: "Activity Type", file: "SiteOwners" },
            { id: 103, pId: 1, name: "Azimuth Type", file: "SiteOwners" },
            { id: 104, pId: 1, name: "Operations Centers", file: "SiteOwners" },
            { id: 105, pId: 1, name: "Power Types", file: "SiteOwners" },
            { id: 106, pId: 1, name: "Shelter Types", file: "SiteOwners" },
            { id: 107, pId: 1, name: "Site Accessibility", file: "SiteOwners" },
            { id: 108, pId: 1, name: "Sites Areas Names", file: "SiteOwners" },
            { id: 109, pId: 1, name: "Sites Leasers", file: "SiteOwners" },
            { id: 110, pId: 1, name: "Sites Models Types", file: "SiteOwners" },
            { id: 111, pId: 1, name: "Sites Structures Types", file: "SiteOwners" },
            { id: 112, pId: 1, name: "Sites Types", file: "SiteOwners" },
            { id: 113, pId: 1, name: "Structures Types", file: "SiteOwners" },


            { id: 2, pId: 0, name: "Contracts Module", open: true },
            { id: 201, pId: 2, name: "BOQ Model Types", file: "excheck/checkbox" },
            { id: 206, pId: 2, name: "Currencies", file: "excheck/checkbox_nocheck" },
            { id: 207, pId: 2, name: "Departments", file: "excheck/checkbox_chkDisabled" },
            { id: 208, pId: 2, name: "Districts", file: "excheck/checkbox_halfCheck" },
            { id: 202, pId: 2, name: "Expenses Types", file: "excheck/checkbox_count" },
            { id: 203, pId: 2, name: "Governorates", file: "excheck/checkbox_fun" },
            { id: 204, pId: 2, name: "Jobs Types", file: "excheck/checkbox_fun" },
            { id: 205, pId: 2, name: "PAT Status Types", file: "excheck/checkbox_fun" },
            { id: 206, pId: 2, name: "PO Classifications", file: "excheck/checkbox_fun" },
            { id: 207, pId: 2, name: "POs Payable Types", file: "excheck/checkbox_fun" },
            { id: 208, pId: 2, name: "PO Types", file: "excheck/checkbox_fun" },


            { id: 3, pId: 0, name: "Finicial Module", open: true },
            { id: 301, pId: 3, name: "Financial Invoices Types", file: "exedit/drag" },
            { id: 302, pId: 3, name: "Invoices Classification Types", file: "exedit/drag_super" },
            { id: 303, pId: 3, name: "Payment Methods", file: "exedit/drag_fun" },
            { id: 304, pId: 3, name: "Workflow Actions", file: "exedit/edit" },
            { id: 305, pId: 3, name: "Workflow Rejection Reasons", file: "exedit/edit" },

            { id: 4, pId: 0, name: "Ticket Module", open: true },
            { id: 401, pId: 4, name: "Tickets Modules", file: "bigdata/common" },
        ];
        var t = $("#tree");
        t = $.fn.zTree.init(t, setting, zNodes);
    }

    render() {

        var divStyle = {
            width: '100%',
            overflow: 'auto'
        };

        return (
            <table style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td style={{ width: '20%' }}>
                            <ul id="tree" className="ztree" style={divStyle}></ul>
                        </td>
                        <td style={{ verticalAlign: 'top' }}>
                            <SiteOwnersTable />
                            <ServiceTable />
                        </td>
                    </tr>
                </tbody>
            </table>
        );

    }
}


ReactDOM.render(
    <LookupTablesTree />,
    document.getElementById("TreeNodesContrainer"));
