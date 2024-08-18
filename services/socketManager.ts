import io from "socket.io-client";

const socket = io("https://api.thelifescript.com");

export default socket;
