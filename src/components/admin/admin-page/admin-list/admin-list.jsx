import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FiTrash2 } from "react-icons/fi";
import { deleteAdmin, getAdminsByPage } from "../../../../api/api";
import { functions } from "../../../../helpers/helpers";

const AdminList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
    });
    const dispatch = useDispatch();
    const { listRefreshToken } = useSelector((state) => state.misc);

    const loadData = async (page) => {
        setLoading(true);
        try {
            const responseAdmins = await getAdminsByPage(page, lazyState.rows);
            setUsers(responseAdmins.data.content);
            setTotalRows(responseAdmins.data.totalElements);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        functions
            .swalQuestion("Are you sure you want to delete this admin?")
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await deleteAdmin(id);
                        dispatch(setListRefreshToken(Math.random()));
                        functions.swalToast(
                            "You have successfully deleted the admin!",
                            "success"
                        );
                    } catch (error) {
                        functions.swalToast(
                            "Something went wrong while trying to delete the admin...",
                            "error"
                        );
                    }
                }
            });
    };

    const onPage = (event) => {
        setLazyState(event);
    };

    const operationTemplate = (row) => {
        if (row.built_in) return null;
        return (
            <div className="d-flex">
                <Button
                    className="btn-link"
                    onClick={() => handleDelete(row.id)}>
                    <FiTrash2 />
                </Button>
            </div>
        );
    };
    const nameTemplate = (row) => `${row.name} ${row.surname}`;

    useEffect(() => {
        loadData(lazyState.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lazyState, listRefreshToken]);

    return (
        <Container className="admin-list-container">
            <Card>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between">
                        Admin List{" "}
                        <Button
                            onClick={() =>
                                dispatch(setCurrentOperation("new"))
                            }>
                            New Admin
                        </Button>
                    </Card.Title>
                    <DataTable
                        value={users}
                        lazy
                        dataKey="id"
                        paginator
                        first={lazyState.first}
                        rows={lazyState.rows}
                        totalRecords={totalRows}
                        onPage={onPage}
                        loading={loading}
                        tableStyle={{ minWidth: "100%" }}
                        stripedRows>
                        <Column header="Name" body={nameTemplate}></Column>
                        <Column header="Gender" field="gender"></Column>
                        <Column
                            header="Phone Number"
                            field="phoneNumber"></Column>
                        <Column header="SSN" field="ssn"></Column>
                        <Column header="Username" field="username"></Column>
                        <Column
                            headerStyle={{ width: "1rem" }}
                            body={operationTemplate}></Column>
                    </DataTable>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminList;
