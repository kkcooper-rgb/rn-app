import { Text, StyleSheet,FlatList, View,TouchableWithoutFeedback,Image,ScrollView,Dimensions } from 'react-native'
import Toast from '@ant-design/react-native/lib/toast'
import React, { Component } from 'react'
import { request } from '../utils/util';
import api from '../config/api';
export default class GoodList extends Component {
  state = {
    pagesize:10,
    pagenum:1,
    goodsList: [],
    total: 0,
    defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
    isLoading:false
  }
  componentDidMount(){
    this.getGoodsListData()
  }
  getGoodsListData(isLoading){
    if(isLoading){
      this.setState({
        isLoading:true
      })
    }
    const {route} = this.props
    const {pagesize,pagenum} = this.state
    request(`${api.getGoodsList}?query=${route.params.query}&pagenum=${pagenum}&pagesize=${pagesize}`).then(res=>{
      let tmp = [...this.state.goodsList,...res.message.goods]
      this.setState({
        goodsList:tmp,
        total:res.message.total,
        isLoading:false
      })
      tmp = []
    })
  }
  handleOnRefresh=()=>{
    this.setState({
      pagenum:1,
      total:0,
      isloading:false,
      goodsList:[]
    })
    this.getGoodsListData(true)
  }
  handleOnEndReached = () =>{
    if (this.state.pagenum * this.state.pagesize >= this.state.total) return Toast.fail({
      content: '加载完毕',
      duration: 3
    }) 
    if (this.state.isloading) return
    let pagenum = this.state.pagenum+=1
    this.setState({
      pagenum
    })
    this.getGoodsListData()
  }
  render() {
    const {goodsList,defaultPic,isLoading} = this.state
    const {navigation} = this.props
    return (
      <FlatList
      onEndReached={this.handleOnEndReached}
      onRefresh={this.handleOnRefresh}
      refreshing = {isLoading}
        data={goodsList}
        renderItem={({item}) => {
          return <TouchableWithoutFeedback key={item.goods_id} onPress={()=>{
            console.log(item);
            navigation.navigate({
              name: 'GoodDetail',
              params: { goods_id:item.goods_id },
              merge: true,
            });
          }}>
            <View style={styles.goodsItem}>
              <View style={{marginRight:5}}>
                <Image style={{  width:100,height:80,resizeMode:'cover'}} source={{uri: item.goods_big_logo||item.goods_small_logo||defaultPic}} />
              </View>
              <View style={styles.goodsItemRight}>
                <View >
                  <Text style={styles.goodsName}>{item.goods_name}</Text>
                </View>
                <View style={styles.goodsInfoBox}>
                  <View >
                    <Text style={styles.goodsPrice}>￥{item.goods_price}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        }}
      />
    )
  }
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  goodsItem:{
    display:'flex',
    flexDirection:'row',
    borderBottomColor:'#ddd',
    borderBottomWidth:1,
    borderStyle:'solid'
  },
  goodsItemLeft:{
    marginRight:5
  },
  goodsItemImg:{
    width:100,
    height:80
  },
  goodsItemRight:{
    display:'flex',
    justifyContent:'space-between',
    width:width-110
  },
  goodsName:{
    fontSize:13
  },
  goodsPrice:{
    fontSize:16,
    color:'#c00000'
  }
})