import React, {Component,PropTypes} from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

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

export default class ControlPanel extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func.isRequired
  };


 

  render() {
    let {closeDrawer} = this.props
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.controlText}>Control Panel</Text>
        <TouchableOpacity style={styles.button} onPress={closeDrawer}>
          <Text>Close Drawer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={closeDrawer}>
          <Text>Go to Swipe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={closeDrawer}>
          <Text>Upload Selfie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={closeDrawer}>
          <Text>Your Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}
