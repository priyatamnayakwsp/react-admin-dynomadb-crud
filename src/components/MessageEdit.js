import React from 'react'
import { Edit, SimpleForm, TextInput, DateInput } from 'react-admin'

const MessageEdit = (props) => {
  return (
    <Edit title='Edit Message' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <DateInput source='created' />
        <DateInput source='modified' />
        <TextInput source='createdbyId' />
        <TextInput source='modifiedbyId' />
        <TextInput source='type' />
        <TextInput source='title' />
        <TextInput source='description' />
        <TextInput source='published' />
        <DateInput source='publishStart' />
        <DateInput source='publishEnd' />
      </SimpleForm>
    </Edit>
  )
}

export default MessageEdit