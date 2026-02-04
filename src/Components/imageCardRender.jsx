function RenderImageCard({ imageUrl, onClick }) {
    return (
        <div className="imageWrapper" onClick={onClick}>
            <img src={imageUrl} alt="Image" className="image" />
        </div>
    );
}

export default RenderImageCard;
