package routes

import (
	"waysfood/handlers"
	"waysfood/pkg/middleware"
	mysqldo "waysfood/pkg/mysql"
	"waysfood/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysqldo.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	e.GET("/transactions", h.FindTransaction)
	e.GET("/transaction/:id", h.GetTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.DELETE("/transaction/:id", middleware.Auth(h.DeleteTransaction))
	e.POST("/notification", h.Notification)

}
