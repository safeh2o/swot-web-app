import { Link as MUILink, SvgIcon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<>
			<section id="notfound">
				<div className="section-wrap">
					<div className="sign-up">
						<div className="sign-up-img">
							<img
								src="/public/assets/view-2.jpg"
								alt="Person holding water sample"
							/>
						</div>
						<div className="sign-up-content">
							<h1 className="section-subtitle">Not Found</h1>
							<p>
								Apologies, but we are unable to locate the page
								you have rquested.
							</p>
							{/* <MUILink className="btn" to="/" component={Link}>
								<i>
									<SvgIcon viewBox="0 0 256 256">
										<rect
											width="256"
											height="256"
											fill="none"
										></rect>
										<path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-8,144H40V74.2l82.6,75.7a8,8,0,0,0,10.8,0L216,74.2V192Z"></path>
									</SvgIcon>
								</i>
								Contact Us
							</MUILink> */}
						</div>
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
						<MUILink className="btn" to="/" component={Link}>
							<i>
								<SvgIcon
									xmlns="http://www.w3.org/2000/svg"
									width="40px"
									height="40px"
									fill="#000000"
									viewBox="0 0 256 256"
								>
									<rect
										width="256"
										height="256"
										fill="none"
									></rect>
									<path d="M218.8,103.7,138.8,31a16,16,0,0,0-21.6,0l-80,72.7A16,16,0,0,0,32,115.5v92.1a16.4,16.4,0,0,0,4,11A15.9,15.9,0,0,0,48,224H96a8,8,0,0,0,8-8V168a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8v48a8,8,0,0,0,8,8h48a15.6,15.6,0,0,0,7.6-1.9A16.1,16.1,0,0,0,224,208V115.5A16,16,0,0,0,218.8,103.7Z"></path>
								</SvgIcon>
							</i>
							Go Home
						</MUILink>
					</div>
				</div>
			</section>
		</>
	);
}
