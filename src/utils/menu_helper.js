// отрисовка боковой меню навигации по роутам
export const setSideNavMenu = (modules) => {
  let sidenavmenu_ = {}

  modules.forEach((module) => {
    sidenavmenu_ = { ...sidenavmenu_, ...checkModule(sidenavmenu_, module) }
  })

  return Object.values(sidenavmenu_)
}

// подгонка под вложенности панели навигации
const checkModule = (menu, module) => {
  switch (module) {
    case 'Аналитические индикаторы':
      return configure(menu, 'Управление мастер-данными', module)
    case 'Показатели индикаторов':
      return configure(menu, 'Управление мастер-данными', module)
    case 'Справочники':
      return configure(menu, 'Управление мастер-данными', module)
    case 'Ремонт дорог':
      return configure(menu, 'Управление мастер-данными', module)
    case 'Роли':
      return configure(menu, 'Управление пользователями', module)
    case 'Пользователи':
      return configure(menu, 'Управление пользователями', module)
    case 'Руководители':
      return configure(menu, 'Управление информационной панелью', module)
    default:
      return menu
  }
}

// проверка дополнения модулей под одним меню навигации
// пример: Управление мастер-данными включает в себя справочники и карту ремонтных дорог
const configure = (menu, submenu, module) => {
  let item = menu[submenu]
  if (item) {
    menu = {
      ...menu,
      [submenu]: { submenu, menuitems: [...item.menuitems, module] },
    }
  } else {
    menu = { ...menu, [submenu]: { submenu, menuitems: [module] } }
  }

  return menu
}
