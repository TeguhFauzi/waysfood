package routes

import (
	"waysfood/handlers"
	"waysfood/pkg/middleware"
	mysqldo "waysfood/pkg/mysql"
	"waysfood/repositories"

	"github.com/labstack/echo/v4"
)

func CartRoutes(e *echo.Group) {
	cartRepository := repositories.RepositoryCart(mysqldo.DB)
	h := handlers.HandlerCart(cartRepository)

	e.GET("/carts", h.FindCarts)
	e.GET("/cart/:id", h.GetCart)
	e.PATCH("/cart/:id", middleware.Auth(h.UpdateCart))
	e.POST("/cart", middleware.Auth(h.CreateCart))
	e.DELETE("/cart/:id", middleware.Auth(h.DeleteCart))
}
