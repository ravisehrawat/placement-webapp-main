import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewDrive, Drive, selectLoading } from "./drivesSlice";

const DriveForm = (params: any) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const [drive, setDrive] = useState<Drive>({
    companyName: "",
    applyLink: "",
    ctc: "",
    description: "",
    deadline: new Date(),
  } as Drive);

  const submit = async () => {
    dispatch(addNewDrive(drive));
    params.onClose();
  };
  return (
    <Stack spacing={4}>
      <FormControl id="companyName">
        <FormLabel>Company Name</FormLabel>
        <Input
          onChange={(e) => setDrive({ ...drive, companyName: e.target.value })}
        />
      </FormControl>
      <FormControl id="applyLink">
        <FormLabel>Apply Link</FormLabel>
        <Input
          onChange={(e) => setDrive({ ...drive, applyLink: e.target.value })}
        />
      </FormControl>
      <FormControl id="ctc">
        <FormLabel>CTC</FormLabel>
        <Input onChange={(e) => setDrive({ ...drive, ctc: e.target.value })} />
      </FormControl>
      <FormControl id="description">
        <FormLabel>Description</FormLabel>
        <Input
          onChange={(e) => setDrive({ ...drive, description: e.target.value })}
        />
      </FormControl>
      <FormControl id="deadline">
        <FormLabel>Deadline</FormLabel>
        <Input
          onChange={(e) =>
            setDrive({ ...drive, deadline: new Date(e.target.value) })
          }
          type="datetime-local"
        />
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

export default DriveForm;
