const createSuccess = (success, status, message, data) => {
    const successObj = { success, status, message, data };
    return successObj;
}

module.exports = createSuccess;