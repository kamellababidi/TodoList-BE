const handleSqualizerErrors = (err, res) => {
    let errors = []
    for(var i=0; i<err.errors.length; i++ ){
        errors.push({msg: err.errors[i].message})
    }
    return res.status(403).json({errors: errors});
}

module.exports = handleSqualizerErrors;