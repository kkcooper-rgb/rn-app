import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Radio from '@ant-design/react-native/lib/radio';
import Checkbox from '@ant-design/react-native/lib/checkbox';
import Stepper from '@ant-design/react-native/lib/stepper'
// import SwipeAction from '@ant-design/react-native/lib/swipe-action'
// import List from '@ant-design/react-native/lib/list'
import Address from '../compontents/Address';

const {width} = Dimensions.get('window');
class Cart extends Component {
  state = {
    defaultPic:
      'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
    cartGoodsDetail: [],
    isCheckoutAll:false
  };
  componentDidMount() {
    this.setState({
      cartGoodsDetail: this.props.cartData.detailData,
      isCheckoutAll:this.props.cartData.detailData.length&&this.props.cartData.detailData.every(item=>{
        if(item.goods_state){
          return item
        }
      })||false
    });
  }
  handleRadioChange = (item, e) => {
    console.log(item, e, 21345);
  };
  render() {
    console.log(this.props, 'cart1234567');
    const {cartData, addDetail} = this.props;
    const {defaultPic, cartGoodsDetail,isCheckoutAll} = this.state;
    const right = [
      {
        text: 'More',
        onPress: () => console.log('more'),
        backgroundColor: 'orange',
        color: 'white',
      },
      {
        text: 'Delete',
        onPress: () => console.log('delete'),
        backgroundColor: 'red',
        color: 'white',
      },
    ]
    return (
      <View style={{display: 'flex', flex: 1, position: 'relative'}}>
        <ScrollView style={{marginBottom: 60}}>
          <View>
            <Address />
            {/* <List>
              <SwipeAction
                right={right}
                onSwipeableOpen={() => console.log('open')}
                onSwipeableClose={() => console.log('close')}>
                <List.Item extra="extra content">
                  Simple example: left and right buttons
                </List.Item>
              </SwipeAction>
            </List> */}
          </View>
          <Image
            style={{
              width,
              height: 2,
              resizeMode: 'cover',
            }}
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAPCAYAAAC7mkrEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAwODBFMjgzMkRBNjExRTg4QjZBRjY0MzUxRTNCRTY0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAwODBFMjg0MkRBNjExRTg4QjZBRjY0MzUxRTNCRTY0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDA4MEUyODEyREE2MTFFODhCNkFGNjQzNTFFM0JFNjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDA4MEUyODIyREE2MTFFODhCNkFGNjQzNTFFM0JFNjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7y1NpGAAAHNklEQVR42uyd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',
            }}
          />
          <View
            style={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 5,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
            }}>
            <Ionicons name={'star'} size={18}></Ionicons>
            <View>
              <Text style={{fontSize: 14, marginLeft: 10}}>购物车</Text>
            </View>
          </View>
          <View>
            {cartGoodsDetail.map((item, index) => {
              return (
                <View style={styles.goodsItem} key={index}>
                  <View style={styles.goodsItemLeft}>
                    <Checkbox
                      checked={item.goods_state}
                      onChange={e => {
                        console.log(item, e);
                        let newCheckData = cartGoodsDetail.map(val => {
                          if (val.goods_id === item.goods_id) {
                            val.goods_state = e.target.checked;
                          }
                          return val;
                        });
                        this.setState({
                          cartGoodsDetail: newCheckData,
                          isCheckoutAll:newCheckData.every(item=>{
                            if(item.goods_state){
                              return item
                            }
                          })
                        });
                        console.log(cartGoodsDetail, newCheckData);
                        addDetail([...newCheckData])
                      }}></Checkbox>
                    {/* <Radio checked={item.goods_state} onChange={(e)=>{
                    console.log(e);
                  }}/> */}
                    <View style={{width: 100, height: 80}}>
                      <Image
                        style={{width: 100, height: 80, resizeMode: 'cover'}}
                        source={{uri: item.goods_small_logo || defaultPic}}
                      />
                    </View>
                  </View>
                  <View style={styles.goodsItemRight}>
                    <View>
                      <Text style={{fontSize: 13}}>{item.goods_name}</Text>
                    </View>
                    <View style={styles.goodsInfoBox}>
                      <View>
                        <Text style={{fontSize: 16, color: '#c00000'}}>
                          ￥{item.goods_price}
                        </Text>
                      </View>
                      <Stepper
                        inputStyle={{maxWidth:50}}
                        min={1}
                        value={item.goods_count}
                        onChange={(val)=>{
                          console.log(val,"cccccccc");
                          let stepperData = cartGoodsDetail.map(vv=>{
                            if(vv.goods_id===item.goods_id){
                              vv.goods_count = val
                            }
                            return vv
                          })
                          console.log(cartGoodsDetail,stepperData,"ooooooo");
                          this.setState({
                            cartGoodsDetail:stepperData,
                          })
                          addDetail([...stepperData])
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
            width,
            height: 60,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{marginLeft:5}}>
            <Checkbox checked={isCheckoutAll} onChange={(e) => {
              this.setState({
                cartGoodsDetail: cartGoodsDetail.map(item=>{
                  item.goods_state = e.target.checked
                  return item
                }),
                isCheckoutAll:e.target.checked
              });
            }}>全选</Checkbox>
          </View>
          <View style={{display:'flex',flexDirection:'row'}}>
            <Text>合计:</Text>
            <Text style={{color:'#c00000',fontSize:14}}>￥{'766.00'}</Text>
          </View>
          <View style={{width:100,height:60,display:'flex',justifyContent:'center'}}>
            <Button
              title="结算"
              color="#c00000"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  goodsItem: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: '#ddd',
  },
  goodsItemLeft: {
    marginRight: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  goodsItemRight: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  goodsInfoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default connect(
  state => ({
    cartData: state.cartData,
  }),
  {
    addDetail: data => ({type: 'addDetail', data}),
  },
)(Cart);
