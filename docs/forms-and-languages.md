# Формы и языки

## Новая форма

1. Создайте папку формы:

```txt
src/forms/my-form/
  index.js
  original.pdf
  pages/page1.js
```

2. В `index.js` экспортируйте объект формы:

```js
export const myForm = {
  id: "my-form",
  title: "My Form",
  defaultLanguage: "ru",
  languages: ["ru"],
  pages,
  sections,
  fields,
  templatePath,
  fontPath
};
```

3. Добавьте форму в `src/forms/registry.js`.

Бот берёт активную форму из `session.formId`. Если `formId` не задан, используется форма по умолчанию.

Для кнопки выбора формы можно использовать callback:

```js
{ text: "My Form", callback_data: "form:my-form" }
```

## Новый язык

Для быстрого добавления языка можно использовать суффиксы:

```js
{
  key: "vorname",
  label_ru: "Введите имя:",
  label_de: "Vorname:",
  help_ru: "Имя как в документе.",
  help_de: "Vorname wie im Dokument."
}
```

Для более чистой структуры можно использовать объект:

```js
{
  key: "vorname",
  label: {
    ru: "Введите имя:",
    de: "Vorname:"
  },
  help: {
    ru: "Имя как в документе.",
    de: "Vorname wie im Dokument."
  }
}
```

Варианты выбора поддерживают тот же подход:

```js
{
  value: "yes",
  label_ru: "Да",
  label_de: "Ja"
}
```

После добавления языка укажите его в форме:

```js
languages: ["ru", "de", "uk"]
```

Для кнопки выбора языка можно использовать callback:

```js
{ text: "Deutsch", callback_data: "lang:de" }
```

Тексты полей, подсказки, названия разделов и варианты кнопок проходят через `src/services/formLocalization.js`.

Системные кнопки сценария находятся в `src/services/botMessages.js`.

На первом экране бот использует callback `start_lang:<code>`, например `start_lang:de`.
