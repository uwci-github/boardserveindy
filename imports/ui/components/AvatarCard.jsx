import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { grey200 } from 'material-ui/styles/colors'

class AvatarCard extends Component {

  render() {
    return (
      <Card>
        <CardMedia style={styles.cardMedia}>
          <img src={this.props.avatarUrl} />
        </CardMedia>
        <CardTitle title={this.props.title} style={styles.title}/>
      </Card>
    )
  }

}

const styles = {
  cardMedia: {
    height: '200px',
    width: '200px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    margin: '16px',
  },
  title: {
    lineHeight: '24px'
  }
}

export default AvatarCard
