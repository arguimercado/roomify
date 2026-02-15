import { useNavigate } from "react-router";


export const useVisualizer = () => {
	const navigate = useNavigate();

	const handleUploadComplete = (base64Data: string) => {
		const newId = Date.now().toString(); // Generate a unique ID based on timestamp

		navigate(`/visualizer/${newId}`);

		return true;
	}

	return {handleUploadComplete}
}