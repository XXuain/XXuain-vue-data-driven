// 檢查 fun
const isObject = function (obj) {
  return obj && typeof obj === 'object';
};

const Dep = function () {
  // 紀錄各個跟我相關的依賴
  // 儲存資料 一般通常會用 Arr 這邊用 set
  this.watchers = new Set();
};

Dep.prototype.add = function () {
  // 加入某個東西 this.watchers.add(xxx)
  if (Dep.watcher) this.watchers.add(Dep.watcher);
};

Dep.prototype.notify = function () {
  this.watchers.forEach((w) => {
    w.render();
  });
};
Dep.watcher = null; // default

// 註冊依賴 把 callback 丟給 watcher 讓 watcher 決定什麼時候要執行
const Watcher = function (callback) {
  this.callback = callback; // 把 render 記起來
  this.render(); // 執行
};
Watcher.prototype.render = function () {
  // 跑 render 之前 要先把 watchers 註冊進去
  // 所以 註冊點在此 把自己放到 Dep.watcher 裡
  Dep.watcher = this;
  this.callback();
};

/**
 *  觀察者模式 封裝原始資料
 *  */
const observe = function (data) {
  if (isObject(data)) {
    // 針對每個 key 做封裝
    Object.keys(data).forEach((key) => {
      let value = data[key];
      const dep = new Dep(); // 每個 key 值都有一個依賴

      // 使用 defineProperty 進行覆蓋原本資料
      Object.defineProperty(data, key, {
        get() {
          // 註冊依賴
          dep.add();
          console.log('ggggget: ', key);
          return value;
        },
        set(val) {
          value = val;
          // 通知依賴
          dep.notify();
          console.log('ssssset: ', key);
        },
      });
      // 再檢查內層是否為物件
      if (isObject(value)) observe(value);
    });
  }
  return data;
};

// 封裝 data
const origin = { first: 'Yellow', last: 'Huang' };
const data = observe(origin);

// 把事件交給 watcher
new Watcher(() => {
  document.querySelector('h1').innerHTML = `My name is ${data.first} ${data.last}`;
});
