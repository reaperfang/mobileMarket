<!-- 订单模块基类，所有订单模块的页面都继承自此页面，共享此页面的data和方法 -->
<script>
import afterSaleDialog from './dialogs/afterSaleDialog';
import deliverGoodsDialog from './dialogs/deliverGoodsDialog';
import modifyLogisticsDialog from './dialogs/modifyLogisticsDialog';
import modifyPriceDialog from './dialogs/modifyPriceDialog';
import modifyReceivingInfoDialog from './dialogs/modifyReceivingInfoDialog';
import rejectionDialog from './dialogs/rejectionDialog';
import markDialog from './dialogs/markDialog';
import writeOffCodeDialog from './dialogs/writeOffCodeDialog';
import commentReplyDialog from './dialogs/commentReplyDialog';
import cancelOrderDialog from './dialogs/cancelOrderDialog';
import logisticsInfoDialog from './dialogs/logisticsInfoDialog';
import addRemarkDialog from './dialogs/addRemarkDialog';
import commentDialog from './dialogs/commentDialog';
import regionDialog from './dialogs/regionDialog';

import {_payModeList, _originList, _storeList, _orderStockUp, _orderConfirmReceived, _afterSaleConfirmReceived, _orderConfirmPay, _afterSaleAgree, _afterSaleCancelRequest, _orderWriteOff} from '@/api/order';
export default {
  name: 'orderBase',
  components: {
    afterSaleDialog,
    deliverGoodsDialog,
    modifyLogisticsDialog,
    modifyPriceDialog,
    modifyReceivingInfoDialog,
    rejectionDialog,
    markDialog,
    writeOffCodeDialog,
    commentReplyDialog,
    cancelOrderDialog,
    logisticsInfoDialog,
    addRemarkDialog,
    commentDialog,
    regionDialog
  },
  data() {
    return {
      currentDialog: '',  //当前弹窗
      payModeList: [],  //支付方式列表
      originList: [],  //来源渠道列表
      storeList: [],  //门店列表
    }
  },

  computed: {
    'userInfo' (){
      return this.$store.getters.userInfo
    }
  },

  methods: {

    /* 
     * 关闭弹窗,移除当前显示的弹窗组件
     */
    dialogClose() {
      this.currentDialog = '';
    },

    /* 
     * 订单确认收货
     */
    orderConfirmReceive(data) {
      this.$confirm('确认收货？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _orderConfirmReceived({id: data.id}).then(response => {
          this.$message({
            type: 'success',
            message: '确认收货成功!'
          });
          this.fetch();
          this.$emit('refresh');
        }).catch(error => {
          this.$message.error(error);
        })
      })
    },

    /* 
     * 售后确认收货
     */
    afterSaleConfirmReceive(data) {
      this.$confirm('确认收货？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _afterSaleConfirmReceived({id: data.id}).then(response => {
          this.$message({
            type: 'success',
            message: '确认收货成功!'
          });
          this.fetch();
          this.$emit('refresh');
        }).catch(error => {
          this.$message.error(error);
        })
      })
    },

    /* 
     * 确认付款
     */
    confirmPayment(data) {
      this.$confirm('确认付款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _orderConfirmPay({id: data.id}).then(response => {
          this.$message({
            type: 'success',
            message: '确认付款!'
          });
          this.fetch();
          this.$emit('refresh');
        }).catch(error => {
        this.$message.error(error);
        })
      })
    },

    /* 
     * 确认核销
     */
    confirmWriteOff(data) {
       this.$confirm('确认要核销该笔订单？核销后将不能取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _orderWriteOff({id: data.id}).then(response => {
          this.$message({
            type: 'success',
            message: '核销成功!'
          });
          this.fetch();
          this.$emit('refresh');
        }).catch(error => {
        this.$message.error(error);
        })
      })
    },

    /* 
     * 确认备货完成
     */
    confirmStockUp(data) {
      this.$confirm('确认完成备货？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _orderStockUp({id: data.id}).then(response => {
          this.$message({
            type: 'success',
            message: '备货完成!'
          });
          this.fetch();
          this.$emit('refresh');
        }).catch(error => {
          this.$message.error(error);
        })
      })
     
    },

    /* 
     * 同意售后
     */
    agreeAfterSale(data) {
       this.$confirm('确定同意?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _afterSaleAgree({rightsSn: data.rightsSn}).then(response => {
          this.$message({
            type: 'success',
            message: '成功!'
          });
          this.fetch();
          this.$emit('refresh');
        }).catch(error => {
          this.$message.error(error);
        })
      })
    },

    /* 
     * 取消申请售后
     */
    cancelApplyAfterSale(data) {
       this.$confirm('确定取消申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       _afterSaleCancelRequest({rightsSn: data.rightsSn}).then(response => {
          this.$message({
            type: 'success',
            message: '取消成功!'
          });
          this.fetch();
          this.$emit('refresh');
        }).catch(error => {
          this.$message.error(error);
        })
      })
    },

    /* 
     * 获取支付列表
     */
    getPayModeList() {
      _payModeList({}).then(response => {
        this.payModeList = response;
      }).catch(error => {
       this.$message.error(error);
      })
    },

    /* 
     * 获取渠道列表
     */
    getOriginList() {
       _originList({}).then(response => {
        this.originList = response;
      }).catch(error => {
       this.$message.error(error);
      })
    },

    /* 
     * 获取门店列表
     */
    getStoreList() {
      _storeList({}).then(response => {
        this.storeList = response;
      }).catch(error => {
       this.$message.error(error);
      })
    }
  }
}
</script>
