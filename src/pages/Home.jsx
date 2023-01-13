
import React, {Component} from 'react';
import {TouchableWithoutFeedback, Image,View,StyleSheet,Dimensions,ScrollView} from 'react-native';
import Swiper from '../compontents/Swiper'
import api from '../config/api';
import {request} from '../utils/util';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipwer:[],
      navList: [],
      floorList:[]
    };
  }
  componentDidMount(){
    this.getBannerData()
    this.getCatitemsData()
    this.getFloorData()
  }
  getFloorData(){
    request(api.getFloordata).then(res=>{
      // console.log(res,"floorList");
      this.setState({
        floorList:res.message
      })
    })
  }
  getCatitemsData(){
    request(api.getCatitems).then(res=>{
      // console.log(res,"navList");
      this.setState({
        navList:res.message
      })
    })
  }
  getBannerData(){
    request(api.getBanner).then(res=>{
      // console.log(res);
      this.setState({
        swipwer:res.message
      })
    })
  }
  render() {
    const {navigation} = this.props
    const {navList,floorList,swipwer} = this.state
    return (
      <ScrollView >
        <View style={styles.swiper}>
          <Swiper swiper={swipwer} {...this.props}></Swiper>
        </View>
        <View >
          <View style={styles.navList}>
            {
              navList.map(item=>{
                return <TouchableWithoutFeedback key={item.name} onPress={()=>{
                  console.log(item);
                  if(item.name ==="分类"){
                    console.log("触发了",navigation);
                    // navigation.push("Cate")
                    navigation.replace('Main',{
                      router_key:'cate'
                    })
                  }
                }}>
                  <Image key={item.image_src} style={styles.navListImg} source={{uri: item.image_src}} />
                </TouchableWithoutFeedback>
              })
            }
          </View>
        </View>
        <View style={floorList}>
          {
            floorList.map((item,index)=>{
              return <View key={index}>
                <Image style={styles.floorTitle} source={{uri: item.floor_title.image_src}} />
                <View style={styles.floorImgBox}>
                  <View style={styles.leftImgBox}>
                    <TouchableWithoutFeedback onPress={()=>{
                      console.log(item.product_list[0]);
                      let tmp = item.product_list[0]
                      navigation.push('GoodList',{
                        query:tmp.navigator_url.split('?')[1].split('=')[1]
                      })
                    }}>
                      <Image style={{width: item.product_list[0].image_width/2,height:200}} source={{uri: item.product_list[0].image_src}} />
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={styles.rightImgBox}>
                      {
                        item.product_list.map((item2,index2)=>{
                          if(index2 !== 0){
                            return <View key={index2}>
                              <TouchableWithoutFeedback onPress={()=>{
                                console.log(item2);
                                let tmp = item2
                                navigation.push('GoodList',{
                                  query:tmp.navigator_url.split('query=')[1]
                                })
                              }}>
                              <Image style={{width: 135,height:97,marginBottom:5,marginRight:5}} source={{uri: item2.image_src}} />
                              </TouchableWithoutFeedback>
                          </View>
                          }
                        })
                      }
                  </View>
                </View>
              </View>
            })
          }
        </View>
      </ScrollView>
    );
  }
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  swiper:{
    width,
    height:200
  },
  navList:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    paddingTop:15,
    marginBottom:15,
  },
  navListImg:{
    width:64,
    height:70
  },
  floorList:{
    width
  },
  floorTitle:{
    width,
    height:30
  },
  floorImgBox:{
    display:'flex',
    flexDirection:'row',
  },
  rightImgBox:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    width:310
    // justifyContent:'space-around'
  },
  leftImgBox:{
    display:'flex',
    flexDirection:'row',
    paddingLeft:5,
    marginBottom:10,
    marginRight:5
  }
})