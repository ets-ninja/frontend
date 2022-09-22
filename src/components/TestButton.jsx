import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const TestButton = ({variant, color, disabled, size}) => {
    return (
        <>
            <Button variant={variant} color={color} disabled={disabled} size={size}>Hello World</Button>
        </>
    )
}

TestButton.propTypes = {
    variant: PropTypes.oneOf(['contained', 'outlined']),
    color: PropTypes.oneOf(['primary','secondary','success','error', 'info']),
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small','medium','large']),
}

export default TestButton