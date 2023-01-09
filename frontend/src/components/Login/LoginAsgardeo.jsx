import { Container, Row, Col }from 'react-bootstrap';
import asgardeoLogo from "../../assets/images/asgardeo.svg";
import illustration from "../../assets/images/illustration.svg";
import { useAuthContext } from "@asgardeo/auth-react";
import facebookLogo from "../../assets/images/facebook.svg";
import googleLogo from "../../assets/images/google.svg";

export function LoginAsgardeo() {
    const {state, signIn, signOut} = useAuthContext();

return (
	<Container>
		<Row>
			<Col lg={4} className="d-none d-md-none d-lg-block login-side-wrapper">
				<img src={illustration} alt="login illustration" />
			</Col>
			<Col lg={8} xs={12} className="login-wrapper">
				<div className="login-header__container">
					<h3>Sign in to Continue</h3>
				</div>
				<div className="login-form__container">
					<form>
                        <div className="form-group">
                            <label className="form-label" htmlFor="formGroupEmail">Email</label>
                            <input type="text" className="form-control" id="formGroupEmail"
                                   placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="formGroupPassword">Password</label>
                            <input type="text" className="form-control" id="formGroupPassword"
                                   placeholder="Password" />
                        </div>
						<div className="form-group">
							<button type="button" className="form-button btn btn-primary">
								Sign In
							</button>
						</div>
						<div className="form-group login-separator">
							<span>or</span>
						</div>
						<div className="form-group login-social__container">
							<button type="button" className="form-image-button btn btn-primary">
								<img src={facebookLogo} alt="facebook icon"/>
								<span>Facebook</span>
							</button>
							<button type="button" className="form-image-button btn btn-primary">
								<img src={googleLogo} alt="google icon"/>
								<span>Google</span>
							</button>
							<button type="button" className="form-image-button btn btn-primary" onClick={() => signIn()}>
								<img src={asgardeoLogo} alt="asgardeo logo"/>
								<span>Asgardeo</span>
							</button>
						</div>
					</form>
				</div>
			</Col>
		</Row>
	</Container>
    );
}
