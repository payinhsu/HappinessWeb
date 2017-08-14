import React from 'react';
// import Dialog from 'material-ui/lib/dialog';
// import FlatButton from 'material-ui/lib/flat-button';
// import RaisedButton from 'material-ui/lib/raised-button';
// import RadioButton from 'material-ui/lib/radio-button';
// import RadioButtonGroup from 'material-ui/lib/radio-button-group';
// import Checkbox from 'material-ui/lib/checkbox';
// import Divider from 'material-ui/lib/divider';
import { Modal, Button, Image} from 'react-bootstrap';

// const styles = {
//   radioButton: {
//     marginTop: 10,
//     marginRight: 10,
//   },
// };

/**
 * imput model: [{value:'..', name:'..', checked: boolean}, ..]
 */
export default class SelectCityZip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      cities: props.cities,
      defaultChecked: props.defaultChecked,
      city: props.cities[0],
      cityId: props.cities[0].id
    };
    // console.log(this.state.defaultChecked) ;
  }

  componentWillReceiveProps = newProps => {
    this.setState({
      open: newProps.open,
      cities: newProps.cities, 
      defaultChecked: newProps.defaultChecked,
      city:newProps.cities[0],
      cityId: newProps.cities[0].id
    });
    // console.log(this.state.defaultChecked) ;
  };

  handleClose = () => {
    this.setState({open: false});
    this.props.onRequestClose();
  };

  handleZipsCheck = (itemId, itemName, e) => {
    // console.log(`${itemName} ${itemId} checked: ${e.target.checked}`);
    const checked = e.target.checked;
    if(checked) 
        this.state.defaultChecked.push({"id":itemId , "name":itemName, checked:e.target.checked});  
    else 
        this.state.defaultChecked.splice(this.state.defaultChecked.indexOf( this.state.defaultChecked.find(dzip => dzip.id == itemId) ), 1);
    this.setState({defaultChecked: this.state.defaultChecked}) ;
    // console.log("defaultChecked : " + JSON.stringify(this.state.defaultChecked));
  };

  handleConfirm = () => {
    let selectModels = this.state.defaultChecked ; //.map(zip => zip.id);
    this.props.onConfirm(selectModels);
    this.handleClose();
  };
  handleCityChange = (e) => {
    // console.log(e.target.value) ;
    let city = this.state.cities.find(city => city.id === e.target.value) ;
    this.setState({city: city}) ;
    this.setState({cityId: city.id});
    // console.log(JSON.stringify(this.state.city)) ;
  };
  handleCheckDisabled = (zipId) => {
    // console.log("Have to check : " + zipId) ;
    let isTrue = this.state.defaultChecked.find(dzip => dzip.id === this.state.cityId) !== undefined && zipId !== this.state.cityId ;
    // console.log(isTrue) ;
    if(isTrue) {
        let index = this.state.defaultChecked.indexOf( this.state.defaultChecked.find(dzip => dzip.id == zipId) ) ;
        // console.log("index : " + index ) ;
        if(index !== -1) {
          this.state.defaultChecked.splice(index, 1) ;
        }
    }
    // console.log("defaultChecked : " + JSON.stringify(this.state.defaultChecked));
    return isTrue ;
  };
  handleCheckZipCheck = (zipId) => {
    let isTrue = this.state.defaultChecked.find(dzip => dzip.id === zipId) != undefined ;
    return isTrue ;
  };
  cleanAll = () => {
    this.setState({defaultChecked : []});
  };
  render() {
    //console.log(JSON.stringify(this.state.city)) ;
    // const actions = [
    //   <FlatButton
    //     label="取消"
    //     primary={true}
    //     onTouchTap={this.handleClose}
    //   />,
    //   <FlatButton
    //     label="確認"
    //     primary={true}
    //     keyboardFocused={true}
    //     onTouchTap={this.handleConfirm}
    //   />,
    // ];

    const checkboxes = this.state.city.zips.map((zip,index)  => 
      <label key={`checkboxes_${index}`}>
        <input 
          type="checkbox"
          onChange={this.handleZipsCheck.bind(this, zip.id, zip.name)}
          disabled={this.handleCheckDisabled(zip.id)}
          checked={this.handleCheckZipCheck(zip.id)}
          //style={styles.radioButton}
        />
        {zip.name}
      </label>
    );

    const checkedboxes = this.state.defaultChecked.map((zip,index) =>
      <label key={`checkedboxes_${index}`}>
        <input 
          type="checkbox"
          checked={zip.checked}
          onChange={this.handleZipsCheck.bind(this, zip.id, zip.name)}
          //style={styles.radioButton}
        />
        {zip.name}
      </label>
    );
    const layerSelect = (
      <select value={this.state.city.id} onChange={this.handleCityChange}>
        {this.state.cities.map((city, index) =>
          <option value={city.id} key={`city${index}`}>{city.name}</option>
        )}
      </select>
      );

    return (
       // <Dialog
        //   title="請選擇"
        //   actions={actions}
        //   modal={false}
        //   open={this.state.open}
        //   onRequestClose={this.handleClose}
        //   autoScrollBodyContent={true}
        // >
        // </Dialog>
        // <Divider />
      <div>
       
        <Modal
            show={this.state.open}
            onHide={this.handleClose}
            bsSize="lg">
            <Modal.Header closeButton>
                <Modal.Title><p>請選擇</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
        <h4>已選項目 {this.state.defaultChecked.length > 0 ? <button onClick={this.cleanAll}>全部清除</button> :''}</h4>
        {checkedboxes}
        
        <h4>分類選單</h4>
        {layerSelect}
        <h4>可選項目</h4>
        {checkboxes}
        <div>
          <button onClick={this.handleConfirm}>確認</button>
        </div>
        </Modal.Body>
        </Modal>
        
      </div>
    );
  }
}