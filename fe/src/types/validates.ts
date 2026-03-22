import * as Yup from "yup";
export const loginValidate = () => {
  return Yup.object({
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
          /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value),
      ),
  });
};

export const registerValidate = () => {
  return Yup.object({
    fullName: Yup.string().required("Vui lòng nhập họ tên"),
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
          /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value),
      ),
  });
};

export const changePasswordValidate = () => {
  return Yup.object({
    oldPassword: Yup.string().required("Vui lòng nhập mật khẩu cũ"),

    newPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
      .test(
        "password-complexity",
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
        (value) =>
          /[a-z]/.test(value || "") &&
          /[A-Z]/.test(value || "") &&
          /\d/.test(value || ""),
      ),

    confirmPassword: Yup.string()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([Yup.ref("newPassword")], "Mật khẩu không khớp"),
  });
};

export const profileValidate = () => {
  return Yup.object({
    fullName: Yup.string().required("Vui lòng nhập họ tên"),
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
    learningGoal: Yup.string().required("Vui lòng nhập mục tiêu"),
  });
};
