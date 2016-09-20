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

/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'
import ControlPanel from '../components/ControlPanel'
/**
 * The components needed from React
 */
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Text
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
  container: {
    backgroundColor: 'white',
    height: undefined,
    width: undefined,
    flexDirection: 'column',
    flex: 1
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10
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
class Main extends Component {

  handlePress () {
    this._drawer.open()
    /*
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    })*/
  }

  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };

  render () {
    return ( 
        <Drawer
        type="static"
        ref={(ref) => this._drawer = ref}
          closedDrawerOffset={-3}
          styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
          tweenHandler={Drawer.tweenPresets.parallax}
          content={
            <ControlPanel closeDrawer={this.closeControlPanel} />
          }  
        >
      <View style={styles.container}>
        <View>
 
          <Button style={styles.button} onPress={this.handlePress.bind(this)}>
           {'Open Menu'}
          </Button>


        
          <Text> Main Page AREA </Text>
        </View>
      </View> 
     </Drawer>
    )
  }
};

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
