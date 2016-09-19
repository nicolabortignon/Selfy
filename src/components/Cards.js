'use strict';

import React from 'react'
import
{
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import SwipeCards from './SwipeCards';

let Card = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        <Text style={styles.text}>This is card {this.props.name}</Text>
      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
})

const CardsArray = [
  {name: '1', image: 'http://www.ogeidix.com/images/ogeidix.png'},
  {name: '2', image: 'https://pbs.twimg.com/profile_images/3529593139/f8dc5d8b3a7d6778ab2a06e06d4ccc7a_400x400.jpeg'},
  {name: '3', image: 'http://www.piazzatech.it/images/stories/collaborazioni/diego.jpg'},
  {name: '4', image: 'http://www.areanetworking.it/wp-content/uploads/2010/11/working-capital-telecom-diego-giorgini.jpg'},
  {name: '5', image: 'https://lh3.googleusercontent.com/-u4HC9tlPg28/AAAAAAAAAAI/AAAAAAAAAUU/KkcAuzxTMGo/s120-c/photo.jpg'},
  {name: '6', image: 'https://farm3.static.flickr.com/2150/2178449829_ef3bdcefda.jpg'}
]

const Cards2 = [
  {name: '10', image: 'https://pbs.twimg.com/profile_images/3529593139/f8dc5d8b3a7d6778ab2a06e06d4ccc7a_400x400.jpeg'},
  {name: '11', image: 'https://pbs.twimg.com/profile_images/3529593139/f8dc5d8b3a7d6778ab2a06e06d4ccc7a_400x400.jpeg'},
  {name: '12', image: 'https://pbs.twimg.com/profile_images/3529593139/f8dc5d8b3a7d6778ab2a06e06d4ccc7a_400x400.jpeg'},
  {name: '13', image: 'https://pbs.twimg.com/profile_images/3529593139/f8dc5d8b3a7d6778ab2a06e06d4ccc7a_400x400.jpeg'},
]

var styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    flex: 1,
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  containerStyle:{
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  

})

var Cards = React.createClass({
  getInitialState() {
    return {
      cards: CardsArray,
      outOfCards: false
    }
  },
  handleYup (card) {
    console.log("yup")
  },
  handleNope (card) {
    console.log("nope")
  },
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }

    }

  },
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false} 
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    )
  }
})

module.exports = Cards
