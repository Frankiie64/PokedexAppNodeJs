exports.notFoundView = (req,res,next) => {
    res.status(404).render("NotFound",{
        pageTitle: "Página no encontrada",
        module: "Home"
    });
};