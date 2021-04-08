exports.errorResponse = (res, error) => {
  return (
      res.status(500).json({
          error: error,
          message: error.message
      })
  )
}
exports.unauthorizedResponse = (res, message) => {
  return (
      res.status(401).json({
          message: `Falha na autenticação - ${message}`
      })
  )
}


