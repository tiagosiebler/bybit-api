import { API_ERROR_CODE } from '../src';

export function successResponseList(successMsg: string | null = 'OK') {
  return {
    result: expect.any(Array),
    ret_code: API_ERROR_CODE.SUCCESS,
    ret_msg: successMsg,
  };
}

export function successResponseObject(successMsg: string | null = 'OK') {
  return {
    result: expect.any(Object),
    ret_code: API_ERROR_CODE.SUCCESS,
    ret_msg: successMsg,
  };
}

export function successResponseObjectV3() {
  return {
    result: expect.any(Object),
    ...successEmptyResponseObjectV3(),
  };
}

export function successEmptyResponseObjectV3() {
  return {
    retCode: API_ERROR_CODE.SUCCESS,
    retMsg: expect.stringMatching(
      /OK|SUCCESS|success|success\.|Request accepted|/gim
    ),
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
