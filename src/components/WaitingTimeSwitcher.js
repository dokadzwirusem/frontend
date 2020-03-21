import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from './Modal'
import Text from './Text'
import waitingTimes from '../utils/waitingTimes'

const WaitingTimeSwitcher = ({
  currentValue,
  onChange,
}) => {
  const classes = useStyles()
  return (
    <Modal small>
      {Object.entries(waitingTimes).map(([key, value]) => {
        const isActive = key === currentValue
        return (
          <Button
            key={key}
            variant={isActive ? 'contained' : 'outlined'}
            style={isActive
              ? { backgroundColor: value.color, color: 'white' }
              : { borderColor: value.color, borderWidth: 2, color: value.color }
            }
            className={classes.button}
            onClick={() => onChange(key)}
          ><Text id={value.label} /></Button>
        )
      })}
    </Modal>
  )
}

const useStyles = makeStyles(theme => ({
  button: {
    marginBottom: theme.spacing(1),
    width: '100%',
  },
}))

export default WaitingTimeSwitcher
