const ridToString = (rid) => {
    return '#'+rid.cluster+':'+rid.position;
}

module.exports.ridToString = ridToString;