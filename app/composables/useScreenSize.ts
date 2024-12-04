import { useMediaQuery } from '@vueuse/core';

const iPhoneScreen = useMediaQuery(
  'only screen and (min-device-width: 320px) and (max-device-width: 667px)',
);

const isExtraSmallScreen = useMediaQuery('(min-width: 360px)');
const isSmallScreen = useMediaQuery('(min-width: 480px)');
const isMediumScreen = useMediaQuery('(min-width: 768px)');
const isLargeScreen = useMediaQuery('(min-width: 1024px)');
const isExtraLargeScreen = useMediaQuery('(min-width: 1280px)');

export function useScreenSize() {
  return {
    iPhoneScreen,
    isExtraSmallScreen,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
  };
}
