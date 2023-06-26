// đấy chính là phần cung cấp reducer cho useReducer
//reducer là 1 function với 2 biến đi kèm là state và action sẽ thực hiện
//với state đó cho ra 1 state mới và nó sẽ được useReducer gán cho initSate được
//cung cấp cho nó.
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    default: // nneu k cos method j thì sẽ trả lại initState. COi như chưa có
      //tác động j vào thay đổi state cả
      return state;
  }
};
export default AuthReducer;
