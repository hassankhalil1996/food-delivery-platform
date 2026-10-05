import "./MenuItemCard.css";

type MenuItemCardProps = {
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  onAdd: () => void;
};

function MenuItemCard({
  name,
  description,
  price,
  imageUrl,
  onAdd,
}: MenuItemCardProps) {
  return (
    <div className="menu-item-card">
      <div className="menu-item-info">
        <h2>{name}</h2>

        {description && (
          <p className="menu-item-description">{description}</p>
        )}

        <div className="menu-item-bottom">
          <span className="menu-item-price">₪{price}</span>

          <button className="add-button" onClick={onAdd}>
            +
          </button>
        </div>
      </div>

      <div className="menu-item-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="menu-item-image"
          />
        ) : (
          <div className="image-placeholder">🍕</div>
        )}
      </div>
    </div>
  );
}

export default MenuItemCard;