/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2022-05-29 13:34:49
 * @LastEditors: 张津瑞
 * @LastEditTime: 2022-05-29 13:42:13
 */
import { type UserModule } from '~/types'
import Mitt from 'mitt'
const eventHub = new Mitt();;
eventHub.$on = eventHub.on;
eventHub.$off = eventHub.off;
eventHub.$emit = eventHub.emit;
export const install: UserModule = ({ app }) => {
    app.config.globalProperties.eventHub = eventHub;
}