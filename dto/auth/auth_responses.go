package authDto

type LoginResponse struct {
	ID    int    `json:"id"`
	Email string `gorm:"type: varchar(255)" json:"email"`
	Token string `gorm:"type: varchar(255)" json:"token"`
	Role  string `json:"role" form:"role" gorm:"type: varchar(255)"`
}

type RegisterResponse struct {
	Email string `gorm:"type: varchar(255)" json:"email"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}
