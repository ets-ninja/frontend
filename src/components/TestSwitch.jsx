import React from 'react';
import TestSwitcher from '@mui/material/Switch';
import PropTypes from 'prop-types';

const TestSwitch = ({color, size, disabled}) => {
    return (
        <>
            <TestSwitcher defaultChecked size={size} color={color} disabled={disabled}/>
        </>
    )
}

TestSwitch.propTypes = {
    size: PropTypes.oneOf(['small','medium']),
    color: PropTypes.oneOf(['primary','secondary','default','warning']),
    disabled: PropTypes.bool
}
// TestSwitch

export default TestSwitch