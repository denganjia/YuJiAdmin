import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "@/locales/modules";

i18next.use(initReactI18next).init({
	fallbackLng: "zh",
	lng: "zh",
	debug: true,
	resources: resources,
	interpolation: {
		escapeValue: false
	}
});

export default i18next;
