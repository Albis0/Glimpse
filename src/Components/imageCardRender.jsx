function RenderImageCard({ imageUrl }) {
    return (
        <div className="imageWrapper">
            <img src={imageUrl} alt="Image" className="image" />
        </div>
    );
}

export default RenderImageCard;