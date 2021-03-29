import React from "react";

export default function LoginPage(props) {
	return (
		<>
			<div className="container">
				<div className="panel panel-primary">
					<div className=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
						<h1 className="display-4" id="headerText">
							Sign In
						</h1>
					</div>
					<br />
					<div className="panel-body">
						<div className="col-md-4">
							<form role="form" action="/auth" method="post">
								<div className="form-group">
									<label
										htmlFor="sender-email"
										className="control-label"
									>
										Email:
									</label>
									<div className="input-icon">
										<input
											className="form-control email"
											id="signin-email"
											placeholder="you@mail.com"
											name="email"
											type="email"
											defaultValue=""
										/>
									</div>
								</div>
								<div className="form-group">
									<label
										htmlFor="user-pass"
										className="control-label"
									>
										Password:
									</label>
									<div className="input-icon">
										<input
											type="password"
											className="form-control"
											placeholder="Password"
											name="password"
											id="password"
										/>
									</div>
								</div>
								<div className="form-group">
									<input
										type="submit"
										className="btn btn-primary "
										value="Login"
									/>
									<br />
									<br />
									<a href="/forgotpassword">
										Forgot Password
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
