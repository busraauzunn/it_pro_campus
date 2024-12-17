import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDean, getDeansByPage } from "../../../../api/api";
import { functions } from "../../../../helpers/helpers";
import {
    setCurrentOperation,
    setCurrentRecord,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import { Button, Card, Container } from "react-bootstrap";
import { FiEdit, FiTrash } from "react-icons/fi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const DeanList = () => {
    const [loading, setLoading] = useState(false);
    const [deans, setDeans] = useState([]);
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
            const response = await getDeansByPage(page, lazyState.rows);
            setDeans(response.data.content);
            setTotalRows(response.data.totalElements);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onPage = (event) => setLazyState(event);

    const handleDelete = async (id) => {
        functions
            .swalQuestion("Are you sure you want to delete this dean?")
            .then(async (result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    try {
                        const response = await deleteDean(id);
                        dispatch(setListRefreshToken(Math.random()));
                        dispatch(setCurrentOperation(null));
                        functions.swalToast(
                            `${response.data.message}`,
                            "success"
                        );
                    } catch (error) {
                        functions.swalToast(
                            "There was an error deleting this dean",
                            "error"
                        );
                    } finally {
                        setLoading(false);
                    }
                }
            });
    };

    const handleEdit = (dean) => {
        dispatch(setCurrentOperation("editDean"));
        dispatch(setCurrentRecord(dean));
    };

    const operationTemplate = (row) => {
        if (row.built_in) return null;
        return (
            <div className="d-flex">
                <Button className="btn-link" onClick={() => handleEdit(row)}>
                    <FiEdit />
                </Button>
                <Button
                    className="btn-link"
                    onClick={() => handleDelete(row.userId)}>
                    <FiTrash />
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
        <Container className="dean-list-container">
            <Card>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                        Dean List{" "}
                        <Button
                            onClick={() =>
                                dispatch(setCurrentOperation("newDean"))
                            }>
                            New Dean
                        </Button>
                    </Card.Title>
                    <DataTable
                        value={deans}
                        lazy
                        dataKey="userId"
                        paginator
                        first={lazyState.first}
                        rows={lazyState.rows}
                        totalRecords={totalRows}
                        onPage={onPage}
                        loading={loading}
                        tableStyle={{ minWidth: "50rem", fontSize: "0.9rem" }}
                        stripedRows>
                        <Column header="Name" body={nameTemplate}></Column>
                        <Column header="Gender" field="gender"></Column>
                        <Column header="Phone" field="phoneNumber"></Column>
                        <Column header="SSN" field="ssn"></Column>
                        <Column header="Username" field="username"></Column>
                        <Column
                            headerStyle={{ width: "2rem" }}
                            body={operationTemplate}></Column>
                    </DataTable>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DeanList;
