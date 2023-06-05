package routes

import (
	"waysfood/handlers"
	"waysfood/pkg/middleware"
	mysqldo "waysfood/pkg/mysql"
	"waysfood/repositories"

	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Group) {
	productRepository := repositories.RepositoryProduct(mysqldo.DB)
	h := handlers.HandlerProduct(productRepository)

	e.GET("/products", h.FindProducts)
	e.GET("/product/:id", h.GetProduct)
	e.POST("/product", middleware.UploadFile(h.CreateProduct))
	e.DELETE("/product/:id", middleware.Auth(h.DeleteProduct))
}
