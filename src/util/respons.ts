export function toJsonIfOk(res: Response) {
  if (!res.ok) throw res.statusText
  return res.json()
}
