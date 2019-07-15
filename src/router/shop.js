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
			},
		]
	}
];
