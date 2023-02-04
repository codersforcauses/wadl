// import { useUserStore } from "../../stores/user"
// import { useNuxtApp } from "#imports";

import { set } from "vue-demi"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log(body.token)
    // let token = getCookie(event, 'auth-token')

    setCookie(event, 'auth-token', body.token)
    console.log("cookie is set.")
    console.log("token = " + body.token[79] + body.token[80] + body.token[81])
    
    // console.log(token)

    return {
      api: 'works'
    }
  })