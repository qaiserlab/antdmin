import React, { useState, useEffect, useContext } from 'react';
import { PropsInterface } from './schema';

export default function UserManagementForm(props: PropsInterface) {
  return (
    <React.Fragment>
      EDIT DATA WITH ID: {props.id}
    </React.Fragment>
  )
}