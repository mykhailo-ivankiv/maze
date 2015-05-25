## Algorithm
http://habrahabr.ru/post/176671/

## TODO:

* Immutability
* System.js
* Smaller steps of algorithm.
* Animation
* Highlighting of algorithm steps.
* Descriptions and localizations.
* Localization.

## Зауваження щодо модульної системи.

Зогляду на дослідження, найбільш перспективним та багатообіцяючим рішенням буде System.js в поєднанні з JSPM системою моніторингу пакетів.
Однак на даному етапі виникають проблеми з запуском застосунку на Nodejs. (І підвантажуванням модулів з NPM).
Зогляду на це найбільш прийнятним варіатном є повернення до AMD та requireJS. Однак для комфортної роботи потрібно вирішити кілька питань. 
* Інтеграція Requirejs з Gulp.

