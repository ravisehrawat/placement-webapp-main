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
import DriveForm from "../features/drives/DriveForm";
import {
  deleteDrive,
  Drive,
  selectDriveList,
  setDrives,
} from "../features/drives/drivesSlice";
import app from "../firebase";

const db = getFirestore(app);
const q = query(collection(db, "drives"));
onSnapshot(q, (querySnapshot) => {
  const drives: Drive[] = [];
  querySnapshot.forEach((doc) => {
    const date = new Date(doc.data().deadline.seconds * 1000);
    drives.push({
      ...doc.data(),
      id: doc.id,
      deadline: date,
    } as Drive);
  });

  store.dispatch(setDrives(drives));
  console.log("Current drives in Collesge: ", drives);
});

const Drives = () => {
  const drives = useAppSelector(selectDriveList);

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
            Drives
          </Text>
          <Button onClick={onOpen}>Add New</Button>
        </HStack>

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Company Name</Th>
                <Th>End Date Time</Th>
                <Th>Apply Link</Th>
                <Th>CTC</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {drives.map((drive, index) => (
                <DriveRow key={index} drive={drive} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Drive</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DriveForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const DriveRow = ({ drive }: { drive: Drive }) => {
  const dispatch = useAppDispatch();
  return (
    <Tr>
      <Td>{drive.companyName}</Td>
      <Td>{drive.deadline.toLocaleString()}</Td>
      <Td>
        <Link href={drive.applyLink} isExternal>
          {drive.applyLink}
        </Link>
      </Td>
      <Td>{drive.ctc}</Td>
      <Td>{drive.description}</Td>
      <Td>
        <HStack gap={2}>
          <Button>
            <EditIcon />
          </Button>
          <Button
            onClick={() => dispatch(deleteDrive(drive))}
            colorScheme={"red"}
          >
            <DeleteIcon />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default Drives;
