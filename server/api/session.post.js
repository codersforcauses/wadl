import { set } from "vue-demi"

export default defineEventHandler(async (event) => {
  
  const body = await readBody(event)
  setCookie(event, 'auth-token', body.token)
  return {
    api: 'works'
  }
})