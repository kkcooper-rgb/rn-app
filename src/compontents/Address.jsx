import { Text,Button, View ,StyleSheet} from 'react-native'
import React, { Component } from 'react'

export default class Address extends Component {
  render() {
    console.log(this.props);
    // const {} = this.props
    return (
      <View style={styles['address-choose-box']}>
        <Button
          onPress={()=>{}}
          title="请选择收货地址+"
          color="#c00000"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  'address-choose-box':{
    height:90,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  }
})