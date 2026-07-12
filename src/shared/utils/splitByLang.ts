export const splitByLang = (raw: string) => {
  const [ko, en] = raw.split(/<!--\s*en\s*-->/)
  return { ko: ko.trim(), en: (en ?? ko).trim() }
}
