function PhotoModal({ image, onClose }) {
    async function handleDownload() {
        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const blobURL = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobURL;
            link.download = `image-${Date.now()}`;
            link.click();

            URL.revokeObjectURL(blobURL);
        } catch (error) {
            console.log(`download Failed . err : ${error}`);
        }
    }
    return (
        <div className="modalContainer" onClick={onClose}>
            <div className="photoModal"onClick={(e) => {e.stopPropagation();}}>
                <img src={image} alt="modalPhoto" id="modalImage" />
                <div className="downloadImageSVG"onClick={() => {handleDownload(); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path
                            fillRule="evenodd"
                            d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default PhotoModal;
