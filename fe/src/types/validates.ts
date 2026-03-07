import * as Yup from "yup";
export const loginValidate = () => {
  Yup.object({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Đây không phải định dạng của email"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Password phải lớn hơn 6 ký tự")
      .test(
        "password-complexity",
        "Mật khẩu phải chứa ít nhất 1 ký tự chữ hoa, 1 ký tự chữ thường và 1 số",
        (value) =>
          /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)
      ),
  });
};
