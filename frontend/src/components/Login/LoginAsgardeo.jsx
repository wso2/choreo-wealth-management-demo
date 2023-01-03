import '../../css/LoginNew.css'
import applogo from "../../images/favicon.png";
import Asgardeo from "../../images/Asgardeo.svg";
import { useAuthContext } from "@asgardeo/auth-react";
import fb from "../../images/facebook.svg";
import google from "../../images/google.svg";

export function  LoginAsgardeo() {
const { state, signIn, signOut } = useAuthContext();

return (
<div class="container">
	<div class="screen">
		<div class="screen__content">
		    <div>
		     <img src={applogo} class="app-logo fab fa-facebook"></img>
		    </div>
			<form class="login">

				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="login__input" placeholder="Username / Email"/>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password"/>
				</div>
				<button class="button login__submit">
					<span class="button__text">Sign In</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>
			</form>
			<div class="social-login">
				<h4>Sign In With</h4>
				<div class="social-icons">
				    <img src={fb} class="social-login__icon fab fa-facebook"></img>
				    <img src={google} class="social-login__icon fab fa-instagram"></img>
                    <img onClick={ () => signIn() } src={Asgardeo} class="asgardeo__icon fab fa-facebook"></img>
				    <img  class="asgardeo__icon fab fa-instagram"></img>

				</div>
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>
	</div>
</div>






);


};
