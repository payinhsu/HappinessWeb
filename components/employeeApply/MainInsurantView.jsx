import React, { PropTypes } from 'react';
import moment from 'moment';

// company main insurant
export default class MainInsurantView extends React.Component {

	componentDidMount() {
  	};

    toInsurant = (mainIns) => {
        this.props.toUpdateMainInsurant(mainIns);
    } ;

	render() {
		const { mainIns, definition } = this.props;

		if(mainIns) {
            return (
                <div className="box">
                    <table>
                        <tbody>
                        <tr>
                            <td>公司保障對象</td>
                            <td>
                                <a href="javascript:void(0);" 
                                  onClick={this.toInsurant.bind(this, mainIns)}>
                                    {mainIns.name}
                                </a>
                            </td>
                            <td>關係</td><td>{mainIns.relationshipName}</td>
                            <td>出生年月日</td><td>{ moment(mainIns.birthDate).format("YYYY-MM-DD")}</td>
                        </tr>
                        <tr>
                            <td>身高</td><td>{mainIns.height}</td>
                            <td>體重</td><td>{mainIns.weight}</td>
                            <td>&nbsp;</td><td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>目前現有慢性疾病</td>
                            <td colSpan="5">
                                { mainIns.diseaseIds.map((dis,index) => 
                                    definition.diseases.find(d => d.id === dis).name).join(', ')
                                }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="box"></div>
            );
        }
	}
}

