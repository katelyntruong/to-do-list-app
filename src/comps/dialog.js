//imports
    //react
        import React from 'react';
    //materials
        import Button from '@mui/material/Button';
        import DialogActions from '@mui/material/DialogActions';
        import DialogContent from '@mui/material/DialogContent';
        import DialogTitle from '@mui/material/DialogTitle';
        import TextField from '@mui/material/TextField';
        import Radio from '@mui/material/Radio';
        import RadioGroup from '@mui/material/RadioGroup';
        import FormControlLabel from '@mui/material/FormControlLabel';
        import FormControl from '@mui/material/FormControl';
        import FormLabel from '@mui/material/FormLabel';
        //components
        import DateTime from './dateTime';

        function Icon(props) {
            if (props.name == "Add") {
                return <i className = "fa fa-fw fa-plus-circle"></i>
            }
            else {
                return <i className = "fa fa-edit"></i>
            }
        }

        
//master export
    export default function ResponsiveDialog(props) {
    //variables
        let [deadline, setDeadline] = React.useState(props.dataFromParent.deadline);
        let [title, setTitle] = React.useState(props.dataFromParent.title || "");
        let [inputs, setInputs] = React.useState(props.dataInputs);
        let [rows, setRows] = React.useState(props.dataRows);
        let [make, setMake] = React.useState(props.dataMake);
        let [row, setRow] = React.useState(props.dataRow)

        let updateDate = (data) => { 
            setDeadline(data.datePicked)
        }
    //cancel
        let cancel = () => {
            props.parentCallback({
                action: 'cancel',
                data: {}
            });
        };
    //add
        let add = () => {
            props.parentCallback({
                action: 'submit',
                data: {}
            });
        }   

        let handleInputChange = (idx, event) => {
            const value = event.target.value;

            if (idx == 0 || idx == 1) {
                const name = event.target.placeholder;
                let error = '';
                if (!value.match(/^[a-zA-Z]+$/)) {
                    error = `${name} is Required!`
                }
                inputs[idx] = {...inputs[idx], value: value, error: error}
            }
            else {
                inputs[idx] = {...inputs[idx], value: value}
            }
            setInputs (prevInputs => {
                return {...prevInputs}
            })
        }

        let handleDialogAdd = (event) => {
            let errorDup = '';
            let duplicated = false
            if (make == "Add") {
                rows.map((row) => {
                    if (row.title == inputs[0].value) {
                        duplicated = true
                    }
                });
            }
            else {
                inputs[0] = {...inputs[0], value: row && row.title}
                inputs[1] = {...inputs[1], value: row && row.description}
                setInputs (prevInputs => {
                    return {...prevInputs}
                })
            }
            if (inputs[0].value == '') {
                inputs[0] = {...inputs[0], error: 'Title is Required!'}
                if (inputs[1].value == '') {
                    inputs[1] = {...inputs[1], error: 'Description is Required!'}
                }
                setInputs (prevInputs => {
                    return {...prevInputs}
                })
            }
            else if (duplicated) {
                errorDup = `${inputs[0].name} is duplicated!`
                inputs[0] = {...inputs[0], error: errorDup}
                setInputs (prevInputs => {
                    return {...prevInputs}
                })
            }
            else {
                if (make == "Add") {
                    rows.push({title: inputs[0].value,
                        description: inputs[1].value,
                        deadline: deadline.format("MM/DD/YYYY"),
                        priority: inputs[2].value});
                    setRows (prevRows => {
                        return {...prevRows}
                    })
                }
                else {
                    row = {title: inputs[0].value,
                        description: inputs[1].value,
                        deadline: deadline.format("MM/DD/YYYY"),
                        priority: inputs[2].value}
                    setRow (prevRows => {
                        return {...prevRows}
                    })
                    setRows (prevRows => {
                        return {...prevRows}
                    })
                }
                add()
                cancel()
            }
            
        }

    //return master object
        return (
            <>       
            {/*title*/}
               <DialogTitle sx = {{ bgcolor: 'primary.dark', color: 'white'}}>
                    <Icon name={make}/>{make} Task
                </DialogTitle>
            {/*content*/}
                <DialogContent>
                    {make == 'Add' && <br />}
                    {make == 'Add' && <TextField  placeholder={inputs[0].name} sx={{width: 1}} onChange={(e) => handleInputChange(0, e)}/>}
                    {inputs[0].error && <div style={{ color: "red", padding: "3px 0 0 12px"}}>{inputs[0].error} </div> }
                    <br /><br />
                    <TextField  placeholder={inputs[1].name} defaultValue={row && row.description} sx={{width: 1}} onChange={(e) => handleInputChange(1, e)}/>
                    {inputs[1].error && <div style={{ color: "red", padding: "3px 0 0 12px"}}>{inputs[1].error}</div> }
                {/*deadline*/}
                    <br /><br />
                    <DateTime dataFromParent = {deadline} dataToParent = {updateDate}/>
                    <br /><br />
                    <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue={row && row.priority}
                        >
                            <FormControlLabel value="low" control={<Radio />} label="Low" onChange={(e) => handleInputChange(2, e)}/>
                            <FormControlLabel value="med" control={<Radio />} label="Med" onChange={(e) => handleInputChange(2, e)}/>
                            <FormControlLabel value="high" control={<Radio />} label="High" onChange={(e) => handleInputChange(2, e)}/>
                        </RadioGroup>
                </DialogContent>
            {/*action buttons*/}
                <DialogActions sx={{ bgcolor: 'white'}}>
                        {<Button  variant = "contained"  sx = {{bgcolor: 'primary.dark', width: 100}} onClick={(e) => handleDialogAdd(e)}>
                        <Icon name={make}/>{make}
                        </Button>}
                    {/*cancel button*/}
                        <Button onClick = {cancel} variant = "contained" color = 'error' sx = {{bgcolor: '#f44336', width: 100}}>
                        <i className = "fa fa-fw fa-ban"></i>&nbsp;Cancel
                        </Button>
                </DialogActions>
            </>
        );
    }