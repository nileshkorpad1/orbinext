import { CONSTANT } from '../constants/browser';
interface WindowNavigator extends Navigator {
	userLanguage?: string;
}

const BrowserLanguage = {
	getBrowserLanguage() {
		let userLanguage = 'en';
		const navigator: WindowNavigator = window.navigator;
		if (navigator && navigator.userLanguage) {
			userLanguage = navigator.userLanguage;
		}
		return navigator.language || userLanguage;
	},

	getPrevLanguage() {
		return localStorage ? localStorage.getItem(CONSTANT.LOCAL_STORAGE_LANG_KEY) : null;
	},

	setLanguage(lang) {
		if (localStorage) {
			localStorage.setItem(CONSTANT.LOCAL_STORAGE_LANG_KEY, lang);
			return true;
		}
		return false;
	},

	//Hide after country detection if necessary
	getUrlLanguage() {
		let urlLanguage;
		if (typeof window !== 'undefined') {
			const pathName = window.location.pathname;
			let classes = pathName.split('/');
			classes = classes.filter((v) => v !== '');
			classes = classes.filter((v) => v === 'sg' || v === 'id' || v === 'my' || v === 'en');
			urlLanguage = classes[0] ? classes[0] : null;
		}
		return urlLanguage;
	},

	getDefaultLanguage() {
		// const langSet = this.getPrevLanguage();
		const langSet = this.getUrlLanguage();
		if (langSet) {
			return langSet;
		}
		const browserLang = this.getBrowserLanguage();
		if (browserLang) {
			let language = '';
			for (let lang of CONSTANT.LANGUAGES) {
				if (lang && browserLang.includes(lang.key)) {
					language = lang.key;
					break;
				}
			}
			return language || 'en';
		}
	},
};

export default BrowserLanguage;
