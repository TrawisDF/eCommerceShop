import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/userApiSlice";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useEffect } from "react";

const UserListScreen = () => {

  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: deletingUser }] = useDeleteUserMutation();

  const deleteHandler = async (userId) => {
    console.log("want to delete user id: ", userId);
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(userId);
        refetch();
        toast.success("Delete user successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };


  return (
    <>
      <h1>User List</h1>
      {deletingUser && <Loader />}
      <Table striped hover responsive className="table-sm">
        <thead style={{ fontWeight: "bolder" }}>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>ADMIN</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`${user._id}/edit`}>
                    <Button variant="light" className="btn btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn btn-sm mx-2"
                    onClick={(e) => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListScreen;
