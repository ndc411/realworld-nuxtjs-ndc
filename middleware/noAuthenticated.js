/**
 Created by dechuan on 2021/02/25 00
 */
/**
 * 验证是否登录的中间件
 */
export default function ({ store, redirect }) {
  // If the user is authenticated
  if (store.state.user) {
    return redirect('/')
  }
}

