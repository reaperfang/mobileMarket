import Layout from "@/components/layout/Layout";

export default [
	{
		path: "/shop",
		component: Layout,
		redirect: {
			name: "index"
		},
		name: "shopManage",
		meta: {
			roles: ["shop"],
			title: "店铺",
			icon: "icon_shop"
		},
		children: [
			{
				path: "index",
				component: () => import("@/views/shop/shopManage/index"),
				name: "index",
				meta: { title: "店铺主页", noCache: true }
			},
			{
				path: "pageManageIndex",
				component: () => import("@/views/shop/shopManage/pageManage/pageManageIndex"),
				name: "pageManageIndex",
				meta: { title: "页面管理", noCache: true }
			},
			{
				path: "shopEditor",
				component: () => import("@/views/shop/shopManage/pageManage/shopEditor"),
				name: "shopEditor",
				meta: { title: "店铺装修编辑器", noCache: true },
				hidden: true
			},
			{
				path: "classifyEditor",
				component: () => import("@/views/shop/shopManage/pageManage/classifyEditor"),
				name: "classifyEditor",
				meta: { title: "分类编辑器", noCache: true },
				hidden: true
			},
			{
				path: "templateManageIndex",
				component: () => import("@/views/shop/shopManage/template/templateManageIndex"),
				name: "templateManageIndex",
				meta: { title: "页面模板", noCache: true }
			},
			{
				path: "templateEdit",
				component: () => import("@/views/shop/shopManage/template/templateEdit"),
				name: "templateEdit",
				meta: { title: "模板多页面装修", noCache: true },
				hidden: true
			},
			{
				path: "ADManageIndex",
				component: () => import("@/views/shop/shopManage/startingAD/ADManageIndex"),
				name: "ADManageIndex",
				meta: { title: "启动广告", noCache: true }
			},
			{
				path: "createAD",
				component: () => import("@/views/shop/shopManage/startingAD/createAD"),
				name: "createAD",
				meta: { title: "创建广告", noCache: true },
				hidden: true
			},
			{
				path: "shopNav",
				component: () => import("@/views/shop/shopManage/shopNav"),
				name: "shopNav",
				meta: { title: "店铺导航", noCache: true }
			},
			{
				path: "shopStyle",
				component: () => import("@/views/shop/shopManage/shopStyle"),
				name: "shopStyle",
				meta: { title: "店铺风格", noCache: true }
			},
			{
				path: "fileManageIndex",
				component: () => import("@/views/shop/shopManage/myFile/fileManageIndex"),
				name: "fileManageIndex",
				meta: { title: "我的文件", noCache: true }
			},
		]
	}
];
