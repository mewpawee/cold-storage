export default async function ({ $auth, redirect }) {
  try {
    const role = await $auth.user.role
    if (role !== 'admin') {
      return redirect('/')
    }
  } catch (err) {
    return redirect('/')
  }
}
