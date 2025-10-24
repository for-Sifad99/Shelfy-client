// User API functions

// Create a new user
const createUser = async (axiosSecure, userData) => {
    const res = await axiosSecure.post('/api/users', userData);
    return res.data;
};

// Get user by email
const getUserByEmail = async (axiosSecure, email) => {
    const res = await axiosSecure.get(`/api/users/${email}`);
    return res.data;
};

// Update user by email
const updateUser = async (axiosSecure, email, userData) => {
    const res = await axiosSecure.patch(`/api/users/${email}`, userData);
    return res.data;
};

// Delete user by email
const deleteUser = async (axiosSecure, email) => {
    const res = await axiosSecure.delete(`/api/users/${email}`);
    return res.data;
};

// Get all users
const getAllUsers = async (axiosSecure) => {
    const res = await axiosSecure.get('/api/users');
    return res.data;
};

export { createUser, getUserByEmail, updateUser, deleteUser, getAllUsers };