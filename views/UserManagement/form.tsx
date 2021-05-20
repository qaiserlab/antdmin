import React, { useState, useEffect, useContext } from 'react';
import { PropsInterface } from './schema';

export default function UserManagementForm(props: PropsInterface) {
  const isNew = props.isNew;
  const id = props.id;

  return (
    <React.Fragment>
      IS NEW: {JSON.stringify(isNew)} ID: {id}
    </React.Fragment>
  )
}