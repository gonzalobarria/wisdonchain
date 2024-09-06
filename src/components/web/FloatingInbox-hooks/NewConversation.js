import React, { useCallback } from "react"
import { MessageInput } from "./MessageInput"
import { useStartConversation } from "@xmtp/react-sdk" // import the required SDK hooks

export const NewConversation = ({ selectConversation, peerAddress }) => {
  const { startConversation } = useStartConversation()
  const styles = {
    messagesContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      height: "100%",
    },
    messagesList: {
      paddingLeft: "5px",
      paddingRight: "5px",
      margin: "0px",
      alignItems: "flex-start",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f9f5f3",
      overflowY: "auto",
    },
  }

  const handleSendMessage = useCallback(
    async (message) => {
      if (!message.trim()) {
        alert("Empty message")
        return
      }
      if (!peerAddress) {
        alert("No peer address provided")
        return
      }
      const newConversation = await startConversation(peerAddress, message)
      selectConversation(newConversation?.cachedConversation)
    },
    [peerAddress, startConversation, selectConversation],
  )

  return (
    <div style={styles.messagesContainer}>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}
