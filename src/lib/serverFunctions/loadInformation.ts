import { Contract, ethers, Wallet } from "ethers"
import ABI from "../../components/abi/WisdOnChain.json"

export const loadInformation = async () => {
  const rpcUrl = process.env.MORPH_RPC_URL
  if (!rpcUrl) throw Error("Missing MORPH_RPC_URL in .env")
  const privateKey = process.env.PRIVATE_KEY
  if (!privateKey) throw Error("Missing PRIVATE_KEY in .env")
  const contractAddress = process.env.WISD_CONTRACT_ADDRESS
  if (!contractAddress) throw Error("Missing WISD_CONTRACT_ADDRESS in .env")

  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const wallet = new Wallet(privateKey, provider)
  const contract = new Contract(contractAddress, ABI.abi, wallet)

  // await contract.addUser("asdasdda", 0)
  // const users = await contract.getUsers()
  // console.log("users :>> ", users)
  const documents = [
    {
      content: {
        personalDetails: {
          lastName: "Barria",
          middleName: "-",
          firstName: "Alagammai",
          maidenName: "NA",
          dob: "1995-10-11",
          placeOfBirth: "MADURAI",
          stateOfBirth: "Tamil Nadu-Madurai",
          countryOfBirth: "MADURAI",
          sex: "Female",
          nationality: "Indian",
          fathersName: "ALAGAPPAN AL",
          hasPassport: "No",
          passportNo: "Not Applicable",
          hasPan: "Yes",
          panNo: "BXUPA3801M",
          homePhone: "9500798988",
          mobile: "9500798988",
          maritalStatus: "Single",
          marraigeDate: "-",
          caste: "GENERAL",
          exServiceman: "No",
          differentlyAbled: "No",
          differentlyAbledReason: "Not ApplicableReligionHinduDetails, if",
          religion: "Hindu",
          detailsIfReligionIsOthers: "Not Applicable",
          email: null,
          alias: null,
          voterId: null,
          drivingLicenseNo: null,
        },
        residentialAddresses: {
          permanentAddress: {
            address:
              "5/454 KUMARAN STREET; SADHASIVAM NAGAR; MADURAI; MADURAI; Tamil Nadu-Madurai; India; 625020; 9500798988",
            pincode: "625020",
            durationOfStay: "From Aug,2010 To Till Date",
            natureOfLocation: "Rented Own Other(Specify)-OwnCurrent",
          },
          currentAddress: {
            address:
              "5/454 KUMARAN STREET; SADHASIVAM NAGAR; MADURAI; MADURAI; Tamil Nadu-Madurai; India; 625020; 9500798988",
            pincode: "625020",
            durationOfStay: "From Aug,2010 To Till Date",
            natureOfLocation: "Rented Own Other(Specify)-OwnPassport",
          },
          passportAddress: {
            address: "Not Applicable",
            pincode: null,
            durationOfStay: null,
            natureOfLocation: null,
          },
        },
        addresses: [],
        passportDetails: {
          placeOfIssue: "Not Applicable",
          dateOfIssue: "",
          dateOfExpiry: null,
          visibleDistinguishingMark: "Not Applicable",
        },
        referenceDetails: [
          {
            name: "M.NATARAJAN",
            positionHeld: "CHARTERED ACCOUNTANT",
            address: "NO.6 WEST PONAGARAM MDU 625 016",
            contactDetails: "9597944252",
            howDoYouKnowThisPerson: "FRIEND",
          },
          {
            name: "AWANISH KUMAR VERNA",
            positionHeld: "CHARTERED ACCOUNTANT",
            address: "QTR NO 47, INCOME TAX STAFF QUARTERS MDU 625 002",
            contactDetails: "9711197352",
            howDoYouKnowThisPerson: "FRIEND",
          },
          {
            name: "VISALAKSHI KALAIRAJ",
            positionHeld: "CHARTERED ACCOUNTANT",
            address: "NO.37 HIKKIM AJMAL KHAN STREET, CHINNA CHOKIKULAM",
            contactDetails: "9994728855",
            howDoYouKnowThisPerson: "FRIEND",
          },
        ],
        certificationDetails: [
          {
            certificateName: "-",
            certificateExamNo: "-",
            dateOfCertification: "-",
            certificateBody: "-",
            validUpto: "-",
            score: "-",
          },
        ],
        educationDetails: [
          {
            qualification: "Graduation",
            nameAddressOfSchoolCollegeInstitute: "LADY DOAK COLLEGE - MADURAI",
            nameAndAddressOfBoardUniversityToWhichTheSchoolCollegeInstituteIsAffiliatedTo:
              "KAMARAJ UNIVERSITY - MADURAI",
            courseAttended: "BCom",
            marksCgpaAndClass: "76",
            yearOfEnrolment: "Jun,2013",
            yearPassed: "Mar,2016",
            rollNumberRegistrationNumberExamSeatNumber: "13COAE003",
          },
          {
            qualification: "Professional Cert.",
            nameAddressOfSchoolCollegeInstitute: "ICAI - MADURAI",
            nameAndAddressOfBoardUniversityToWhichTheSchoolCollegeInstituteIsAffiliatedTo:
              "ICAI - MADURAI",
            courseAttended: "CA",
            marksCgpaAndClass: "57",
            yearOfEnrolment: "Apr,2013",
            yearPassed: "Jan,2020",
            rollNumberRegistrationNumberExamSeatNumber: "SRO0435188",
          },
          {
            qualification: "Senior Secondary",
            nameAddressOfSchoolCollegeInstitute: "VMJ SCHOOL - MADURAI",
            nameAndAddressOfBoardUniversityToWhichTheSchoolCollegeInstituteIsAffiliatedTo:
              "SBSE - MADURAI",
            courseAttended: "Others",
            marksCgpaAndClass: "94",
            yearOfEnrolment: "Jun,2012",
            yearPassed: "Mar,2013",
            rollNumberRegistrationNumberExamSeatNumber: "177236",
          },
          {
            qualification: "Secondary",
            nameAddressOfSchoolCollegeInstitute: "LAKSHMI SCHOOL - MADURAI",
            nameAndAddressOfBoardUniversityToWhichTheSchoolCollegeInstituteIsAffiliatedTo:
              "ICSE - MADURAI",
            courseAttended: "Others",
            marksCgpaAndClass: "77",
            yearOfEnrolment: "Jun,2010",
            yearPassed: "Mar,2011",
            rollNumberRegistrationNumberExamSeatNumber: "T1894034",
          },
        ],
        employerDetails: [],
        employmentGap: [
          {
            dateFrom: "-",
            dateTo: "-",
            activity: "-",
          },
        ],
      },
      metadata: { source: "us1.json" },
    },
    {
      content: {
        personalDetails: {
          lastName: "Saeazd",
          middleName: "Marchant",
          firstName: "Sundar",
          maidenName: "NA",
          dob: "1990-04-22",
          placeOfBirth: "BANGALORE",
          stateOfBirth: "Karnataka-Bangalore",
          countryOfBirth: "India",
          sex: "Male",
          nationality: "Indian",
          fathersName: "SANKAR S",
          hasPassport: "Yes",
          passportNo: "Z1234567",
          hasPan: "Yes",
          panNo: "AUJPS5678N",
          homePhone: "9876543210",
          mobile: "9876543210",
          maritalStatus: "Married",
          marraigeDate: "2015-05-10",
          caste: "GENERAL",
          exServiceman: "No",
          differentlyAbled: "No",
          differentlyAbledReason: "Not Applicable",
          religion: "Hindu",
          detailsIfReligionIsOthers: "Not Applicable",
          email: "sundar.s@example.com",
          alias: null,
          voterId: "BLR1234567",
          drivingLicenseNo: "KA09 1234567",
        },
        residentialAddresses: {
          permanentAddress: {
            address:
              "12/345 LAKSHMI ROAD; JAYANAGAR; BANGALORE; Karnataka-Bangalore; India; 560041; 9876543210",
            pincode: "560041",
            durationOfStay: "From Jan, 2000 To Till Date",
            natureOfLocation: "Rented Own Other(Specify)-OwnCurrent",
          },
          currentAddress: {
            address:
              "14/678 MG ROAD; INDIRANAGAR; BANGALORE; Karnataka-Bangalore; India; 560038; 9876543210",
            pincode: "560038",
            durationOfStay: "From Jun, 2020 To Till Date",
            natureOfLocation: "Rented Own Other(Specify)-RentedPassport",
          },
          passportAddress: {
            address:
              "14/1482 MG ROAD; INDIRANAGAR; BANGALORE; Karnataka-Bangalore; India; 560038; 9876543210",
            pincode: "560038",
            durationOfStay: "From Jun, 2020 To Till Date",
            natureOfLocation: "Rented",
          },
        },
        addresses: [],
        passportDetails: {
          placeOfIssue: "Bangalore",
          dateOfIssue: "2012-06-15",
          dateOfExpiry: "2022-06-14",
          visibleDistinguishingMark: "Mole on left cheek",
        },
        referenceDetails: [
          {
            name: "RAJESH KUMAR",
            positionHeld: "SOFTWARE ENGINEER",
            address: "24/67 MG ROAD BANGALORE 560038",
            contactDetails: "9845123456",
            howDoYouKnowThisPerson: "COLLEAGUE",
          },
          {
            name: "SHYAMALA R",
            positionHeld: "PROJECT MANAGER",
            address: "56/89 HSR LAYOUT BANGALORE 560102",
            contactDetails: "9880123456",
            howDoYouKnowThisPerson: "MANAGER",
          },
        ],
        certificationDetails: [
          {
            certificateName: "AWS Certified Solutions Architect",
            certificateExamNo: "AWS-SAA-001",
            dateOfCertification: "2018-09-12",
            certificateBody: "Amazon Web Services",
            validUpto: "2021-09-11",
            score: "89",
          },
        ],
        educationDetails: [
          {
            qualification: "Post Graduation",
            nameAddressOfSchoolCollegeInstitute: "IIM BANGALORE",
            nameAndAddressOfBoardUniversityToWhichTheSchoolCollegeInstituteIsAffiliatedTo:
              "INDIAN INSTITUTE OF MANAGEMENT - BANGALORE",
            courseAttended: "MBA",
            marksCgpaAndClass: "82",
            yearOfEnrolment: "Jul,2016",
            yearPassed: "May,2018",
            rollNumberRegistrationNumberExamSeatNumber: "IIMB001234",
          },
          {
            qualification: "Graduation",
            nameAddressOfSchoolCollegeInstitute:
              "RV COLLEGE OF ENGINEERING - BANGALORE",
            nameAndAddressOfBoardUniversityToWhichTheSchoolCollegeInstituteIsAffiliatedTo:
              "VISVESVARAYA TECHNOLOGICAL UNIVERSITY - BANGALORE",
            courseAttended: "B.Tech in Computer Science",
            marksCgpaAndClass: "78",
            yearOfEnrolment: "Jun,2008",
            yearPassed: "May,2012",
            rollNumberRegistrationNumberExamSeatNumber: "VTU2012345",
          },
        ],
        employerDetails: [],
        employmentGap: [
          {
            dateFrom: "Jun, 2018",
            dateTo: "Dec, 2018",
            activity: "Preparing for AWS Certification",
          },
        ],
      },
      metadata: { source: "us2.json" },
    },
    {
      content: {
        personalDetails: {
          lastName: "Ro",
          middleName: "-",
          firstName: "Rohini",
          maidenName: "NA",
          dob: "1987-12-05",
          placeOfBirth: "CHENNAI",
          stateOfBirth: "Tamil Nadu-Chennai",
          countryOfBirth: "India",
          sex: "Female",
          nationality: "Indian",
          fathersName: "RAMESH R",
          hasPassport: "Yes",
          passportNo: "M9876543",
          hasPan: "Yes",
          panNo: "CMNPR1234Q",
          homePhone: "9845678901",
          mobile: "9845678901",
          maritalStatus: "Married",
          marraigeDate: "2012-11-25",
          caste: "OBC",
          exServiceman: "No",
          differentlyAbled: "No",
          differentlyAbledReason: "Not Applicable",
          religion: "Christian",
          detailsIfReligionIsOthers: "Not Applicable",
          email: "rohini.r@example.com",
          alias: null,
          voterId: "CHN9876543",
          drivingLicenseNo: "TN01 1234567",
        },
        residentialAddresses: {
          permanentAddress: {
            address:
              "15/678 A SHANTI COLONY; ANNA NAGAR; CHENNAI; Tamil Nadu-Chennai; India; 600040; 9845678901",
            pincode: "600040",
            durationOfStay: "From Mar, 1995 To Till Date",
            natureOfLocation: "Rented Own Other(Specify)-OwnCurrent",
          },
          currentAddress: {
            address:
              "9/10A ELDAMS ROAD; ALWARPET; CHENNAI; Tamil Nadu-Chennai; India; 600018; 9845678901",
            pincode: "600018",
            durationOfStay: "From Jan, 2020 To Till Date",
            natureOfLocation: "Rented Own Other(Specify)-RentedPassport",
          },
          passportAddress: {
            address:
              "15/678 A SHANTI COLONY; ANNA NAGAR; CHENNAI; Tamil Nadu-Chennai; India; 600040; 9845678901",
            pincode: "600040",
            durationOfStay: "From Mar, 1995 To Till Date",
            natureOfLocation: "Own",
          },
        },
        addresses: [],
        passportDetails: {
          placeOfIssue: "Chennai",
          dateOfIssue: "2010-04-20",
          dateOfExpiry: "2020-04-19",
          visibleDistinguishingMark: "Scar on right hand",
        },
        referenceDetails: [
          {
            name: "MAYA SINGH",
            positionHeld: "HR MANAGER",
            address: "45/9 IT PARK CHENNAI 600042",
            contactDetails: "9876543212",
            howDoYouKnowThisPerson: "PREVIOUS COLLEAGUE",
          },
          {
            name: "RAHUL VARMA",
            positionHeld: "TEAM LEAD",
            address: "23/5 TIDEL PARK CHENNAI 600113",
            contactDetails: "9880123456",
            howDoYouKnowThisPerson: "CURRENT MANAGER",
          },
        ],
      },
      metadata: { source: "us3.json" },
    },
  ]
  
  // return users
  return documents.map((d) => ({ ...d, content: JSON.stringify(d.content) }))
}
