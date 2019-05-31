export const i18n = {
  'rawLog': 'Raw Log',
};

export function _(token: keyof typeof i18n) {
  return i18n.hasOwnProperty(token) ? i18n[token] : token;
}