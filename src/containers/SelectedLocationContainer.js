import React from 'react'
import { withRouter } from 'react-router-dom'
// import Resizer from 'react-image-file-resizer'
// import dataUriToBuffer from 'data-uri-to-buffer'
import { useSnackbar } from 'notistack'
import api from '../api'
import { useAuth0 } from '../utils/auth0Provider'
// import LocationImages from '../components/LocationImages'
import LocationInfo from '../components/LocationInfo'
import Loader from '../components/Loader'
import Text from '../components/Text'


const SelectedLocationContainer = ({
  cachedLocation,
  setCachedLocation,
  spaceForBackToSearch,
  refreshMap,
  match,
}) => {
  const { params: { id } } = match
  const {
    isModerator,
    userOwnedLocation,
  } = useAuth0()
  const { enqueueSnackbar } = useSnackbar()
  const [location, setLocation] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState()

  // Use cached location data if avaliable, otherwise load data from endpoint.
  React.useEffect(() => {
    if (cachedLocation) {
      setLocation(cachedLocation)
      setLoading(false)
    } else {
      const handleAsync = async () => {
        try {
          const { data } = await api.post('get_point', { id })
          setLocation(data)
          setCachedLocation(data)
        } catch (error) {
          setError(true)
          enqueueSnackbar(<Text id='connectionProblem.location' />, { variant: 'error' })
        }
        setLoading(false)
      }
      handleAsync()
    }
  }, [cachedLocation])

  // Update the component if cached location changes.
  React.useEffect(() => {
    setLocation(cachedLocation)
  }, [cachedLocation])

  const waitingTimeCallback = async availability => {
    try {
      const { data } = await api.post('set_availability', {
        id,
        availability,
      })
      setLocation(data)
      setCachedLocation(data)
      refreshMap()
      enqueueSnackbar(<Text id='notifications.availabilityUpdated' />, { variant: 'success' })
    } catch (error) {
      console.error(error)
      enqueueSnackbar(<Text id='notifications.couldNotUpdateAvailability' />, { variant: 'error' })
    }
  }

  return (
    loading
      ? <Loader dark big />
      : error
        ? <div>Error!</div>
        : <>
          {/* <LocationImages
            images={location.images}
            id={id}
          /> */}
          <LocationInfo
            selectedLocation={location}
            // onImageUpload={files => onImageUpload(files)}
            canEdit={isModerator || userOwnedLocation === location.id}
            spaceForBackToSearch={spaceForBackToSearch}
            waitingTimeCallback={waitingTimeCallback}
          />
        </>
  )
}

export default withRouter(SelectedLocationContainer)
