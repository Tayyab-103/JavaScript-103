import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Box,
  Button,
  useDisclosure,
  useColorModeValue,
  Icon,
  Td,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getProjects } from "store/thunk/project.thunk";
import { addProject } from "store/thunk/project.thunk";
import { deleteProject } from "store/thunk/project.thunk";
import { editProject } from "store/thunk/project.thunk";
import ProjectModal from "./ProjectModal";
import { SearchBar } from "components/navbar/searchBar/SearchBar";

const ProjectTable = () => {
  const dispatch = useDispatch();
  //States
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectEditData, setProjectEditData] = useState(null);
  const projectData = useSelector((state) => state.projects?.data);
  const [projects, setProjects] = useState(projectData);
  const [indexOfRow, setIndexOfRow] = useState(null);
  const [rowLoadingStates, setRowLoadingStates] = useState(
    projects?.map(() => false) || []
  );

  //API Calls
  const triggerSave = () => {
    setProjectEditData(null);
    onOpen();
  };

  const handleSaveProject = (projectData) => {
    try {
      dispatch(addProject({ projectData })).then((res) => {
        dispatch(getProjects()).then((res) => {
          setProjects(res.payload);
          toast.success("Project Added Succesfully");
        });
      });
    } catch (error) {
      console.error("Error adding project", error);
      toast.error("Error adding project");
    }
  };

  const handleDelete = (id, index) => {
    setRowLoadingStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = true;
      return newState;
    });
    try {
      dispatch(deleteProject(id)).then((res) => {
        dispatch(getProjects()).then((res) => {
          setProjects(res.payload);
          toast.success("Project Deleted Succesfully");
          setRowLoadingStates((prevStates) => {
            const newState = [...prevStates];
            newState[index] = false;
            return newState;
          });
        });
      });
    } catch (error) {
      console.log("Error Deleting Project");
      toast.error("Error Deleting Project");
      setRowLoadingStates((prevStates) => {
        const newState = [...prevStates];
        newState[index] = false;
        return newState;
      });
    }
  };

  const triggerEdit = (rowData, index) => {
    setProjectEditData(rowData);
    setIndexOfRow(index);
    onOpen();
  };

  const handleEditProject = (projectData, index) => {
    setRowLoadingStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = true;
      return newState;
    });
    try {
      dispatch(editProject(projectData)).then((res) => {
        dispatch(getProjects()).then((res) => {
          setProjects(res.payload);
          toast.success("Project Edited Succesfully");
          setRowLoadingStates((prevStates) => {
            const newState = [...prevStates];
            newState[index] = false;
            return newState;
          });
        });
      });
    } catch (error) {
      console.log("Error Editing Project");
      toast.error("Error Editing Project");
      setRowLoadingStates((prevStates) => {
        const newState = [...prevStates];
        newState[index] = false;
        return newState;
      });
    }
  };

  useEffect(() => {
    dispatch(getProjects()).then((res) => {
      setProjects(res.payload);
    });
  }, []);

  //Search
  const filterSearch = (search) => {
    const data = projectData?.filter((data) => {
      return search.toLowerCase() === ""
        ? data
        : data?.name.toLowerCase().includes(search) ||
            data?.team_lead?.name.toLowerCase().includes(search) ||
            data?.sales_coordinator?.name.toLowerCase().includes(search) ||
            data?.teams_assigned
              .map((team) => team?.name)
              .join(", ")
              .toLowerCase()
              .includes(search) ||
            data.contract_type.toLowerCase().includes(search) ||
            data.status.toLowerCase().includes(search);
    });
    setProjects(data);
  };

  //Colors
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  let menuBg = useColorModeValue("white", "navy.800");

  return (
    <div>
      <ProjectModal
        open={isOpen}
        close={onClose}
        onSave={handleSaveProject}
        editData={projectEditData}
        edit={handleEditProject}
        index={indexOfRow}
      />
      <Box display="flex" justifyContent="space-between">
        <Box
          w={{ sm: "100%", md: "auto" }}
          bg={menuBg}
          p="8px"
          borderRadius="30px"
        >
          <SearchBar Filter={filterSearch} />
        </Box>
        <Button colorScheme="blue" onClick={() => triggerSave()}>
          Add Project
        </Button>
      </Box>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Team Lead</Th>
              <Th>Sales Coordinator</Th>
              <Th>Teams Assigned</Th>
              <Th>Contract Type</Th>
              <Th>Status</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects?.map((row, index) => (
              <Tr key={index}>
                <Td>{row?.name}</Td>
                <Td>{row?.team_lead?.name ?? "N/A"}</Td>
                <Td>{row?.sales_coordinator?.name ?? "N/A"}</Td>
                <Td>
                  {row.teams_assigned && row.teams_assigned.length > 0
                    ? row.teams_assigned?.map((team) => team?.name).join(", ")
                    : "N/A"}
                </Td>
                {/* <Td>
                  {row.teams_assigned
                    ? teams?.find((team) => team._id === row.team._id)?.name
                    : "N/A"}
                </Td> */}
                <Td>{row?.contract_type}</Td>
                <Td>{row?.status}</Td>
                <Td>{new Date(row.start_date).toLocaleDateString()}</Td>
                <Td>{new Date(row.end_date).toLocaleDateString()}</Td>
                <Td textAlign="center">
                  {rowLoadingStates[index] ? (
                    <Spinner size="sm" color="blue.500" />
                  ) : (
                    <>
                      <Button
                        align="center"
                        justifyContent="center"
                        bg={bgButton}
                        _hover={bgHover}
                        _focus={bgFocus}
                        _active={bgFocus}
                        w="37px"
                        h="37px"
                        lineHeight="100%"
                        borderRadius="10px"
                        onClick={() => triggerEdit(row, index)}
                        isDisabled={rowLoadingStates[index]}
                      >
                        <Icon as={EditIcon} color={"blue"} boxSize={5} />
                      </Button>

                      <Button
                        align="center"
                        justifyContent="center"
                        bg={bgButton}
                        _hover={bgHover}
                        _focus={bgFocus}
                        _active={bgFocus}
                        w="37px"
                        h="37px"
                        lineHeight="100%"
                        borderRadius="10px"
                        onClick={() => handleDelete(row._id, index)}
                        isDisabled={rowLoadingStates[index]}
                      >
                        <Icon as={DeleteIcon} color={"blue"} boxSize={5} />
                      </Button>
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectTable;
