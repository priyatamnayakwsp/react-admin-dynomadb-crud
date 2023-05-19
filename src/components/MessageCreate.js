import React from 'react'
import { Create, SimpleForm, TextInput, DateInput } from 'react-admin'

const MessageCreate = (props) => {
  return (
    <Create title='Create a Message' {...props}>
      <SimpleForm>
      <TextInput source='id' />
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
    </Create>
  )
}

export default MessageCreate

