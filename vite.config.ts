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
				// api-fox 云端mock
				target: "https://mock.apifox.cn/m1/2197634-0-default",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, "")
			}
		}
	}
});
