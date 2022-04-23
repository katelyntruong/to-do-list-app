//imports
  //react
    import React from "react";
  //materials
    import TextField from '@mui/material/TextField';
    import AdapterDateFns from '@mui/lab/AdapterDateFns';
    import LocalizationProvider from '@mui/lab/LocalizationProvider';
  //components
    import DatePicker from '@mui/lab/DatePicker';

//master export
  export default function BasicDatePicker(props) {
    let [date, setDate] = React.useState(props.dataFromParent);
    let updateDeadline = () => {
      props.dataToParent({datePicked: date})
    }
    //master return
      return (
        <LocalizationProvider dateAdapter = {AdapterDateFns} >
          <DatePicker 
            label = "Deadline" 
            value = {date}
            onChange = {e => {setDate(e);updateDeadline()}}
            renderInput = {(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
  }