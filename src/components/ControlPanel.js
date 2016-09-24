import React, {Component,PropTypes} from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Actions} from 'react-native-router-flux'
import * as globalActions from '../reducers/global/globalActions'

function mapStateToProps (state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState,
      menuOpen: state.global.menuOpen
    }
  }
};

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
})

class ControlPanel extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func.isRequired
  };

  uploadSelfie = () => {
    this.props.closeDrawer();
    Actions.UploadSelfie()
    
  };
  yourProfile = () => {
    this.props.closeDrawer();
    Actions.Profile()
  };

  swipe = () => {
    this.props.closeDrawer();
    Actions.Swipe()
  };

  followings = () => {
    this.props.closeDrawer();
    Actions.Followings()
  };

  render() {
    let {closeDrawer} = this.props
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.controlText}>Control Panel</Text>
        <TouchableOpacity style={styles.button} onPress={closeDrawer}>
          <Text>Close Drawer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.uploadSelfie}>
          <Text>Upload Selfie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.swipe}>
          <Text>Go to Swipe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.yourProfile}>
          <Text>Your Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.followings}>
          <Text>Followings</Text>
        </TouchableOpacity>

      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
