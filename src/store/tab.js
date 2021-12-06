export default {
  state: {
    isCollapse: false,
    currentMenu: null,
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val){
      if (val.name === 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val
        /* 新增 tabsList */
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tabsList.push(val)
        }
      }
    },
    closeTag(state, val){
      const result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
    }
  }
}
