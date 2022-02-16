import React from "react";
import axios from 'axios';

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Cell from "../../Components/Cell";
import TextField from '@material-ui/core/TextField';



const columns = [
    {
      id: 'name',
      numeric: false,
      html:false,
      isDate:false,
      disablePadding: true,
      label: 'Package Name',
    },
    {
      id: 'version',
      numeric: true,
      html:false,
      isDate:false,
      disablePadding: false,
      label: 'Version',
    },
    {
      id: 'date',
      numeric: false,
      html:false,
      isDate:true,
      disablePadding: false,
      label: 'Date',
    },
    {
      id: 'githublink',
      numeric: false,
      html:true,
      isDate:false,
      disablePadding: false,
      label: 'Github link',
    },
    {
      id: 'keywords',
      numeric: false,
      html:false,
      isDate:false,
      disablePadding: false,
      label: 'Keywords',
    },
];



class Home extends React.Component{
   constructor(props){
	    super(props);
        this.state={
            columns:[],
            rows:[],
            page:0,
            rowsPerPage:10,
            searchText:null,
            totalRows:0,
            sortData:{},

        }
        this.getData = this.getData.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }   

    componentDidMount(){
        this.getData()
    }

    getData(){
        const {rowsPerPage,rows,searchText,page} = this.state
        let fromCount = (page +1 ) * rowsPerPage
        let url = `https://registry.npmjs.org/-/v1/search?text=${searchText}&size=${rowsPerPage}`
        if(page > 0){
            url = url + `&from=${fromCount}`
        }
        
        axios.get(url).then((res)=>{
            console.log(res)
            let data = res.data && res.data.objects || []

            let rows = []
            data.map((item,index)=>{
                let packageData = item.package
                let obj ={
                   'name' : packageData.name,
                   'version' : packageData.version,
                   'date' : packageData.date,
                   'githublink' : packageData.links && `<a target="_blank" href={${packageData.links['repository']}}> ${packageData.links['repository']} </a>`,
                   'keywords' : packageData.keywords && packageData.keywords.toString()
                }                
                rows.push(obj)
            })
            
            this.setState({rows:[...rows,...this.state.rows],totalRows:res.data.total})

        }).catch((error)=>{
            console.log(error)
        })
    }

    handleChangePage(event,newPage){
        this.setState({page:newPage},()=>this.getData())
    }

    handleChangeRowsPerPage(e){
        this.setState({rowsPerPage:e.target.value,},()=>this.getData())
    }

    handleChangeSearch(value){
        if(value == ''){
            value = null
        }
        this.setState({searchText:value},()=>this.getData())
    }
    
    handleSort(column){
        console.log(column)
        let {columns,rows,sortData} = this.state
        let data = rows.sort((a, b) =>  a[column.id].localeCompare(b[column.id]));

       
        // const insertObj = {
        //     column:column.id,
        //     order : 'Asc'
        // };
      
        // if (!sortData) {
        //     sortData = [insertObj];
        // } else {
        //     sortData= sortData.push(insertObj);
        // }

        // console.log(r,sortData)
        this.setState({rows:data,})
    }

	render() {
        const {rows,page,rowsPerPage,totalRows} = this.state
        console.log('this.state',this.state)
		return(
            <div>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TextField
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        placeholder="Search data"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e)=>this.handleChangeSearch(e.target.value)}
                    />

                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                // <Tooltip title="Click to sort " arrow>
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    onClick={()=>this.handleSort(column)}
                                >
                                    {column.label}
                                </TableCell>
                                // </Tooltip>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Cell 
                                                        value ={value}
                                                        rowData={row}
                                                        columnData={column}
                                                    />
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10,20,25,50,100]}
                        component="div"
                        count={totalRows}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
		)
	}
}

export default Home;


