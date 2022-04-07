import Vant from 'vant'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(Vant)
}
