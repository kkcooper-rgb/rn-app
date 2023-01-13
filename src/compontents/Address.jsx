import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Address extends Component {
  render() {
    console.log(this.props);
    // const {} = this.props
    return (
      <View>
        <Text>Address</Text>
      </View>
    )
  }
}