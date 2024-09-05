// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./interfaces/IOracle.sol";

// @title ChatGpt
// @notice This contract handles chat interactions and integrates with teeML oracle for LLM and knowledge base queries.
contract ChatGpt {
  struct ChatRun {
    address owner;
    IOracle.Message[] messages;
    uint messagesCount;
  }

  // @notice Mapping from chat ID to ChatRun
  mapping(uint => ChatRun) public chatRuns;
  uint private chatRunsCount;

  // @notice Event emitted when a new chat is created
  event ChatCreated(address indexed owner, uint indexed chatId);

  // @notice Address of the contract owner
  address private owner;

  // @notice Address of the oracle contract
  address public oracleAddress;

  // @notice CID of the knowledge base
  string public knowledgeBase;

  // @notice Event emitted when the oracle address is updated
  event OracleAddressUpdated(address indexed newOracleAddress);

  // @notice Event emitted when the knowledge base is updated
  event KnowledgeBaseUpdated(string indexed newKnowledgeBaseCID);

  // @notice Configuration for the OpenAI request
  IOracle.OpenAiRequest private config;

  // @param initialOracleAddress Initial address of the oracle contract
  constructor(address initialOracleAddress) {
    owner = msg.sender;
    oracleAddress = initialOracleAddress;
    chatRunsCount = 0;

    config = IOracle.OpenAiRequest({
      model: "gpt-4-turbo",
      frequencyPenalty: 21, // > 20 for null
      logitBias: "", // empty str for null
      maxTokens: 1000, // 0 for null
      presencePenalty: 21, // > 20 for null
      responseFormat: '{"type":"text"}',
      seed: 0, // null
      stop: "", // null
      temperature: 10, // Example temperature (scaled up, 10 means 1.0), > 20 means null
      topP: 101, // Percentage 0-100, > 100 means null
      tools: "",
      toolChoice: "", // "none" or "auto"
      user: "" // null
    });
  }

  // @notice Ensures the caller is the contract owner
  modifier onlyOwner() {
    require(msg.sender == owner, "Caller is not owner");
    _;
  }

  // @notice Ensures the caller is the oracle contract
  modifier onlyOracle() {
    require(msg.sender == oracleAddress, "Caller is not oracle");
    _;
  }

  function setKnowledgeBase(string memory knowledgeBaseCID) public onlyOwner {
    knowledgeBase = knowledgeBaseCID;
    emit KnowledgeBaseUpdated(knowledgeBaseCID);
  }

  // @notice Sets a new oracle address
  // @param newOracleAddress The new oracle address
  function setOracleAddress(address newOracleAddress) public onlyOwner {
    oracleAddress = newOracleAddress;
    emit OracleAddressUpdated(newOracleAddress);
  }

  // @notice Starts a new chat
  // @param message The initial message to start the chat with
  // @return The ID of the newly created chat
  function startChat(string memory message, address userAddress) public returns (uint) {
    ChatRun storage run = chatRuns[chatRunsCount];

    run.owner = userAddress;
    IOracle.Message memory newMessage = createTextMessage("user", message);
    run.messages.push(newMessage);
    run.messagesCount = 1;

    uint currentId = chatRunsCount;
    chatRunsCount++;

    // If there is a knowledge base, create a knowledge base query
    if (bytes(knowledgeBase).length > 0) {
      IOracle(oracleAddress).createKnowledgeBaseQuery(
        currentId,
        knowledgeBase,
        message,
        5
      );
    } else {
      // Otherwise, create an LLM call
      IOracle(oracleAddress).createOpenAiLlmCall(currentId, config);
    }
    emit ChatCreated(msg.sender, currentId);

    return currentId;
  }

  // @notice Handles the response from the oracle for an OpenAI LLM call
  // @param runId The ID of the chat run
  // @param response The response from the oracle
  // @param errorMessage Any error message
  // @dev Called by teeML oracle
  function onOracleOpenAiLlmResponse(
    uint runId,
    IOracle.OpenAiResponse memory response,
    string memory errorMessage
  ) public onlyOracle {
    ChatRun storage run = chatRuns[runId];
    require(
      keccak256(abi.encodePacked(run.messages[run.messagesCount - 1].role)) ==
        keccak256(abi.encodePacked("user")),
      "No message to respond to"
    );

    string memory content = !compareStrings(errorMessage, "")
      ? errorMessage
      : response.content;

    IOracle.Message memory newMessage = createTextMessage("assistant", content);
    run.messages.push(newMessage);
    run.messagesCount++;
  }

  // @notice Handles the response from the oracle for a knowledge base query
  // @param runId The ID of the chat run
  // @param documents The array of retrieved documents
  // @dev Called by teeML oracle
  function onOracleKnowledgeBaseQueryResponse(
    uint runId,
    string[] memory documents,
    string memory /*errorMessage*/
  ) public onlyOracle {
    ChatRun storage run = chatRuns[runId];
    require(
      keccak256(abi.encodePacked(run.messages[run.messagesCount - 1].role)) ==
        keccak256(abi.encodePacked("user")),
      "No message to add context to"
    );
    // Retrieve the last user message
    IOracle.Message storage lastMessage = run.messages[run.messagesCount - 1];

    // Start with the original message content
    string memory newContent = lastMessage.content[0].value;

    // Append "Relevant context:\n" only if there are documents
    if (documents.length > 0) {
      newContent = string(
        abi.encodePacked(newContent, "\n\nRelevant context:\n")
      );
    }

    // Iterate through the documents and append each to the newContent
    for (uint i = 0; i < documents.length; i++) {
      newContent = string(abi.encodePacked(newContent, documents[i], "\n"));
    }

    // Finally, set the lastMessage content to the newly constructed string
    lastMessage.content[0].value = newContent;

    // Call LLM
    IOracle(oracleAddress).createOpenAiLlmCall(runId, config);
  }

  // @notice Adds a new message to an existing chat run
  // @param message The new message to add
  // @param runId The ID of the chat run
  function addMessage(string memory message, uint runId, address userAddress) public {
    ChatRun storage run = chatRuns[runId];
    require(
      keccak256(abi.encodePacked(run.messages[run.messagesCount - 1].role)) ==
        keccak256(abi.encodePacked("assistant")),
      "No response to previous message"
    );
    require(run.owner == userAddress, "Only chat owner can add messages");

    IOracle.Message memory newMessage = createTextMessage("user", message);
    run.messages.push(newMessage);
    run.messagesCount++;
    // If there is a knowledge base, create a knowledge base query
    if (bytes(knowledgeBase).length > 0) {
      IOracle(oracleAddress).createKnowledgeBaseQuery(
        runId,
        knowledgeBase,
        message,
        5
      );
    } else {
      // Otherwise, create an LLM call
      IOracle(oracleAddress).createOpenAiLlmCall(runId, config);
    }
  }

  // @notice Retrieves the message history of a chat run
  // @param chatId The ID of the chat run
  // @return An array of messages
  // @dev Called by teeML oracle
  function getMessageHistory(
    uint chatId
  ) public view returns (IOracle.Message[] memory) {
    return chatRuns[chatId].messages;
  }

  // @notice Creates a text message with the given role and content
  // @param role The role of the message
  // @param content The content of the message
  // @return The created message
  function createTextMessage(
    string memory role,
    string memory content
  ) private pure returns (IOracle.Message memory) {
    IOracle.Message memory newMessage = IOracle.Message({
      role: role,
      content: new IOracle.Content[](1)
    });
    newMessage.content[0].contentType = "text";
    newMessage.content[0].value = content;
    return newMessage;
  }

  function compareStrings(
    string memory a,
    string memory b
  ) private pure returns (bool) {
    return (keccak256(abi.encodePacked((a))) ==
      keccak256(abi.encodePacked((b))));
  }
}
