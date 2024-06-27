import AuthHeading from "./AuthHeading";
import AuthLayout from "./AuthLayout";

export default function Signin() {
    return (
        <AuthLayout>
            <AuthHeading label={"SignIn"} />
         <div>
         <div>
                <input type="text" placeholder="Email" />
                
            </div>
            <div>
                <input type="text" placeholder="Password" />
            </div>
         </div>
        </AuthLayout>
        
    )
}