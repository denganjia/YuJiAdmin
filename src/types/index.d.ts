export type Routes = {
	/**
	 * @description 路由名称，用于渲染左侧菜单和面包屑
	 * @type String
	 * */
	label?: string;
	/**
	 * @description 路由的组件地址，自动从`/src/views/`目录开始拼接，例如：System/Menu/index，会拼接成`/src/views/System/Menu/index`。
	 * 							使用vite的`import.mate.global`导入`/src/views`目录下所有的index.tsx，然后进行对比绑定
	 * @type String
	 * */
	element?: string;
	/**
	 * @description 路由地址，子路由会自动拼接父路由的地址。e.p:父路由：/sys，子路由：/menu，结果：父路由：/sys，子路由：/sys/menu
	 * @type String
	 * */
	path?: string;
	/**
	 * @description 菜单的图标名称，目前只支持AntDesign的图标名称，e.p：HomeOutlined
	 * @type String
	 * */
	icon?: string;
	/**
	 * @description 子路由、子菜单
	 * @type Routes
	 * */
	children?: Routes;
	/**
	 * @description 隐藏在左侧菜单中
	 * @type Boolean
	 * */
	isHide?: boolean;
	/**
	 * @description react-router的index属性
	 * @type Boolean
	 * */
	index?: boolean;
	/**
	 *@description 路由携带的数据，注意！不是路由get或post请求数据
	 * */
	data?: {
		/**
		 *@description 当前路由要激活的菜单key，路由的path
		 * */
		activeKey?: string;
	};
}[];
