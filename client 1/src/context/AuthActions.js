export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

// nếu login thành công thì dispatch này sẽ cung cấp thêm 1 biến user cho method
//dưới dạng payload . Các method sẽ xử lí kèm theo biến này trong reducer
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
