import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getTeams } from "store/thunk/team.thunk";
import { getClients } from "store/thunk/client.thunk";
import { getMembers } from "store/thunk/member.thunk";

const ProjectModal = ({ open, close, onSave, editData, edit, index }) => {
  const initialData = {
    name: "",
    tech_stack: "",
    team_lead: "",
    sales_coordinator: "",
    teams_assigned: [],
    platform: "",
    contract_type: "",
    client: "",
    consultant: "",
    status: "",
    duration: 0,
    duration_unit: "",
    start_date: "",
    end_date: "",
    cost: "",
  };
  const [projectData, setProjectData] = useState(initialData);
  const memberData = useSelector((state) => state.members?.data);
  const [members, setMembers] = useState(memberData);
  const teamData = useSelector((state) => state.teams?.data);
  const [teams, setTeams] = useState(teamData);
  const clientData = useSelector((state) => state.client?.data?.leads);
  const [clients, setClients] = useState(clientData);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (field, values) => {
    setProjectData((prevData) => ({
      ...prevData,
      [field]: values,
    }));
  };

  const handleModalClose = () => {
    setIsExpanded(false);
    close();
  };

  const handleSubmit = () => {
    if (!projectData.name) {
      toast.error("Name is required!");
      return;
    }
    if (!projectData.tech_stack) {
      toast.error("Stack is required!");
      return;
    }
    if (!projectData.team_lead) {
      toast.error("Team Lead is required!");
      return;
    }
    if (!projectData.sales_coordinator) {
      toast.error("Sales Coordinator is required!");
      return;
    }
    // if (!projectData.teams_assigned) {
    //   toast.error("Department is required!");
    //   return;
    // }
    if (!projectData.platform) {
      toast.error("Platform is required!");
      return;
    }
    if (!projectData.contract_type) {
      toast.error("Contract Type is required!");
      return;
    }
    if (!projectData.client) {
      toast.error("Client is required!");
      return;
    }
    if (!projectData.consultant) {
      toast.error("Consultant is required!");
      return;
    }
    if (!projectData.status) {
      toast.error("Status is required!");
      return;
    }
    if (!projectData.duration_unit) {
      toast.error("Duration Unit is required!");
      return;
    }
    if (!projectData.cost) {
      toast.error("Cost is required!");
      return;
    }

    if (editData) {
      if (!projectData.teams_assigned) {
        const { teams_assigned, ...newMemData } = teamData;
        edit(newMemData, index);
      } else {
        edit(projectData, index);
      }
    } else {
      onSave(projectData);
      setProjectData(initialData);
    }

    setIsExpanded(false);

    close();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      dispatch(getTeams()).then((res) => {
        setTeams(res.payload);
      });
      dispatch(getMembers()).then((res) => {
        setMembers(res.payload);
      });
      dispatch(getClients()).then((res) => {
        setClients(res.payload);
      });
    }
  }, [open]);

  useEffect(() => {
    if (editData) {
      setProjectData(editData);
      setProjectData((prevData) => ({
        ...prevData,
        team_lead: editData?.team_lead?._id || "",
        sales_coordinator: editData?.sales_coordinator?._id || "",
        client: editData?.client?._id || "",
        teams_assigned: editData?.teams_assigned?.map((team) => team._id) || "",
        start_date: new Date(editData?.start_date).toISOString().split("T")[0],
        end_date: new Date(editData?.end_date).toISOString().split("T")[0],
      }));
    } else {
      setProjectData(initialData);
    }
  }, [editData]);

  return (
    <>
      <Modal isOpen={open} onClose={close}>
        <ModalOverlay />
        <ModalContent overflowY="auto" maxHeight={500}>
          <ModalHeader>
            {editData ? "Edit Projects" : "Add Projects"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* <Flex direction="row" justify="space-between" flexWrap="wrap"> */}
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                value={projectData.name}
                onChange={(e) => {
                  handleInputChange("name", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tech Stack</FormLabel>
              <Input
                placeholder="Tech Stack"
                value={projectData.tech_stack}
                onChange={(e) => {
                  handleInputChange("tech_stack", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Team Lead</FormLabel>
              <Select
                placeholder="Team Lead"
                value={projectData.team_lead}
                onChange={(e) => {
                  handleInputChange("team_lead", e.target.value);
                }}
              >
                {members?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Sales Coordinator</FormLabel>
              <Select
                placeholder="Sales Coordinator"
                value={projectData.sales_coordinator}
                onChange={(e) => {
                  handleInputChange("sales_coordinator", e.target.value);
                }}
              >
                {members?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <Box display="flex">
                <FormLabel mt={2}>Teams Assigned</FormLabel>
                <IconButton
                  icon={isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                  mb={2}
                />
              </Box>
              <Collapse in={isExpanded}>
                <Wrap spacing={4}>
                  {teams?.map((option) => (
                    <WrapItem key={option._id}>
                      <Checkbox
                        value={option._id}
                        onChange={(e) => {
                          const selectedValues = e.target.checked
                            ? [...projectData.teams_assigned, option._id]
                            : projectData.teams_assigned.filter(
                                (id) => id !== option._id
                              );
                          handleInputChange("teams_assigned", selectedValues);
                        }}
                        isChecked={projectData.teams_assigned.includes(
                          option._id
                        )}
                      >
                        {option.name}
                      </Checkbox>
                    </WrapItem>
                  ))}
                </Wrap>
              </Collapse>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Platform</FormLabel>
              <Input
                placeholder="PLatform"
                value={projectData.platform}
                onChange={(e) => {
                  handleInputChange("platform", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Contract Type</FormLabel>
              <Select
                placeholder="Contact Type"
                value={projectData.contract_type}
                onChange={(e) => {
                  handleInputChange("contract_type", e.target.value);
                }}
                required
              >
                <option value={"Hourly"}>Hourly</option>
                <option value={"Fixed"}>Fixed</option>
                <option value={"Job"}>Job</option>
                <option value={"Milestone"}>Milestone</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Client</FormLabel>
              <Select
                placeholder="Client"
                value={projectData.client}
                onChange={(e) => {
                  handleInputChange("client", e.target.value);
                }}
              >
                {clients?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Consultant</FormLabel>
              <Input
                placeholder="Consultant"
                value={projectData.consultant}
                onChange={(e) => {
                  handleInputChange("consultant", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Status"
                value={projectData.status}
                onChange={(e) => {
                  handleInputChange("status", e.target.value);
                }}
              >
                <option value={"on-going"}>On-Going</option>
                <option value={"completed"}>Completed</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Duration</FormLabel>
              <NumberInput
                min={0}
                value={projectData.duration}
                onChange={(e) => {
                  handleInputChange("duration", e);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Duration Unit</FormLabel>
              <Select
                placeholder="Duration Unit"
                value={projectData.duration_unit}
                onChange={(e) => {
                  handleInputChange("duration_unit", e.target.value);
                }}
              >
                <option value={"Months"}>Months</option>
                <option value={"Weeks"}>Weeks</option>
                <option value={"Days"}>Days</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Cost</FormLabel>
              <Input
                placeholder="Cost"
                value={projectData.cost}
                onChange={(e) => {
                  handleInputChange("cost", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                value={projectData.start_date}
                onChange={(e) => {
                  handleInputChange("start_date", e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                min={projectData.start_date}
                value={projectData.end_date}
                onChange={(e) => {
                  handleInputChange("end_date", e.target.value);
                }}
              />
            </FormControl>

            {/* </Flex> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleSubmit()}>
              Save
            </Button>
            <Button onClick={() => handleModalClose()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectModal;
