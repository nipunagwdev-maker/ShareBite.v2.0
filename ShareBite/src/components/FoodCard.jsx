function FoodCard({ food, onClaim }) {
  const {
    id,
    title,
    description,
    image,
    category,
    quantity,
    unit,
    preparedAt,
    expiresAt,
    location,
    storage,
    allergens = [],
    status = "Available",
  } = food;

  const isAvailable = status === "Available";

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10">
      {/* Food Image */}
      <div className="relative h-48 bg-gray-100">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No image available
          </div>
        )}

        <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">
          Free
        </span>
      </div>

      <div className="p-6">
        {/* Title & Category */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              {category}
            </span>
            <h3 className="mt-1 text-xl font-bold text-gray-900">{title}</h3>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
              isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

        {/* Food Details */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400">Quantity</p>
            <p className="mt-1 font-semibold text-gray-800">
              {quantity} {unit}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Prepared at</p>
            <p className="mt-1 font-semibold text-gray-800">
              {preparedAt || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Expiry / Best before</p>
            <p className="mt-1 font-semibold text-gray-800">
              {expiresAt || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Storage</p>
            <p className="mt-1 font-semibold text-gray-800">
              {storage || "Not specified"}
            </p>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="mt-5 rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-400">Pickup Location</p>
          <p className="mt-1 text-sm font-semibold text-gray-800">
            📍 {location || "Location not specified"}
          </p>
        </div>

        {/* Allergen Information */}
        {allergens.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500">
              Contains / May contain
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {allergens.map((allergen) => (
                <span
                  key={allergen}
                  className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Claim Button */}
        <button
          type="button"
          disabled={!isAvailable}
          onClick={() => onClaim(id)}
          className="mt-6 w-full rounded-full bg-brand px-5 py-3 font-bold text-white transition hover:bg-brand-dark active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isAvailable ? "Claim Food" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}

export default FoodCard;
