###основаная логика реализации изложена в папках
&nbsp;&nbsp;&nbsp;&nbsp;-src
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -features
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -utils

###отрисовка UI в папках
&nbsp;&nbsp;&nbsp;&nbsp;-src
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-common
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-components
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-modules

###документацию по апи и список используемых библиотек можно просмотреть в файле package.json

###папка features
&nbsp;&nbsp;&nbsp;&nbsp;хранит состояние данных по редакс и асинхронные запросы на сервер по axios
&nbsp;&nbsp;&nbsp;&nbsp;состояние и логику отдельных модулей можно просмотреть по паттерну наименовании модулей
&nbsp;&nbsp;&nbsp;&nbsp;-featues
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -modulename
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -modulenameSlice.js

&nbsp;&nbsp;&nbsp;&nbsp; состояние всех модулей подключается в главном стартовом файле index.js
&nbsp;&nbsp;&nbsp;&nbsp; все асинхронные запросы осуществляются через middleware redux thunk, что позволяет использовать mutation в редаксе
&nbsp;&nbsp;&nbsp;&nbsp; детальная логика запросов прописывается в объекте extrareducers
&nbsp;&nbsp;&nbsp;&nbsp; кастомная реализация логики прописаны в объекте reducers
&nbsp;&nbsp;&nbsp;&nbsp; обратится к состоянию модуля осуществляются через useSelector
&nbsp;&nbsp;&nbsp;&nbsp; реализовать reducer-ы осуществляются через useDispatch

###папка utils
&nbsp;&nbsp;&nbsp;&nbsp; отвечает за реализацию вспомогательных функции в файле по паттерну modulename_helper.js
&nbsp;&nbsp;&nbsp;&nbsp; так же осуществляются вспомогательные функции по библиотеке ant по паттерну modulename_table.js

&nbsp;&nbsp;&nbsp;&nbsp; при осуществлению запросов на сервер, структура объектов в большинстве случаев воспроизводится через вспомогательные функции

###папка common
&nbsp;&nbsp;&nbsp;&nbsp; содержит часто используемые компоненты

###папка components
&nbsp;&nbsp;&nbsp;&nbsp; содержит общие компоненты для модулей

#####заметка:
&nbsp;&nbsp;&nbsp;&nbsp; при использовании формы или таблицы ant, получаемые данные именуются record
