import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styles from './language-switcher.module.scss';

const LANGS = [
    { code: 'hy', label: 'ՀՀ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const router = useRouter();

    const changeLang = (lang: string) => {
        Cookies.set('lang', lang, { path: '/', expires: 365 });
        router.replace(router.asPath);
    };

    return (
        <div className={styles.switcher}>
            {LANGS.map(({ code, label }) => (
                <button
                    key={code}
                    onClick={() => changeLang(code)}
                    className={`${styles.btn} ${i18n.language === code ? styles.active : ''}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
