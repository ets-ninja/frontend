import React from 'react';
import TestButton from '../components/TestButton'

export default {
    title: 'TestButton',
    component: TestButton,
};

const Template = args => <TestButton {...args} />

export const Primary = Template.bind({})

Primary.args = {
    variant: 'contained',
    disabled: false,
    color: 'primary',
}