<template>
  <div class="l_container">
    <p class="l_title" @click="showRedDialog">基本信息：</p>
    <br />
    <div class="level_order">
      <span class="red">*</span>
      会员卡等级：{{cardData.alias}}
    </div>
    <div class="form_container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right">
        <el-form-item label="会员卡名称：" prop="name">
          <div class="input_wrap">
            <el-input v-model.trim="ruleForm.name" placeholder="请输入会员卡名称，比如金卡" :maxLength="8"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="背景设置：" prop="backgroundType">
          <el-radio v-model="ruleForm.backgroundType" label="0">背景色：</el-radio>
          <span
            :class="[item.active == '1'?'active':'','color_picker']"
            v-for="item in colors"
            :key="item.id"
            :style="{background:item.imgKey}"
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
            multiple
            :data="{json: JSON.stringify({cid: cid})}"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button
              size="small"
              type="primary"
              class="upload_btn"
              v-permission="['客户', '会员卡', '会员卡管理', '上传']"
              v-if="ruleForm.backgroundType == '1'"
            >点击上传</el-button>
          </el-upload>
          <span
            v-if="ruleForm.backgroundType == '1'"
            style="margin-left:90px; color: #ccc;font-size: 12px;"
          >像素大小控制在1000象素*600象素以下</span>
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
        <span class="red" style="color: red;">*</span>
        <p class="l_title" style="margin-left: -19px; display: inline">权益礼包（最少选1个）：</p>
        <br />
        <div style="margin-top:20px">
            <el-form-item v-if="getIndex(this.rightsList,'优先发货') !== -1" style="margin-left: 94px">
              <el-checkbox v-model="right1">优先发货</el-checkbox>
            </el-form-item>
            <el-form-item v-if="getIndex(this.rightsList,'积分回馈倍率') !== -1" style="margin-left: 94px">
              <el-checkbox v-model="right2" @change="handleCheck1">积分回馈倍率</el-checkbox>
              <div class="input_wrap3">
                <el-input placeholder="请输入数字" v-model="jfhkbl" @keyup.native="checkZero($event, jfhkbl,'jfhkbl')" :max-length="10"></el-input>
              </div>
              <span>倍</span>
              <span>（仅对登录、购买、复购以及评价情景有效）</span>
            </el-form-item>
          <el-form-item label="特权说明：" prop="explain">
            <div class="input_wrap4">
              <el-input
                type="textarea"
                :rows="5"
                :maxlength="255"
                placeholder="请输入会员卡通用的特权说明，最多不超过255个字符"
                v-model="ruleForm.explain"
              ></el-input>
            </div>
          </el-form-item>
        </div>
        <p class="l_title" style="margin-left: -19px;">领卡奖励:</p>
        <br />
        <div style="margin-left: 25px">
          <el-form-item v-if="getIndex(this.rewardList,'赠送积分') !== -1" style="margin-left: 70px">
            <el-checkbox v-model="upgrade1" @change="handleCheck2" class="marR20">赠送积分</el-checkbox>
            <span>送</span>
            <div class="input_wrap3">
              <el-input placeholder="填写数字" v-model="zsjf" @keyup.native="checkZero($event, zsjf,'zsjf')"></el-input>
            </div>
            <span>积分</span>
          </el-form-item>
          <el-form-item v-if="getIndex(this.rewardList,'赠送红包') !== -1" style="margin-left: 70px">
            <el-checkbox v-model="upgrade2" class="marR20">赠送红包</el-checkbox>
            <span>送</span>
            <div class="input_wrap3">
              <el-input placeholder="填写数字" v-model="zshb" @keyup.native="checkZero($event, zshb,'zshb')"></el-input>
            </div>
            <span>元红包1个</span>
            <!-- <div class="giftList">
              <div v-for="(item, index) in selectedReds" :key="item.id">
                <span>{{ item.name }}</span>
                <span style="margin-left:20px" class="pointer" @click="deleteRed(index)">删除</span>
              </div>
            </div> -->
          </el-form-item>
          <el-form-item v-if="getIndex(this.rewardList,'赠送赠品') !== -1" style="margin-left: 70px">
            <el-checkbox v-model="upgrade3" @change="showGiftDialog" class="fl marR20">赠送赠品</el-checkbox>
            <div class="giftList">
              <div v-for="(item, index) in selectedGifts" :key="item.id">
                <span>{{ item.goodsName }}</span>
                <el-input-number v-model="item.number" :max="10"></el-input-number>
                <span style="margin-left:20px" class="pointer" @click="deleteGift(index)">删除</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="getIndex(this.rewardList,'赠送优惠券') !== -1" style="margin-left: 70px">
            <el-checkbox v-model="upgrade4" @change="showCouponDialog" class="fl marR20">赠送优惠券</el-checkbox>
            <div class="giftList">
              <div v-for="(item, index) in selectedCoupons" :key="item.id">
                <span>{{ item.name }}</span>
                <el-input-number v-model="item.number" :max="10"></el-input-number>
                <span style="margin-left:20px" class="pointer" @click="deleteCoupon(index)">删除</span>
              </div>
            </div>
          </el-form-item>
        </div>
        <div class="line"></div>
        <p class="l_title" style="margin-left: -19px;">同步微信卡包：</p>
        <br />
        <div style="margin-left: 25px">
          <el-form-item label="是否同步到微信卡包：" prop="isSyncWechat">
            <el-radio v-model="ruleForm.isSyncWechat" label="1">是</el-radio>
            <el-radio v-model="ruleForm.isSyncWechat" label="0">否</el-radio>
          </el-form-item>
          <div v-if="ruleForm.isSyncWechat == '1'">
            <el-form-item label="使用须知：" prop="notice">
              <div class="input_wrap4" >
                <el-input
                  type="textarea"
                  :rows="5"
                  :maxlength="1024"
                  placeholder="请输入会员卡通用使用须知，最多不超过1024个汉字"
                  v-model="ruleForm.notice"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="客服电话：" prop="phone">
              <div class="input_wrap">
                <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
              </div>
            </el-form-item>
          </div>
        </div>
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
      ruleForm: {
        name: "",
        backgroundType: "0",
        receiveSetting: "0",
        isSyncWechat: "1",
        explain: "",
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
        notice: [
          { required: true, message: "请输入使用须知", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入客服电话", trigger: "blur" }
        ],
        isSyncWechat: [
          {
            required: true,
            message: "请选择是否同步到微信卡包",
            trigger: "blur"
          }
        ]
      },
      right1: "",
      right2: "",
      jfhkbl: "",
      zsjf: "",
      zshb: "",
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
      levelConditionValueDto: {},
      colors: [],
      canSubmit: true
    };
  },
  computed: {
    cid() {
      let shopInfo = JSON.parse(localStorage.getItem("shopInfos"));
      return shopInfo.id;
    }
  },
  methods: {
    checkZero(event,val,ele) {
      val = val.replace(/[^\d]/g,'');
      val = val.replace(/^0/g,'');
      this[ele] = val;
    },
    handleCheck1(val) {
      if(!val) {
        this.jfhkbl = "";
      }
    },
    handleCheck2(val) {
      if(!val) {
        this.zsjf = "";
      }
    },
    getCardInfo() {
      let id = this.$route.query.cardData.id;
      this._apis.client
        .getCardInfo({ id: id })
        .then(response => {
          response.backgroundType = typeof(response.backgroundType) == 'number' ? response.backgroundType.toString():'0';
          response.isSyncWechat = typeof(response.isSyncWechat) == 'number' ? response.isSyncWechat.toString():'1';
          response.receiveSetting = typeof(response.receiveSetting) == 'number' ? response.receiveSetting.toString():'0';
          this.ruleForm = Object.assign({}, response);
          //公共部分先清空，判读卡等级再去获取公共的部分
          this.ruleForm.explain = "";
          this.ruleForm.notice = "";
          this.ruleForm.phone = "";
          if (this.$route.query.cardData.level !== 1) {
            this.getCardPublic();
          }else{
            this.ruleForm.explain = response.explain;
            this.ruleForm.notice = response.notice;
            this.ruleForm.phone = response.phone;
          }
          //用于回显领取条件
          if (this.ruleForm.levelConditionInfoView) {
            this.currentData.conditionData = {
              name: this.ruleForm.levelConditionInfoView.name,
              value: this.ruleForm.levelConditionValueView ? this.ruleForm.levelConditionValueView.conditionValue:''
            };
            this.levelConditionValueDto.label = this.ruleForm.levelConditionInfoView.name;
          }
          this.levelConditionValueDto.conditionValue = this.ruleForm.levelConditionValueView ? this.ruleForm.levelConditionValueView.conditionValue:"";
          this.levelConditionValueDto.levelConditionId = this.ruleForm.levelConditionValueView ? this.ruleForm.levelConditionValueView.levelConditionId:'';
          //用于回显权益礼包
          if (this.ruleForm.levelRightsInfoList && this.ruleForm.levelRightsInfoList.length > 0) {
            this.ruleForm.levelRightsInfoList.map(v => {
              if (
                v.rightsInfoId == this.getId(this.rightsList, "积分回馈倍率")
              ) {
                this.right2 = true;
                this.jfhkbl = v.rightsValue;
              }
              if (v.rightsInfoId == this.getId(this.rightsList, "优先发货")) {
                this.right1 = true;
              }
            });
          }
          //用于回显领取礼包
          let redArr = [],
            giftArr = [],
            couponArr = [];
          if (this.ruleForm.upgradeRewardValueList && this.ruleForm.upgradeRewardValueList.length > 0) {
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
                this.zshb = v.giftNumber;
                // this.selectedReds.push({ name: v.giftName, id: v.giftProduct });
                // redArr.push(v.giftProduct);
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
                v.upgradeRewardInfoId ==
                this.getId(this.rewardList, "赠送优惠券")
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
          }
          this.currentData.redArr = [].concat(redArr);
          //用于回显背景
          let imgType = "0"; //设置图片类型初始为背景图
          this.colors.map(v => {
            if (v.imgUrl == this.ruleForm.background) {
              v.active = "1";
              imgType = "1";
            }
          });
          if (imgType == "1") {
            this.imageUrl = "";
          }
        })
        .catch(error => {
          console.log(error);
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
      if (Number(res.data.width) >= 1000 && Number(res.data.height) >= 600) {
        this.$notify({
          title: "警告",
          message: "尺寸应设置为宽1000像素以下，高600像素以下",
          type: "warning"
        });
      } else {
        this.imageUrl = res.data.url;
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
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
          console.log(error);
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
          console.log(error);
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
          console.log(error);
        });
    },
    showSpacialDialog(val) {
      this.dialogVisible = true;
      this.currentDialog = "createCardDialog";
      this.currentData.conditionList = this.conditionList;
      this.currentData.level = this.ruleForm.level;
    },
    showRedDialog(val) {
      if (val) {
        this.dialogVisible = true;
        this.currentDialog = "redListDialog";
      } else {
        this.dialogVisible = false;
        this.selectedReds = [];
      }
    },
    showGiftDialog(val) {
      if (val) {
        this.dialogVisible = true;
        this.currentDialog = "giftListDialog";
      } else {
        this.dialogVisible = false;
        this.selectedGifts = [];
      }
    },
    showCouponDialog(val) {
      if (val) {
        this.dialogVisible = true;
        this.currentDialog = "couponListDialog";
      } else {
        this.dialogVisible = false;
        this.selectedCoupons = [];
      }
    },
    getCondition(val) {
      this.levelConditionValueDto = Object.assign({}, val);
    },
    getSelectedCoupon(obj) {
      let arr = [];
      obj.selection.map(v => {
        let o = {};
        o.name = v.name;
        o.number = 1;
        o.id = v.id;
        arr.push(o);
      });
      this.selectedCoupons = [].concat(arr);
    },
    getSelectedRed(obj) {
      this.selectedReds = [];
      this.selectedReds.push(obj.selection);
    },
    getSelection(obj) {
      let arr = [];
      obj.selection.map(v => {
        let o = {};
        o.goodsName = v.goodsName;
        o.id = v.id;
        o.number = 1;
        arr.push(o);
      });
      this.selectedGifts = [].concat(arr);
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
        this.$set(v, "active", "0");
      });
      this.$set(item, "active", "1");
    },
    chooseImg(val) {
      if (val == 1) {
        this.colors.map(v => {
          this.$set(v, "active", "0");
        });
      }
    },
    save() {
      if(this.ruleForm.name == "") {
        this.$notify({
          title: "警告",
          message: "请输入会员卡名称",
          type: "warning"
        });
      }else if (!this.right1 && !this.right2) {
        this.$notify({
          title: "警告",
          message: "请选择一项等级权益",
          type: "warning"
        });
      }else if(this.ruleForm.explain == "") {
        this.$notify({
          title: "警告",
          message: "请输入特权说明",
          type: "warning"
        });
      }else if(this.ruleForm.isSyncWechat == "1") {
        if(this.ruleForm.notice == "") {
          this.$notify({
            title: "警告",
            message: "请输入使用须知",
            type: "warning"
          });
        }else if(this.ruleForm.phone == ""){
          this.$notify({
            title: "警告",
            message: "请输入客服电话",
            type: "warning"
          });
        }else{
          this.excuteSave();
        }
      }else {
        this.excuteSave();
      }
    },
    excuteSave() {
      if (this.ruleForm.id) {
          let formObj = {};
          formObj.id = this.ruleForm.id;
          formObj.alias = this.ruleForm.alias;
          formObj.level = this.ruleForm.level;
          formObj.name = this.ruleForm.name;
          formObj.enable = 0;
          formObj.backgroundType = this.ruleForm.backgroundType;
          formObj.receiveSetting = this.ruleForm.receiveSetting;
          formObj.isSyncWechat = this.ruleForm.isSyncWechat;
          formObj.explain = this.ruleForm.explain;
          formObj.enable = 0;
          if(formObj.receiveSetting == '0') {
            formObj.receiveConditionsRemarks = '可直接领取';
          }else{
            if(JSON.stringify(this.levelConditionValueDto) == '{}') {
              this.$notify({
                title: "警告",
                message: "请选择特定条件",
                type: "warning"
              });
              this.canSubmit = false;
            }else{
              if(this.levelConditionValueDto.label == "消费金额满") {
                this.canSubmit = true;
                formObj.receiveConditionsRemarks =
                "" +
                this.levelConditionValueDto.label +
                this.levelConditionValueDto.conditionValue + '元';
              }else if(this.levelConditionValueDto.label == "消费次数满"){
                this.canSubmit = true;
                formObj.receiveConditionsRemarks =
                "" +
                this.levelConditionValueDto.label +
                this.levelConditionValueDto.conditionValue + '次';
              }
              formObj.levelConditionValueDto = this.levelConditionValueDto;
              delete formObj.levelConditionValueDto.label;
            }
          }
          if (this.ruleForm.backgroundType == "0") {
            let colorArr = [];
            this.colors.map(v => {
              if (v.active == "1") {
                formObj.background = v.imgUrl;
                colorArr.push(v);
              }
            });
            if(colorArr.length == 0) {
              this.$notify({
                title: "警告",
                message: "请选择背景色",
                type: "warning"
              });
              this.canSubmit = false;
            }else{
              this.canSubmit = true;
            }
          } else if (this.ruleForm.backgroundType == "1") {
            if (this.imageUrl) {
              this.canSubmit = true;
              formObj.background = this.imageUrl;
            } else {
              this.$notify({
                title: "警告",
                message: "请上传背景图片",
                type: "warning"
              });
              this.canSubmit = false;
            }
          }
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
              this.canSubmit = false;
            } else {
              this.canSubmit = true;
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
          rights = rights.substring(0, rights.length - 1);
          rightsDtoList.map(v => {
            delete v.label;
          });
          let upgradeRewardDtoList = [];
          let upgradePackage = "";
          if (this.upgrade1) {
            if (this.zsjf == "") {
              this.$notify({
                title: "警告",
                message: "请输入赠送积分数",
                type: "warning"
              });
              this.canSubmit = false;
            } else {
              this.canSubmit = true;
              let upgradeParams1 = {};
              upgradeParams1.upgradeRewardInfoId = this.getId(
                this.rewardList,
                "赠送积分"
              );
              upgradeParams1.levelType = 1;
              upgradeParams1.giftNumber = this.zsjf;
              upgradeParams1.label = "赠送积分";
              upgradeParams1.giftName = "赠送积分";
              upgradeRewardDtoList.push(upgradeParams1);
              upgradePackage = upgradePackage + "赠送" + this.zsjf + "个积分,";
            }
          }
          if (this.upgrade2) {
            if (this.zshb == "") {
              this.$notify({
                title: "警告",
                message: "请输入赠送红包金额",
                type: "warning"
              });
              this.canSubmit = false;
            } else {
              this.canSubmit = true;
              let upgradeParams2 = {};
              upgradeParams2.upgradeRewardInfoId = this.getId(
                this.rewardList,
                "赠送红包"
              );
              upgradeParams2.giftNumber = this.zshb;
              upgradeParams2.label = "赠送红包";
              upgradeParams2.giftName = "赠送红包";
              upgradeRewardDtoList.push(upgradeParams2);
              upgradePackage = upgradePackage + "赠送" + this.zshb + "元红包,";
            }
          }
          if (this.upgrade3) {
            let zpNum = 0;
            if (this.selectedGifts.length == 0) {
              this.$notify({
                title: "警告",
                message: "请选择赠品",
                type: "warning"
              });
              this.canSubmit = false;
            } else {
              this.canSubmit = true;
              this.selectedGifts.map(v => {
                let obj = {};
                obj.upgradeRewardInfoId = this.getId(
                  this.rewardList,
                  "赠送赠品"
                );
                obj.giftProduct = v.id;
                obj.levelType = 1;
                obj.giftName = v.goodsName;
                obj.label = "赠送赠品";
                obj.giftNumber = v.number;
                zpNum = zpNum + v.number;
                upgradeRewardDtoList.push(obj);
              });
              upgradePackage = upgradePackage + "赠送" + zpNum + "个赠品,";
            }
          }
          if (this.upgrade4) {
            var yhzNum = 0;
            if (this.selectedCoupons.length == 0) {
              this.$notify({
                title: "警告",
                message: "请选择优惠券",
                type: "warning"
              });
              this.canSubmit = false;
            } else {
              this.canSubmit = true;
              this.selectedCoupons.map(v => {
                let obj = {};
                obj.upgradeRewardInfoId = this.getId(
                  this.rewardList,
                  "赠送优惠券"
                );
                obj.giftProduct = v.id;
                obj.levelType = 1;
                obj.giftNumber = v.number;
                yhzNum = yhzNum + v.number;
                obj.giftName = v.name;
                obj.label = "赠送优惠券";
                upgradeRewardDtoList.push(obj);
              });
              upgradePackage = upgradePackage + "赠送" + yhzNum + "张优惠券";
            }
          }
          upgradeRewardDtoList.map(v => {
            if (v.label) {
              delete v.label;
            }
          });
          formObj.upgradePackage = upgradePackage;
          formObj.rights = rights;
          if(!!this.ruleForm.notice) {
            formObj.notice = this.ruleForm.notice;
          }
          if(!!this.ruleForm.phone) {
            formObj.phone= this.ruleForm.phone;
          }
          formObj.levelRightsInfoDtoList = [].concat(rightsDtoList);
          formObj.upgradeRewardDtoList = [].concat(upgradeRewardDtoList);
          if(formObj.receiveSetting == '0') {
            this._apis.client.checkCardValue({level: formObj.level, levelConditionValueDto: null}).then((response) => {
              if(response) {
                if(!!this.canSubmit) {
                  this._apis.client
                    .editCard(formObj)
                    .then(response => {
                      this._routeTo('cardManage');
                      this.$notify({
                        title: "成功",
                        message: response,
                        type: "success"
                      });
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }else{
                  console.log('error222');
                }
              }else{
                this.$notify({
                  title: '警告',
                  message: "高等级条件数值要大于低等级的条件数值",
                  type: 'warning'
                });
              }
            }).catch((error) => {
              console.log(error);
            })
          }else{
            if(!!this.canSubmit) {
              this._apis.client
                .editCard(formObj)
                .then(response => {
                  this._routeTo('cardManage');
                  this.$notify({
                    title: "成功",
                    message: response,
                    type: "success"
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            }else{
              console.log('error');
            }
          }
        }
    },
    getColorUrl() {
      this._apis.client
        .getColorUrl({})
        .then(response => {
          this.colors = [].concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCardPublic() {
      this._apis.client
        .getCardPublic({})
        .then(response => {
          this.ruleForm.phone = response.phone;
          this.ruleForm.explain = response.explain;
          this.ruleForm.notice = response.notice;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getRightsList();
    this.getConditionList();
    this.getRewardList();
    //this.getCardInfo();
    this.getColorUrl();
  },
  mounted() {}
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
  .marR20{
    margin-right: 20px;
  }
  .l_title{
    padding-left: 20px;
  }
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
  .active {
    border: 2px solid red;
  }
}
</style>