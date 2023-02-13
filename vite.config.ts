import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { theme } from "antd";
import usePluginImport from "vite-plugin-importer";
const { defaultAlgorithm, defaultSeed } = theme;
const defaultMapToken = defaultAlgorithm(defaultSeed);
export default defineConfig({
	plugins: [
		react(),
		usePluginImport({
			libraryName: "@icon-park/react",
			libraryDirectory: "es/icons",
			camel2DashComponentName: false
		})
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src/")
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				modifyVars: { ...defaultMapToken },
				javascriptEnabled: true
			}
		}
	},
	build: {
		target: "esnext"
	},
	server: {
		proxy: {
			"/api": {
				// api-fox 云端mock
				target: "https://mock.apifox.cn/m1/2197634-0-default",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, "")
			}
		}
	}
});
