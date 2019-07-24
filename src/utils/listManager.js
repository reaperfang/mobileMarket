/*
 * 列表管理器类
 * 作者: 方源
 */
const EXPORT_WHITE_LIST = [];    //导出数据字段白名单

class ListManager {
  /**
   * 构造函数
   */
  constructor(id) {
    this.array = [];
    this.map = {};
  }

  /**
  * 获取链表头
  * @private
  */
  getHead() {
    return this.map[this.array[0]];
  }

  /**
  * 获取链表尾
  * @private
  */
  getTail() {
    return this.map[this.array[this.array.length - 1]];
  }

  /**
  * 根据array索引获取链表某条数据
  * @private
  */
  getByIndex(index) {
    return this.map[this.array[index]];
  }


  /**
  * 根据id获取链表某条数据
  * @private
  */
  getById(id) {
    return this.map[id];
  }

  /**
  * 根据id获取链表上一条数据
  * @private
  */
  getPrevious(id) {
    let nIndex = this.convertIdtoIndex(id);   //当前数据在列表中的索引
    return this.getByIndex(nIndex - 1);
  }

  /**
    * 根据id获取链表下一条数据
    * @private
    */
  getNext(id) {
    let nIndex = this.convertIdtoIndex(id);   //当前数据在列表中的索引
    return this.getByIndex(nIndex + 1);
  }

  /**
  * 通过id获取在array中的索引
  * @private
  */
  convertIdtoIndex(id) {
    return this.array.indexOf(id);
  }

  /**
  * 向链表头部插入
  * @private
  */
  pushToHead(data) {
    this.map[data.id] = data;
    this.array.unshift(data.id);
  }

  /**
  * 向链表尾部插入
  * @private
  */
  pushToTail(data) {
    this.map[data.id] = data;
    this.array.push(data.id);
  }

  /**
  * 删除头部数据
  * @private
  */
  popHead() {
    let id = this.array.shift();
    let node = this.map[id];
    delete this.map[id];
    return node;
  }

  /**
  * 删除尾部数据
  * @private
  */
  popTail() {
    let id = this.array.pop();
    let node = this.map[id];
    delete this.map[id];
    return node;
  }

  /**
   * 获取总个数
   * @private
   */
  getCount() {
    return this.array.length;
  }

  /**
   * 通过index删除数据,返回被删除的数据缓存
   * @private
   */
  removeByIndex(index) {
    let id = this.array[index];
    this.array.splice(index, 1);
    let node = this.map[id];
    delete this.map[id];
    return node;
  }

  /**
  * 通过id删除数据,返回被删除的数据缓存
  * @private
  */
  removeById(id) {
    let index = this.convertIdtoIndex(id);
    if (index < 0) {
      return null;
    }
    return this.removeByIndex(index);
  }

  /**
  * 清空链表并返回被清空的项
  * @private
  */
  removeAll() {
    let dataArray = [];
    for (let key in this.map) {
      dataArray.push(this.map[key]);
    }
    this.array.length = 0;
    this.map = {};
    return dataArray;
  }

  /**
  * 转置
  * @private
  */
  reverse() {
    this.array.reverse();
  }

  /**
 *	将一个数据插入到指定位置
 */
  insert(data, id, inFront) {
    let index = this.convertIdtoIndex(id);
    if (index < 0) {
      this.pushToTail(data);
      return;
    }
    if (!inFront) {
      ++index;
    }
    this.array.splice(index, 0, data.id);
    this.map[data.id] = data;
  }

  /**
 *	交换两个数据的位置
 */
  swap(id1, id2) {
    let index1 = this.convertIdtoIndex(id1);
    let index2 = this.convertIdtoIndex(id2);
    let temp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = temp;
  }

  /**
 *	将元素1移动到元素2的前面（true）或者后面（false）
 */
  moveTo(id1, id2, inFront) {
    let node1 = this.removeById(id1);
    this.insert(node1, id2, inFront);
  }

  /**
	 *	导出数据列表
	 */
  exportList() {
    let oExportList = {};
    oExportList.array = this.array;
    oExportList.map = {};
    for (let k in this.map) {
      oExportList.map[k] = {};
      for (let m in this.map[k]) {
        if (this.map[k].hasOwnProperty(m)) {
          for (let i = 0; i < EXPORT_WHITE_LIST.length; i++) {
            let sOneProperty = EXPORT_WHITE_LIST[i];
            oExportList.map[k][sOneProperty] = this.map[k][sOneProperty];
          }
        }
      }
    }
    return oExportList;

  }
};

/* 导出单例 */
var _instance;
ListManager.getInstance = function () {
  if (!_instance) {
    _instance = new ListManager();
  } else {
    _instance = _instance;
  }

  return _instance;
};
export default ListManager;