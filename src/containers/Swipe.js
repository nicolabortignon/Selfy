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
  View
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
    top: 30,
    left: 20,
    position: 'absolute'
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
class Swipe extends Component {

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
          styles={{main: {shadowColor: '#000000', shadowOpacity: 0.1, shadowRadius: 15}}}
            openDrawerOffset={100}
            tweenHandler={Drawer.tweenPresets.parallax}
          content={
            <ControlPanel closeDrawer={this.closeControlPanel} />
          }  
        >
      <View style={styles.container}>
           
          <Cards style={{flex: 1}} />
          <Button style={styles.button} onPress={this.handlePress.bind(this)}>
             Open Menu
          </Button>
      </View>
      </Drawer>
    )
  }
};

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Swipe)
