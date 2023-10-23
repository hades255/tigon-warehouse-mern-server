let sockets = [];

const getSockets = () => sockets;
const getSocket = ({ id }) => sockets.find(({ socket }) => socket.id === id);
const getSocketWithUser = ({ _id }) =>
  sockets.find(({ user }) => user._id === _id);
const setSocket = (data) => {
  sockets.push(data);
};
const updateSocket = ({ id }, data) => {
  sockets = sockets.map((item) => (item.socket.id === id ? data : item));
};
const removeSocket = ({ id }) => {
  sockets = sockets.filter((item) => item.socket.id !== id);
};

module.exports = {
  getSocket,
  getSockets,
  setSocket,
  updateSocket,
  removeSocket,
  getSocketWithUser,
};
