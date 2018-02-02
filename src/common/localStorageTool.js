
const key = "goods"

/**
 * 返回保存在本地的商品信息对象
 */
export const getLocalGoods = () => {
    const localGoods = JSON.parse(localStorage.getItem(key) || '{}')

    return localGoods
}

/**
 * 获取localStorage中商品的总数量
 */
export const getTotalCount = () => {
    //{"87":5,"94":2}
    const localGoods = getLocalGoods()

    let totalCount = 0
    for(const key in localGoods){
        totalCount += localGoods[key]
    }

    return totalCount
}

//goodsObj = {goodsId:"87",count:2}
/**
 * 保存数据到本地
 */
export const addLocalGoods = (goodsObj) => {
    //最终保存的格式 {"87":5,"94":2}
    const localGoods = getLocalGoods() //第一次是`{}`

    if(localGoods[goodsObj.goodsId]){//代表原先的对象中有该id
        localGoods[goodsObj.goodsId] += goodsObj.count
    }else{
        localGoods[goodsObj.goodsId] = goodsObj.count
    }

    localStorage.setItem(key,JSON.stringify(localGoods))

    //返回加入之后的总数量
    return getTotalCount()
}

/**
 * 修改本地的数据
 */
export const updateLocalGoods = (changedGoods) => {
    //取出原先存数的
    const localGoods = getLocalGoods()

    localGoods[changedGoods.goodsId] = changedGoods.count

    localStorage.setItem(key,JSON.stringify(localGoods))

    //返回加入之后的总数量
    return getTotalCount()
}

/**
 * 根据id删除localStorage中的商品
 */
export const deleteLocalGoodsById = (goodsId) => {
    //取出原先存数的
    const localGoods = getLocalGoods()

    delete localGoods[goodsId]

    localStorage.setItem(key,JSON.stringify(localGoods))

    //返回加入之后的总数量
    return getTotalCount()
}

/**
 * 根据id数组，删除对应的商品
    goodsids === [92,11]
 */
export const deleteLocalGoodsByIds = (goodsids) =>{
     //取出原先存数的
     const localGoods = getLocalGoods()
     
     goodsids.forEach(goodsid => {
        delete localGoods[goodsid]
     });

     localStorage.setItem(key,JSON.stringify(localGoods))

     //返回加入之后的总数量
     return getTotalCount()
}