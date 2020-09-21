import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
const TranslateText = (key) => {
	const { t } = useTranslation();
	return parse(t(key));
};
export default TranslateText;
