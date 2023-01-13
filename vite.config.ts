import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src/")
		}
	},
	build: {
		target: "esnext"
	},
	server: {
		proxy: {
			"/api": {
				// 测试
				target: "http://192.168.0.61:22102",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, "")
			}
		}
	}
});
