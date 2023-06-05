package transactionDto

type TransactionRequest struct {
	TotalPrice int    `json:"total_price" form:"total_price" gorm:"not null"`
	Location   string `json:"location" form:"location" gorm:"not null"`
	PartnerID  uint   `json:"partner_id" form:"partner_id" gorm:"not null"`
}
