import { connect, set } from 'mongoose'
// import mongoose from 'mongoose'

const connectMongoDB = async () => {
  const config = useRuntimeConfig()

  set('strictQuery', true)

  // TODO: Do I need to check if I already connected ?
  await connect(config.mongodbUrl)
    .catch((error) => {
      console.log('x11 error', error)
    })
}

export { connectMongoDB }
