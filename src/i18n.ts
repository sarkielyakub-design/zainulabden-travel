import i18n from "i18next";

import {
  initReactI18next,
} from "react-i18next";

const resources = {

  en: {
    translation: {

      home: "Home",
      packages: "Packages",
      contact: "Contact",
      dashboard: "Dashboard",

      welcome:
        "Premium Travel Experience",

    },
  },

  ar: {
    translation: {

      home: "الرئيسية",
      packages: "الباقات",
      contact: "اتصل بنا",
      dashboard: "لوحة التحكم",

      welcome:
        "تجربة سفر مميزة",

    },
  },

  ha: {
    translation: {

      home: "Gida",
      packages: "Kunshi",
      contact: "Tuntube Mu",
      dashboard: "Dashboard",

      welcome:
        "Kwarewar Tafiya Mai Daraja",

    },
  },

};

i18n.use(
  initReactI18next
).init({

  resources,

  lng: "en",

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },

});

export default i18n;