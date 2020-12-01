export const setSideNavMenu = (modules) => {
  let sidenavmenu_ = {}

  modules.forEach((module) => {
    sidenavmenu_ = { ...sidenavmenu_, ...checkModule(sidenavmenu_, module) }
  })

  return Object.values(sidenavmenu_)
}

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

const configure = (menu, submenu, module) => {
  // console.log(menu)
  let item = menu[submenu]
  if (item) {
    menu = {
      ...menu,
      [submenu]: { ...item, menuitems: [...item.menuitems], module },
    }
  } else {
    menu = { ...menu, [submenu]: { submenu, menuitems: [module] } }
  }

  return menu
}
