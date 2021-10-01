
export function ok(message: string | object = 'ok', data?: any) {

  if(typeof message !== 'string' && !data)
    return {
      status: 'ok',
      message: 'ok',
      data: JSON.parse(JSON.stringify(message))
    }

  if(data)
    return {
      status: 'ok',
      message,
      data: JSON.parse(JSON.stringify(data))
    }

  return {
    status: 'ok',
    message,
  }

}
