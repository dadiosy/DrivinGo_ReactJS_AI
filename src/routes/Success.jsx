import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export default function Success() {
  const { isFinished } = useSelector(({ orderlist }) => orderlist);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation('common');

  useEffect(() => {
    if (!isFinished) {
      navigate('/');
    }
  }, []);

  return (
    <main className="flex flex-col justify-center items-center relative w-full h-screen overflow-hidden">
      <div className="relative">
        <div className="success-bg"></div>

        <img
          alt="short logo"
          src={'/assets/logos/short_secondary.png'}
          width={256}
          height={256}
        />

        <img
          alt="short logo"
          src={'/assets/logos/short_primary.png'}
          width={256}
          height={256}
          className="success-logo-primary"
        />
      </div>

      <div className="mt-24 text-center text-white">
        <h1 className="my-8 text-6xl text-center">{t('success.title')}</h1>
        <p className="text-2xl text-center">{t('success.content')}</p>
      </div>

      <img
        alt="banner"
        src={'/assets/success.png'}
        width={576}
        height={398}
        className="success-banner"
      />
    </main>
  )
}