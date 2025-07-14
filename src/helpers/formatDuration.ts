import type { TranslateFn } from "../i18n/utils";



export const formatDuration =
  (t: TranslateFn) =>
  (ms: number): string => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => {
      const tkey = `${key}${val !== 1 ? 's' : ''}`;

      return t(`format.${tkey}` as 'format.minutes', { [tkey]: val.toString() })
    })[0]
    // .join(', ');
};
