// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract WisdOnChain is Ownable {
  using Counters for Counters.Counter;

  /// @dev User id counter
  Counters.Counter userId;

  /// @dev Course id counter
  Counters.Counter courseId;

  enum UserRole {
    Expert,
    User
  }

  struct User {
    uint256 id;
    string content;
    uint256 createdAt;
    UserRole role;
    bool isExists;
  }

  struct Course {
    uint256 id;
    string content;
    string name;
    uint256 createdAt;
  }

  uint256[] private courses;
  uint256[] private users;

  /// @dev map address to UserId
  mapping(address => uint256) userProfile;

  /// @dev map userId to User
  mapping(uint256 => User) user;

  /// @dev map address to courseId
  mapping(address => uint256[]) expertCourses;

  /// @dev map courseId to Course
  mapping(uint256 => Course) course;

  event UserCreated(address indexed userAddress);
  event UserUpdated(address indexed userAddress);
  event CourseCreated(address indexed userAddress, string name);
  event CourseUpdated(address indexed userAddress, string name);

  constructor() {
    userId.increment();
    courseId.increment();
  }

  function addUser(string memory _content, UserRole _userRole) public {
    require(!isUserExists(msg.sender), "User already created");

    uint256 id = userId.current();

    userProfile[msg.sender] = id;
    user[id] = User({
      id: id,
      content: _content,
      createdAt: block.timestamp,
      role: _userRole,
      isExists: true
    });

    users.push(id);
    userId.increment();

    emit UserCreated(msg.sender);
  }

  function addCourse(string memory _name, string memory _content) public {
    require(isUserExists(msg.sender), "User does not exist");

    require(
      !isCourseCreated(msg.sender, _name),
      "Course already created for the expert"
    );

    require(
      checkUserRole(msg.sender, UserRole.Expert),
      "User is not an Expert"
    );

    uint256 id = courseId.current();

    expertCourses[msg.sender].push(id);
    course[id] = Course({
      id: id,
      name: _name,
      content: _content,
      createdAt: block.timestamp
    });

    courses.push(id);
    courseId.increment();

    emit CourseCreated(msg.sender, _name);
  }

  function updateUser(string memory _content) public {
    require(isUserExists(msg.sender), "User doesn't exist");
    User storage userTmp = user[userProfile[msg.sender]];

    userTmp.content = _content;

    emit UserUpdated(msg.sender);
  }

  function updateUserByOwner(
    address _userAddress,
    string memory _content
  ) public onlyOwner {
    User storage userTmp = user[userProfile[_userAddress]];

    userTmp.content = _content;
  }

  function updateCourse(
    uint256 _courseId,
    string memory _name,
    string memory _content
  ) public {
    uint256[] memory courseIds = expertCourses[msg.sender];
    bool courseFound = false;

    for (uint256 i = 0; i < courseIds.length; i++) {
      if (courseIds[i] == _courseId) {
        courseFound = true;
        break;
      }
    }

    require(courseFound, "Course not found");

    Course storage courseTmp = course[_courseId];

    courseTmp.name = _name;
    courseTmp.content = _content;

    emit CourseUpdated(msg.sender, courseTmp.name);
  }

  function getMytUser() public view returns (User memory) {
    return user[userProfile[msg.sender]];
  }

  function getUser(uint256 _userId) public view returns (User memory) {
    return user[_userId];
  }

  function getUsers() public view onlyOwner returns (User[] memory) {
    User[] memory tmpUsers = new User[](users.length);

    for (uint256 i = 0; i < users.length; i++) {
      tmpUsers[i] = user[i + 1];
    }

    return tmpUsers;
  }

  function getCourse(uint256 _idCourse) public view returns (Course memory) {
    return course[_idCourse];
  }

  function getCourses() public view returns (Course[] memory) {
    require(isUserExists(msg.sender), "User does not exist");

    Course[] memory tmpCourses = new Course[](courses.length);

    for (uint256 i = 0; i < courses.length; i++) {
      tmpCourses[i] = course[i + 1];
    }

    return tmpCourses;
  }

  function compareStrings(
    string memory a,
    string memory b
  ) private pure returns (bool) {
    return (keccak256(abi.encodePacked((a))) ==
      keccak256(abi.encodePacked((b))));
  }

  function isCourseCreated(
    address _userAddress,
    string memory _name
  ) private view returns (bool) {
    bool isCreated = false;
    uint256[] memory expCourses = expertCourses[_userAddress];

    for (uint256 i = 0; i < expCourses.length; i++) {
      if (compareStrings(course[expCourses[i]].name, _name)) {
        isCreated = true;
        break;
      }
    }

    return isCreated;
  }

  function checkUserRole(
    address _userAddress,
    UserRole _userRole
  ) private view returns (bool) {
    return (user[userProfile[_userAddress]].role == _userRole);
  }

  function isUserExists(address _userAddress) private view returns (bool) {
    if (userProfile[_userAddress] == 0) return false;

    return (user[userProfile[_userAddress]].createdAt != 0);
  }
}
