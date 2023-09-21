export function clickLink (url) {
  const anchor = document.createElement('a')
  anchor.href = url
  document.body.appendChild(anchor) // Firefox requires us to actually insert the element into the DOM before we can click it
  anchor.click()
  document.body.removeChild(anchor)
}

export function openLink (url) {
  const win = window.open()
  win.location.href = url
}
