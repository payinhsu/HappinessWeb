import React, { PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';
import _ from 'lodash';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';

export default class PopUpGiverTable extends React.Component {

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
        const careGiversData = {};
        //將tableData陣列轉符合的object格式
        for (let i = 0; i < tableData.length; i++) {
            let key =  "";
            let value = "";
            let careGiversSubData = new Object();
            let name = "";
            for (let j = 0; j < tableData[i].length; j++) {
                key = tableData[i][j][0];
                if(key === '*姓') {
                    name += tableData[i][j][1];
                    continue;
                }else if(key === '*名') {
                    name += tableData[i][j][1];
                    careGiversSubData['*姓名'] = name;
                }else{
                    value = tableData[i][j][1];
                    careGiversSubData[key] = value;
                }
            }
            careGiversData[i] = careGiversSubData;
        }
        //將object轉成bootstrap-table可以吃的格式的陣列
        const careGiversAry = [];
        for (let key1 in careGiversData) {
            careGiversAry.push(careGiversData[key1]);
        }
        return (
            <div className="modal-container">
                <Modal
                    show={this.state.open}
                    onHide={this.handleClose}
                    container={this}
                    bsSize="large" aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">新增批次管家確認</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            _.isEmpty(careGiversAry) ? '' :
                                <BootstrapTable data={ careGiversAry }>
                                    <TableHeaderColumn dataField="*姓名" isKey={ true }>管家姓名</TableHeaderColumn>
                                    <TableHeaderColumn dataField="*服務年資">服務年資</TableHeaderColumn>
                                    <TableHeaderColumn dataField="*服務時數">服務時數</TableHeaderColumn>
                                    <TableHeaderColumn dataField="*行動電話">行動電話</TableHeaderColumn>
                                    <TableHeaderColumn dataField="*Mail">E-mail</TableHeaderColumn>
                                    <TableHeaderColumn dataField="*服務地區">服務地區</TableHeaderColumn>
                                    <TableHeaderColumn dataField="*證書">證書</TableHeaderColumn>
                                    <TableHeaderColumn dataField="*專長">專長</TableHeaderColumn>
                                </BootstrapTable>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{float: "left"}}>
                            確認後，系統將自動發出邀請照顧管家驗證啟用信函至該員的電子信箱。
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