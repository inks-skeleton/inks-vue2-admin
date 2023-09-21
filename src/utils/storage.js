const supportStorage = typeof Storage !== 'undefined'

export function locals () {}
locals.set = function (key, value) {
  if (!supportStorage) return
  if (typeof value === 'string') {
    return window.localStorage.setItem(key, value)
  } else {
    return window.localStorage.setItem(key, JSON.stringify(value))
  }
}
locals.get = function (key) {
  if (!supportStorage) return
  var getItem = window.localStorage.getItem(key)
  const getItemObj = JSON.parse(getItem)
  if (!getItem || getItem === 'undefined') {
    return null
  } else if (typeof getItemObj === 'string') {
    return getItem
  } else {
    return getItemObj
  }
}
locals.remove = function (key) {
  if (!supportStorage) return
  return window.localStorage.removeItem(key)
}

export function sessions () {}
sessions.set = function (key, value) {
  if (!supportStorage) return
  if (typeof value === 'string') {
    return window.sessionStorage.setItem(key, value)
  } else {
    return window.sessionStorage.setItem(key, JSON.stringify(value))
  }
}
sessions.get = function (key) {
  if (!supportStorage) return
  const getItem = window.sessionStorage.getItem(key)
  try {
    return JSON.parse(getItem)
  } catch (error) {
    if (!getItem || getItem === 'undefined') return null
    return getItem
  }
}
sessions.remove = function (key) {
  if (!supportStorage) return
  return window.sessionStorage.removeItem(key)
}
