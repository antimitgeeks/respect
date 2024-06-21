import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react';
// import Slide from '@mui/material/Slide';

function DialogComponent(
  {
    title,
    open,
    onClose,
    maxWidth,
    children
  }
) {

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxWidth}
      transitionDuration={0}
      >

       {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default DialogComponent;