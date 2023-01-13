import { Text, StyleSheet, View,TouchableWithoutFeedback  ,Dimensions,ScrollView} from 'react-native'
import React, { Component } from 'react'
import { request } from '../utils/util';
import api from '../config/api';
import Swiper from '../compontents/Swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width,height } = Dimensions.get('window');
import {connect} from 'react-redux'

// import HTMLView from 'react-native-htmlview';
class GoodDetail extends Component {
  state = {
    goods_info:{
      pics: [],
      goods_price: '',
      goods_name: '',
      goods_introduce: ''
    },
    goods_button_info:[
      {
        title:'客服',
        icon:'headset-outline',
        buttonStyle:{
          display:'flex',
          justifyContent:'center',
          alignItems:'center', 
          width:50,
        },
        textStyle:{
          color:'#666',
          fontSize:14
        }
       
      },
      {
        title:'店铺',
        icon:'ios-file-tray-full-outline',
        buttonStyle:{
          display:'flex',
          justifyContent:'center',
          alignItems:'center', 
          width:50,
        },
        textStyle:{
          color:'#666',
          fontSize:14
        }
      },
      {
        title:'购物车',
        icon:'cart-outline',
        buttonStyle:{
          display:'flex',
          justifyContent:'center',
          alignItems:'center', 
          width:60,
        },
        textStyle:{
          color:'#666',
          fontSize:14
        }
      },
      {
        title:'加入购物车',
        buttonStyle:{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'#C00000', 
          flex:1,
          height:40,
          borderTopLeftRadius:30,
          borderBottomLeftRadius:30
        },
        textStyle:{
          color:'#fff',
          fontSize:14
        }
      },
      {
        title:'立即购买',
        buttonStyle:{
          display:'flex',
          justifyContent:'center',
          alignItems:'center', 
          height:40,
          borderTopRightRadius:30,
          borderBottomRightRadius:30,
          backgroundColor:'rgb(234, 188, 20)',
          marginRight:10,
          flex:1
        },
        textStyle:{
          color:'#fff',
          fontSize:14
        }
      },
    ]
  }
  componentDidMount(){
    this.getGoodsDetailData()
  }
  getGoodsDetailData(){
    const {route} = this.props
    console.log(this.props,api.getGoodsDetail,"this.props");
    request(`${api.getGoodsDetail}?goods_id=${route.params.goods_id}`).then(res=>{
        console.log(res,"请求到的detail");
        this.setState({
          goods_info:res.message
        })
    }).catch(error=>{
      console.log(error,"请求出错了");
    })
  }
  render() {
    console.log(this.props,"render");
    const {goods_info,goods_button_info} = this.state
    const {addDetail,navigation,cartData} = this.props
    return (
      <View style={{display:'flex', flex:1,position:'relative'}}>
        <ScrollView style={{marginBottom:60}}> 
         <View style={styles.swiper}>
            <Swiper swiper={goods_info.pics} detail={true} {...this.props}></Swiper>
          </View>
          <View style={styles['goods-info-box']}>
            <Text style={styles['price']}>￥{goods_info.goods_price}</Text>
            <View style={styles['goods-body']}>
              <View style={styles['goods-name-body']}>
                <Text style={styles['goods-name']}>{goods_info.goods_name}</Text>
              </View>
              <View style={styles['favi']}>
                <Ionicons name={'star'} size={18}></Ionicons>
                <Text>收藏</Text>
              </View>
            </View>
          </View>
          <View style={styles.yf}><Text>快递：免运费</Text></View>
          {/* <HTMLView
            value={goods_info.goods_introduce}
            stylesheet={stylesHtml}
          /> */}
          <Text>{goods_info.goods_introduce}</Text>
          
        </ScrollView>
        <View style={{position:'absolute',bottom:0,backgroundColor:'#fff',width,height:60,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
          {
            goods_button_info.map((val,ii)=>{
              return <View key={ii} style={val.buttonStyle}>
                {
                  val.icon&&<Ionicons name={val.icon} size={18} color={val.textStyle.color}></Ionicons>
                }
              <TouchableWithoutFeedback
                  onPress={()=>{
                    if(val.title === '加入购物车'){
                      console.log("购物车");
                      const goods = {
                        goods_id: this.state.goods_info.goods_id,       // 商品的Id
                        goods_name: this.state.goods_info.goods_name,   // 商品的名称
                        goods_price: this.state.goods_info.goods_price, // 商品的价格
                        goods_count: 1,                           // 商品的数量
                        goods_small_logo: this.state.goods_info.goods_small_logo, // 商品的图片
                        goods_state: true                         // 商品的勾选状态
                      }
                      let newcartData =  cartData.detailData
                      let goodsFilterData = newcartData.length&&newcartData.filter(fitem=>{
                        if(fitem.goods_id===this.state.goods_info.goods_id) {
                          return fitem.goods_count++
                        }
                      })||[]
                      if(goodsFilterData.length===0){
                        newcartData.push(goods)
                      }
                      addDetail(newcartData)
                    }else if(val.title === '购物车'){
                      // AsyncStorage.setItem('ROUTERKEY','cart')
                      navigation.replace('Main',{
                        router_key:'cart'
                      })
                    }
                  }}
                >
                  <Text style={val.textStyle}>{val.title}</Text>
                </TouchableWithoutFeedback>
            </View>
            })
          }
        </View>
      </View>
    )
  }
}
export default connect(state=>({
  cartData: state.cartData
}),{
  addDetail:data=>({type:'addDetail',data})
})(GoodDetail)
const styles = StyleSheet.create({
  swiper:{
    width,
    height:200,
    // backgroundColor:'pink'
  },
  'goods-info-box':{
    padding:10,
    paddingRight:0
  },
  'price':{
    color:'#c00000',
    fontSize:18,
    marginTop:18,
    marginBottom:18
  },
  'goods-body':{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    width,
  },
  'goods-name-body':{
    width:width-100
  },
  'goods-name':{
    fontSize:13,
    paddingRight:10
  },
  'favi':{
    width:100,
    fontSize:12,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    color:'gray'
  },
  yf:{
    fontSize:12,
     color:'gray',
     marginTop:10,
     marginBottom:10,
     paddingLeft:10
  }
})