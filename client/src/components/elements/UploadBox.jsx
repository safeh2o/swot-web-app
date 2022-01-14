import { makeStyles } from "@mui/styles";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { useDispatch } from "react-redux";

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
