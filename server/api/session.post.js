// import { useUserStore } from "../../stores/user"
// import { useNuxtApp } from "#imports";

import { set } from "vue-demi"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log(body.token)
    // let token = getCookie(event, 'auth-token')

    setCookie(event, 'auth-token', body.token)
    console.log("cookie is set.")
    // console.log(body.token)
    
    // console.log(token)

    return {
      api: 'works'
    }
  })