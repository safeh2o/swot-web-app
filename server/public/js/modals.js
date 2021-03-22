$.ajaxSetup({ timeout: 250000 });
var animationInProgress = false;

function showSpinner() {
	animationInProgress = true;
	$(".water-container").removeClass("hide");
	animateWaves();
}

function shakeElement(elem) {
	elem.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function logError(error) {
	console.error(
		"The file was not uploaded to the server. Here is the error message from the server:"
	);
	console.error("Server error: ", error);
	console.error(
		"Response status: " + error && error.status ? error.status : ""
	);
	const message = error && error.message ? error.message : null;
	console.error("Server message: " + message);
	showConfirmModal(
		"An error occurred during a server request.\nDetails: " +
			(message ? message : "Unknown Error")
	);
	hideSpinner();
}

function hideSpinner() {
	animationInProgress = false;
	$(".water-container").addClass("hide");
}

function toggleSpinner() {
	$(".water-container").toggleClass("hide");
	animationInProgress = $(".water-container").hasClass("hide");
	animateWaves();
}

function animateWaves() {
	if (animationInProgress) {
		setTimeout(() => {
			$(".glass").toggleClass("up");
		}, 50);
		setTimeout(() => {
			animateWaves();
		}, 3100);
	}
}

function setupUserFormSubmit() {
	$("#UserDetailsModal").on("shown.bs.modal", function () {
		$("#password1").val("");
		$("#password2").val("");
	});

	$("#formUser").submit(function (event) {
		toggleSpinner();
		event.preventDefault();
		const formData = {
			firstName: $("#firstName").val(),
			lastName: $("#lastName").val(),
			password1: $("#password1").val(),
			password2: $("#password2").val(),
			email: $("#email").val(),
		};
		//Update the file with the information above.
		$.post("/api/user/update", formData, function (data) {
			$("#UserDetailsModal").modal("hide");
			$(".water-container").addClass("hide");
			if (data.status) {
				showConfirmModal("Profile updated successfully.");
			} else {
				showConfirmModal(
					"An error occurred while uploading your profile. Please contact system administrator. Additional info: " +
						data
				);
			}
		})

			//If the metadata update fails:
			.fail(function (error) {
				$(".water-container").addClass("hide");
				showConfirmModal(
					"An error occurred while uploading your profile: " +
						error.responseText
				);
				console.log(error);
			});
	});
}

function showConfirmModal(message) {
	$("#confirmMsg").html(message.replace(/\n/g, "<br/>"));
	$("#ConfirmModal").modal({
		backdrop: true,
		keyboard: true,
		focus: true,
	});
}

setupUserFormSubmit();
