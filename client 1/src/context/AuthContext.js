import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")),
  isFetching: false,
  error: false,
};

//export ra biến này được gán các giá trị  để có thể import vào các component con
// mà parent chứa provider như cách tạo context bình thường
export const AuthContext = createContext(INITIAL_STATE);

// export này mục đích để tạo hàm provider dưới dạng 1 function để có thể truy xuất
// ra nhiều thanh phần nhiều vị trí provider khác nhau. Bình thường chỉ cần export store
// ra parent bao quát nhất nhưng trường hợp này muốn tạo provider ở nhiều thanh phàn
// khác nhau tạo function để gọi provider cho nhanh và tránh lặp lại. (có thể khai báo như bình thường)
export const AuthContextProvider = ({ children }) => {
  //useReducer () sẽ trả lại 1 array có giá tri là state và dispatch nhưng nó yêu cầu phải cung cấp cho
  //nó biến reducer (method tương tác với state) và initState(biến nguyên thủy ban đầu )
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  // ở trạng thái nếu chứa đưa funciton ở dispatch thì nó vẫn chưa chạy dữ liệu. Tuy vào việc dispatch biến j
  //thì lsuc đó mới chạy method tương ứng
  // state laf giá trị hiện tại của biến initState ban đầu sau 1 loạt các xử lí trong reducer
  // dispatch cung cấp kiểu dấu hiệu  đại diện cho 1 method nào đó để xử lí initvalue ban đầu để cho ra state cuối cùng
  // chính là state trong array trên
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <div>
      <AuthContext.Provider
        value={{
          //value này chứa các state sau action và do hoàn toàn useReducer trả về.
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {/* cac component con nằm dưới đây sẽ có thể truy xuất được các state từ contextAPi này */}
        {children}
      </AuthContext.Provider>
    </div>
  );
};
