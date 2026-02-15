import { CheckCircle2Icon, ImageIcon, LockIcon, UploadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import { PROGRESS_INTERVAL_MS, PROGRESS_STEP, REDIRECT_DELAY_MS } from "../types/constants";

interface IProps  {
	onUploadComplete: (base64Data: string) => void;
}
const Upload = ({onUploadComplete} : IProps) => {
	
	const [file, setFile] = useState<File | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [progress, setProgress] = useState(0);

	const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const base64DataRef = useRef<string>("");

	const {isSignedIn} = useOutletContext<AuthContext>();

	const onComplete = (base64Data: string) => {
		console.log("Upload complete. Base64 data:", base64Data.substring(0, 50) + "...");
		// Handle the completion - e.g., redirect or pass to parent
	};

	useEffect(() => {
		if (progress >= 100) {
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
				progressIntervalRef.current = null;
			}
			
			redirectTimeoutRef.current = setTimeout(() => {
				onUploadComplete(base64DataRef.current);
				redirectTimeoutRef.current = null;
			}, REDIRECT_DELAY_MS);
		}
	}, [progress, onUploadComplete]);

	useEffect(() => {
		return () => {
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
			}
			if (redirectTimeoutRef.current) {
				clearTimeout(redirectTimeoutRef.current);
			}
		};
	}, []);

	const processFile = (fileToProcess: File) => {
		if (!isSignedIn) return;

		setFile(fileToProcess);
		setProgress(0);

		const reader = new FileReader();
		
		reader.onload = () => {
			base64DataRef.current = reader.result as string;
			
			progressIntervalRef.current = setInterval(() => {
				setProgress((prevProgress) => {
					const newProgress = prevProgress + PROGRESS_STEP;
					return newProgress >= 100 ? 100 : newProgress;
				});
			}, PROGRESS_INTERVAL_MS);
		};
		
		reader.readAsDataURL(fileToProcess);
	};

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isSignedIn) return;
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isSignedIn) return;
		setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isSignedIn) return;
		
		setIsDragging(false);
		
		const droppedFiles = e.dataTransfer.files;
		if (droppedFiles && droppedFiles.length > 0) {
			const selectedFile = droppedFiles[0];
			processFile(selectedFile);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!isSignedIn) return;
		
		const selectedFiles = e.target.files;
		if (selectedFiles && selectedFiles.length > 0) {
			const selectedFile = selectedFiles[0];
			processFile(selectedFile);
		}
	};

  return (
    <div className="upload">
			{!file ? (
				<div 
					className={`dropzone ${isDragging ? "dragging" : ""}`}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					<input 
						type="file" 
						className="drop-input" 
						accept=".jpg,.jpeg,.png" 
						disabled={!isSignedIn}
						onChange={handleChange}
					/>
					<div className="drop-content">
						<div className="drop-icon">
							{!isSignedIn ? <LockIcon size={20} /> : <UploadIcon size={20} />}
						</div>
						<p>{!isSignedIn ? "Please sign in to upload" : "Drag and drop files here"}</p>
						<p className="help">Maximum file size: 50MB</p>
					</div>
				</div>
			) : (
				<div className="upload-status">
					<div className="status-content">
						<div className="status-icon">
							{progress === 100 ? (
								<CheckCircle2Icon size={20} />
							) : (<ImageIcon className="image" />)}
						</div>
						<h3>{file.name}</h3>
						<div className="progress">
							<div className="bar" style={{width: `${progress}%`}} />
							<p className="status-text">
								{progress < 100 ? `Analyzing Floor Plan... ${progress}%` : "Redirecting..."}
							</p>
						</div>
					</div>
				</div>
			)}
    </div>
  )
}
export default Upload