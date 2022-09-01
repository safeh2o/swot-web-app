import { Link as MUILink, SvgIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<>
			<section id="notfound">
				<div className="section-wrap">
					<div className="sign-up">
						<div className="sign-up-img">
							<img
								src="/assets/pages/water.jpg"
								alt="Question Mark"
							/>
						</div>
						<div className="sign-up-content">
							<h1 className="section-subtitle">Not Found</h1>
							<p>
								Apologies, but we are unable to locate the page
								you have rquested.
							</p>
							<hr />
							<MUILink
								href="#"
								className="btn"
								onClick={() => {
									navigate(-1);
								}}
							>
								<i>
									<SvgIcon
										xmlns="http://www.w3.org/2000/svg"
										width="40px"
										height="40px"
										fill="#000000"
										viewBox="0 0 256 256"
									>
										<path d="M224,128a8,8,0,0,1-8,8H120v64a8,8,0,0,1-4.9,7.4,8.5,8.5,0,0,1-3.1.6,8.3,8.3,0,0,1-5.7-2.3l-72-72a8.1,8.1,0,0,1,0-11.4l72-72a8.4,8.4,0,0,1,8.8-1.7A8,8,0,0,1,120,56v64h96A8,8,0,0,1,224,128Z"></path>
									</SvgIcon>
								</i>
								Go Back
							</MUILink>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
