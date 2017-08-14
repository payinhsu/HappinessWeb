import React, { PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';
// import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/lib/table';
import _ from 'lodash';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';

export default class PopUpMemberTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.openPopUp,
            excelDataGrid: props.excelDataGrid,
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '500px'
        };
    }

    componentWillReceiveProps = newProps => {
        if(this.props.excelDataGrid !== newProps.excelDataGrid){
            this.setState({
                excelDataGrid:newProps.excelDataGrid,
                open:!_.isEmpty(newProps.excelDataGrid)
            });
        }
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.requestClose();
    };

    handleConfirm = () => {
        this.props.sendConfirm(this.state.excelDataGrid);
        this.handleClose();
    };

    render() {
        const tableData = this.state.excelDataGrid;
        const employeesData = {};
        //將tableData陣列轉符合的object格式
        for (let i = 0; i < tableData.length; i++) {
            let key =  "";
            let value = "";
            let employeesSubData = new Object();
            for (let j = 0; j < tableData[i].length; j++) {
                key = tableData[i][j][0];
                value = tableData[i][j][1];
                employeesSubData[key] = value;
            }
            employeesData[i] = employeesSubData;
        }
        //將object轉成bootstrap-table可以吃的格式的陣列
        const employeesAry = [];
        for (let key1 in employeesData) {
            employeesAry.push(employeesData[key1]);
        }
        return (
            // (!_.isEmpty(tableData) && tableData[0][0][0] === "errorCount") ?
            //     <div className="modal-container">
            //         <Modal
            //             show={this.state.open}
            //             onHide={this.handleClose}
            //             container={this}
            //             bsSize="large" aria-labelledby="contained-modal-title-lg"
            //         >
            //             <Modal.Header closeButton>
            //                 <Modal.Title id="contained-modal-title-lg">匯入員工資料失敗</Modal.Title>
            //             </Modal.Header>
            //             <Modal.Body>
            //                 <div>
            //                     匯入資料，成功{tableData[0][1][1]}筆，失敗{tableData[0][0][1]}筆有重複/錯誤，
            //                     請重新檢視您上傳的檔案。
            //                 </div>
            //             </Modal.Body>
            //             <Modal.Footer>
            //                 <Button onClick={this.handleClose}>確定</Button>
            //             </Modal.Footer>
            //         </Modal>
            //     </div>
            // :
            <div className="modal-container">
                <Modal
                    show={this.state.open}
                    onHide={this.handleClose}
                    container={this}
                    bsSize="large" aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">員工資料確認</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            _.isEmpty(employeesAry) ? '' :
                            <BootstrapTable data={ employeesAry }>
                                <TableHeaderColumn dataField="*員編" isKey={ true }>員編</TableHeaderColumn>
                                <TableHeaderColumn dataField="*姓">姓</TableHeaderColumn>
                                <TableHeaderColumn dataField="*名">名</TableHeaderColumn>
                                <TableHeaderColumn dataField="*性別">性別</TableHeaderColumn>
                                <TableHeaderColumn dataField="*公司電話">公司電話</TableHeaderColumn>
                                <TableHeaderColumn dataField="*分機">分機</TableHeaderColumn>
                                <TableHeaderColumn dataField="*行動電話">行動電話</TableHeaderColumn>
                                <TableHeaderColumn dataField="*Mail">Mail</TableHeaderColumn>
                                <TableHeaderColumn dataField="*到職日">到職日</TableHeaderColumn>
                            </BootstrapTable>
                            /*
                            <Table
                                height={this.state.height}
                                fixedHeader={this.state.fixedHeader}
                                fixedFooter={this.state.fixedFooter}
                                selectable={this.state.selectable}
                                multiSelectable={this.state.multiSelectable}
                                bodyStyle={{overflow: 'visible'}}
                            >
                                <TableHeader
                                    displaySelectAll={this.state.showCheckboxes}
                                    adjustForCheckbox={this.state.showCheckboxes}
                                    enableSelectAll={this.state.enableSelectAll}
                                >
                                    <TableRow>
                                        <TableHeaderColumn style={{width: '50'}}>員編</TableHeaderColumn>
                                        <TableHeaderColumn style={{width: '50'}}>姓</TableHeaderColumn>
                                        <TableHeaderColumn style={{width: '50'}}>名</TableHeaderColumn>
                                        <TableHeaderColumn style={{width: '50'}}>性別</TableHeaderColumn>
                                        <TableHeaderColumn style={{width: '50'}}>公司電話</TableHeaderColumn>
                                        <TableHeaderColumn style={{width: '50'}}>分機</TableHeaderColumn>
                                        <TableHeaderColumn style={{width: '50'}}>行動電話</TableHeaderColumn>
                                        <TableHeaderColumn style={{width: '100'}}>Mail</TableHeaderColumn>
                                        <TableHeaderColumn style={{width: '50'}}>到職日</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={this.state.showCheckboxes}
                                    deselectOnClickaway={this.state.deselectOnClickaway}
                                    showRowHover={this.state.showRowHover}
                                    stripedRows={this.state.stripedRows}
                                >
                                    {_.isEmpty(tableData) ? '' : tableData.map((row, index) => (
                                        <TableRow style={{overflow: 'visible'}}>
                                            <TableRowColumn style={{width: '50' ,textAlign: 'left', overflow: 'visible'}}>{row[0][1]}</TableRowColumn>
                                            <TableRowColumn style={{width: '50' ,textAlign: 'left', overflow: 'visible'}}>{row[1][1]}</TableRowColumn>
                                            <TableRowColumn style={{width: '50' ,textAlign: 'left', overflow: 'visible'}}>{row[2][1]}</TableRowColumn>
                                            <TableRowColumn style={{width: '50' ,textAlign: 'left', overflow: 'visible'}}>{row[3][1]}</TableRowColumn>
                                            <TableRowColumn style={{width: '50' ,textAlign: 'left', overflow: 'visible'}}>{row[4][1]}</TableRowColumn>
                                            <TableRowColumn style={{width: '50' ,textAlign: 'left', overflow: 'visible'}}>{row[5][1]}</TableRowColumn>
                                            <TableRowColumn style={{width: '50' ,textAlign: 'left', overflow: 'visible'}}>{row[6][1]}</TableRowColumn>
                                            <TableRowColumn style={{width: '100' ,textAlign: 'left', overflow: 'visible'}}>{row[7][1]}</TableRowColumn>
                                            <TableRowColumn style={{width: '50' ,textAlign: 'left', overflow: 'visible'}}>{row[8][1]}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            */
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{float: "left"}}>
                            確認後，系統將自動發出邀請員工填報保障對象信函至該員的電子信箱。
                        </div>
                        <div style={{clear: "left",float:"left"}}>
                            重新整理EXCEL
                        </div>
                        <div>
                            <Button onClick={this.handleClose}>取消</Button>
                            <Button onClick={this.handleConfirm}>確認</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}