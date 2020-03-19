import React from 'react'
import { Button, Typography } from '@material-ui/core'
import Form from 'react-standalone-form'
import {
  Input,
  FormButton,
  FormActions,
} from 'react-standalone-form-mui'
import CoordinatesInput from './CoordinatesInput'
import Text from './Text'
import Select from './Select'
import locationTypes from '../utils/locationTypes'
import { getIconUrl } from '../utils/helpers'


const LocationForm = ({
  locationData,
  onSubmitLocation,
  updateCurrentMarker,
  cancel,
  isNew,
}) => {
  const [loading, setLoading] = React.useState()

  const locationToString = () => {
    const { lat, lon } = locationData.location
    return [lat, lon].toString().replace(',', ', ')
  }

  return <>
    <Typography variant='h4' gutterBottom>
      <Text id={`markerForm.heading.${isNew ? 'addMarker' : 'editMarker'}`} />
    </Typography>
    <Form
      fields={[
        'name',
        'type',
        'operator',
        'address',
        'opening_hours',
        'phone',
        'prepare_instruction',
        'location',
      ]}
      required={[
        'name',
        'type',
        'location',
      ]}
    >

      <Input
        name='name'
        label={<Text id='markerForm.place' />}
        min={5}
        initialValue={locationData && locationData.name}
      />

      <Select
        name='type'
        label={<Text id='markerForm.type' />}
        options={Object.entries(locationTypes).map(([value, label]) => ({
          value,
          label: <Text id={label} />,
          icon: <img src={getIconUrl(value)} alt='' height='30' />,
        }))}
        initialValue={locationData && locationData.type}
      />

      <Input
        name='operator'
        label={<Text id='locationInfo.operator' />}
        initialValue={locationData && locationData.operator}
        multiline
      />

      <Input
        name='address'
        label={<Text id='locationInfo.address' />}
        initialValue={locationData && locationData.address}
        multiline
      />

      <Input
        name='opening_hours'
        label={<Text id='locationInfo.openingHours' />}
        initialValue={locationData && locationData.opening_hours}
        multiline
      />

      <Input
        name='phone'
        label={<Text id='locationInfo.phone' />}
        initialValue={locationData && locationData.phone}
        multiline
      />

      <Input
        name='prepare_instruction'
        label={<Text id='locationInfo.prepareInstruction' />}
        initialValue={locationData && locationData.prepare_instruction}
        multiline
      />

      <CoordinatesInput
        name='location'
        label={<Text id='markerForm.location' />}
        initialValue={locationData && locationToString()}
        onChange={value => {
          updateCurrentMarker(value)
        }}
      />


      <FormActions>
        <Button onClick={() => cancel()}><Text id='cancel' /></Button>
        <FormButton
          variant='contained'
          color='primary'
          callback={async fields => {
            setLoading(true)
            await onSubmitLocation(fields)
            setLoading(false)
          }}
          loading={loading}
        ><Text id='save' /></FormButton>
      </FormActions>
    </Form>
  </>
}

export default LocationForm
