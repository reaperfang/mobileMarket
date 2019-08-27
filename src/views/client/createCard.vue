<template>
  <div class="l_container">
    <p class="l_title">基本信息：</p>
    <br />
    <div class="level_order">
      <span class="red">*</span>
      会员卡等级：{{cardData.alias}}
    </div>
    <!-- <img src="../../assets/images/client/card.png" alt="" class="cardImg"> -->
    <div class="form_container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right">
        <el-form-item label="会员卡名称：" prop="name">
          <div class="input_wrap">
            <el-input v-model="ruleForm.name" placeholder="请输入会员卡名称，比如金卡"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="背景设置：" prop="backgroundType">
          <el-radio v-model="ruleForm.backgroundType" label="0">背景色：</el-radio>
          <!-- <colorPicker v-model="ruleForm.background"></colorPicker><br> -->
          <span
            class="color_picker"
            v-for="item in colors"
            :key="item.value"
            :style="{background:item.color,border :item.active?'2px solid red':''}"
            @click="handlePick(item)"
          ></span>
          <br />
          <el-radio
            v-model="ruleForm.backgroundType"
            label="1"
            style="margin-left: 93px"
            @change="chooseImg"
          >背景图：</el-radio>
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :limit="1"
            :data="{json: JSON.stringify({cid: 222})}"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button size="small" type="primary" class="upload_btn">点击上传</el-button>
          </el-upload>
          <img v-if="imageUrl" :src="imageUrl" class="avatar cardImg" />
          <img v-else src="../../assets/images/client/card.png" alt class="cardImg" />
        </el-form-item>
        <el-form-item label="领取条件：" prop="receiveSetting">
          <el-radio v-model="ruleForm.receiveSetting" label="0">可直接领取</el-radio>
          <br />
          <el-radio
            v-model="ruleForm.receiveSetting"
            label="1"
            style="margin-left: 93px"
            @change="showSpacialDialog"
          >满足特定条件</el-radio>
        </el-form-item>
        <div class="line"></div>
        <p class="l_title" style="margin-left: -19px;">权益礼包：</p>
        <br />
        <el-form-item label="会员卡权益:">
          <el-form-item v-if="getIndex(this.rightsList,'优先发货') !== -1">
            <el-checkbox v-model="right1">优先发货</el-checkbox>
          </el-form-item>
          <el-form-item style="margin-left: 87px" v-if="getIndex(this.rightsList,'积分回馈倍率') !== -1">
            <el-checkbox v-model="right2">积分回馈倍率</el-checkbox>
            <div class="input_wrap3">
              <el-input placeholder="请输入数字" v-model="jfhkbl"></el-input>
            </div>
            <span>倍</span>
            <span class="gray">(当前积分兑换率：1元1积分)</span>
          </el-form-item>
        </el-form-item>
        <el-form-item label="特权说明：" prop="explain">
          <div class="input_wrap4">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入该等级或会员卡通用的特权说明，最多不超过250个字符"
              v-model="ruleForm.explain"
            ></el-input>
          </div>
        </el-form-item>
        <p class="l_title" style="margin-left: -19px;">领取礼包:</p>
        <br />
        <el-form-item v-if="getIndex(this.rewardList,'赠送积分') !== -1">
          <el-checkbox v-model="upgrade1">赠送积分</el-checkbox>
          <span>送</span>
          <div class="input_wrap3">
            <el-input placeholder="填写数字" v-model="zsjf"></el-input>
          </div>
          <span>积分</span>
        </el-form-item>
        <el-form-item v-if="getIndex(this.rewardList,'赠送红包') !== -1">
          <el-checkbox v-model="upgrade2" @change="showRedDialog" class="fl">赠送红包</el-checkbox>
          <div class="giftList">
            <div v-for="(item, index) in selectedReds" :key="item.id">
              <span>{{ item.name }}</span>
              <span style="margin-left:20px" class="pointer" @click="deleteRed(index)">删除</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-if="getIndex(this.rewardList,'赠送赠品') !== -1">
          <el-checkbox v-model="upgrade3" @change="showGiftDialog" class="fl">赠送赠品</el-checkbox>
          <div class="giftList">
            <div v-for="(item, index) in selectedGifts" :key="item.id">
              <span>{{ item.goodsName }}</span>
              <el-input-number v-model="item.number"></el-input-number>
              <span style="margin-left:20px" class="pointer" @click="deleteGift(index)">删除</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-if="getIndex(this.rewardList,'赠送优惠券') !== -1">
          <el-checkbox v-model="upgrade4" @change="showCouponDialog" class="fl">赠送优惠券</el-checkbox>
          <div class="giftList">
            <div v-for="(item, index) in selectedCoupons" :key="item.id">
              <span>{{ item.name }}</span>
              <el-input-number v-model="item.number"></el-input-number>
              <span style="margin-left:20px" class="pointer" @click="deleteCoupon(index)">删除</span>
            </div>
          </div>
        </el-form-item>
        <div class="line"></div>
        <p class="l_title" style="margin-left: -19px;">同步微信卡包：</p>
        <br />
        <el-form-item label="是否同步到微信卡包：" prop="isSyncWechat">
          <el-radio v-model="ruleForm.isSyncWechat" label="1">是</el-radio>
          <el-radio v-model="ruleForm.isSyncWechat" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="使用须知：" prop="notice">
          <div class="input_wrap4">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入会员卡通用使用须知，最多不超过100字符"
              v-model="ruleForm.notice"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="客户电话：" prop="phone">
          <div class="input_wrap">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn_container midText">
      <el-button type="primary" @click="save">保 存</el-button>
      <el-button @click="_routeTo('cardManage')">返 回</el-button>
    </div>
    <component
      :is="currentDialog"
      :dialogVisible.sync="dialogVisible"
      :data="currentData"
      @getCondition="getCondition"
      @getSelectedCoupon="getSelectedCoupon"
      @getSelectedRed="getSelectedRed"
      @getSelection="getSelection"
    ></component>
  </div>
</template>
<script type="es6">
import createCardDialog from "./dialogs/createCard/createCardDialog";
import redListDialog from "./dialogs/levelInfo/redListDialog";
import giftListDialog from "./dialogs/levelInfo/giftListDialog";
import couponListDialog from "./dialogs/levelInfo/couponListDialog";
export default {
  name: "createCard",
  components: {
    createCardDialog,
    redListDialog,
    giftListDialog,
    couponListDialog
  },
  data() {
    return {
      uploadUrl: `${process.env.UPLOAD_SERVER}/web-file/file-server/api_file_remote_upload.do`,
      imageUrl: "",
      colors: [
        {
          color: "#63b359",
          value: "Color010",
          active: false
        },
        {
          color: "#2c9f67",
          value: "Color020",
          active: false
        },
        {
          color: "#509fc9",
          value: "Color030",
          active: false
        },
        {
          color: "#5885cf",
          value: "Color040",
          active: false
        },
        {
          color: "#9062c0",
          value: "Color050",
          active: false
        },
        {
          color: "#d09a45",
          value: "Color060",
          active: false
        },
        {
          color: "#e4b138",
          value: "Color070",
          active: false
        },
        {
          color: "#ee903c",
          value: "Color080",
          active: false
        },
        {
          color: "#f08500",
          value: "Color081",
          active: false
        },
        {
          color: "#a9d92d",
          value: "Color082",
          active: false
        },
        {
          color: "#dd6549",
          value: "Color090",
          active: false
        },
        {
          color: "#cc463d",
          value: "Color100",
          active: false
        },
        {
          color: "#cf3e36",
          value: "Color101",
          active: false
        },
        {
          color: "#5E6671",
          value: "Color102",
          active: false
        }
      ],
      ruleForm: {
        name: "",
        backgroundType: "",
        receiveSetting: "",
        explain: "",
        isSyncWechat: "",
        notice: "",
        phone: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入会员卡名称", trigger: "blur" },
          { max: 9, message: "不能超过9个文字", trigger: "blur" }
        ],
        backgroundType: [
          { required: true, message: "请选择背景设置", trigger: "blur" }
        ],
        receiveSetting: [
          { required: true, message: "请选择领取条件", trigger: "blur" }
        ],
        explain: [
          { required: true, message: "请输入特权说明", trigger: "blur" }
        ],
        isSyncWechat: [
          {
            required: true,
            message: "请选择是否同步到微信卡包",
            trigger: "blur"
          }
        ],
        notice: [
          { required: true, message: "请输入使用须知", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入客户电话", trigger: "blur" }]
      },
      right1: "",
      right2: "",
      jfhkbl: "",
      zsjf: "",
      upgrade1: "",
      upgrade2: "",
      upgrade3: "",
      upgrade4: "",

      currentDialog: "",
      currentData: {},
      dialogVisible: false,
      cardData: this.$route.query.cardData,
      rightsList: [],
      conditionList: [],
      rewardList: [],
      selectedCoupons: [],
      selectedGifts: [],
      selectedReds: [],
      levelConditionValueDto: {}
    };
  },
  methods: {
    getCardInfo() {
      let id = this.$route.query.cardData.id;
      this._apis.client
        .getCardInfo({ id: id })
        .then(response => {
          response.backgroundType = response.backgroundType.toString();
          response.isSyncWechat = response.isSyncWechat.toString();
          response.receiveSetting = response.receiveSetting.toString();
          this.ruleForm = Object.assign({}, response);
          //用于回显领取条件
          this.currentData.conditionData = {
            name: this.ruleForm.levelConditionInfoView.name,
            value: this.ruleForm.levelConditionValueView.conditionValue
          };
          this.levelConditionValueDto.conditionValue = this.ruleForm.levelConditionValueView.conditionValue;
          this.levelConditionValueDto.label = this.ruleForm.levelConditionInfoView.name;
          this.levelConditionValueDto.levelConditionId = this.ruleForm.levelConditionValueView.levelConditionId;
          //用于回显权益礼包
          this.ruleForm.levelRightsInfoList.map(v => {
            if (v.rightsInfoId == this.getId(this.rightsList, "积分回馈倍率")) {
              this.right2 = true;
              this.jfhkbl = v.rightsValue;
            }
            if (v.rightsInfoId == this.getId(this.rightsList, "优先发货")) {
              this.right1 = true;
            }
          });
          //用于回显领取礼包
          let redArr = [],
            giftArr = [],
            couponArr = [];
          this.ruleForm.upgradeRewardValueList.map(v => {
            if (
              v.upgradeRewardInfoId == this.getId(this.rewardList, "赠送积分")
            ) {
              this.upgrade1 = true;
              this.zsjf = v.giftNumber;
            }
            if (
              v.upgradeRewardInfoId == this.getId(this.rewardList, "赠送红包")
            ) {
              this.upgrade2 = true;
              this.selectedReds.push({ name: v.giftName, id: v.giftProduct });
              redArr.push(v.giftProduct);
            }
            if (
              v.upgradeRewardInfoId == this.getId(this.rewardList, "赠送赠品")
            ) {
              this.upgrade3 = true;
              this.selectedGifts.push({
                id: v.giftProduct,
                goodsName: v.giftName,
                number: v.giftNumber
              });
              giftArr.push(v.giftProduct);
            }
            if (
              v.upgradeRewardInfoId == this.getId(this.rewardList, "赠送优惠券")
            ) {
              this.upgrade4 = true;
              this.selectedCoupons.push({
                id: v.giftProduct,
                name: v.giftName,
                number: v.giftNumber
              });
              couponArr.push(v.giftProduct);
            }
          });
          this.currentData.redArr = [].concat(redArr);
          //用于回显背景
          if(this.ruleForm.background.length > 8) {
              this.imageUrl = this.ruleForm.background;
          }else{
              this.colors.map((v) => {
                  if(v.value == this.ruleForm.background) {
                      v.active = true;
                  }
              })
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    getIndex(arr, val) {
      let i = arr.findIndex((value, index, arr) => {
        return value.name == val;
      });
      return i;
    },
    getId(arr, val) {
      let id = "";
      arr.map(v => {
        if (v.name == val) {
          id = v.id;
        }
      });
      return id;
    },
    handleAvatarSuccess(res, file) {
      // this.fileData = res.data
      this.imageUrl = res.data.url;
    },
    beforeAvatarUpload(file) {
      //const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //     this.$message.error('上传图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    getRightsList() {
      this._apis.client
        .getRightsList({ rightsType: 1 })
        .then(response => {
          let _arr = [];
          response.map(v => {
            let _obj = {};
            _obj.name = v.name;
            _obj.id = v.id;
            _arr.push(_obj);
          });
          this.rightsList = [].concat(_arr);
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    getConditionList() {
      this._apis.client
        .levelConditionList({ type: 1 })
        .then(response => {
          let _arr = [];
          response.map(v => {
            let _obj = {};
            _obj.name = v.name;
            _obj.id = v.id;
            _arr.push(_obj);
          });
          this.conditionList = [].concat(_arr);
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    getRewardList() {
      this._apis.client
        .getRewardList({ type: 1 })
        .then(response => {
          let _arr = [];
          response.map(v => {
            let _obj = {};
            _obj.name = v.name;
            _obj.id = v.id;
            _arr.push(_obj);
          });
          this.rewardList = [].concat(_arr);
          this.getCardInfo();
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    showSpacialDialog(val) {
      this.dialogVisible = true;
      this.currentDialog = "createCardDialog";
      this.currentData.conditionList = this.conditionList;
    },
    showRedDialog(val) {
      if (val) {
        this.dialogVisible = true;
        this.currentDialog = "redListDialog";
      } else {
        this.dialogVisible = false;
      }
    },
    showGiftDialog(val) {
      if (val) {
        this.dialogVisible = true;
        this.currentDialog = "giftListDialog";
      } else {
        this.dialogVisible = false;
      }
    },
    showCouponDialog(val) {
      if (val) {
        this.dialogVisible = true;
        this.currentDialog = "couponListDialog";
      } else {
        this.dialogVisible = false;
      }
    },
    getCondition(val) {
      this.levelConditionValueDto = Object.assign({}, val);
    },
    getSelectedCoupon(obj) {
      obj.selection.map(v => {
        v.number = 1;
      });
      this.selectedCoupons = [].concat(obj.selection);
    },
    getSelectedRed(obj) {
      this.selectedReds = [].concat(obj.selection);
    },
    getSelection(obj) {
      obj.selection.map(v => {
        v.number = 1;
      });
      this.selectedGifts = [].concat(obj.selection);
    },
    deleteRed(index) {
      this.selectedReds.splice(index, 1);
    },
    deleteCoupon(index) {
      this.selectedCoupons.splice(index, 1);
    },
    deleteGift(index) {
      this.selectedGifts.splice(index, 1);
    },
    handlePick(item) {
      this.colors.map(v => {
        this.$set(v, "active", false);
      });
      this.$set(item, "active", true);
    },
    chooseImg(val) {
      if (val == 1) {
        this.colors.map(v => {
          this.$set(v, "active", false);
        });
      }
    },
    save() {
      if (this.ruleForm.id) {
        let formObj = {};
        formObj.id = this.ruleForm.id;
        formObj.alias = this.ruleForm.alias;
        formObj.level = this.ruleForm.level;
        formObj.enable = this.ruleForm.enable;
        formObj.backgroundType = this.ruleForm.backgroundType;
        formObj.receiveSetting = this.ruleForm.receiveSetting;
        formObj.isSyncWechat = this.ruleForm.isSyncWechat;
        formObj.notice = this.ruleForm.notice;
        formObj.phone = this.ruleForm.phone;
        formObj.explain = this.ruleForm.explain;
        formObj.levelConditionValueDto = this.levelConditionValueDto;
        formObj.receiveConditionsRemarks =
          "" +
          this.levelConditionValueDto.label +
          this.levelConditionValueDto.conditionValue;
        if (this.ruleForm.backgroundType == "0") {
          this.colors.map(v => {
            if (v.active) {
              formObj.background = v.value;
            }
          });
        } else if (this.ruleForm.backgroundType == "1") {
          if (this.imageUrl) {
            formObj.background = this.imageUrl;
          } else {
            this.$notify({
              title: "警告",
              message: "请上传背景图片",
              type: "warning"
            });
          }
        }
        delete formObj.levelConditionValueDto.label;
        let rightsDtoList = [];
        if (this.right1) {
          let rightParam1 = {};
          rightParam1.rightsInfoId = this.getId(this.rightsList, "优先发货");
          rightParam1.levelType = 1;
          rightParam1.label = "优先发货";
          rightsDtoList.push(rightParam1);
        }
        if (this.right2) {
          if (this.jfhkbl == "") {
            this.$notify({
              title: "警告",
              message: "请输入积分回馈倍率数",
              type: "warning"
            });
          } else {
            let rightParam2 = {};
            rightParam2.rightsInfoId = this.getId(
              this.rightsList,
              "积分回馈倍率"
            );
            rightParam2.levelType = 1;
            rightParam2.rightsValue = this.jfhkbl;
            rightParam2.label = "积分回馈倍率";
            rightsDtoList.push(rightParam2);
          }
        }
        let rights = "";
        rightsDtoList.map(v => {
          rights += "" + v.label + v.rightsValue + ",";
        });
        rights = rights.replace(/undefined/g, "");
        rightsDtoList.map(v => {
          delete v.label;
        });
        let upgradeRewardDtoList = [];
        if (this.upgrade1) {
          if (this.zsjf == "") {
            this.$notify({
              title: "警告",
              message: "请输入赠送积分数",
              type: "warning"
            });
          } else {
            let upgradeParams1 = {};
            upgradeParams1.upgradeRewardInfoId = this.getId(
              this.rewardList,
              "赠送积分"
            );
            upgradeParams1.levelType = 1;
            upgradeParams1.giftNumber = this.zsjf;
            upgradeParams1.label = "赠送积分";
            upgradeRewardDtoList.push(upgradeParams1);
          }
        }
        if (this.upgrade2) {
          if (this.selectedReds.length == 0) {
            this.$notify({
              title: "警告",
              message: "请选择红包",
              type: "warning"
            });
          } else {
            this.selectedReds.map(v => {
              let obj = {};
              obj.upgradeRewardInfoId = this.getId(this.rewardList, "赠送红包");
              obj.levelType = 1;
              obj.giftName = v.name;
              obj.giftProduct = v.id;
              obj.label = "赠送红包";
              upgradeRewardDtoList.push(obj);
            });
          }
        }
        if (this.upgrade3) {
          if (this.selectedGifts.length == 0) {
            this.$notify({
              title: "警告",
              message: "请选择赠品",
              type: "warning"
            });
          } else {
            this.selectedGifts.map(v => {
              let obj = {};
              obj.upgradeRewardInfoId = this.getId(this.rewardList, "赠送赠品");
              obj.giftProduct = v.id;
              obj.levelType = 1;
              obj.giftName = v.goodsName;
              obj.label = "赠送赠品";
              obj.giftNumber = v.number;
              upgradeRewardDtoList.push(obj);
            });
          }
        }
        if (this.upgrade4) {
          if (this.selectedCoupons.length == 0) {
            this.$notify({
              title: "警告",
              message: "请选择优惠券",
              type: "warning"
            });
          } else {
            this.selectedCoupons.map(v => {
              let obj = {};
              obj.upgradeRewardInfoId = this.getId(
                this.rewardList,
                "赠送优惠券"
              );
              obj.giftProduct = v.id;
              obj.levelType = 1;
              obj.giftNumber = v.number;
              obj.giftName = v.name;
              obj.label = "赠送优惠券";
              upgradeRewardDtoList.push(obj);
            });
          }
        }
        let upgradePackage = "";
        let upgradeArr = [];
        upgradeRewardDtoList.map(v => {
          if (upgradeArr.indexOf(v.label) == -1) {
            upgradeArr.push(v.label);
            upgradePackage += "" + v.label + ",";
          }
        });
        upgradePackage = upgradePackage.replace(/undefined/g, "");
        upgradeRewardDtoList.map(v => {
          if (v.label) {
            delete v.label;
          }
        });
        formObj.upgradePackage = upgradePackage;
        formObj.rights = rights;
        formObj.levelRightsInfoDtoList = [].concat(rightsDtoList);
        formObj.upgradeRewardDtoList = [].concat(upgradeRewardDtoList);
        //console.log(formObj);
        this._apis.client
          .editCard(formObj)
          .then(response => {
            this.$notify({
              title: "成功",
              message: "编辑成功",
              type: "success"
            });
          })
          .catch(error => {
            this.$notify.error({
              title: "错误",
              message: error
            });
          });
      }
    }
  },
  created() {
    this.getRightsList();
    this.getConditionList();
    this.getRewardList();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-upload {
  height: 30px !important;
  line-height: 30px !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.l_container {
  padding: 20px;
  background-color: #fff;
  position: relative;
  .cardImg {
    width: 324px;
    height: 140px;
    position: absolute;
    right: 20px;
    top: 40px;
  }
  .level_order {
    color: #3d434a;
    margin: 20px;
    .red {
      color: #fd4c2b;
    }
  }
  .icon_title {
    float: left;
    margin: 17px 0 0 30px;
    color: #44434b;
  }
  .upload_btn {
    float: left;
    margin: 8px 0 0 13px;
  }
  .l_warn {
    color: #92929b;
    font-size: 12px;
  }
  .level_icon {
    float: left;
    width: 45px;
    height: 45px;
    display: block;
    background-color: #eee;
    border-radius: 22.5px;
  }
  .form_container {
    color: #44434b;
    padding: 0 20px;
    .input_wrap {
      width: 338px;
      display: inline-block;
    }
    .input_wrap2 {
      width: 160px;
      display: inline-block;
      .color_block {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-color: #fd4c2b;
      }
    }
    .input_wrap3 {
      width: 100px;
      display: inline-block;
    }
    .input_wrap4 {
      width: 588px;
      display: inline-block;
    }
    .line {
      height: 1px;
      border-bottom: 1px dashed #d3d3d3;
      margin-bottom: 18px;
    }
    .radio_line {
      margin: 0 0 10px 20px;
    }
    .giftList {
      float: left;
      width: 500px;
      margin-left: 10px;
      > div {
        margin-bottom: 10px;
      }
    }
    .color_picker {
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      display: inline-block;
    }
    .upload_btn {
      margin-left: 90px;
    }
  }
}
</style>