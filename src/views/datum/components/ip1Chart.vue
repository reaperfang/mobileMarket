/* 身份属性属性比例图表 */
<script type='es6'>
import chartBase from "@/components/ChartBase";

export default {
  name: "ip1Chart",
  extends: chartBase,
  data() {
    return {
      flow:[]
    };
  },
  created() {
  },
  methods: {
    con(n){
      this.flow = n;
      this.makeOption(n);
      this.oChart.setOption(this.option, true);
    },
    //设置图表数据项
    makeOption(data) {
      this.option = {
        title: {
         text: "某站点用户访问来源",
         subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          x: "right",
         data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: true },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "left",
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.flow
          }
        ]
      };
    }
  },
  components: {}
};
</script>
