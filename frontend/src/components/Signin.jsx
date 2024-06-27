import AuthHeading from "./AuthHeading";
import AuthLayout from "./AuthLayout";
import Button from "./Buttom";
import ButtonWarming from "./ButtonWarming";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";

export default function Signin() {
    return (
        <AuthLayout>
            <AuthHeading label={"SignIn"} />
            <SubHeading label={"signin form for paytm"} />
            <InputBox label={"Email"} placeholder={"john@example.com"} />
            <InputBox label={"Password"} placeholder={"password"} />
            <div >
                <Button label={"SignIn"} />
            </div>
            <ButtonWarming label={"Don't have an account?"} buttonText={"SignUp"}  />
         
        </AuthLayout>
        
    )
}