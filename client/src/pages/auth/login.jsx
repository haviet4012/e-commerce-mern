import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
    email: '',
    password: ''
}

const AuthLogin = () => {

    const[formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const {toast} = useToast();
    const onSubmit = (event) => {
      event.preventDefault()

      dispatch(loginUser(formData)).then((data)=> {
        if(data?.payload.success){
          toast({
            title: data?.payload.message,
            variant: "success",
            duration: 2000
          })
        }else{
          toast({
            title: data?.payload.message,
            variant: "destructive",
            duration: 2000
          })
        }
      })
    }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Đăng nhập
        </h1>
        <p className="mt-2">
            Bạn chưa có tài khoản?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">Tạo tài khoản</Link>
        </p>
      </div>
      <CommonForm formControls={loginFormControls}
                    buttonText={'Đăng Nhập'}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
      />
    </div>
  );
};
export default AuthLogin;
