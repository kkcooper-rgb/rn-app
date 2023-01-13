const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
module.exports = {
  // 轮播图
  getBanner: baseUrl + '/home/swiperdata',
  // 导航菜单
  getCatitems: baseUrl + '/home/catitems',
  // 楼层
  getFloordata: baseUrl + '/home/floordata',
  // 商品详情
  getGoodsDetail: baseUrl + '/goods/detail',
  // 商品分类
  getCategories: baseUrl + '/categories',
  // 商品列表搜索
  getGoodsList: baseUrl + '/goods/search',
  // 获取用户token
  getUserToken: baseUrl + '/users/wxlogin',
  // 创建订单
  createOrders: baseUrl + '/my/orders/create',
  // 查看订单支付状态
  getChkOrder: baseUrl + '/my/orders/chkOrder',
  // 历史订单查询
  getOrderAll: baseUrl + '/my/orders/all',
  // 获取支付参数
  getReqUnifiedorder: baseUrl + '/my/orders/req_unifiedorder',
};
