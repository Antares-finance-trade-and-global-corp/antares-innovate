import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { locales } from './intlConfig';
 
export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  
  if (!locale || !locales.includes(locale)) notFound();
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
}); 