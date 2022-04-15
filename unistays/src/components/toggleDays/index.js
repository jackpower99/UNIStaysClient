import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const DAYS = [
  {
    key: "sunday",
    label: "S"
  },
  {
    key: "monday",
    label: "M"
  },
  {
    key: "tuesday",
    label: "T"
  },
  {
    key: "wednesday",
    label: "W"
  },
  {
    key: "thursday",
    label: "T"
  },
  {
    key: "friday",
    label: "F"
  },
  {
    key: "saturday",
    label: "S"
  }
];

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(2),
    padding: theme.spacing(0, 1),
    "&:not(:first-child)": {
      border: "1px solid",
      borderColor: "#FE7E6D",
      borderRadius: "50%"
    },
    "&:first-child": {
      border: "1px solid",
      borderColor: "#FE7E6D",
      borderRadius: "50%"
    }
  }
}))(ToggleButtonGroup);

const StyledToggle = withStyles({
  root: {
    color: "black",
    "&$selected": {
      color: "white",
      background: "#FE7E6D"
    },
    "&:hover": {
      borderColor: "#FE7E6D",
      background: "#f0a69c"
    },
    "&:hover$selected": {
      borderColor: "#FE7E6D",
      background: "#FE7E6D"
    },
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    textTransform: "unset",
    fontSize: "0.75rem"
  },
  selected: {}
})(ToggleButton);

const ToggleDays = (props) => {
    const { daysSelectedCallback } = props
  const [days, setDays] = useState([0, 2, 3]);

  const handleDaysChange = (selected)=>{
      setDays(selected);
      daysSelectedCallback(selected)
  }

  daysSelectedCallback(days)
  
  return (
    <>
      <StyledToggleButtonGroup
        size="small"
        arial-label="Days of the week"
        value={days}
        onChange={(event, value) => handleDaysChange(value)}
      >
        {DAYS.map((day, index) => (
          <StyledToggle key={day.key} value={index} aria-label={day.key}>
            {day.label}
          </StyledToggle>
        ))}
      </StyledToggleButtonGroup>
    </>
  );
};

export default ToggleDays;
