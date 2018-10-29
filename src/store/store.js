const store = {
  state: {

    langValue: "zh",
    token: "",
    userId: "",
    // 用户信息
    userInfo: {},
    // 分类选择索引
    sortIndex: 0,
    //  分类列表
  /*  categoryList: [
      {
        "id": "3279d98af38e4c5da55ffafdd64189e2",
        "categoryName": "Layer 1" + this.$t("messages.ChainUp")
      },
      {
        "id": "b8cdff1046e947939a0c185c7fa5c908",
        "categoryName": "Layer 2 " + this.$t("messages.ChainDown")
      },
      {"id": "607af189625c4b8e8ea24aacf3631921", "categoryName": this.$t("messages.General")},
      {
        "id": "45ff40bb26bd43b09827e9d5b0867160",
        "categoryName": this.$t("messages.Suggestions")
      },
      {"id": "8a411855750c40fda68655dfcf22c127", "categoryName": this.$t("messages.Economics")},
      {
        "id": "d20d2892428d401bbfe5c4f515e5f7c5",
        "categoryName": this.$t("messages.Wallet")
      }
    ],*/
    // 选择的分类  // 查询列表时
    categoryId: "",

    // 标签列表
    labelList: [],
    //   选择的标签  // 查询列表时
    labelId: "",

    //
    page: 1,
    pageSize: 10,

    /**
     * 分类 列表
     * */

    SubjectLists: []
  },
  mutations: {
    SET_langValue(state, str) {
      state.langValue = str
    },
    SET_token(state, str) {
      state.token = str
    },
    SET_userId(state, str) {
      state.userId = str
    },
    SET_sortIndex(state, num) {
      state.sortIndex = num
    },
    SET_userInfo(state, obj) {
      state.userInfo = obj
    },
    SET_categoryList(state, list) {
      state.categoryList = list
    },
    SET_labelList(state, list) {
      state.labelList = list
    },
    SET_page(state, list) {
      state.page = list
    },
    SET_pageSize(state, list) {
      state.pageSize = list
    },

    SET_labelId(state, str) {
      state.labelId = str
    },
    SET_categoryId(state, str) {
      state.categoryId = str
    },

    SET_SubjectLists(state, list) {
      state.SubjectLists = list
    }
  },
  actions: {}
}

export default store
