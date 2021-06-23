
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
