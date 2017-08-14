import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import moment from 'moment';

// self not main insurant
export default class SelfInsurantView extends React.Component {
	componentDidMount() {
  	};

    toInsurant = (model) => {
        this.props.toUpdateInsurantSelf(model);
    } ;

	render() {
		const { notMainIns, definition } = this.props;
		if(notMainIns) {
            return (
                <div>
                    {notMainIns.map((model,index) => 
                        <div className="box" key={`div_${index}`}>
                        <table key={`table_${index}`}>
                            <tbody>
                            <tr>
                                <td>公司保障對象</td>
                                <td>
                                    <a key={`self_${model.id}_link_${index}`} href="javascript:void(0);" 
                                       onClick={this.toInsurant.bind(this, model)}>
                                        {model.name}
                                    </a>
                                </td>
                                <td>關係</td><td>{model.relationshipName}</td>
                                <td>出生年月日</td><td>{ moment(model.birthDate).format("YYYY-MM-DD")}</td>
                            </tr>
                            <tr>
                                <td>身高</td><td>{model.height}</td>
                                <td>體重</td><td>{model.weight}</td>
                                <td>&nbsp;</td><td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>目前現有慢性疾病</td>
                                <td colSpan="5">
                                    { model.diseaseIds.map((dis,index) => 
                                        definition.diseases.find(d => d.id === dis).name).join(', ')
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
	}
}

