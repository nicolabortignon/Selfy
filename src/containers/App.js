/**
 * # app.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 *
 *
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

/**
 * Project actions
 */
import * as authActions from '../reducers/auth/authActions'
import * as deviceActions from '../reducers/device/deviceActions'
import * as globalActions from '../reducers/global/globalActions'

/**
 * The components we need from ReactNative
 */
import React from 'react'
import
{
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
}
from 'react-native'

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'

/**
 *  Save that state
 */
function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version,
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

/**
 * Bind all the actions from authActions, deviceActions and globalActions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...deviceActions, ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  summary: {
    fontFamily: 'AvenirNext-Bold',
    color: '#333333',
    fontSize: 18
  }
})

/**
 * ## App class
 */
var reactMixin = require('react-mixin')
import TimerMixin from 'react-timer-mixin'
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

let App = React.createClass({
    /**
     * See if there's a sessionToken from a previous login
     *
     */
  componentDidMount () {
        // Use a timer so App screen is displayed
    this.setTimeout(
            () => {
              this.props.actions.getSessionToken()
            },
            100000
        )
  },

  render () {
    return (
        <Image source={require('../images/backgroundPattern.png')}
                  resizeMode='cover'
                  style={styles.container}
                  >
 
                  <TouchableHighlight style={styles.mark} onPress={this._onPressMark}>
                    <Image  
                      source={require('../images/logo.png')}
                    >
                    </Image>
                  </TouchableHighlight>
                    {this.props.isFetching
                     ? <ActivityIndicator animating size='large' />
                     : null
                  }
                  {this.props.showState ? 
                    <View>
                      <Text>{I18n.t('Header.current_state')} ({I18n.t('Header.see_console')})</Text>
                      <TextInput style={{height: 100, borderColor: 'gray', borderWidth: 1}}
                       value={displayText}
                       editable
                       multiline
                       onChangeText={(text) => this._onChangeText(text)}
                       numberOfLines={20} />
                     
                       <FormButton isDisabled={this.state.isDisabled}
                         onPress={this._updateStateButtonPress}
                         buttonText={I18n.t('Header.update_state')} />
                  
                     </View>
                  : null}
                  <Text style={styles.summary}> Selfy {I18n.t('App.version')}: {this.props.deviceVersion}</Text>

          </Image>
    )
  }
})
/* removed part

<Header isFetching={this.props.auth.form.isFetching}
          showState={this.props.global.showState}
          currentState={this.props.global.currentState}
          onGetState={this.props.actions.getState}
          onSetState={this.props.actions.setState} />
*/
// Since we're using ES6 classes, have to define the TimerMixin
reactMixin(App.prototype, TimerMixin)
/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)
