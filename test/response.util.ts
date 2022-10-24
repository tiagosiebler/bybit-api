import { API_ERROR_CODE } from '../src';

const SUCCESS_MSG_REGEX = /OK|SUCCESS|success|success\.|Request accepted|/gim;

export function successResponseList(successMsg: string | null = 'OK') {
  return {
    result: expect.any(Array),
    ret_code: API_ERROR_CODE.SUCCESS,
    ret_msg: successMsg,
  };
}

export function successResponseListV3() {
  return {
    ...successEmptyResponseObjectV3(),
    result: {
      list: expect.any(Array),
    },
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
    retMsg: expect.stringMatching(SUCCESS_MSG_REGEX),
    retCode: API_ERROR_CODE.SUCCESS,
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

export function errorResponseObjectV3(
  result: null | any = null,
  retCode: number
) {
  return {
    result,
    retCode: retCode,
  };
}

export function notAuthenticatedError() {
  return new Error('Private endpoints require api and private keys set');
}
