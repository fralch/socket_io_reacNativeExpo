import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import io from "socket.io-client";

export default function App() {

  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io("http://127.0.0.1:3000");
    setSocket(socket);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chatMessage", (msg) => {
        setMessage(msg);
      });
    }
  }, [socket]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{message.msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
