import i18n from 'i18next';
import Backend from 'i18next-locize-backend';
import { initReactI18next } from 'react-i18next';

const locizeOptions = {
	projectId: 'dbf9d135-1eea-4f2e-b32e-dae94d232be3',
	apiKey: '03979ad3-cf6c-450d-9d26-993f444319da',
	referenceLng: 'en',
};

i18n.use(Backend)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		saveMissing: true,
		react: {
			useSuspense: false,
			wait: true,
		},
		keySeparator: false,
		nsSeparator: false,

		backend: locizeOptions,
	});

export default i18n;
