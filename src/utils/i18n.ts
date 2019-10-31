export const i18n = {
  'rawLog': 'Raw Log',
  'top': 'Top',
};

export function _(token: keyof typeof i18n) {
  return i18n.hasOwnProperty(token) ? i18n[token] : token;
}