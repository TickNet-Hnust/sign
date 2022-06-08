/*
 * @Description:
 * @Author: caojun
 * @Date: 2022-05-02 10:21:22
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-08 13:06:16
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'
const QRCodeKey = 'qrCode'
const SpaceIdKey = 'spaceId'
const SignIdKey = 'signId'


export function getToken() {
  return Cookies.get(TokenKey)
}
// { expires: 7 }
export function setToken(token: string) {
  return Cookies.set(TokenKey, token)//设置cookie7天过期
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getSpaceId() {
  return Cookies.get(SpaceIdKey)
}

export function setSpaceId(spaceId: String) {
  return Cookies.set(SpaceIdKey, spaceId)
}

export function removeSpaceId() {
  return Cookies.remove(SpaceIdKey)
}

export function getQRCode() {
  return Cookies.get(QRCodeKey)
}

export function setQRCode(qrCode: String) {
  return Cookies.set(QRCodeKey, qrCode)
}

export function removeQRCode() {
  return Cookies.remove(QRCodeKey)
}

export function getSignId() {
  return Cookies.get(SignIdKey)
}

export function setSignId(signId: String) {
  return Cookies.set(SignIdKey, signId)
}

export function removeSignId() {
  return Cookies.remove(SignIdKey)
}


