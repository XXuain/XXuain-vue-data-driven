/**
 *  通用
 *  */
// 原始資料
const origin = { first: 'Yellow', last: 'Huang' };
// 檢查 fun
const isObject = function (obj) {
  return obj && typeof obj === 'object';
};

/**
 *  觀察者模式 封裝原始資料
 *  */
const observe = function (data) {
  if (isObject(data)) {
    // 針對每個 key 做封裝
    Object.keys(data).forEach((key) => {
      let value = data[key];
      // 使用 defineProperty 進行覆蓋原本資料
      Object.defineProperty(data, key, {
        get() {
          console.log('ggggget: ', key);
          return value;
        },
        set(val) {
          console.log('ssssset: ', key);
          value = val;
        },
      });
      // 再檢查內層是否為物件
      if (isObject(value)) observe(value);
    });
  }
  return data;
};

// 取用的 data 是已經經過封裝後的資料
const data = observe(origin);

// 註冊依賴 把 callback 丟給 watcher 讓 watcher 決定什麼時候要執行
const watcher = function (callback) {
  this.callback = callback;
  this.render();
};

watcher.prototype.render = function () {
  this.callback();
};

new watcher(() => {
  document.querySelector('h1').innerHTML = `My name is ${data.first} ${data.last}`;
});

// function render() {
//   document.querySelector('h1').innerHTML = `My name is ${data.first} ${data.last}`;
// }
