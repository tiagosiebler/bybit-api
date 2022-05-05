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

export function notAuthenticatedError() {
  return new Error('Private endpoints require api and private keys set');
}
