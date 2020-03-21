import React from 'react'
import { Link } from 'react-router-dom'
import {
  Typography,
  Button,
  ButtonGroup,
  Chip,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AccessTime } from '@material-ui/icons'
// import Dropzone from 'react-dropzone'
// import Loader from './Loader'
import Text from './Text'
import WaitingTimeSwitcher from './WaitingTimeSwitcher'
import { roundLatLng, formatDate } from '../utils/helpers'
import locationTypes from '../utils/locationTypes'
import waitingTimes from '../utils/waitingTimes'


const LocationInfo = ({
  selectedLocation,
  // onImageUpload,
  canEdit,
  spaceForBackToSearch,
  waitingTimeCallback,
}) => {
  const classes = useStyles()
  const [showWaitingSwitcher, setShowWaitingSwitcher] = React.useState()
  // const [imagesLoading, setImagesLoading] = React.useState()
  const updatedAt = selectedLocation.last_modified_timestamp || selectedLocation.created_timestamp
  const type = locationTypes[selectedLocation.type]
  const waitingTime = waitingTimes[selectedLocation.waiting_time || 'short']

  return (
    <div className={classes.root} style={spaceForBackToSearch ? { paddingTop: 48 } : {}}>
      <div className={classes.main}>
        <Typography
          variant='h5'
        >{selectedLocation.name}</Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          gutterBottom
        >
          {type && <Text id={type} />} | {roundLatLng(selectedLocation.location.lat)}, {roundLatLng(selectedLocation.location.lon)}
        </Typography>

        <div className={classes.waitingTime}>
          <Chip
            icon={<AccessTime />}
            label={<><Text id='waitingTime' />: <Text id={waitingTime.label} /> </>}
            style={{ backgroundColor: waitingTime.color }}
            classes={{
              root: classes.chip,
              icon: classes.chipIcon,
            }}
          />
          <Button
            color='primary'
            size='small'
            onClick={() => setShowWaitingSwitcher(true)}
          ><Text id='change' /></Button>
          {showWaitingSwitcher &&
            <WaitingTimeSwitcher
              currentValue={selectedLocation.waiting_time}
              onChange={value => {
                waitingTimeCallback(value)
                setShowWaitingSwitcher(false)
              }}
            />
          }
        </div>

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
        >
          <strong><Text id='locationInfo.phone' />:</strong> {selectedLocation.phone.split(',').map((phone, index) =>
            <React.Fragment key={index}>
              <a href={`tel:${phone}`}>{phone}</a><br />
            </React.Fragment>
          )}
        </Typography>

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
        {canEdit &&
          <ButtonGroup
            size='small'
            variant='text'
            align='right'
          >
            <Button
              component={Link}
              to={`/location/${selectedLocation.id}/edit`}
              variant='contained'
              color='primary'
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
        {updatedAt &&
          <Typography
            component='div'
            variant='caption'
            align='right'
            color='textSecondary'
          ><Text id='locationInfo.lastUpdate' />: {formatDate(updatedAt)}</Typography>
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
  chip: {
    color: 'white',
    marginRight: theme.spacing(1),
  },
  chipIcon: {
    color: 'white',
  },
  waitingTime: {
    display: 'flex',
    alignItems: 'center',
    justyfContent: 'flex-start',
    marginBottom: theme.spacing(2),
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: theme.spacing(2),
  },
}))

export default LocationInfo
