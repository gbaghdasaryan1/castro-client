import { useTranslation } from "react-i18next";
import { withTranslations } from "@/lib/withTranslations";

export const getServerSideProps = withTranslations(['common']);

export default function Test() {
    const { t } = useTranslation('common');
    return (
        <>
            <div>
                <h1>{t('hero.title')}</h1>
                <p>{t('hero.subtitle')}</p>
            </div>
        </>
    );
}
