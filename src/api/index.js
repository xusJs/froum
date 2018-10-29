import axios from "axios"
import Qs from "qs"
import config from "../config/index"


let instance = axios.create({
  headers: {'content-type': 'application/x-www-form-urlencoded', "cache-control": "no-cache"}
  // headers: {'content-type': 'application/json'}
});

// // 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  let token = localStorage.getItem("token")
  if (token) {
    config.headers.token = token;
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  // loadings.close()
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  if (response.data.code === 401) {
    //   token 失效
    localStorage.removeItem("token")

    this.$store.commit("SET_token", "")

  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error);
});

export default instance

// 注册
export const register = params => {
  return new Promise((resolve, reject) => {
    instance.post(config.api + "/user/register",
      Qs.stringify({
        email: params.email,
        nickname: params.nickname,
        password: params.password,
        username: params.username,
      }))
      .then(response => {
        resolve(response.data)
      })
  })
}
// 登录
export const login = params => {
  return new Promise((resolve, reject) => {
    instance.post(config.api + "/user/login",
      Qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
// 用户信息查询
export const user_info = params => {
  return new Promise((resolve, reject) => {
    // instance.post(config.api + "/user/info/" + params.userId, params)
    instance.post(config.api + "/user/info/",
      Qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 帖子列表
export const bbsList = params => {
  return new Promise((resolve, reject) => {
    instance.post(config.api + "/bbs/subject/list",
      Qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
  })
}

// BBS 主题列表
export const BBScategoryList = params => {
  return new Promise((resolve, reject) => {
    instance.post(config.api + "/bbs/category/list", Qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
  })
}

// BBS 标签列表
export const labelList = params => {
  return new Promise((resolve, reject) => {
    instance.post(config.api + "/bbs/label/list", Qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
  })
}

// 发布主题
export const subjectCreate = params => {
  return new Promise(resolve => {
    instance.post(config.api + "/bbs/subject/create",
      Qs.stringify({
        userId: params.userId,
        title: params.title,
        categoryId: params.categoryId,
        content: params.content,
        labelIds: JSON.stringify(params.labelIds),
      }))
      .then(response => {
        resolve(response.data)
      })
  })
}

// 主题信息
export const subjectInfo = params => {
  return new Promise(resolve => {
    instance.post(config.api + "/bbs/subject/info", Qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
  })
}

// 评论列表
export const commentList = params => {
  return new Promise(resolve => {
    instance.post(config.api + "/bbs/comment/list", Qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
  })
}

// 回复列表
export const replyList = params => {
  return new Promise(resolve => {
    instance.post(config.api + "/bbs/reply/list", Qs.stringify(params)).then(response => {
      resolve(response.data)
    })
  })
}

// 创建评论
export const createComment = params => {
  return new Promise(resolve => {
    instance.post(config.api + "/bbs/comment/create", Qs.stringify(params)).then(response => {
      resolve(response.data)
    })
  })


  /* var data = null;

   var xhr = new XMLHttpRequest();
   xhr.withCredentials = true;

   xhr.addEventListener("readystatechange", function () {
     if (this.readyState === 4) {
       console.log(this.responseText);
     }
   });

   xhr.open("POST", "http://118.24.178.135:8082/devcenter/bbs/comment/create");
   xhr.setRequestHeader("token", "eyJ0eXAiOiJKV1QiLCJhUdp5bHuQbXJ2JAS9VEy9dD04UGpfIp3ia2fUcYXTi1zxyT6fk7JTGwhqcHKha8g8X3A");
   xhr.setRequestHeader("cache-control", "no-cache");
   xhr.setRequestHeader("Postman-Token", "43b877ec-461a-42c6-957f-3c045d4fa516");

   xhr.send(data);*/
}

// 评论回复
export const commentReply = params => {
  return new Promise(resolve => {
    instance.post(config.api + "/bbs/comment/reply", Qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
  })
}

// 评论点赞
export const commentPraise = params => {
  return new Promise(resolve => {
    instance.post(config.api + "/bbs/comment/praise", Qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
  })
}

// 评论分享
export const commentShare = params => {
  return new Promise(resolve => {
    instance.post(config.api + "/bbs/comment/share", Qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
  })
}
