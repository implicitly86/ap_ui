# Awesome Project UI
__Клиентская часть приложения__
<br>Стек технологий:
1. [Vue.js](https://vuejs.org/)
1. [TypeScript](https://www.typescriptlang.org/)
1. [Node.js](https://nodejs.org/en/)

### Подготовка
Необходимо запустить серверную часть приложения [ap_backend](https://github.com/implicitly86/ap_backend)

### Сборка
Для того, что собрать проект для dev окружения необходимо в корне проекта выполнить команду
```bash
npm run build_dev
```
Для запуска приложения в dev окружении необходимо выполнить команду
```bash
npm run start
```

В папке **dist** будет находится собранный js файл приложения и файлы-ресурсы.

### Сборка в docker контейнер
В корне проекта необходимо выполнить следующие команды
1. сборка контейнера

```bash
docker build -t ap_ui .
```

1. запуск контейнера

```bash
docker run --name ap_ui -d -p 8081:8081 ap_ui
```
