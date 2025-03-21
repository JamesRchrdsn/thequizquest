// src/i18n/request.ts

type Messages = Record<string, string | Record<string, string>>;

export default function getRequestConfig({ locale }: { locale: string }) {
  const finalLocale = locale ?? "fr";

  return {
    locale: finalLocale,

    messages: async (): Promise<Messages> => {
      return (await import(`../../data/messages/${finalLocale}.json`)).default;
    },
  };
}
