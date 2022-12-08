import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  ModalContent,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { store } from "../app/store";
import StudentForm from "../features/student/StudentForm";
import {
  deleteStudent,
  Student,
  selectStudentList,
  setStudents,
} from "../features/student/studentSlice";
import app from "../firebase";

const db = getFirestore(app);
const q = query(collection(db, "students"));
onSnapshot(q, (querySnapshot) => {
  const students: Student[] = [];
  querySnapshot.forEach((doc) => {
    students.push({
      ...doc.data(),
      id: doc.id,
    } as Student);
  });

  store.dispatch(setStudents(students));
  console.log("Current students in Collesge: ", students);
});

const Students = () => {
  const students = useAppSelector(selectStudentList);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <HStack
          justifyContent={"space-between"}
          p="5"
          borderBottom={"1px"}
          borderColor={"gray.200"}
        >
          <Text fontSize={24} fontWeight="semibold">
            Students
          </Text>
          <Button onClick={onOpen}>Add New</Button>
        </HStack>

        <TableContainer overflowX={'scroll'}>
          <Table variant="simple" >
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Roll No</Th>
                <Th>Branch</Th>
                <Th>Batch</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map((student: Student, index: number) => (
                <StudentRow key={index} student={student} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StudentForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const StudentRow = ({ student }: { student: Student }) => {
  const dispatch = useAppDispatch();
  return (
    <Tr>
      <Td>
        <Avatar src={student.photoURL} />
      </Td>
      <Td>{student.name}</Td>
      <Td>{student.email}</Td>
      <Td>{student.rollNo}</Td>
      <Td>{student.branch}</Td>
      <Td>{student.batch}</Td>

      <Td>
        <HStack gap={2}>
          <Button>
            <EditIcon />
          </Button>
          <Button
            onClick={() => dispatch(deleteStudent(student))}
            colorScheme={"red"}
          >
            <DeleteIcon />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default Students;
