import Cookies from 'js-cookie';

export function useCookiesDialog() {
  const cookiesDialogRef = useState<DialogComponent | null>(
    'cookiesDialogRef',
    () => null,
  );

  const cookieConsent = useState<{
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  }>('cookieConsent', () => ({
    necessary: false,
    analytics: false,
    marketing: false,
  }));

  const hasConsent = computed(
    () => cookieConsent.value?.analytics && cookieConsent.value?.marketing,
  );

  const consentTrigger = useScriptTriggerConsent();

  const gtm = useScriptGoogleTagManager({
    id: useRuntimeConfig().public.gtmId as string,

    onBeforeGtmStart: (gtag) => {
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
      });
    },

    scriptOptions: {
      trigger: consentTrigger,
    },
  });

  function gtag() {
    gtm.proxy.dataLayer.push(arguments);
  }

  onMounted(() => {
    const consent = Cookies.get('cookieConsent');

    if (consent) {
      cookieConsent.value = JSON.parse(consent);
    }

    if (
      cookieConsent.value?.necessary === true &&
      cookieConsent.value?.analytics === true &&
      cookieConsent.value?.marketing === true
    ) {
      acceptCookies();
    } else if (
      cookieConsent.value?.necessary === true &&
      cookieConsent.value?.analytics === false &&
      cookieConsent.value?.marketing === false
    ) {
      denyCookies();
    } else {
      cookiesDialogRef.value?.openDialog();
    }
  });

  function acceptCookies() {
    gtag('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
    });

    Cookies.set(
      'cookieConsent',
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
      }),
      { expires: 365 },
    );
    cookieConsent.value.necessary = true;
    cookieConsent.value.analytics = true;
    cookieConsent.value.marketing = true;

    consentTrigger.accept();

    cookiesDialogRef.value?.closeDialog();
  }

  function denyCookies() {
    gtag('consent', 'update', {
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
    });

    Cookies.set(
      'cookieConsent',
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
      }),
      { expires: 365 },
    );

    cookieConsent.value.necessary = true;
    cookieConsent.value.analytics = false;
    cookieConsent.value.marketing = false;

    gtm.remove();

    cookiesDialogRef.value?.closeDialog();
  }

  return {
    cookieConsent,
    cookiesDialogRef,
    hasConsent,
    acceptCookies,
    denyCookies,
  };
}
