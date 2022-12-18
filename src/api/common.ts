import { firebaseAuth } from '../app/firebase'

export const apiUrl =
  import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PRO : import.meta.env.VITE_API_URL_DEV

export const getApiConfig = async () => {
  const idToken = await firebaseAuth.currentUser?.getIdToken(true)
  return {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }
}
