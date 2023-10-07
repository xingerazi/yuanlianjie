import Mock from 'mockjs'

let goodsList = []
for (let i = 0; i < 4; i++) {
  goodsList.push(
    Mock.mock({
      name: Mock.Random.ctitle(2, 6),
      image: Mock.Random.image('200x200', '#4A7BF7', 'Asset'),
      issuer: Mock.Random.cname(),
      issuanceDate: Mock.Random.date(),
      introduction: Mock.Random.csentence(8, 20),
      likes: Mock.Random.integer(0, 1000),
      price: Mock.Random.float(0, 100000, 0, 2),
      remaining: Mock.Random.integer(0, 100)
    })
  )
}

export default {
  getAssetsList: () => {
    return {
      code: 20000,
      data: goodsList
    }
  }
}
