export default {
      head: {
		VERSION: "vsesion-1.0.0.1", // 版本号
		CHANNEL: "新零售", // 渠道
		KEY:"134147627CD2", // 公钥，由Leader平台系统进行分配
		VALUE:"EB24B602A9364B87AA967B7678676B84", // 私钥
		CLIENT:7 //客户端
	},
	//地图参数配置
	map: {
		url: 'https://map.qq.com/api/js?v=2.exp',
		// key: '23b66fd8d7e808965bc6730567f49a3c',
		key: '7FYBZ-SKMKW-D5HR6-RUHRK-Z76EE-DNBYL',
		plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation'],
		v: '1.4.4',
		defaultCenter: [39.9046900000,116.4071700000]
	}
}