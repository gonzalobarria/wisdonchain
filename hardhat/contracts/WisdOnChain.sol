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
  // struct Student {
  //   uint256 id;
  //   string content;
  //   /**
  //    * nombres
  //    * apellidos
  //    * Áreas de Interés
  //    */
  //   uint256 createdAt;
  // }

  // struct Instructor {
  //   uint256 id;
  //   string content;
  //   /**
  //    * nombres
  //    * apellidos
  //    * Profesión o Área de Expertise.. c+ómo se dice para que diga "Maestri de Matemáticas" o "Ingeniero Naval"
  //    * Estudios: "Universitarios" | "Magister"
  //    * Años de Experiencia
  //    * Algo más??
  //    */
  //   uint256 createdAt;
  // }

  struct Course {
    uint256 id;
    string content;
    string courseName;
    /**
     * Nombre
     * Descripción
     * Precio
     * WhatYouWouldLearn
     * Nivel
     * Horas:
     * Rating
     */
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
  event CourseCreated(address indexed userAddress, string courseName);

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

  function addCourse(string memory _courseName, string memory _content) public {
    require(isUserExists(msg.sender), "User does not exists");

    require(
      !isCourseCreated(msg.sender, _courseName),
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
      courseName: _courseName,
      content: _content,
      createdAt: block.timestamp
    });

    courses.push(id);
    courseId.increment();

    emit CourseCreated(msg.sender, _courseName);
  }

  function getUser(address _userAddress) public view returns (User memory) {
    return user[userProfile[_userAddress]];
  }

  function getCourse(uint256 _idCourse) public view returns (Course memory) {
    return course[_idCourse];
  }

  function getUsers() public view /* onlyOwner */ returns (User[] memory) {
    User[] memory tmpUsers = new User[](users.length);

    for (uint256 i = 0; i < users.length; i++) {
      tmpUsers[i] = user[i + 1];
    }

    return tmpUsers;
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
    string memory _courseName
  ) private view returns (bool) {
    bool isCreated = false;
    uint256[] memory expCourses = expertCourses[_userAddress];

    for (uint256 i = 0; i < expCourses.length; i++) {
      if (compareStrings(course[expCourses[i]].courseName, _courseName)) {
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
