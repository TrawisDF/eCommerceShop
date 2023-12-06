import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { Table, Button, Form, Col, Row, FormControl } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(Boolean);

  const { data: user } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      email,
      isAdmin,
      userId,
    };
    const res = await updateUser(updatedUser);
    if (res) {
      toast.success("User updated");
      navigate("/admin/userlist");
    } else {
      toast.error("Cannot update user");
    }
  };

  const raiseAdmin = async() => {
    if (isAdmin === false) {
      setIsAdmin(true);
      console.log("admin", isAdmin);
    }
  };
  
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* <h3>Admin status:</h3> */}
          <Form.Group className="my-2">
            <Form.Label>Admin Authority</Form.Label>
            <Button
              className="btn-sm mx-2"
              variant="light"
              onClick={(e)=>raiseAdmin}
            >
              {isAdmin === true ? (
                <FaCheck style={{ color: "green" }} />
              ) : (
                <FaCheck style={{ color: "grey" }} />
              )}
            </Button>
            <Button className="btn-sm mx-2" variant="light">
              {isAdmin === true ? (
                <FaTimes style={{ color: "grey" }} />
              ) : (
                <FaTimes style={{ color: "red" }} />
              )}
            </Button>
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
