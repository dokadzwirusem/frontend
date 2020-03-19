import React from 'react'
import { Link } from 'react-router-dom'
import {
  Typography,
  Button,
  ButtonGroup,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Dropzone from 'react-dropzone'
import Loader from './Loader'
import { roundLatLng, formatDate } from '../utils/helpers'
// import locationTypes from '../utils/locationTypes'
import Text from './Text'


const LocationInfo = ({
  loggedIn,
  selectedLocation,
  onImageUpload,
}) => {
  console.log('selectedLocation: ', selectedLocation);
  const classes = useStyles()
  const [imagesLoading, setImagesLoading] = React.useState()
  const updatedAt = selectedLocation.last_modified_timestamp || selectedLocation.created_timestamp
  // const type = locationTypes[selectedLocation.type]
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <Typography
          variant='h5'
        >{selectedLocation.name}</Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          gutterBottom
        >
          {selectedLocation && selectedLocation.type} | {roundLatLng(selectedLocation.location.lat)}, {roundLatLng(selectedLocation.location.lon)}
        </Typography>

        <Typography
          variant='body1'
          gutterBottom
        ><strong><Text id='locationInfo.operator' />:</strong> {selectedLocation.operator}</Typography>

        <Typography
          variant='body1'
          gutterBottom
        ><strong><Text id='locationInfo.address' />:</strong> {selectedLocation.address}</Typography>

        <Typography
          variant='body1'
          gutterBottom
        ><strong><Text id='locationInfo.phone' />:</strong> {selectedLocation.phone}</Typography>

        <Typography
          variant='body1'
          gutterBottom
        ><strong><Text id='locationInfo.openingHours' />:</strong> {selectedLocation.opening_hours}</Typography>

        <Typography
          variant='body1'
          gutterBottom
        ><strong><Text id='locationInfo.prepareInstruction' />:</strong> {selectedLocation.prepare_instruction}</Typography>

      </div>

      <div className={classes.footer}>
        {updatedAt &&
          <Typography
            component='div'
            variant='caption'
            align='right'
            color='textSecondary'
          ><Text id='locationInfo.lastUpdate' />: {formatDate(updatedAt)}</Typography>
        }
        {loggedIn &&
          <ButtonGroup
            size='small'
            variant='text'
            align='right'
          >
            <Button
              component={Link}
              to={`/location/${selectedLocation.id}/edit`}
            ><Text id='actions.edit' /></Button>
            {/* {imagesLoading
              ? <Button disabled><Text id='actions.addPhoto' /> <Loader /></Button>
              : <Button>
                <Dropzone onDrop={async files => {
                  setImagesLoading(true)
                  await onImageUpload(files)
                  setImagesLoading(false)
                }}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Text id='actions.addPhoto' />
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Button>
            } */}
          </ButtonGroup>
        }
      </div>
    </div>
  )
}


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[1],
    flexGrow: 1,
  },
  main: {
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: theme.spacing(2),
  },
}))

export default LocationInfo
