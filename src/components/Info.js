import React from 'react'
import Modal from './Modal'

const Info = () =>
  <Modal>
    <h2>Informacje / Informations</h2>
    <p>Aplikacja przygotowana w ramach hackatonu <a href='https://www.hackcrisis.com/' target='_blank'>Hack the Crisis</a>.</p>
    <p>App prepared during the <a href='https://www.hackcrisis.com/' target='_blank'>Hack the Crisis</a> hackaton.</p>

    <h3>Zespół / Team </h3>
    <ul>
      <li>Dawid Wolski</li>
      <li>Michał Kokociński</li>
    </ul>

    <h2>Zamieszczanie mapy na stronie / Embeding map on a page</h2>
    <p>Możesz zamieścić mapę na swojej stronie korzystając z następującego kodu:</p>
    <p>You can embed the map on your page using a following snippet:</p>
    <code>
      <pre>
{`<iframe
  src="http://dokadzwirusem.pl"
  style="border:0px #ffffff none;"
  name="myiFrame"
  scrolling="no"
  frameborder="1"
  marginheight="0px"
  marginwidth="0px"
  height="600px"
  width="900px"
  allowfullscreen
></iframe>`}
      </pre>
    </code>
  </Modal>

export default Info
