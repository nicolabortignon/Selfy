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
  Text,
  Image
}
from 'react-native'

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Let\'s take a Selfy',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

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
    },
    avatarSource: 'test'
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

  container: {
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
    flex: 1, 
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
  takeSnapshot: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    
  },
  uploadSelfieImage: {
    flex: 1,
  },
  avatar: {
  
    borderRadius: 150,
    width: 300,
    height: 300
  }
})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

/**
 * ## App class
 */
class UploadSelfie extends Component {
  state = {
    avatarSource: null
  };


  takeSnapshot = () => {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     */
    const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        

        // Reference to the platform specific asset location
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    });
  };
  render () {
    return (
      <View style={styles.container}>
          
          { !this.state.avatarSource &&
             <Image style={styles.uploadSelfieImage} source={require('../images/takeSelfie.png')} />
          }
          { this.state.avatarSource &&
             <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          <Button style={styles.button} onPress={this.props.actions.openMenu}>
             Open Menu
          </Button>
          <Button style={styles.takeSnapshot} onPress={this.takeSnapshot.bind(this)}>
             Take Snapshot
          </Button>
          { this.state.avatarSource &&
            <Text style={{margin: 8, textAlign: 'center'}}>{this.state.avatarSource.uri}</Text>
          }

      </View>
    )
  }
};

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(UploadSelfie)
