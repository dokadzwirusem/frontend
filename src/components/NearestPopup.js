import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from './Modal'
import Text from './Text'
import { GpsFixed } from '@material-ui/icons'


const NearestPopup = ({
  nearestHospital,
  nearestTransport,
  onClose,
  location,
}) => {
  const classes = useStyles()

  return (
    <Modal short isOpen onClose={onClose}>
      <div className={classes.root}>
        <Typography variant='h3' gutterBottom>Dokąd z wirusem</Typography>
        <Typography gutterBottom className={classes.paragraph}>
          <Text id='welcomeText' />
        </Typography>
        {location
          ? <div className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              size='large'
              onClick={nearestHospital}
            ><Text id='nearestPoint' /></Button>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              size='large'
              onClick={nearestTransport}
            ><Text id='nearestTransport' /></Button>
          </div>
          : <>
            <Typography gutterBottom variant='h3'>
              <GpsFixed />
            </Typography>
            <Typography gutterBottom className={classes.paragraph}>
              <Text id='pleaseEnableGeolocation' />
            </Typography>
          </>
        }
      </div>
    </Modal>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  paragraph: {
    marginBottom: theme.spacing(3),
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: -theme.spacing(1),
    width: '100%',
  },
  button: {
    margin: theme.spacing(2),
  },
}))

export default NearestPopup
