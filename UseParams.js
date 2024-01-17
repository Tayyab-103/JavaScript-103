//Send Id in URL and then fetch other component fetch id in URL

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const navigate = useHistory();
const handleNavigate = (id) => {
  navigate.push(`/admin/deparment-data?id=${id}`);
};

<Tr key={row._id}>
  <Td onClick={() => handleNavigate(row._id)} style={{ cursor: "pointer" }}>
    {row.name}
  </Td>
  <Td>{row?.departmentHead?.name}</Td>
  <Td>{row?.departmentHead?.email}</Td>
</Tr>;


// Fetch id using URL:
const teamData = useSelector((state) => state.teams?.data);
console.log(teamData, "Hellooo========");
const [teams, setTeams] = useState(teamData);

const { search } = useLocation();
const queryParams = new URLSearchParams(search);
const id = queryParams.get("id");

useEffect(() => {
  setIsLoading(true);
  dispatch(getTeams())
    .then((res) => {
      const filteredTeams = res.payload?.filter(
        (teams) => teams?.department?._id === id
      );
      // setTeams(res.payload);
      setTeams(filteredTeams);
      setIsLoading(false);
    })
    .catch((err) => {
      toast.error("Error in getting Teams");
    });
}, [id]);

<TableContainer>
  <Table variant="striped">
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Technology</Th>
        <Th>Department</Th>
        <Th>Team Head</Th>
        <Th>Members</Th>
        <Th>Projects</Th>
      </Tr>
    </Thead>
    <Tbody>
      {teams?.map((row, index) => (
        <React.Fragment key={index}>
          <Tr>
            <Td>{row?.name}</Td>
            <Td>{row?.technology}</Td>
            <Td>{row.department ? row.department.name : "N/A"}</Td>
            <Td>{row.team_head ? row.team_head.name : "N/A"}</Td>
            <Td>
              {row.members && row.members.length > 0
                ? row.members?.map((member) => member.name).join(", ")
                : "N/A"}
            </Td>
            <Td>
              {row.projects && row.projects.length > 0
                ? row.projects?.map((project) => project.name).join(", ")
                : "N/A"}
            </Td>
          </Tr>
        </React.Fragment>
      ))}
    </Tbody>
  </Table>
</TableContainer>;
