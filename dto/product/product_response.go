package productDto

type CreateProductResponse struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price" `
	ImageURL    string  `json:"image_url"`
	PartnerID   uint    `json:"partner_id"`
}
