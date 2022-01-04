
export function successResponseList() {
  return {
    "ext_code": "",
    "ext_info": "",
    "result": expect.any(Array),
    "ret_code": 0,
    "ret_msg": "OK",
    "time_now": expect.any(String),
  };
};

export function successResponseObject() {
  return {
    "ext_code": "",
    "ext_info": "",
    "result": expect.any(Object),
    "ret_code": 0,
    "ret_msg": "OK",
    "time_now": expect.any(String),
  };
};

export function successResponseListSpot() {
  return {
    "ext_code": null,
    "ext_info": null,
    "result": expect.any(Array),
    "ret_code": 0,
    "ret_msg": "",
  };
};

export function successResponseObjectSpot() {
  return {
    "ext_code": null,
    "ext_info": null,
    "result": expect.any(Object),
    "ret_code": 0,
    "ret_msg": "",
  };
};

export function notAuthenticatedError() {
  return new Error('Private endpoints require api and private keys set');
};
