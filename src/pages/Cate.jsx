import { Text, StyleSheet, View ,Dimensions,ScrollView,TouchableWithoutFeedback,Image} from 'react-native'
import React, { Component } from 'react'
import { request } from '../utils/util';
import api from '../config/api';
export default class Cate extends Component {
  state = {
    cateList:[],
    cateLevel2:[],
    active:0
  }
  componentDidMount(){
    this.getCategoriesData()
  }
  getCategoriesData(){
    request(api.getCategories).then(res=>{
      console.log(res,"分类");
      this.setState({
        cateList:res.message,
        cateLevel2:res.message[0].children
      })
    })
  }
  render() {
    const {cateList,cateLevel2,active} = this.state
    const {navigation} = this.props
    return (
      <View>
        <View style={styles.scrollViewContainer}>
          <ScrollView style={styles['left-scroll-view']}>
            {
              cateList.map((item,index)=>{
                return <TouchableWithoutFeedback key={item.cat_id} onPress={()=>{
                  this.setState({
                    active:index,
                    cateLevel2:cateList[index].children
                  })
                }}>
                <View style={[styles['left-scroll-view-item'],{backgroundColor:index===active?'#fff':'#f7f7f7', borderLeftColor:'red',borderLeftWidth:index===active?2:0}]}>
                  <Text style={styles['left-scroll-view-item']}>{item.cat_name}</Text>
                </View>
              </TouchableWithoutFeedback>
              })
            }
            
          </ScrollView>
          <ScrollView style={styles['right-scroll-view']} >
            {
              cateLevel2.map(item2=>{
                return <View key={item2.cat_id}>
                    <View >
                    <Text style={styles['cate-lv2-title']}>/ {item2.cat_name} /</Text>
                  </View>
                  <View style={styles['cate-lv3-list']}>
                    {
                      item2&&item2.children&&item2.children.length&&item2.children.map(item3=>{
                        return <TouchableWithoutFeedback key={item3.cat_id} onPress={()=>{
                         navigation.navigate({
                          name: 'GoodDetail',
                          params: { goods_id:item3.cat_id },
                          merge: true,
                        });
                        }}>
                         <View style={styles['cate-lv3-item']} >
                          <View style={{marginBottom:10}}>
                              <Image source={{uri:item3.cat_icon}} style={{with:60,height:60,resizeMode:'cover'}}></Image>
                            </View>
                            <View>
                              <Text style={{fontSize:12,textAlign:'center'}}>{item3.cat_name}</Text>
                            </View>
                         </View>
                        </TouchableWithoutFeedback>
                      })
                    }
                  </View>
                </View>
              })
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  scrollViewContainer:{
    display:'flex',
    flexDirection:'row'
  },
  'left-scroll-view':{
    width:120,
    height:windowHeight
  },
  'left-scroll-view-item':{
    lineHeight:60,
    // backgroundColor:'#f7f7f7',
    textAlign:'center',
    fontSize:12
  },
  'cate-lv2-title':{
    fontSize:12,
    fontWeight:'bold',
    textAlign:'center',
    paddingBottom:15,
    paddingTop:15
  },
  'cate-lv3-list':{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    width:windowWidth-120,
  },
  'cate-lv3-item':{
    width: 83,
    marginBottom:10,
    display:'flex',
    marginLeft:10,
    // flexDirection:'column',
    // alignItems:'center'
  },
  active:{
    backgroundColor:'#fff',
    position:'relative'
  }
})