import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from 'react-admin'

const MessageList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <DateField source='created' />
        <DateField source='modified' />
        <TextField source='createdbyId' />
        <TextField source='modifiedbyId' />
        <TextField source='type' />
        <TextField source='title' />
        <TextField source='description' />
        <TextField source='published' />
        <DateField source='publishStart' />
        <DateField source='publishEnd' />
        <EditButton/>
        <DeleteButton/>
      </Datagrid>
    </List>
  )
}

export default MessageList
