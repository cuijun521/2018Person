var Mock = require('mockjs')
const List = [];
for (let i=0; i < 100; i++) {
  List.push(
    Mock.mock({
        title: Mock.Random.ctitle(),
        des: Mock.Random.csentence(),
        'price|10-1000.2': 1,
        imgUrl: Mock.Random.image('160x160'),
        'id|+1': 1
    })
  )
}
const productList = [
  {
    title: '乐纯三三三倍酸奶·经典 135g',
    mTitle: '三倍鲜牛奶 · 三倍乳酸菌 · 三倍优质蛋白',
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list': List.filter((item,index) => {
       return index < 20
    })
  },
  {
    title: '乐纯三三三倍酸奶·经典 135g',
    mTitle: '三倍鲜牛奶 · 三倍乳酸菌 · 三倍优质蛋白',
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list': List.filter((item,index) => {
       return index < 10
    })
  },
  {
    title: '乐纯三三三倍酸奶·经典 135g',
    mTitle: '三倍鲜牛奶 · 三倍乳酸菌 · 三倍优质蛋白',
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list': List.filter((item,index) => {
       return index < 4
    })
  },
  {
    title: '乐纯三三三倍酸奶·经典 135g',
    mTitle: '三倍鲜牛奶 · 三倍乳酸菌 · 三倍优质蛋白',
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list': List.filter((item,index) => {
       return index < 2
    })
  },
];

module.exports = {
  "/api/getProductList": {
    methods: "get",
    success: function (req, res) {
      res.json(productList)
    }
  },
  "/api/login": {
    methods: "post",
    success: function (req, res) {
      res.json([
        {name: 'aaaa', price: '123123', des: '1231231'}
      ])
    }
  },
}