import { defineStore } from 'pinia';

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    currentLanguage: localStorage.getItem('language') || 'en',
    languages: {
      en: { code: 'en', name: 'English', flag: '🇺🇸' },
      ru: { code: 'ru', name: 'Русский', flag: '🇷🇺' },
      kk: { code: 'kk', name: 'Қазақша', flag: '🇰🇿' }
    }
  }),

  getters: {
    currentLanguageInfo: (state) => state.languages[state.currentLanguage],
    availableLanguages: (state) => Object.values(state.languages)
  },

  actions: {
    setLanguage(languageCode) {
      if (this.languages[languageCode]) {
        this.currentLanguage = languageCode;
        localStorage.setItem('language', languageCode);
        
        // Update document language attribute
        document.documentElement.lang = languageCode;
        
        // Dispatch custom event for components to react
        window.dispatchEvent(new CustomEvent('languageChanged', { 
          detail: { language: languageCode } 
        }));
      }
    },

    t(key, fallback = '') {
      const translations = this.getTranslations();
      return this.getNestedValue(translations, key) || fallback || key;
    },

    getTranslations() {
      const translationFiles = {
        en: () => import('@/locales/en.json'),
        ru: () => import('@/locales/ru.json'),
        kk: () => import('@/locales/kk.json')
      };

      // For now, return static translations
      // In a real app, you'd load these dynamically
      return this.getStaticTranslations();
    },

    getStaticTranslations() {
      const translations = {
        en: {
          navigation: {
            dashboard: 'Dashboard',
            employees: 'Employees',
            branches: 'Branches',
            services: 'Services',
            countries: 'Countries',
            profile: 'Profile'
          },
          common: {
            loading: 'Loading...',
            save: 'Save',
            cancel: 'Cancel',
            edit: 'Edit',
            delete: 'Delete',
            create: 'Create',
            update: 'Update',
            search: 'Search',
            filter: 'Filter',
            actions: 'Actions',
            back: 'Back',
            view: 'View',
            creating: 'Creating...',
            updating: 'Updating...'
          },
          auth: {
            login: 'Sign in',
            logout: 'Sign out',
            phone: 'Phone Number',
            password: 'Password',
            rememberMe: 'Remember me',
            forgotPassword: 'Forgot your password?'
          },
          profile: {
            title: 'Profile',
            subtitle: 'Manage your account settings and profile information',
            fullName: 'Full Name',
            email: 'Email',
            phone: 'Phone',
            company: 'Company',
            role: 'Role',
            updateProfile: 'Update Profile',
            accountSummary: 'Account Summary',
            memberSince: 'Member since'
          },
          countries: {
            title: 'Countries',
            subtitle: 'Manage countries and their multilingual names',
            addCountry: 'Add Country',
            createTitle: 'Create Country',
            createSubtitle: 'Add a new country with multilingual support',
            editTitle: 'Edit Country',
            editSubtitle: 'Update country information',
            detailsTitle: 'Country Details',
            detailsSubtitle: 'View detailed information about this country',
            name: 'Name',
            code: 'Code',
            nameEn: 'Name (English)',
            nameRu: 'Name (Russian)',
            nameKk: 'Name (Kazakh)',
            currentLanguageName: 'Name (Current Language)',
            codePlaceholder: 'e.g., USA, KZ, RU',
            namePlaceholder: 'Enter country name',
            searchPlaceholder: 'Search countries...',
            noCountries: 'No countries found',
            noCountriesDescription: 'Get started by creating your first country.',
            addFirstCountry: 'Add First Country',
            notFound: 'Country not found',
            notFoundDescription: 'The country you\'re looking for doesn\'t exist or has been deleted.',
            backToList: 'Back to Countries',
            createdAt: 'Created At',
            updatedAt: 'Updated At',
            confirmDelete: 'Are you sure you want to delete "{name}"? This action cannot be undone.',
            errors: {
              nameRequired: 'Country name is required'
            }
          },
          notifications: {
            success: {
              created: 'Successfully created',
              updated: 'Successfully updated',
              deleted: 'Successfully deleted'
            },
            error: {
              createFailed: 'Failed to create',
              updateFailed: 'Failed to update',
              deleteFailed: 'Failed to delete',
              loadFailed: 'Failed to load data',
              networkError: 'Network error occurred',
              serverError: 'Server error occurred'
            },
            messages: {
              countryCreated: 'Country has been created successfully',
              countryUpdated: 'Country has been updated successfully',
              countryDeleted: 'Country has been deleted successfully',
              countryCreateFailed: 'Failed to create country. Please try again.',
              countryUpdateFailed: 'Failed to update country. Please try again.',
              countryDeleteFailed: 'Failed to delete country. Please try again.',
              countryLoadFailed: 'Failed to load countries. Please refresh the page.'
            }
          }
        },
        ru: {
          navigation: {
            dashboard: 'Панель управления',
            employees: 'Сотрудники',
            branches: 'Филиалы',
            services: 'Услуги',
            countries: 'Страны',
            profile: 'Профиль'
          },
          common: {
            loading: 'Загрузка...',
            save: 'Сохранить',
            cancel: 'Отмена',
            edit: 'Редактировать',
            delete: 'Удалить',
            create: 'Создать',
            update: 'Обновить',
            search: 'Поиск',
            filter: 'Фильтр',
            actions: 'Действия',
            back: 'Назад',
            view: 'Просмотр',
            creating: 'Создание...',
            updating: 'Обновление...'
          },
          auth: {
            login: 'Войти',
            logout: 'Выйти',
            phone: 'Номер телефона',
            password: 'Пароль',
            rememberMe: 'Запомнить меня',
            forgotPassword: 'Забыли пароль?'
          },
          profile: {
            title: 'Профиль',
            subtitle: 'Управляйте настройками аккаунта и информацией профиля',
            fullName: 'Полное имя',
            email: 'Электронная почта',
            phone: 'Телефон',
            company: 'Компания',
            role: 'Роль',
            updateProfile: 'Обновить профиль',
            accountSummary: 'Сводка аккаунта',
            memberSince: 'Участник с'
          },
          countries: {
            title: 'Страны',
            subtitle: 'Управление странами и их многоязычными названиями',
            addCountry: 'Добавить страну',
            createTitle: 'Создать страну',
            createSubtitle: 'Добавить новую страну с многоязычной поддержкой',
            editTitle: 'Редактировать страну',
            editSubtitle: 'Обновить информацию о стране',
            detailsTitle: 'Детали страны',
            detailsSubtitle: 'Просмотр подробной информации о стране',
            name: 'Название',
            code: 'Код',
            nameEn: 'Название (английский)',
            nameRu: 'Название (русский)',
            nameKk: 'Название (казахский)',
            currentLanguageName: 'Название (текущий язык)',
            codePlaceholder: 'например, USA, KZ, RU',
            namePlaceholder: 'Введите название страны',
            searchPlaceholder: 'Поиск стран...',
            noCountries: 'Страны не найдены',
            noCountriesDescription: 'Начните с создания первой страны.',
            addFirstCountry: 'Добавить первую страну',
            notFound: 'Страна не найдена',
            notFoundDescription: 'Страна, которую вы ищете, не существует или была удалена.',
            backToList: 'Вернуться к списку стран',
            createdAt: 'Создано',
            updatedAt: 'Обновлено',
            confirmDelete: 'Вы уверены, что хотите удалить "{name}"? Это действие нельзя отменить.',
            errors: {
              nameRequired: 'Название страны обязательно'
            }
          },
          notifications: {
            success: {
              created: 'Успешно создано',
              updated: 'Успешно обновлено',
              deleted: 'Успешно удалено'
            },
            error: {
              createFailed: 'Не удалось создать',
              updateFailed: 'Не удалось обновить',
              deleteFailed: 'Не удалось удалить',
              loadFailed: 'Не удалось загрузить данные',
              networkError: 'Произошла сетевая ошибка',
              serverError: 'Произошла ошибка сервера'
            },
            messages: {
              countryCreated: 'Страна была успешно создана',
              countryUpdated: 'Страна была успешно обновлена',
              countryDeleted: 'Страна была успешно удалена',
              countryCreateFailed: 'Не удалось создать страну. Попробуйте еще раз.',
              countryUpdateFailed: 'Не удалось обновить страну. Попробуйте еще раз.',
              countryDeleteFailed: 'Не удалось удалить страну. Попробуйте еще раз.',
              countryLoadFailed: 'Не удалось загрузить страны. Обновите страницу.'
            }
          }
        },
        kk: {
          navigation: {
            dashboard: 'Басқару панелі',
            employees: 'Қызметкерлер',
            branches: 'Филиалдар',
            services: 'Қызметтер',
            countries: 'Елдер',
            profile: 'Профиль'
          },
          common: {
            loading: 'Жүктелуде...',
            save: 'Сақтау',
            cancel: 'Болдырмау',
            edit: 'Өңдеу',
            delete: 'Жою',
            create: 'Жасау',
            update: 'Жаңарту',
            search: 'Іздеу',
            filter: 'Сүзгі',
            actions: 'Әрекеттер',
            back: 'Артқа',
            view: 'Көру',
            creating: 'Жасалуда...',
            updating: 'Жаңартылуда...'
          },
          auth: {
            login: 'Кіру',
            logout: 'Шығу',
            phone: 'Телефон нөмірі',
            password: 'Құпия сөз',
            rememberMe: 'Мені есте сақта',
            forgotPassword: 'Құпия сөзді ұмыттыңыз ба?'
          },
          profile: {
            title: 'Профиль',
            subtitle: 'Тіркелгі параметрлері мен профиль ақпаратын басқарыңыз',
            fullName: 'Толық аты',
            email: 'Электрондық пошта',
            phone: 'Телефон',
            company: 'Компания',
            role: 'Рөл',
            updateProfile: 'Профильді жаңарту',
            accountSummary: 'Тіркелгі қорытындысы',
            memberSince: 'Мүше болғаннан бері'
          },
          countries: {
            title: 'Елдер',
            subtitle: 'Елдерді және олардың көптілдік атауларын басқару',
            addCountry: 'Ел қосу',
            createTitle: 'Ел жасау',
            createSubtitle: 'Көптілдік қолдауы бар жаңа ел қосу',
            editTitle: 'Елді өңдеу',
            editSubtitle: 'Ел туралы ақпаратты жаңарту',
            detailsTitle: 'Ел туралы толық ақпарат',
            detailsSubtitle: 'Ел туралы толық ақпаратты көру',
            name: 'Атауы',
            code: 'Коды',
            nameEn: 'Атауы (ағылшынша)',
            nameRu: 'Атауы (орысша)',
            nameKk: 'Атауы (қазақша)',
            currentLanguageName: 'Атауы (ағымдағы тіл)',
            codePlaceholder: 'мысалы, USA, KZ, RU',
            namePlaceholder: 'Ел атауын енгізіңіз',
            searchPlaceholder: 'Елдерді іздеу...',
            noCountries: 'Елдер табылмады',
            noCountriesDescription: 'Бірінші елді жасаудан бастаңыз.',
            addFirstCountry: 'Бірінші елді қосу',
            notFound: 'Ел табылмады',
            notFoundDescription: 'Сіз іздеп жатқан ел жоқ немесе жойылған.',
            backToList: 'Елдер тізіміне оралу',
            createdAt: 'Жасалған',
            updatedAt: 'Жаңартылған',
            confirmDelete: 'Сіз "{name}" елін жойғыңыз келе ме? Бұл әрекетті болдырмауға болмайды.',
            errors: {
              nameRequired: 'Ел атауы міндетті'
            }
          },
          notifications: {
            success: {
              created: 'Сәтті жасалды',
              updated: 'Сәтті жаңартылды',
              deleted: 'Сәтті жойылды'
            },
            error: {
              createFailed: 'Жасау сәтсіз',
              updateFailed: 'Жаңарту сәтсіз',
              deleteFailed: 'Жою сәтсіз',
              loadFailed: 'Деректерді жүктеу сәтсіз',
              networkError: 'Желі қатесі орын алды',
              serverError: 'Сервер қатесі орын алды'
            },
            messages: {
              countryCreated: 'Ел сәтті жасалды',
              countryUpdated: 'Ел сәтті жаңартылды',
              countryDeleted: 'Ел сәтті жойылды',
              countryCreateFailed: 'Елді жасау сәтсіз. Қайталап көріңіз.',
              countryUpdateFailed: 'Елді жаңарту сәтсіз. Қайталап көріңіз.',
              countryDeleteFailed: 'Елді жою сәтсіз. Қайталап көріңіз.',
              countryLoadFailed: 'Елдерді жүктеу сәтсіз. Бетті жаңартыңыз.'
            }
          }
        }
      };

      return translations[this.currentLanguage] || translations.en;
    },

    getNestedValue(obj, path) {
      return path.split('.').reduce((current, key) => current?.[key], obj);
    }
  }
});
