import React from 'react';
import TestSwitch from '../components/TestSwitch'

export default {
    title: 'TestSwitch',
    component: TestSwitch,
};

const Template = args => <TestSwitch {...args}/> 

export const Primary = Template.bind({})

Primary.args = {
    size: "small",
    color: 'primary',
    disabled: false
}