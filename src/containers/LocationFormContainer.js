import React from 'react'
import { useSnackbar } from 'notistack'
import api from '../api'
import { withRouter } from 'react-router-dom'
import parse from 'coord-parser'
import LocationForm from '../components/LocationForm'
import Text from '../components/Text'
import Loader from '../components/Loader'
import { useAuth0 } from '../utils/auth0Provider'


const LocationFormContainer = ({
  setCachedLocation,
  refreshMap,
  isNew,
  history,
  match,
}) => {
  const { params: { id } } = match
  const { isLoggedIn, loading: loadingAuth, isModerator } = useAuth0()
  const [location, setLocation] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState()
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (!loadingAuth && !isLoggedIn) {
      history.push(`/location/${id}`)
      enqueueSnackbar('Dodawanie lub edycja lokalizacji wymaga bycia zalogowanym.', { variant: 'warning' })
    }
  }, [loadingAuth])

  // Use cached location data if avaliable, otherwise load data from endpoint.
  React.useEffect(() => {
    if (!loadingAuth) {
      if (id) {
        const handleAsync = async () => {
          try {
            const action = isModerator ? api.put : api.post
            const { data } = await action('get_point', { id })
            setLocation(data)
            setCachedLocation(data)
          } catch (error) {
            setError(true)
          }
          setLoading(false)
        }
        handleAsync()
      } else {
        setLoading(false)
      }
    }
  }, [loadingAuth])

  const onSubmitLocation = async fields => {
    /* eslint-disable camelcase */
    const {
      name,
      type,
      operator,
      address,
      opening_hours,
      phone,
      prepare_instruction,
      location: locationField,
      owned_by,
    } = fields

    try {
      const { lat, lon } = parse(locationField)
      const dataObject = {
        name,
        operator,
        address,
        lat: lat,
        lon: lon,
        type,
        opening_hours,
        phone,
        prepare_instruction,
        owned_by: owned_by || location.owned_by,
      }
      console.log('dataObject: ', dataObject);

      if (isNew) {
        // New marker creation.
        const { data } = await api.post('add_point', dataObject)
        setLocation(data)
        setCachedLocation(data)
        history.push(`/location/${data.id}`)
        enqueueSnackbar(<Text id='notifications.newMarkerAdded' />, { variant: 'success' })
      } else {
        // Updating exisitng marker.
        const { data } = await api.post('modify_point', { id, ...dataObject })
        setLocation(data)
        setCachedLocation(data)
        history.push(`/location/${id}`)
        enqueueSnackbar(<Text id='notifications.markerUpdated' />, { variant: 'success' })
      }
      refreshMap()
    } catch (error) {
      if (error.type === 'parseError') {
        console.error(error.value)
        enqueueSnackbar(<Text id='notifications.wrongCoordsFormat' />, { variant: 'error' })
      } else {
        console.error(error)
        enqueueSnackbar(<Text id='notifications.couldNotSaveMarker' />, { variant: 'error' })
      }
    }
  }

  return (
    loading || loadingAuth
      ? <Loader dark big />
      : error
        ? <div>Error!</div>
        : <LocationForm
          locationData={location}
          onSubmitLocation={onSubmitLocation}
          updateCurrentMarker={coords => {
            const { lat, lon } = parse(coords)
            if (location.location.lat !== lat || location.location.lon !== lon) {
              setCachedLocation({ ...location, location: { lat, lon } })
            }
          }}
          cancel={() => history.goBack()}
          isNew={isNew}
          isModerator={isModerator}
        />
  )
}

export default withRouter(LocationFormContainer)
