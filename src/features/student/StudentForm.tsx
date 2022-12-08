import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewStudent, Student, selectLoading } from "./studentSlice";

const StudentForm = (params: any) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const [password, setPassword] = useState<string>("");
  const [student, setStudent] = useState<Student>({
    name: "",
    email: "",
    rollNo: "",
    branch: "",
    batch: "",
  } as Student);

  const submit = async () => {
    dispatch(addNewStudent({ student, password }));
    params.onClose();
  };
  return (
    <Stack spacing={4}>
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <Input
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />
      </FormControl>
      <FormControl id="rollNo">
        <FormLabel>Roll no</FormLabel>
        <Input
          onChange={(e) => setStudent({ ...student, rollNo: e.target.value })}
        />
      </FormControl>
      <FormControl id="branch">
        <FormLabel>Branch</FormLabel>
        <Input
          onChange={(e) => setStudent({ ...student, branch: e.target.value })}
        />
      </FormControl>
      <FormControl id="batch">
        <FormLabel>Batch</FormLabel>
        <Input
          onChange={(e) => setStudent({ ...student, batch: e.target.value })}
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input onChange={(e) => setPassword(e.target.value)} />
      </FormControl>

      <Stack spacing={10}>
        <Button
          marginY={5}
          onClick={submit}
          disabled={loading}
          bg={"orange.400"}
          color={"white"}
          _hover={{
            bg: "orange.500",
          }}
        >
          {loading ? "...." : "Submit"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default StudentForm;
