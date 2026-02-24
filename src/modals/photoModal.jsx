import { useContext } from 'react';
import { DownloadIcon } from '../Components/SvgIcons'
import { SearchContext } from "../SearchContext";

function PhotoModal() {
    const { selectedImage, setIsModalOpen } = useContext(SearchContext)
    async function handleDownload() {
        try {
            const response = await fetch(selectedImage);
            const blob = await response.blob();
            const blobURL = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobURL;
            link.download = `image-${Date.now()}`;
            link.click();

            URL.revokeObjectURL(blobURL);
        } catch (error) {
            console.log(`download Failed . err : ${error}`)
        }
    }
    return (
        <div className="modalContainer" onClick={() => setIsModalOpen(false)    }>
            <div className="photoModal" onClick={(e) => { e.stopPropagation(); }}>
                <img src={selectedImage} alt="modalPhoto" id="modalImage" />
                <div className="downloadImageSVG" onClick={() => { handleDownload(); }}>
                    <DownloadIcon />
                </div>
            </div>
        </div>
    );
}

export default PhotoModal;
