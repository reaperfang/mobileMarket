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
			title: "店铺管理",
			icon: "shop"
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
				path: "preview",
				component: () => import("@/views/shop/shopManage/pageManage/preview"),
				name: "preview",
				meta: { title: "预览页", noCache: true },
				hidden: true
			},
			{
				path: "templateManageIndex",
				component: () => import("@/views/shop/shopManage/template/templateManageIndex"),
				name: "templateManageIndex",
				meta: { title: "页面模板", noCache: true }
			},
			{
				path: "ADManageIndex",
				component: () => import("@/views/shop/shopManage/startingAD/ADManageIndex"),
				name: "ADManageIndex",
				meta: { title: "启动广告", noCache: true }
			}
		]
	}
];
