import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from './Modal'


const NearestPopup = ({
  nearestHospital,
  nearestTransport,
  isOpen,
  onClose,
}) => {
  const classes = useStyles()

  return (
    <Modal short isOpen={isOpen} onClose={onClose}>
      <div className={classes.root}>
        <Typography variant='h3' gutterBottom>Dokąd z Wirusem</Typography>
        <Typography gutterBottom className={classes.paragraph}>
          Witaj w aplikacji, która pomoże ci znaleźć najbliższe miejsce, do którego należy zgłosić się, aby otrzymać pomoc w przypadku zainfekowania wirusem COVID-19.
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            size='large'
            onClick={nearestHospital}
          >Pokaż najbliższy punkt</Button>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
            size='large'
            onClick={nearestTransport}
          >Pokaż najbliższy transport</Button>
        </div>
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
