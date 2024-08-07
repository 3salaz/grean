import React from 'react';
import { ReactComponent as CallIcon } from '../../assets/icons/call-outline.svg'
import Button from '../UI/Button'; // Ensure this path is correct

function ButtonTest() {
  return (
    <Button
      color="danger"
      size="large"
      roundness="full"
      withIcon={<CallIcon className="text-lg" />}
      iconPosition="left"
      link="tel:+14159202225"
    >
      Call Us
    </Button>
  );
}

export default ButtonTest;
