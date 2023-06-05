package cartDto

type CreateCartRequest struct {
	ProductID  uint   `json:"product_id" form:"product_id"`
	CustomerID uint   `json:"customer_id" form:"customer_id"`
	Quantity   uint   `json:"qty" form:"qty"`
	Status     string `json:"status" form:"qty"`
}

type UpdateCartRequest struct {
	ProductID  uint   `json:"product_id"`
	CustomerID uint   `json:"customer_id"`
	Quantity   uint   `json:"qty"`
	Status     string `json:"status"`
}
