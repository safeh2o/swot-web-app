import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: "none",
	},
}));

export default function UploadBox(props) {
	const dispatch = useDispatch();

	const [numFiles, setNumFiles] = useState(0);

	const handleChange = (files) => {
		setNumFiles(files.length);
	};

	return (
		<DropzoneArea
			onChange={handleChange}
			maxFileSize={props.sizeLimit}
			acceptedFiles={[
				".csv",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				"application/vnd.ms-excel",
			]}
			filesLimit={5}
			useChipsForPreview
			showPreviewsInDropzone={false}
			showPreviews={true}
			previewText={`${numFiles} selected file${numFiles > 1 ? "s" : ""}:`}
		/>
	);
}
