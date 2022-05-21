export function successResponseList(successMsg: string | null = 'OK') {
  return {
    result: expect.any(Array),
    ret_code: 0,
    ret_msg: successMsg,
  };
}

export function successResponseObject(successMsg: string | null = 'OK') {
  return {
    result: expect.any(Object),
    ret_code: 0,
    ret_msg: successMsg,
  };
}

export function errorResponseObject(
  result: null | any = null,
  ret_code: number,
  ret_msg: string
) {
  return {
    result,
    ret_code,
    ret_msg,
  };
}

export function notAuthenticatedError() {
  return new Error('Private endpoints require api and private keys set');
}
