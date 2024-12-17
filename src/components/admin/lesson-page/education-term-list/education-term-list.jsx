import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteEducationTerm,
    getEducationTermsByPage,
} from "../../../../api/api";
import { functions } from "../../../../helpers/helpers";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import { Button, Card, Container } from "react-bootstrap";
import { FiTrash } from "react-icons/fi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const EducationTermList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
    });
    const { listRefreshToken } = useSelector((state) => state.misc);
    const dispatch = useDispatch();

    const loadData = async (page) => {
        setLoading(true);
        try {
            const response = await getEducationTermsByPage(
                page,
                lazyState.rows
            );
            setList(response.data.content);
            setTotalRows(response.data.totalElements);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        functions
            .swalQuestion("Are you sure you want to delete this dean?")
            .then(async (result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    try {
                        const response = await deleteEducationTerm(id);
                        dispatch(setListRefreshToken(Math.random()));
                        dispatch(setCurrentOperation(null));
                        functions.swalToast(
                            `${response.data.message}`,
                            "success"
                        );
                    } catch (error) {
                        functions.swalToast(
                            "There was an error deleting this education term",
                            "error"
                        );
                    } finally {
                        setLoading(false);
                    }
                }
            });
    };

    const onPage = (event) => setLazyState(event);

    const operationTemplate = (row) => {
        if (row.built_in) return null;
        return (
            <div className="flex">
                <Button
                    className="btn-link"
                    onClick={() => handleDelete(row.id)}>
                    <FiTrash />
                </Button>
            </div>
        );
    };

    useEffect(() => {
        loadData(lazyState.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listRefreshToken, lazyState]);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                        Education Terms
                        <Button
                            onClick={() =>
                                dispatch(
                                    setCurrentOperation("newEducationTerm")
                                )
                            }>
                            New Education Term
                        </Button>
                    </Card.Title>

                    <DataTable
                        value={list}
                        lazy
                        dataKey="id"
                        paginator
                        first={lazyState.first}
                        rows={lazyState.rows}
                        totalRecords={totalRows}
                        onPage={onPage}
                        loading={loading}
                        tableStyle={{ minWidth: "50rem", fontSize: "0.9rem" }}
                        stripedRows>
                        <Column field="term" header="Education Term"></Column>
                        <Column field="startDate" header="Start Date"></Column>
                        <Column field="endDate" header="End Date"></Column>
                        <Column
                            field="lastRegistrationDate"
                            header="Last Registration Date"></Column>
                        <Column body={operationTemplate}></Column>
                    </DataTable>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EducationTermList;
