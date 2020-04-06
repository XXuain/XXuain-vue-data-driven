/**
 *  通用
 *  */
// 原始資料
const origin = { first: 'Yellow', last: 'Huang' }
// 檢查 fun
const isObject = function (obj) {
    return obj && typeof obj === 'object'
}

/**
 *  觀察者模式
 *  */
// 封裝 fun
// const defineProperty = function (data, key) {
//     let value = data[key]
//     // 覆蓋原本資料
//     Object.defineProperty(data, key, {
//         get() {
//             console.log('ggggget: ', key)
//             return value
//         },
//         set(val) {
//             console.log('ssssset: ', key)
//             value = val
//         },
//     })
//     // 再檢查內層是否為物件
//     if (isObject(value)) observe(value)
// }
const observe = function (data) {
    if (isObject(data)) {
        // 針對每個 key 做封裝
        Object.keys(data).forEach((key) => {
            let value = data[key]
            // 使用 defineProperty 進行覆蓋原本資料
            Object.defineProperty(data, key, {
                get() {
                    console.log('ggggget: ', key)
                    return value
                },
                set(val) {
                    console.log('ssssset: ', key)
                    value = val
                },
            })
            // 再檢查內層是否為物件
            if (isObject(value)) observe(value)
        })
    }
    return data
}
const data = observe(origin)

function render() {
    document.querySelector('h1').innerHTML = `My name is ${data.first} ${data.last}`
}

render()
