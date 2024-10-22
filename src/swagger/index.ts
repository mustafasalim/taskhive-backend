import swaggerUi from "swagger-ui-express"
import { ISetupSwagger } from "./type"
import swaggerJSDoc from "swagger-jsdoc"
import { swaggerOptions } from "./swagger-options"

export const setupSwagger = (props: ISetupSwagger) => {
  const { app } = props

  const swaggerSpec = swaggerJSDoc(swaggerOptions())

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
