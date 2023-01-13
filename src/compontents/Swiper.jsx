import {StyleSheet, Dimensions, Image,Text, TouchableWithoutFeedback } from 'react-native';
import React, {Component} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
export default class Swiper extends Component {
  state = {
    defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
  }
  render() {
    const {swiper,navigation,detail} = this.props;
    const {defaultPic} = this.state
    return (
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        showPagination
        paginationActiveColor="#C00000"
        paginationDefaultColor="#f6f6f6"
        data={swiper}
        renderItem={({item}) => {
          if(!detail){
            return <TouchableWithoutFeedback  onPress={()=>{
              navigation.navigate({
                name: 'GoodDetail',
                params: { goods_id:item.goods_id },
                merge: true,
              });
            }}>
              <Image style={styles.swiperImg} source={{uri: item.image_src||defaultPic}} />
            </TouchableWithoutFeedback>
          }
          return <Image style={styles.swiperImg} source={{uri: item.pics_big||defaultPic}} />
        }}
      />
    );
  }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  swiperImg: {
    width,
    height: 200,
    resizeMode:'cover'
  },
});
