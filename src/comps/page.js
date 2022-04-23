//imports
    //react
        import React, { Component } from "react";
    //materials
        import Table from '@mui/material/Table';
        import TableBody from '@mui/material/TableBody';
        import TableCell from '@mui/material/TableCell';
        import TableContainer from '@mui/material/TableContainer';
        import TableHead from '@mui/material/TableHead';
        import TableRow from '@mui/material/TableRow';
        import Button from '@mui/material/Button';
        import DiaWrap from '@mui/material/Dialog';
        import Card from '@mui/material/Card';
        import CardHeader from '@mui/material/CardHeader';
        import CardContent from '@mui/material/CardContent';
        import Checkbox from '@mui/material/Checkbox';
    //components
        import Dialog from './dialog';
    //javascript
        import moment from 'moment';
        import toastr from 'toastr';
        import { render } from "@testing-library/react";

        function Row(row) {
            let [checkbox, setCheckbox] = React.useState(false)
            function handleChecked (e, checked) {
                setCheckbox(checked)
            }
            return (
                <TableRow key={row.title}>
                    <TableCell align='center'>{row.title}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.deadline}</TableCell>
                    <TableCell align="center">{row.priority}</TableCell>
                    <TableCell align="center"><Checkbox label="checkbox" value={checkbox} onChange = {handleChecked}/></TableCell>
                    <TableCell align="center">
                        {!checkbox && <Button variant = "contained"  sx = {{width: 100, marginRight: '7px'}} onClick={() => row.updateTask(row)}>
                            <i className = "fa fa-edit"></i>UPDATE
                        </Button>}
                        <Button variant = "contained"  sx = {{bgcolor: '#f44336',width: 100, marginRight: '7px'}} onClick={() => row.removeTask(row)}>
                            <i className = "fa fa-remove"></i>DELETE
                        </Button>
                    </TableCell>
                </TableRow>
            )
        }
//master export
    export default class page extends Component {
    //constructor
        constructor(props) {
            super(props);
            this.state = {
                task: {
                    deadline: moment()
                },
                rows: [],
                open: false,
                inputs: [
                    {name: 'Title', value:'', error: ''},
                    {name: 'Description', value:'', error: ''},
                    {name: 'Priority', value:''}
                ],
                make : '',
                chosenRow: ''
            };
        }

    //add task
        addTask(){
            this.setState({open: true, make: 'Add', chosenRow:'', inputs : [{name: 'Title', value:'', error: ''},
            {name: 'Description', value:'', error: ''},
            {name: 'Priority', value:''}]});
        };

   //callback from dialog input
        dialogCallback = (data) => {//functional syntax intentional
            if(data.action === `submit`){//submitted
                toastr.success(`Task ${this.state.make.toLowerCase()}ed successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            }else if(data.action === `cancel`){//cancelled
                this.setState({open: false});
            }               
        }
        
    //update a task
        updateTask = (row) => {
            this.setState({open: true, make: 'Edit', chosenRow: row, inputs: [
                {name: 'Title', value:'', error: ''},
                {name: 'Description', value:'', error: ''},
                {name: 'Priority', value:''}
            ]})
        }
    
    //remove a task
        removeTask = (row) => {
            let rows = [...this.state.rows]
            rows = rows.filter(item => item.description != row.description 
                                        && item.deadline != row.deadline
                                        && item.priority != row.priority
                )
            this.setState({rows})
            toastr.success(`Task deleted successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
        }
        
    //render
        render() {
            return (
                <>
                <DiaWrap
                    open={this.state.open}
                    onClose={() => this.dialogCallback()}>
                    <Dialog 
                        parentCallback = {this.dialogCallback}
                        dataFromParent = {this.state.task}
                        dataInputs = {this.state.inputs}
                        dataRows = {this.state.rows}
                        dataRow = {this.state.chosenRow}
                        dataMake = {this.state.make} >
                    </Dialog>
                </DiaWrap>
                {/*master card*/}
                    <Card sx = {{ margin: '20px' }}>
                    {/*card header*/}
                        <CardHeader sx = {{ bgcolor: 'primary.dark', color: 'white'}} 
                            title = {<><small><i className='fa fa-fw fa-bars'></i>FRAMEWORKS</small></>}
                            style = {{textAlign: 'center'}}
                            action = {
                                <>
                                {/*button*/}
                                    <Button variant = "contained" onClick = {() => this.addTask()} sx = {{width: 100, marginRight: '7px'}}>
                                        <i className = "fa fa-fw fa-plus-circle"></i>Add
                                    </Button>
                                </>
                            }/>
                     {/*card content*/}
                        <CardContent sx = {{ bgcolor: 'white', marginBottom: -1 }}>
                            <TableContainer>
                                <Table sx = {{ bgcolor: 'white' }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" sx = {{ width: 0.1, color: 'gray'}}>Title</TableCell>
                                            <TableCell align="center" sx = {{ width: 0.1, color: 'gray'}}>Description</TableCell>
                                            <TableCell align="center" sx = {{ width: 0.1, color: 'gray'}}>Deadline</TableCell>
                                            <TableCell align="center" sx = {{ width: 0.1, color: 'gray'}}>Priority</TableCell>
                                            <TableCell align="center" sx = {{ width: 0.1, color: 'gray'}}>Is Complete</TableCell>
                                            <TableCell align="center" sx = {{ width: 0.1, color: 'gray'}}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.state.rows.map((row, index) => (
                                        <Row {...row} key = {index} updateTask={this.updateTask} removeTask={this.removeTask}/>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </>
            );
        }
    }      