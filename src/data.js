function getWeekDays(locale) {
  let baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  let weekDays = [];
  for (let i = 0; i < 5; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: "long" }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}

export const weekDays = getWeekDays("tr-TR");

export const lessonTimes = [
  {
    s: { h: 8, m: 10 },
    e: { h: 8, m: 50 },
  },
  {
    s: { h: 9, m: 0 },
    e: { h: 9, m: 40 },
  },
  {
    s: { h: 9, m: 50 },
    e: { h: 10, m: 30 },
  },
  {
    s: { h: 10, m: 40 },
    e: { h: 11, m: 20 },
  },
  {
    s: { h: 11, m: 30 },
    e: { h: 12, m: 10 },
  },
  {
    s: { h: 12, m: 55 },
    e: { h: 13, m: 35 },
  },
  {
    s: { h: 13, m: 50 },
    e: { h: 14, m: 30 },
  },
  {
    s: { h: 14, m: 40 },
    e: { h: 15, m: 20 },
  },
];

export const lessons = [
  [
    "Matematik",
    "Matematik",
    "Edebiyat",
    "Edebiyat",
    "İngilizce",
    "İngilizce",
    "Din",
    "Coğrafya",
  ],
  [
    "Edebiyat",
    "Edebiyat",
    "Fizik",
    "Sağlık",
    "Arapça",
    "Arapça",
    "Kuran",
    "Kuran",
  ],
  [
    "Edebiyat",
    "Kuran",
    "Tarih",
    "Biyoloji",
    "Rehberlik",
    "Coğrafya",
    "İngilizce",
    "İngilizce",
  ],
  [
    "Kimya",
    "Kimya",
    "Matematik",
    "Matematik",
    "İngilizce",
    "Biyoloji",
    "Kuran",
    "Kuran",
  ],
  [
    "Matematik",
    "Matematik",
    "Fizik",
    "Tarih",
    "Arapça",
    "Arapça",
    "Beden",
    "Beden",
  ],
];
