import React from "react";
import moment from 'moment';



class Cell extends React.Component{
   constructor(props){
	    super(props);
        this.state={
    
        }
        this.renderCell=this.renderCell.bind(this)
    }   

    renderCell() {
        const {value,rowData,columnData} = this.props
        if(columnData['html']){
            return (
                <div dangerouslySetInnerHTML={{ __html: value }} />
            )
        }else if(columnData['numeric']){
            return (
                <div>
                    {value}
                </div>
            )
        }else if(columnData['isDate']){
            let date = moment(value).format('Do MMMM YYYY')
            return (
                <div>
                    {date}
                </div>
            )
        }else{
            return (
                <div>
                    {value}
                </div>
            )
        }
    }

	render() {
        // console.log(this.props)
		return(
            <div>
                {this.renderCell()}
            </div>
		)
	}
}

export default Cell;