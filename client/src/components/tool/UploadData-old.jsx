import React, { 
	useEffect, 
	useState, 
	useRef 
} from "react";

import FieldsitesDropdown from "../elements/FieldsitesDropdown";

export default function UploadData(props) {

	// Definitions
	const fileInput = useRef(null);
	const detailsModal = useRef(null);
	const uploadForm = useRef(null);
	const fileInfo = useRef(null)

	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [fileCount, setFileCount] = useState(0);

	// Custom Functions
	useEffect(() => {
		initModalListeners();

		return () => {
			clearModalListeners();
		};
	}, []);

	useEffect(() => {
		setFileCount(uploadedFiles.length);
	}, [uploadedFiles]);

	const onHideModal = () => {
		hideSpinner();
		uploadForm.reset();
	};

	const hideModal = () => {
		$(detailsModal.current).modal("hide");
	};

	const initModalListeners = () => {
		detailsModal.current.addEventListener("hidden.bs.modal", onHideModal);
	};

	const clearModalListeners = () => {
		if (detailsModal.current) {
			detailsModal.current.removeEventListener(
				"hidden.bs.modal",
				onHideModal
			);
		}
	};

	const handleFiles = (fileList) => {
		if (!fileList || !fileList.length) {
			return;
		}

		setUploadedFiles(fileList);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		if (!uploadedFiles.length) {
			shakeElement($(fileInfo.current));
			return;
		}

		const formData = new FormData();
		for (let i = 0; i < uploadedFiles.length; i++) {
			formData.append("uploaded_files", uploadedFiles[i]);
		}
		formData.append("fieldsite", uploadForm.current.fieldsite.value);
		formData.append("overwrite", uploadForm.current.overwrite.value);

		showSpinner();
		fetch("/api/upload/append", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((res) => {
				hideModal();
				const uploaded_count = res.uploaded_count;
				showConfirmModal(`Uploaded ${uploaded_count} file(s).`);
			})
			.catch((err) => {
				logError(err);
			})
			.finally(() => {
				hideSpinner();
			});
	};

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e) => {
		handleDrag(e);

		handleFiles(e.dataTransfer.files);
	};

	return (
		<form>
			<div className="container">
				<div className=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
					<h1 className="display-4">
						When uploading your dataset:
					</h1>
				</div>
			</div>

			<div className="upload container">
				<div className="card-deck mb-3 text-center">
					<div className="card mb-4 shadow-sm">
						<div className="card-body">
							<ul className="no_bullet">
								<li className="check">
									Ensure all required columns have data.
								</li>
								<li className="check">
									Save your dataset either as a .csv or
									.xlsx file.
								</li>
								<li className="check">
									Assign the uploaded dataset to the
									correct Fieldsite.
								</li>
							</ul>
						</div>
						<div className="card-footer">
							<button
								type="button"
								id="uploadData"
								className="btn btn-lg btn-block btn-primary"
								onClick={() => {
									$(detailsModal.current).modal({
										keyboard: false,
										focus: true,
									});
								}}
							>
								Choose files to upload
							</button>
						</div>
					</div>
				</div>
			</div>

			<div
				className="modal fade"
				id="FileUploadDetailsModal"
				ref={detailsModal}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">
								ADD FILE INFORMATION
							</h4>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
							>
								&times;
							</button>
						</div>

						<div className="modal-body">
							<form
								className="form"
								role="form"
								autoComplete="off"
								id="formUpload"
								encType="multipart/form-data"
								ref={uploadForm}
								onSubmit={(e) => {
									handleFormSubmit(e);
								}}
							>
								<div className="form-group">
									<label htmlFor="fieldsite">Site</label>
									<FieldsitesDropdown />
								</div>

								<div className="custom-control custom-switch">
									<input
										type="checkbox"
										id="overwrite"
										name="overwrite"
										value="1"
										className="custom-control-input"
									/>
									<label
										htmlFor="overwrite"
										title="Identical ts_datetime and hh_datetime"
										className="custom-control-label"
									>
										Overwrite Duplicate Entries
									</label>
								</div>
								<p>
									Note: duplicates are rows with the same
									dates and times
								</p>

								<div className="upload container text-center">
									<div
										className="upload-box"
										id="dropbox"
										onDragEnter={(e) => handleDrag(e)}
										onDragOver={(e) => handleDrag(e)}
										onDrop={(e) => handleDrop(e)}
										onClick={() => {
											fileInput.current.click();
										}}
									>
										<input
											type="file"
											ref={fileInput}
											accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
											style={{ display: "none" }}
											onChange={(e) =>
												handleFiles(e.target.files)
											}
											multiple
											name="uploaded_files"
										/>

										<p>
											Simply Drag Files or Click Here
										</p>

										<img
											className="upload_logo mt-3"
											src="assets/upload.svg"
											alt="upload icon"
										/>
										<p ref={fileInfo}>
											{fileCount} File(s) Selected
										</p>
									</div>
								</div>

								<div className="form-group pt-4">
									<button
										className="btn btn-danger btn-lg"
										data-dismiss="modal"
										aria-hidden="true"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="btn btn-primary btn-lg float-right"
										id="btnSave"
									>
										Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}