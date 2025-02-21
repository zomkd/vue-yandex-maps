---
next:
  text: 'Установка на Vue 3 / Nuxt 3'
  link: '/guide/vue3'
---

# О проекте

Добро пожаловать в Vue Yandex Maps!

Данный проект создан на базе Yandex Maps 3.0, которые вышли в марте 2023 года.

## Текущий статус проекта
- Состояние: стабильное, нуждается в тестировании
- Набор компонентов: ✅
- Секция документации "Примеры": ✅
- Секция документации "Компоненты": ✅
- Migration Guide: ❌

### Переход 2.х в latest

Стабильная (latest) версия будет выпущена после:
- Завершения гайда по переходу на новую версию
- Проведения успешного тестирования разработчиком библиотеки на своих продакшн-проектах
- Исправления критических ошибок, найденных сообществом

**Стабильный релиз планируется в январе-феврале 2024**. 

Текущий статус библиотеки уже позволяет использовать её в продакшн-проектах.

## Установка
- [Vue 3 / Nuxt 3](/guide/vue3)
- [Vue 2 / Nuxt 2 / Nuxt Bridge](/guide/vue2)

## Что делает эта библиотека?

По сути, библиотека является обёрткой, которая упрощает работу с Картами 3.0. Она предоставляет, преимущественно,
компоненты, позволяя разработчику также управлять каждым компонентом вручную.

### Основные удобства

- Поддержаны все задокументированные компоненты из Карт 3.0
- TypeScript поддержан из коробки
- Компоненты строго-типизированы **(только Vue3+)** на основе настроек `@yandex/ymaps3-types`
- ES Modules
- Tree-Shaking
- Все инстансы YMap экспортируются в `v-model` для ручного управления и доступа
- Поддержаны все основные платформы: от Vue 2.7 до Nuxt 3
::: info Примечание
Особенности работы в Vue 2/Nuxt 2/Bridge смотрите в [секции Установки](/guide/vue2)
:::

### Отличия от старых версий
- Поддержка Vue 2 в рамках той же версии (хоть с [ограничениями](/guide/vue2))
- Поддержка Nuxt
- Типизация на основе официальной библиотеки
- Переход на ES Modules
- Отказ от Event Emmitter в пользу реактивных ref в namespace проекта
- Поддержка разных способов загрузки карты
- Загрузка карты автоматически при первом вызове компонента Карт
- Полная реактивность настроек компонентов
  - Слот Маркера также реактивен, все изменения внутри него обновляются в Картах мгновенно

### Отличия библиотеки от Vanilla API:

- Наличие компонентов с реактивными настройками и слотами
- Поддержка SSR
- Упрощенная работа с некоторыми компонентами, такими как `Clusterer` и другими
- Авто-регистрация расширений при импорте компонентов, которых нет в основной библиотеке

### Отличия библиотеки от обертки под Vue от самого Яндекса

На момент написания данной документации (октябрь 2023) Яндекс писали свою обертку под Vue. В ней предлагается
импортировать компоненты при старте проекта, глобально, в них также не поддерживался autocomplete-пропсов, SSR и многое
другое.

Данная библиотека является альтернативным проектом и с Яндексом не связана.
