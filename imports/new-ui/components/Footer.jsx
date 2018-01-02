import React, { Component } from 'react'
import { Link } from 'react-router'

class Footer extends Component {

  render() {
    return (
      <div style={styles.footerContainer}>
        <div style={styles.container}>
          <div style={styles.outerBlock}>
            <div style={styles.innerBlock}>
              <span>&copy; 2017 All Rights Reserved</span>
              <span>United Way of Central Indiana</span>
              <span style={styles.subtitle}>Website by Indy Tech Fellowship</span>
            </div>
          </div>
          <div style={styles.outerBlock}>
            <div style={styles.innerBlock}>
              <span style={styles.bold}>Contact UWCI</span>
              <span>community@uwci.org</span>
              <span>(317) 923-1466</span>
            </div>
            <div style={styles.innerBlock}>
              <span style={styles.italic}>3901 N. Meridian Street</span>
              <span style={styles.italic}>P.O. Box 88409</span>
              <span style={styles.italic}>Indianapolis, IN 46208</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const styles =  {
  footerContainer: {
    boxShadow: 'inset rgba(0, 0, 0, 0.117647) 0px 1px 6px, inset rgba(0, 0, 0, 0.117647) 0px 1px 4px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#394B59',
    color: 'white',
  },

  innerBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    lineHeight: '1.4',
    fontSize: '14px',
    paddingRight: '24px',
  },

  outerBlock: {
    display: 'flex',
    flexDirection: 'row',
    padding: '24px',
  },

  container: {
    width: '960px',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },

  links: {
    fontSize: '18px',
    textDecoration: 'none',
    color: 'white',
    opacity: '0.7',
  },

  subtitle: {
    fontSize: '10px',
    fontStyle: 'italic',
  },

  bold: {
    fontWeight: 'bold',
  },

  italic: {
    fontStyle: 'italic',
  }
}

export default Footer