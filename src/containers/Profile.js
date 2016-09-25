/**
 * # Main.js
 *  This is the main app screen
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Drawer from 'react-native-drawer'

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import Cards from '../components/Cards';
/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

 
import ControlPanel from '../components/ControlPanel'

/**
 * The components needed from React
 */
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions
}
from 'react-native'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
};

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
   blurContainer: {
      flex: 1,
      width: undefined,
      height: undefined,
      backgroundColor:'transparent',
      flexDirection: 'column',
  },
  containerStyle: {
    backgroundColor: 'rgba(255,255,255,.7)',
    justifyContent: 'center',
    alignItems: 'center',
    width: undefined,
    flexDirection: 'column',
    flex: 1,
  },
  container: { 
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap', 
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    top: 30,
    left: 20,
    position: 'absolute'
  },
  header: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingLeft: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    flex: 1,
    paddingRight: 20,
    width: undefined,
    height: 125
  },
  headerText: {
    paddingLeft: 20,
    flex: 2,
    flexDirection: 'column' 
  },
  usernameText: {
    fontFamily: 'AvenirNext-Bold',
    color: '#111',
    fontSize: 25,
    lineHeight: 25
  },
  locationText: {
    fontFamily: 'Avenir-MediumOblique',
    color: '#111',
    fontSize: 20,
    lineHeight: 22
  },
  chartEntryText: {
    fontFamily: 'Avenir-MediumOblique',
    color: '#111',
    fontSize: 16,
    lineHeight: 19
  },
  separator: {
    width: 30,
    height: 6,
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: '#000000'
  },
  child: {
      margin: 2,
  }
})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

// imageSize is used to statically size <Image/> instances
const windowDims = Dimensions.get('window'),
      itemSize   = (windowDims.width / 2) - 20; 

// This is *the* placeholder image to be used in steps #3 and #5
const placeholder = require('../images/placeholder.jpg');


/**
 * ## App class
 */
class Profile extends Component {
    state = {
        data : [] // empty data array
    };

    // Step #4 (Self-bound function)
    // We will update the state of the application so that images can render
    onAfterLoad = (data) => {
        this.setState({
            data : data.data
        });
    };

    // Step #1 & #2
    // Here we’ll fetch JSON for images to be displayed
    componentWillMount() {
        // The URL below has an 'r' parameter that is used as a 'cache buster' and is only intended for demonstration purposes
        let url = 'http://api.giphy.com/v1/gifs/search?q=javascript&api_key=dc6zaTOxFJmzC&limit=30&r=' + Math.random();
        console.log('Loading data')

        // Initiate query, parse, then update view via callback
        fetch(url)
            .then(function(r) {
                return r.json();
            })
            .then(this.onAfterLoad) // Success callback registration
            .catch(function(e) {    // Failure callback registartion
                alert('Failure fetching data' + e);
                console.log(e)
            });
    }

    // This will be responsible for rendering the image components
    buildImages(data) {
        let images  = [],
            length  = data.length,
            i       = 0,
            randVal = '?r=' + Math.random(),  // Cache busting for testing only can be removed
            source,
            item;

        // Empty array?
        if (data.length == 0) {
            // This console.log() call can be removed.
            console.log('Rendering placeholders');
            // Fill the array with 10 undefines
            data.length = length = 10;
        }
        else {
            // This else branch is here just for debugging and can be removed.
            console.log(`Got data. Rendering ${length} images.`);
        }

        for (; i < length; i++) {
            item = data[i];

            // For when we actually have data
            if (item) {
                source = {
                    uri    : item.images.original_still.url + randVal, 
                    width  : itemSize * Math.ceil(Math.random()*2), 
                    height : itemSize
                }
            }
            let flexSize = i;
            images.push(
                <Image style={{flex: flexSize, margin: 2}} 
                       source={source} 
                       defaultSource={placeholder} 
                       key={'img' + i}/>
            )
        }

        return images;
    }


  render () {
  let state  = this.state,
    data   = state.data,
    images = this.buildImages(data);

    return (
       <Image blurRadius={25} source={{uri: 'https://pbs.twimg.com/profile_images/600358273351622657/D6r3E4NB.jpg'}} 
                  resizeMode='cover'
                  style={styles.blurContainer}
                  >
          <View style={styles.containerStyle}>        
            <View style={styles.header}>
              <Image source={{uri: 'https://pbs.twimg.com/profile_images/600358273351622657/D6r3E4NB.jpg'}} 
                    style={styles.avatar}
                    />
              <View style={styles.headerText}>
                <Text style={styles.usernameText}>marco ziccardi</Text>
                <Text style={styles.locationText}>27 culonia</Text>
                <View style={styles.separator} />
                <Text style={styles.chartEntryText}>Overall #123</Text>
                <Text style={styles.chartEntryText}>Country #123</Text>
                <Text style={styles.chartEntryText}>Level 2</Text>
              </View>
            </View>
            <ScrollView contentContainerStyle={styles.container}
                              style={{backgroundColor: 'transparent'}}>
              
                      {images}
            </ScrollView>

          <Button style={styles.button} onPress={this.props.actions.openMenu}>
             Open Menu
          </Button>
          </View>
        </Image>
      
    )
  }
};

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
