import React, { PropTypes, input, select} from 'react';
import { reduxForm, Field } from 'redux-form';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';

const renderInput = ({ input, label, type, meta: {touched, invalid, error }}) => (
    <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
        <label>{label}</label>
        <input {...input} type={type}/>
        <div className="text-help" style={{float:'right',color: 'red'}}>
            { touched ? error : '' }
        </div>
    </div>
);

const renderDatePicker = ({ input, meta: { touched, invalid, error }, ...custom }) => {
    return (
        <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
            <DatePicker
                onChange={(e, val) => {return input.onChange(val)}}
                {...custom}
                value={input.value ? input.value : moment().format()}
                dateFormat="YYYY-MM-DD"
                showClearButton={false}
            />
            <div className="text-help" style={{float:'right',color: 'red'}}>
                { touched ? error : '' }
            </div>
        </div>
    );
}

class SelectEmployeesForm extends React.Component {
    static propTypes = {
        keyword: PropTypes.object.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            dateLabel: '到職日期',
            status: 'ALL'
        };
    };

    findEm = (data) => {
        const {change} = this.props;
        let enterpriseId = this.props.auth.employee.companyId;
        let input = [];
        let status = this.state.status;
        //若有操作status要先抓到status值供下面如有操作date去判斷
        Object.keys(data).map((key) => {
            if(key == 'status'){
                status = data[key];
                this.props.dispatch(change('status','ALL'));
            }
        });
        Object.keys(data).map((key) => {
                if(key == 'keyword' && data[key].length > 0) {
                    input.push("\"keyword\":\""+data[key]+"\"");
                    this.props.dispatch(change('keyword',''));
                }
                if(status != 'INVALID' && key == 'onBoardDateStart' && data[key].length > 0){
                    input.push("\"onBoardDateStart\":"+moment(data[key], "YYYY-MM-DD").valueOf());
                }
                if(status != 'INVALID' && key == 'onBoardDateEnd' && data[key].length > 0){
                    input.push("\"onBoardDateEnd\":"+moment(data[key], "YYYY-MM-DD").valueOf());
                }
                if(status == 'INVALID' && key == 'leaveDateStart' && data[key].length > 0){
                    input.push("\"leaveDateStart\":"+moment(data[key], "YYYY-MM-DD").valueOf());
                }
                if(status == 'INVALID' && key == 'leaveDateEnd' && data[key].length > 0) {
                    input.push("\"leaveDateEnd\":"+moment(data[key], "YYYY-MM-DD").valueOf());
                }
            }
        );
        input.push("\"status\":\""+status+"\"");
        let inputStr = "{" + input.join() + "}";
        this.props.actions.getEnterpriseEmployees(enterpriseId, inputStr).then(() => {
                this.props.dispatch(change('onBoardDateStart', ''));
                this.props.dispatch(change('onBoardDateEnd', ''));
                this.props.dispatch(change('leaveDateStart', ''));
                this.props.dispatch(change('leaveDateEnd', ''));
                this.setState({
                    dateLabel: '到職日期',
                    status: 'ALL'
                });
            }
        );
    };

    render() {
        const statusMap = {
            "ALL":"全部",
            "VALID":"保障中",
            "INVALID":"停權"
        };
        const {handleSubmit, openAddEmployeePopUp } = this.props;

        return (
            <form onSubmit={handleSubmit(this.findEm.bind(this))} onChange={(e)=>{
                const { name, value } = e.target;
                if(name == 'status' && value == 'INVALID') {
                    this.setState({dateLabel : "離職日期",status : value});
                }else{
                    this.setState({dateLabel : "到職日期",status : value});
                }
            }}>
                <div>
                    <label>員工資料：</label>
                    <Field name="status" component="select">
                        {
                            Object.keys(statusMap).map((key)=>
                                (<option value={key}>{statusMap[key]}</option>)
                            )
                        }
                    </Field>
                    <Field
                        name="keyword"
                        type="text"
                        component={renderInput} />
                    {this.state.dateLabel}
                    <Field name={this.state.status == 'INVALID' ? "leaveDateStart" : "onBoardDateStart"} component={renderDatePicker}/>
                    <Field name={this.state.status == 'INVALID' ? "leaveDateEnd" : "onBoardDateEnd"} component={renderDatePicker}/>
                </div>
                <div>
                    <button type="submit" className="btn-default btn-orange">查詢</button>
                    <a href="javascript:void(0);" onClick={openAddEmployeePopUp}>
                        <img src="/resource/add.png" alt="新增"/>
                    </a>
                </div>
            </form>
        );
    }
}

const validateSelectOneEmployee = (values) => {
    const errors = {};
    if (values.status != 'INVALID' && values.onBoardDateStart && values.onBoardDateEnd) {
        if(moment(values.onBoardDateEnd, "YYYY-MM-DD").valueOf() < moment(values.onBoardDateStart, "YYYY-MM-DD").valueOf()){
            errors.onBoardDateStart = '到職起始日需小於或等於到職終止日';
        }
    }
    if (values.status != 'INVALID' && values.onBoardDateStart && values.onBoardDateEnd) {
        if(moment(values.onBoardDateEnd, "YYYY-MM-DD").valueOf() < moment(values.onBoardDateStart, "YYYY-MM-DD").valueOf()){
            errors.onBoardDateEnd = '到職起始日需小於或等於到職終止日';
        }
    }
    return errors;
}

export default reduxForm({
    form: 'selectOneEmployee',
    validate:validateSelectOneEmployee,
    touchOnChange: true // react DatePicker doesn't blur
})(SelectEmployeesForm);