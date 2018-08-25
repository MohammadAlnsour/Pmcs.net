

class InventoryItemsTreeTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            InventoryItems: "",
        };
        this.LoadInventoryItemsTreeTable = this.LoadInventoryItemsTreeTable.bind(this);
    }
    LoadInventoryItemsTreeTable() {
        var component = this;
        var InventoryId = $("#HiddenInventoryId").val();
        if (InventoryId > 0) {
            $.get("/api/Assets/GetInventoryItemsRootNodes/" + InventoryId)
                .done(function (rootNodes) {
                    var allItemsRows = [];
                    for (var i = 0; i < rootNodes.length; i++) {
                        allItemsRows.push(
                            <tr id={rootNodes[i].ItemId} data-tt-id={rootNodes[i].DataTTId} data-tt-parent-id={rootNodes[i].DataTTParentId}>
                                <td>
                                    {rootNodes[i].ItemDescription}
                                </td>
                                <td>
                                    {rootNodes[i].CategoryName}
                                </td>
                                <td>
                                    {rootNodes[i].InventoryQuantity}
                                </td>
                                <td>
                                    {rootNodes[i].ManufacturerName}
                                </td>
                                <td>
                                    {rootNodes[i].PartNumber}
                                </td>
                                <td>
                                    {rootNodes[i].SerialNumber}
                                </td>
                                <td>
                                    <button id={"BtnEdit_" + rootNodes[i].ItemId} className="btn btn-primary btn-xs">
                                        <i className="fa fa-pencil-square-o"></i>
                                        Edit Item
                                    </button>
                                    &nbsp;
                                    
                                </td>
                            </tr>
                        );
                    }
                    component.setState({
                        InventoryItems: allItemsRows
                    });
                    $("#TableTreeTable").treetable({ expandable: true, initialState: "expanded" }, true);
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
    }
    componentDidMount() {
        var component = this;
        this.LoadInventoryItemsTreeTable(this);
        $("#TableTreeTable").treetable({ expandable: true, initialState: "expanded" }, true);
    }
    render() {

        var modalStyle = {
            maxHeight: 'calc(100vh - 50px)',
            overflowY: 'auto'
        };

        return (
            <div>
                <table id="TableTreeTable" className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Manufacturer</th>
                            <th>Part Number</th>
                            <th>Serial Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.InventoryItems}
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(<InventoryItemsTreeTable />,
    document.getElementById("DivInventoryItems"));