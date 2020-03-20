import React from 'react'
import NearestPopup from '../components/NearestPopup'
import { useCurrentLocation } from '../utils/CurrentLocationProvider'
import api from '../api'
import history from '../history'


const NearestPopupContainer = () => {
  const { location, loading, error } = useCurrentLocation()
  const [isOpen, setIsOpen] = React.useState()
  const [nearestHospital, setNearestHospital] = React.useState()
  const [nearestTransport, setNearestTransport] = React.useState()

  React.useEffect(() => {
    if (!loading && !error) {
      const handleAsync = async () => {
        try {
          const [lat, lon] = location
          setIsOpen(true)
          const { data: { transport, hospital } } = await api.post('get_nearest', {
            location: { lat, lon },
          })
          // const [transport, hospital] = points
          setNearestHospital(hospital)
          setNearestTransport(transport)
        } catch (err) {
          console.error(err)
        }
      }
      handleAsync()
    }
  }, [loading])

  const handleNearestHospital = () => {
    setIsOpen(false)
    history.push(`/location/${nearestHospital.id}`)
  }

  const handleNearestTransport = () => {
    setIsOpen(false)
    history.push(`/location/${nearestTransport.id}`)
  }

  return (
    isOpen
      ? <NearestPopup
        nearestHospital={handleNearestHospital}
        nearestTransport={handleNearestTransport}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      : null
  )
}

export default NearestPopupContainer
