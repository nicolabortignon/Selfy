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
import {DefaultRenderer} from 'react-native-router-flux';
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
  constructor(props) {
    super(props);
    this.state = {open: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState({ open: !this.state.open });
    }, 1000);
  }


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
    const state = this.props.navigationState;
    const children = state.children;
    return ( 
        <Drawer
        open={this.state.open}
        type="static"
        ref={(ref) => this._drawer = ref}  
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
        tweenHandler={Drawer.tweenPresets.parallax}
        content={
          <ControlPanel closeDrawer={this.closeControlPanel} />
        }  
        >
          <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
       </Drawer>
    )
  }
};

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
