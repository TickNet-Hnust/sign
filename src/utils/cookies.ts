/*
 * @Description:
 * @Author: caojun
 * @Date: 2022-05-02 10:21:22
 * @LastEditors: caojun
 * @LastEditTime: 2022-05-28 21:33:38
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'
const RoleKey = 'roles'
const nameKey = 'name'
const avatarKey = 'avatar'
const userIdKey = 'userId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRoles() {
  return Cookies.get(RoleKey)
}

export function setRoles(role: string) {
  return Cookies.set(RoleKey, role)
}

export function removeRoles() {
  return Cookies.remove(RoleKey)
}

export function getName() {
  return Cookies.get(nameKey)
}

export function setName(name: string) {
  return Cookies.set(nameKey, name)
}

export function removeName() {
  return Cookies.remove(nameKey)
}

export function getAvatar() {
  return Cookies.get(avatarKey)
}

export function setAvatar(avatar: string) {
  return Cookies.set(avatarKey, avatar)
}

export function removeAvatar() {
  return Cookies.remove(avatarKey)
}

export function setUserId(userId: string) {
  return Cookies.set(userIdKey, userId)
}

export function removeUserId() {
  return Cookies.remove(userIdKey)
}

export function getUserId() {
  return Cookies.get(userIdKey)
}
