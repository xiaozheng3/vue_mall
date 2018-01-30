const key = "goods"

export const getLocalGoods = () =>{
    const localGoods = JSON.parse(localStorage.getItem(key) || '{}')

    return localGoods
}



export const getTotalCount = () =>{
    const localGoods = getLocalGoods()

    let totalCount = 0

    for(const key in localGoods){
        totalCount+=localGoods[key]
    }
    return totalCount
}


export const addLocalGoods = (goodsObj)=>{
    const localGoods = getLocalGoods()


    if(localGoods[goodsObj.goodsId]){
        localGoods[goodsObj.goodsId] += goodsObj.count
    }else{
        localGoods[goodsObj.goodsId] = goodsObj.count
    }

    localStorage.setItem(key,JSON.stringify(localGoods))
    return getTotalCount()
}

export const updateLocalGoods = (changedGoods)=>{
    const localGoods = getLocalGoods()

    localGoods[changedGoods.goodsId] = changedGoods.count

    localStorage.setItem(key,JSON.stringify(localGoods))

    return getTotalCount()
}

export const deleteLocalGoodsById = (goodsId)=>{
    const localGoods = getLocalGoods()

    delete localGoods[goodsId]

    localStorage.setItem(key,JSON.stringify(localGoods))

    return getTotalCount()
}